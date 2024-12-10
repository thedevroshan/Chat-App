// Config
import { configuration } from "../config/config.js";

// Models
import { User } from "../models/user.js";

export const SetLastActive = async (userId, userSocketId, socket) => {
  try {
    const isUpdatedLastActive = await User.findByIdAndUpdate(userId, {
      $set: {
        lastActive: Date.now(),
      },
    });

    if (!isUpdatedLastActive) {
      socket
        .to(userSocketId)
        .emit("onError", "Unable to set user lastactive time");
    }
  } catch (error) {
    if (configuration.IS_DEV_ENV) {
      console.log("Error in SetActive Controller\n" + error);
    } else {
      res.status(500).json({ ok: false, msg: "Internal Server Error" });
    }
  }
};
