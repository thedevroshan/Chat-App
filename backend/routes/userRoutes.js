import express from 'express'
const router = express.Router()


// Middlewares
import { isLoggedIn } from '../middlewares/isLoggedIn.js'
import { checkLogin } from '../middlewares/checkLogin.js'

// Controllers
import {
    GetUserInfo,
    GetAllServers,
    ChangeEmailRequest,
    ChangeEmail,
    UpdateProfile,
    ChangeUsername,
    ChangePassword,
    ForgotPassword,
    ResetPassword,
    AddLink,
    ChangeLink,
    ChangeProfilePic,
    RemoveProfilePic,
    RemoveLink,
    GetOtherUserInfo,
    GetAllFriends,
    Search
} from '../controllers/UserController.js'

// Utils
import { ValidateUsername } from '../utils/UsernameValidator.js'
import { ValidatePassword } from '../utils/PasswordValidator.js'


router.get('/isloggedin', checkLogin)

router.get('/getuserinfo',isLoggedIn, GetUserInfo)

router.get('/getallservers',isLoggedIn, GetAllServers)

router.get('/getotheruserinfo/:userId',isLoggedIn, GetOtherUserInfo)

router.get('/allfriends',isLoggedIn, GetAllFriends)

router.get('/search/:username',isLoggedIn, Search)

router.put('/changeemailrequest',isLoggedIn, ChangeEmailRequest)

router.put('/change/email',isLoggedIn, ChangeEmail)

router.put('/change/username',isLoggedIn, ValidateUsername, ChangeUsername)

router.put('/change/password',isLoggedIn, ValidatePassword, ChangePassword)

router.post('/change/profilepic',isLoggedIn, ChangeProfilePic)

router.put('/updateprofile',isLoggedIn, UpdateProfile)

router.post('/forgotpassword',ForgotPassword)

router.put('/resetpassword',ValidatePassword, ResetPassword)

router.post('/add/link',isLoggedIn, AddLink)

router.put('/change/link/',isLoggedIn, ChangeLink)

router.delete('/remove/link/',isLoggedIn, RemoveLink)

router.delete('/remove/profilepic',isLoggedIn, RemoveProfilePic)




export default router