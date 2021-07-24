import mongoose, { Schema } from 'mongoose';

const otp = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    otp: Number,
    phone: String,
    email: {
        type: String,
        trim: true
    },
    isVerified: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

module.exports = mongoose.model('otp', otp);