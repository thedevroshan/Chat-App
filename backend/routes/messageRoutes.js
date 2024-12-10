import express from "express";
const router = express.Router();

// Controllers
import { 
    SendMessage,
    GetAllMessages,
    // DeleteMessage
} from "../controllers/MessageController.js";

// Utils

// Middlewares
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

// Routes
router.post("/sendmessage/:userId", isLoggedIn, SendMessage);

router.get("/getallmessage/:userId", isLoggedIn, GetAllMessages);

// router.get("/deletemessage/:messageId", isLoggedIn, DeleteMessage)

export default router;
