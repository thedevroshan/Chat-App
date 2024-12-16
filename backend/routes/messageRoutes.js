import express from "express";
const router = express.Router();

// Controllers
import { 
    SendMessage,
    GetAllMessages,
    EditMessage
    // DeleteMessage
} from "../controllers/MessageController.js";

// Utils

// Middlewares
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

// Routes
router.post("/sendmessage/:userId", isLoggedIn, SendMessage);

router.get("/getallmessage/:userId", isLoggedIn, GetAllMessages);

router.put("/editmessage/:messageId", isLoggedIn, EditMessage);

// router.get("/deletemessage/:messageId", isLoggedIn, DeleteMessage)

export default router;
