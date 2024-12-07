import express from "express";
const router = express.Router();

// Controllers
import { SendMessage } from "../controllers/MessageController.js";

// Utils

// Middlewares
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

// Routes
router.post("/sendmessage/:userId", isLoggedIn, SendMessage);

export default router;
