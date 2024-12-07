import mongoose, {Schema} from "mongoose";

const otpSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    expiration: {
        type: String,
        required: true
    }
}, {timestamps: true})

export const OTP = mongoose.model('OTP', otpSchema)