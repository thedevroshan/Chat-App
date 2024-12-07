// config
import { configuration } from "../config/config.js";

export const SendMessage = async (req, res) => {
  try {
  } catch (error) {
    if (configuration.IS_DEV_ENV) {
      console.log("Error in DeleteRequest Controller\n" + error);
    } else {
      res.status(500).json({ ok: false, msg: "Internal Server Error" });
    }
  }
};
