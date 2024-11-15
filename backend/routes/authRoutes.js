import express from 'express'
const router = express.Router()

// Controllers
import {
    Register,
    VerifyEmail,
    ResendOTP,
    Login
} from '../controllers/AuthController.js'

// Utils
import { ValidateEmail } from '../utils/EmailValidator.js'
import { ValidatePassword } from '../utils/PasswordValidator.js'
import { ValidateUsername } from '../utils/UsernameValidator.js'

router.post('/register',ValidateEmail,ValidatePassword,ValidateUsername, Register)

router.put('/verifyemail', VerifyEmail)

router.post('/resendotp', ResendOTP)

router.post('/login', Login)


export default router