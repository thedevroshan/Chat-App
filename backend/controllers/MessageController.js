// config
import { configuration } from "../config/config.js";

// Socket
import { socketIO, GetUserSocketId } from "../socket/socket.js";

// Models
import { User } from "../models/user.js";
import { Message } from "../models/message.js";

export const SendMessage = async (req, res) => {
  try {
    const isUser = await User.findById(req.params.userId)
    if(!isUser){
      return res.status(404).json({ok: false, msg: 'User Not Found'})
    }

    if(req.body.message == '') {
      return res.status(400).json({ok: false, msg: 'Message cannot be blank.'})
    }

    const newMessage = await Message.create({
      sender: req.user.id,
      receiver: req.params.userId,
      message_type: 'text',
      message: req.body.message,
      file: '',
      date: req.body.date
    })
    
    if(!newMessage){
      return res.status(400).json({ok: false, msg: 'Unable to create message'})
    }
    // Send Notification or Message
    const socketId = GetUserSocketId(req.params.userId)
    socketIO.to(socketId).emit('newMessage',newMessage)

    res.status(200).json({ok: true, msg: 'Message Sent!'})
  } catch (error) {
    if (configuration.IS_DEV_ENV) {
      console.log("Error in DeleteRequest Controller\n" + error);
    } else {
      res.status(500).json({ ok: false, msg: "Internal Server Error" });
    }
  }
};
