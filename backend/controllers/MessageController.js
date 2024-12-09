// config
import { configuration } from "../config/config.js";

// Socket
import { socketIO, GetUserSocketId } from "../socket/socket.js";

// Models
import { User } from "../models/user.js";
import { Message } from "../models/message.js";
import { ConversationId } from "../models/conversationId.js";

// Send Message Controller
export const SendMessage = async (req, res) => {
  try {
    const sender = req.user.id;
    const receiver = req.params.userId;

    const isRecevierIsFriend = await User.findById(sender);

    const date = new Date();
    const amPM = date.getHours() > 12 ? "PM" : "AM";
    const time = date.getHours() + ":" + date.getMinutes() + " " + amPM;

    if (!isRecevierIsFriend.friends.includes(receiver)) {
      return res.status(400).json({
        ok: false,
        msg: "This user is not your friend. So you cannot message",
      });
    }

    if (!req.body.file || req.body.file == "") {
      if (req.body.message == "") {
        return res.status(400).json({ ok: false, msg: "Message is required." });
      }

      const conversationId = await ConversationId.findOne({
        users: { $all: [sender, receiver] },
      });

      if (!conversationId) {
        return res
          .status(400)
          .json({ ok: false, msg: "Unable to send message" });
      }

      const newMessage = await Message.create({
        sender,
        receiver,
        message: req.body.message,
        conversation_id: conversationId._id,
        time,
      });

      if (!newMessage) {
        return res
          .status(400)
          .json({ ok: false, msg: "Unable to send message" });
      }

      // Getting User SocketId
      const userSocketId = GetUserSocketId(receiver);
      socketIO.to(userSocketId).emit("newMessage", newMessage);

      res
        .status(200)
        .json({ ok: true, msg: "Message Sent!", data: newMessage });
    }
  } catch (error) {
    if (configuration.IS_DEV_ENV) {
      console.log("Error in SendMessage Function\n" + error);
    } else {
      res.status(500).json({ ok: false, msg: "Internal Server Error" });
    }
  }
};

// GetAllMessages
export const GetAllMessages = async (req, res) => {
  try {
    const conversation_id = await ConversationId.findOne({
      users: { $all: [req.user.id, req.params.userId] },
    });

    if (!conversation_id)
      return res
        .status(400)
        .json({ ok: false, msg: "Seems to be this user is not your friend" });

    const allMessages = await Message.find({ conversation_id });
    if (!allMessages) res.status(400).json({ ok: true, msg: "No Messages" });

    const messagesByTwoDay = [{ Yesterday: [] }, { Today: [] }];
    const messagesByDay = [
      { Sun: [] },
      { Mon: [] },
      { Tue: [] },
      { Wed: [] },
      { Thu: [] },
      { Fri: [] },
      { Sat: [] },
    ];
    const messagesByDate = [];

    allMessages.forEach((message) => {
      const createdTime = message.createdAt;
      const createdDay = createdTime.toString().split(" ")[0];
      const createdMonth = createdTime.toString().split(" ")[1];
      const createdDate = createdTime.toString().split(" ")[2];
      const createdYear = createdTime.toString().split(" ")[3];

      // isInWeek denotes that is this message is in week or not this also denotes that how long this message is old
      const isInWeek = new Date().getDate() - parseInt(createdDate);

      if (7 >= isInWeek) {
        if (isInWeek == 0) {
          messagesByTwoDay[1].Today.push(message);
        } else if (isInWeek == 1) {
          messagesByTwoDay[0].Yesterday.push(message);
        } else if (isInWeek >= 2) {
          const dayObject = messagesByDay.find(day => day.hasOwnProperty(createdDay))
          dayObject[createdDay].push(message)
          messagesByDay = [...messagesByDay, dayObject]
        }
      }
      else{
        if(messagesByDate.find(date => date.hasOwnProperty(`${createdDate}-${createdMonth}-${createdYear}`))){
          const dateObject = messagesByDate.find(date => date.hasOwnProperty(`${createdDate}-${createdMonth}-${createdYear}`))
          dateObject[`${createdDate}-${createdMonth}-${createdYear}`].push(message)
          messagesByDate = [...messagesByDate, dateObject]
        }else {
          messagesByDate = [...messagesByDate, {[`${createdDate}-${createdMonth}-${createdYear}`]: [message]}]
        }
      }
    });

    const allArrangedMessages = [...messagesByDate,...messagesByDay, ...messagesByTwoDay];
    res
      .status(200)
      .json({ ok: true, msg: "All Messages", data: allArrangedMessages });
  } catch (error) {
    if (configuration.IS_DEV_ENV) {
      console.log("Error in GetAllMessages Function\n" + error);
    } else {
      res.status(500).json({ ok: false, msg: "Internal Server Error" });
    }
  }
};
