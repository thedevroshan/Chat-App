import { OTP } from "../models/otp.js"

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

        return {
            ok: true,
            msg: 'OTP Verified',
            user: doesOTPExists.email
        }
    } catch (error) {
        
    }
}