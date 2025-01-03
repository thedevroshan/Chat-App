import { FriendRequest } from "../models/friendRequest.js";

// Config
import { configuration } from "../config/config.js";

export const isFriendRequest = async (req, res, next) => {
  try {
    const isFriendRequest = (await FriendRequest.findById(req.params.requestId)) ||
      (await FriendRequest.findOne({
        from: req.params.requestId,
        to: req.user.id,
      })) ||
      (await FriendRequest.findOne({
        from: req.user.id,
        to: req.params.requestId,
      }));

      
    if (!isFriendRequest) {
      return res.status(404).json({ ok: false, msg: "Request Not Found" });
    }
    if (req.friendRequest == null || req.friendRequest == undefined) {
      req.friendRequest = {
        from: isFriendRequest.from,
        to: isFriendRequest.to,
        requestDocId: isFriendRequest._id
      };
    }
    next();
  } catch (error) {
    if (configuration.IS_DEV_ENV) {
      console.log("Error in isFriendRequest Middelware\n" + error);
    } else {
      res.status(500).json({ ok: false, msg: "Internal Server Error" });
    }
  }
};
