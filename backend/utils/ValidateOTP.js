import { OTP } from "../models/otp.js"
import { configuration } from "../config/config.js"

export const ValidateOTP = async (otp) => {
    try {
        const doesOTPExists = await OTP.findOne({otp})
        if(!doesOTPExists){
            return {
                ok: false,
                msg: 'OTP Not Found'
            }
        }

        if(doesOTPExists.expiration <= Date.now()){
            await OTP.deleteOne({otp})
            return {
                ok: false,
                msg: 'OTP Expired'
            }
        }

        await OTP.findOneAndDelete({otp})

        return {
            ok: true,
            msg: 'OTP Verified',
            user: doesOTPExists.email
        }
    } catch (error) {
        if(configuration.IS_DEV_ENV){
            console.log('Error in ValidateOTP File' + error)
        }
        else {
            console.log('Some error occurred')
        }
    }
}