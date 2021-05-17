import mongoose from 'mongoose';
import validator from 'mongoose-validator'
import bcryptjs from 'bcryptjs'

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = new Schema({
    fname: {
        type: String
    },
    lname: String,
    username: String,
    dob: {
        type: Date
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Other"]
    },
    phone: {
        type: Number,
        default: null
    },
    password: {
        type: String,
        minlength: 6,
        maxlength: 16,
        trim: true,
        required: true
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        validate: [
            validator({
                validator: 'isEmail',
                message: 'Oops..please enter valid email'
            })
        ],
        default: null
    },
    deviceType: {
        type: Number,
        enum: [constant.DEVICE_TYPE.WEB, constant.DEVICE_TYPE.ANDROID, constant.DEVICE_TYPE.IOS],
        default: null
    },
    deviceToken: {
        type: String,
        default: null
    },
    isActive: {
        type: Boolean,
        trim: true,
        default: false
    },
    isDelete: {
        type: Boolean,
        trim: true,
        default: false
    },
    isVerified: {
        type: Boolean,
        trim: true,
        default: false
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

userSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        const salt = bcryptjs.genSaltSync(10)
        this.password = bcryptjs.hashSync(this.password, salt)
        return next()
    }
})
userSchema.static('hashPassword', (password) => {
    if (password) {
        const salt = bcryptjs.genSaltSync(10)
        return bcryptjs.hashSync(password, salt)
    }
})

userSchema.static('verifyPassword', (password, hash) => {
    if (password && hash) {
        return bcryptjs.compareSync(password, hash)
    }
});
const user = mongoose.model('user', userSchema)
export default user;
