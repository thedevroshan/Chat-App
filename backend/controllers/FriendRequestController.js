// Config
import { configuration } from "../config/config.js";

// Models
import { User } from "../models/user.js";
import { FriendRequest } from "../models/friendRequest.js";
import { ConversationId } from "../models/conversationId.js";

// Socket
import { socketIO, GetUserSocketId } from "../socket/socket.js";

export const AddFriendRequest = async (req, res) => {
  try {
    if (req.user.id === req.params.userId) {
      return res
        .status(400)
        .json({ ok: false, msg: "You cannot send friend request to yourself" });
    }

    const alreadyRequested = await User.findOne({
      _id: req.user.id,
      requested: req.params.userId,
    });
    if (alreadyRequested) {
      return res
        .status(400)
        .json({ ok: false, msg: "Already you have requested!" });
    }

    const isRequestedUser = await User.findById(req.params.userId);
    if (!isRequestedUser) {
      return res
        .status(404)
        .json({ ok: false, msg: "Requested User Not Found" });
    }

    // if User A send request to B and Later B also tries to send request to A
    if (isRequestedUser.requested.includes(req.user.id)) {
      res
        .status(400)
        .json({ ok: false, msg: "You cannot request because that user did." });
    }

    if (isRequestedUser.friends.includes(req.user.id)) {
      return res
        .status(400)
        .json({ ok: false, msg: "You are already a friend!" });
    }

    const isRequesterUpdated = await User.findByIdAndUpdate(req.user.id, {
      $push: {
        requested: req.params.userId,
      },
    });

    if (!isRequesterUpdated) {
      return res
        .status(400)
        .json({ ok: false, msg: "Unable to make friend request" });
    }

    const newFriendRequest = await FriendRequest.create({
      from: req.user.id,
      sender_profile_pic: isRequesterUpdated.profile_pic,
      sender_username: isRequesterUpdated.username,
      to: req.params.userId,
    });

    if (!newFriendRequest) {
      return res
        .status(400)
        .json({ ok: false, msg: "Unable to make friend request" });
    }

    const isRequestedUpdated = await User.findByIdAndUpdate(req.params.userId, {
      $push: {
        requests: newFriendRequest._id,
      },
    });

    if (!isRequestedUpdated) {
      return res
        .status(400)
        .json({ ok: false, msg: "Unable to make friend request" });
    }

    // Sending Notification
    const socketId = GetUserSocketId(req.params.userId);
    socketIO.to(socketId).emit("newFriendRequest", newFriendRequest);

    res.status(200).json({ ok: true, msg: "Friend Request Sent!" });
  } catch (error) {
    if (configuration.IS_DEV_ENV) {
      console.log("Error in AddFriendRequest Controller\n" + error);
    } else {
      res.status(500).json({ ok: false, msg: "Internal Server Error" });
    }
  }
};

export const DeleteRequest = async (req, res) => {
  try {
    // Removing the requested user's id from requested array of the sender
    const isSenderUpdated = await User.findByIdAndUpdate(
      req.friendRequest.from,
      {
        $pull: {
          requested: req.friendRequest.to,
        },
      }
    );

    // Removing the Friend Request id from requests array of the requested user
    const isReceiverUpdated = await User.findByIdAndUpdate(
      req.friendRequest.to,
      {
        $pull: {
          requests: req.friendRequest.requestDocId,
        },
      }
    );

    const isRequestDeleted = await FriendRequest.findByIdAndDelete(
      req.friendRequest.requestDocId
    );

    if (!isReceiverUpdated || !isSenderUpdated || !isRequestDeleted) {
      return res
        .status(404)
        .json({ ok: false, msg: "Unable to delete friend request" });
    }

    res.status(200).json({ ok: true, msg: "Friend Request Deleted!" });
  } catch (error) {
    if (configuration.IS_DEV_ENV) {
      console.log("Error in DeleteRequest Controller\n" + error);
    } else {
      res.status(500).json({ ok: false, msg: "Internal Server Error" });
    }
  }
};

export const AcceptFriendRequest = async (req, res) => {
  try {
    const isRequestedUserUpdated = await User.findByIdAndUpdate(
      req.friendRequest.to,
      {
        $pull: {
          requests: req.friendRequest.requestDocId,
        },
        $push: {
          friends: req.friendRequest.from,
        },
      }
    );

    const isRequestSenderUserUpdated = await User.findByIdAndUpdate(
      req.friendRequest.from,
      {
        $pull: {
          requested: req.friendRequest.to,
        },
        $push: {
          friends: req.friendRequest.to,
        },
      }
    );

    const isFriendRequestDeleted = await FriendRequest.findByIdAndDelete(
      req.friendRequest.requestDocId
    );

    if (
      !isRequestSenderUserUpdated ||
      !isRequestedUserUpdated ||
      !isFriendRequestDeleted
    ) {
      return res
        .status(400)
        .json({ ok: false, msg: "Unable To Accept Friend Request!" });
    }

    const isCreated = await ConversationId.create({
      users: [req.user.id, req.friendRequest.from],
    });
    if (!isCreated) {
      return res
        .status(400)
        .json({ ok: false, msg: "Unable to accept friend request" });
    }
    res.status(200).json({ ok: true, msg: "Friend Request Accepted" });
  } catch (error) {
    if (configuration.IS_DEV_ENV) {
      console.log("Error in AcceptFriendRequest Controller\n" + error);
    } else {
      res.status(500).json({ ok: false, msg: "Internal Server Error" });
    }
  }
};

export const GetAllRequest = async (req, res) => {
  try {
    const allRequests = await FriendRequest.find({ to: req.user.id });
    if (allRequests.length === 0) {
      return res.status(404).json({ ok: false, msg: "No Requests" });
    }

    res
      .status(200)
      .json({ ok: true, msg: "All Friend Requests", data: allRequests });
  } catch (error) {
    if (configuration.IS_DEV_ENV) {
      console.log("Error in GetAllRequest Controller\n" + error);
    } else {
      res.status(500).json({ ok: false, msg: "Internal Server Error" });
    }
  }
};
