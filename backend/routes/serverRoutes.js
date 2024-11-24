import express from 'express'
const router = express.Router()

// Controllers
import {
    CreateServer,
    ChangeBasicInfo,
    ChangeServerIcon,
    RemoveServerIcon,
    ChangeServerHandleRequest,
    ChangeServerHandle,
    AddServerLink,
    ChangeServerLink,
    RemoveServerLink,
    DeleteServer
} from '../controllers/ServerController.js'

// Utils


// Middlewares
import {isLoggedIn} from '../middlewares/isLoggedIn.js'


// Routes
router.post('/createserver', isLoggedIn, CreateServer)

router.put('/change/:server_id/basicinfo', isLoggedIn, ChangeBasicInfo)

router.post('/change/:server_id/server_icon', isLoggedIn, ChangeServerIcon)

router.put('/change/handle_request', isLoggedIn, ChangeServerHandleRequest)

router.put('/change/:server_id/handle', isLoggedIn, ChangeServerHandle)

router.post('/add/:server_id/link', isLoggedIn, AddServerLink)

router.put('/change/:server_id/link/', isLoggedIn, ChangeServerLink)

router.delete('/remove/:server_id/link/', isLoggedIn, RemoveServerLink)

router.delete('/remove/:server_id/server_icon', isLoggedIn, RemoveServerIcon)

router.delete('/:server_id', isLoggedIn, DeleteServer)

export default router