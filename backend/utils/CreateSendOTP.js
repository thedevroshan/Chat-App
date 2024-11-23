import { configuration } from "../config/config.js"
import { OTP } from "../models/otp.js";
import { Transport } from "./Transporter.js";

export const CreateSendOTP = async (otpLength,email, subject, text, expirationInMinutes) => {
    try {
        const otp = Math.floor(Math.random() * (10 ** otpLength))
        const newOTP = otp.toString().padStart(otpLength, Math.floor(Math.random() * 10))

        const mailOptions = {
            from: configuration.EMAIL, // Sender address
            to: email, // Receiver's email
            subject: subject,
            text: text  + '\n' + newOTP,
        };

        await Transport.sendMail(mailOptions)
        await OTP.create({
            email,
            otp: newOTP,
            expiration: Date.now() + expirationInMinutes * 60 * 1000
        })
        return true
    } catch (error) {
        if(configuration.IS_DEV_ENV){
            console.log('Error in CreateSendOTP File' + error)
        }
        else {
            console.log('Some error occurred')
        }
    }
}