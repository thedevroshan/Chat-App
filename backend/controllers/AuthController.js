
import { validationResult } from 'express-validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken' 

// Config
import { configuration } from '../config/config.js'

// Models
import { User } from '../models/user.js'
import { OTP } from '../models/otp.js'

// Utils
import { CreateSendOTP } from '../utils/CreateSendOTP.js'
import { ValidateOTP } from '../utils/ValidateOTP.js'
import { GenerateSendJWTToken } from '../utils/GenerateSendJWTToken.js'


// Register Controller
export const Register = async (req, res) => {
    try {
        const result = validationResult(req)
        if(!result.isEmpty()){
            return res.status(400).json({
                errors: result.array()
            })
        }
        
        const {username, name, email, password} = req.body;
        
        const salt = await bcrypt.genSalt(configuration.SALT_LENGTH)
        const hashedPassword = await bcrypt.hash(password, salt)

        const doesEmailExists = await User.findOne({email})
        const doesUsernameExists = await User.findOne({username})

        if(doesEmailExists){
            return res.status(400).json({ok: false,msg: 'Email already exists.'})
        }

        if(doesUsernameExists){
            return res.status(400).json({ok: false,msg: 'Username is already taken.'})
        }

        await User.create({
            username,
            name,
            email,
            password: hashedPassword
        })

        await CreateSendOTP(configuration.OTP_LENGTH, email, 'Email Verification', `Here is your OTP for email verification. Note this otp will expire in ${configuration.OTP_EXPIRATION_IN_MINUTES} minutes.`, configuration.OTP_EXPIRATION_IN_MINUTES)

        res.status(200).json({ok: true, msg: 'User Created'})
    } catch (error) {
        if(configuration.IS_DEV_ENV){
            console.log('Error in Register Function\n'+error)
        }
        else {
            res.status(500).json({ok: false, msg: 'Internal Server Error'})
        }
    }
}

// Verify Email Controller
export const VerifyEmail = async (req, res) => {
    try {
        const validateOTP = await ValidateOTP(req.body.otp)

        if(!validateOTP.ok){
            return res.status(400).json({ok: false, msg: validateOTP.msg})
        }

        const isVerified = await User.findOneAndUpdate({email: validateOTP.user}, {
            $set: {
                verified: true
            }
        })
        if(!isVerified){
            return res.status(400).json({ok: false, msg: 'Unable to verify email'})
        }

        await OTP.findOneAndDelete({email: isVerified.email})

        await GenerateSendJWTToken(res,isVerified._id)
        res.status(200).json({ok: true, msg: 'Email Verified'})
    } catch (error) {
        if(configuration.IS_DEV_ENV){
            console.log('Error in Register Function\n'+error)
        }
        else {
            res.status(500).json({ok: false, msg: 'Internal Server Error'})
        }
    }
}

// Resend OTP Controller
export const ResendOTP = async (req, res) => {
    try {
        await CreateSendOTP(configuration.OTP_LENGTH, req.body.email, 'Email Verification', `Here is your OTP for email verification. Note this otp will expire in ${configuration.OTP_EXPIRATION_IN_MINUTES} minutes.`, configuration.OTP_EXPIRATION_IN_MINUTES)

        res.status(200).json({ok: true, msg: 'OTP Resend'})
    } catch (error) {
        if(configuration.IS_DEV_ENV){
            console.log('Error in Register Function\n'+error)
        }
        else {
            res.status(500).json({ok: false, msg: 'Internal Server Error'})
        }
    }
}


// Login Controller
export const Login = async (req, res) => {
    try {
        const {username_or_email, password} = req.body;
        
        const doesUsernameExists = await User.findOne({username: username_or_email}) || await User.findOne({email: username_or_email})

        if(!doesUsernameExists){
            return res.status(400).json({ok: false, msg: 'Incorrect Credentials'})
        }

        const isPassword = await bcrypt.compare(password, doesUsernameExists.password)
        if(!isPassword){
            return res.status(400).json({ok: false, msg: 'Incorrect Credentials'})
        }

        if(!doesUsernameExists.verified){
            await CreateSendOTP(configuration.OTP_LENGTH, doesUsernameExists.email, 'Email Verification', `Here is your OTP for email verification. Note this otp will expire in ${configuration.OTP_EXPIRATION_IN_MINUTES} minutes.`, configuration.OTP_EXPIRATION_IN_MINUTES)
            return res.status(401).json({ok: false, msg: 'Verify Your Email'})
        }
        
        await GenerateSendJWTToken(res,doesUsernameExists._id)
        res.status(200).json({ok: true, msg: 'Logged In'})
    } catch (error) {
        if(configuration.IS_DEV_ENV){
            console.log('Error in Register Function\n'+error)
        }
        else {
            res.status(500).json({ok: false, msg: 'Internal Server Error'})
        }
    }
}

// Logout Controller
export const Logout = async (req, res) => {
    try {
        res.cookie('login_session', '', {
            httpOnly: true,
            sameSite: 'None',
            secure: true,
        })
    } catch (error) {
        if(configuration.IS_DEV_ENV){
            console.log('Error in Register Function\n'+error)
        }
        else {
            res.status(500).json({ok: false, msg: 'Internal Server Error'})
        }
    }
}