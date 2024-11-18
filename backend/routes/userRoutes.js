import express from 'express'
const router = express.Router()

// Controllers
import {
} from '../controllers/UserController.js'

// Middlewares
import { isLoggedIn } from '../middlewares/isLoggedIn.js'


router.get('/isloggedin', isLoggedIn)


export default router