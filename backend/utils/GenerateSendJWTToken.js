import { configuration } from "../config/config.js"
import jwt from 'jsonwebtoken'

export const GenerateSendJWTToken = async (res, userId) => {
    try {
        const jwt_token = await jwt.sign({userId}, configuration.JWT_SECRET, {algorithm: 'HS512'})
        res.cookie('login_session', jwt_token, {
            httpOnly: true,
            sameSite: 'None',
            secure: true,
        })
    } catch (error) {
        if(configuration.IS_DEV_ENV){
            console.log('Error in GenerateSendJWTToken File' + error)
        }
        else {
            console.log('Some error occurred')
        }
    }
}