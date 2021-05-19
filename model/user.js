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
        maxlength: 10,
        minlength: 10,
        default: null
    },
    countryCode: {
        type: String,
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
        default: ''
    },
    facebookId: {
        type: String,
        default: "",
        select: false,
    },
    googleId: {
        type: String,
        default: "",
        select: false,
    },
    isSocialRegister: {
        type: Number,
        default: 0,
    },
    deviceType: {
        type: String,
        select: false,
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

userSchema.path("email").validate((value, done) => {
    if (!value) return true;
    let qry = { email: value.toLowerCase() };
    return mongoose
        .model("user")
        .countDocuments(qry)
        .exec()
        .then(function (count) {
            return !count;
        })
        .catch(function (err) {
            throw err;
        });
}, "This Email Already Exist")

userSchema.path("phone").validate(function (value, done) {
    if (!value) return true;
    let qry = { phone: value, countryCode: this.countryCode };

    return mongoose
        .model("user")
        .countDocuments(qry)
        .exec()
        .then(function (count) {
            return !count;
        })
        .catch(function (err) {
            throw err;
        });
}, "This Number Already Exist");

userSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        const salt = bcryptjs.genSaltSync(10)
        this.password = bcryptjs.hashSync(this.password, salt)
        return next()   // If you are creating the new document then just return next() middleware.
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

module.exports = mongoose.model('user', userSchema)
