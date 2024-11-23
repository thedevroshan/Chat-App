import { configuration } from '../config/config.js'
import jwt from 'jsonwebtoken'

export const checkLogin = async (req, res, next) => {
    try {
        const jwt_token = req.cookies.login_session
        if(!jwt_token){
            return res.status(404).json({ok: false, msg: 'Token Not Found'})
        }

        const verified_token = await jwt.verify(jwt_token, configuration.JWT_SECRET)
        if(!verified_token){
            return res.status(400).json({ok: false, msg: 'Invalid Token'})
        }
        res.status(200).json({ok:true, msg: 'Yes, user is logged in'})
    } catch (error) {
        if(configuration.IS_DEV_ENV){
            console.log('Error in Register Function\n'+error)
        }
        else {
            res.status(500).json({ok: false, msg: 'Internal Server Error'})
        }
    }
}