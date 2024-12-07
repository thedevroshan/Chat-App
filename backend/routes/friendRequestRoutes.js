import express from 'express'
const router = express.Router()

// Controllers
import {
    AddFriendRequest,
    DeleteRequest,
    AcceptFriendRequest,
    GetAllRequest
} from '../controllers/FriendRequestController.js'

// Middlewares
import { isLoggedIn } from '../middlewares/isLoggedIn.js'
import { isFriendRequest } from '../middlewares/isFriendRequest.js'

router.post('/addfriend/:userId',isLoggedIn, AddFriendRequest)

router.put('/accept/:requestId',isLoggedIn,isFriendRequest, AcceptFriendRequest)

router.get('/requests',isLoggedIn, GetAllRequest)

router.delete('/delete/:requestId',isLoggedIn,isFriendRequest, DeleteRequest)

export default router