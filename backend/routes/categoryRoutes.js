import express from 'express'
const router = express.Router()

// Controllers
import {
    CreateCategory,
} from '../controllers/CategoryController.js'

// Utils


// Middlewares
import {isLoggedIn} from '../middlewares/isLoggedIn.js'


// Routes
router.post('/:server_id/create_category', isLoggedIn, CreateCategory)

export default router