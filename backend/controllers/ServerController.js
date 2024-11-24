import { configuration } from "../config/config.js";

// Models
import { Server } from "../models/server.js";
import { User } from "../models/user.js";

// Utils
import { CreateSendOTP } from "../utils/CreateSendOTP.js";
import { ValidateOTP } from "../utils/ValidateOTP.js";

// Appwrite
import { storage } from "../config/appwrite.js";
import { InputFile } from "node-appwrite/file";

export const CreateServer = async (req, res) => {
  try {
    const { server_name, server_handle } = req.body;
    if (server_handle == "" || server_name == "") {
      return res.status(400).json({
        ok: false,
        msg: "Server Name and Server Handle both are required.",
      });
    }

    const isServerHandleAlreadyExists = await Server.findOne({ server_handle });
    if (isServerHandleAlreadyExists) {
      return res
        .status(400)
        .json({ ok: false, msg: "Server handle not available." });
    }

    const server = await Server.create({
      server_name,
      server_handle,
      admin: req.user.id,
    });

    await User.findByIdAndUpdate(req.user.id, {
      $push: { created_servers: server._id },
    });

    res.status(200).json({ ok: false, msg: "Server Created Successfully" });
  } catch (error) {
    if (configuration.IS_DEV_ENV) {
      console.log("Error in CreateServer Function\n" + error);
    } else {
      res.status(500).json({ ok: false, msg: "Internal Server Error" });
    }
  }
};

export const ChangeBasicInfo = async (req, res) => {
  try {
    const { server_name, server_description } = req.body;
    if (server_name == "" || server_description == "") {
      return res.status(400).json({
        ok: false,
        msg: "Both fields are required.",
      });
    }

    const isUpdated = await Server.findByIdAndUpdate(req.params.server_id, {
      $set: { server_name, server_description },
    });
    if (!isUpdated) {
      return res
        .status(400)
        .json({ ok: false, msg: "Unable to change description or name" });
    }

    res
      .status(200)
      .json({ ok: true, msg: "Server Basic Info Updated Successfully" });
  } catch (error) {
    if (configuration.IS_DEV_ENV) {
      console.log("Error in ChangeBasicInfo Function\n" + error);
    } else {
      res.status(500).json({ ok: false, msg: "Internal Server Error" });
    }
  }
};

export const ChangeServerIcon = async (req, res) => {
  try {
    if (!req.body || req.body.length === 0) {
      return res.status(400).json({ ok: false, msg: "No Picture Uploaded." });
    }

    if (req.body.length > 5 * 1024 * 1024) {
      return res
        .status(400)
        .json({ ok: false, msg: "File size is too big. 5MB is the max limit" });
    }

    try {
      await storage.deleteFile(
        configuration.PROFILEPIC_BUCKET_ID,
        req.params.server_id
      );
    } catch (error) {
      // Simply passing
    }

    const isUploaded = await storage.createFile(
      configuration.PROFILEPIC_BUCKET_ID,
      req.params.server_id,
      InputFile.fromBuffer(req.body, `${req.params.server_id}.png`)
    );

    if (!isUploaded) {
      return res
        .status(400)
        .json({ ok: false, msg: "Unable to change profile pic" });
    }

    const fileViewURL =
      configuration.APPWRITE_ENDPOINT +
      `/storage/buckets/${configuration.PROFILEPIC_BUCKET_ID}/files/${isUploaded.$id}/view?project=${configuration.APPWRITE_PROJECT_ID}&mode=admin`;

    const isServerUpdated = await Server.findByIdAndUpdate(
      req.params.server_id,
      {
        $set: {
          server_icon: fileViewURL,
        },
      }
    );

    if (!isServerUpdated) {
      return res
        .status(400)
        .json({ ok: false, msg: "Unable to update server icon" });
    }

    res.status(200).json({
      ok: true,
      msg: "Server Icon Changed Successfully",
      data: fileViewURL,
    });
  } catch (error) {
    if (configuration.IS_DEV_ENV) {
      console.log("Error in ChangeServerIcon Function\n" + error);
    } else {
      res.status(500).json({ ok: false, msg: "Internal Server Error" });
    }
  }
};

export const RemoveServerIcon = async (req, res) => {
  try {
    try {
      await storage.deleteFile(
        configuration.PROFILEPIC_BUCKET_ID,
        req.params.server_id
      );
      res
        .status(200)
        .json({ ok: true, msg: "Server Icon Removed Successfully" });
    } catch (error) {
      res.status(400).json({ ok: false, msg: "Unable to remove server icon" });
    }
  } catch (error) {
    if (configuration.IS_DEV_ENV) {
      console.log("Error in ChangeServerIcon Function\n" + error);
    } else {
      res.status(500).json({ ok: false, msg: "Internal Server Error" });
    }
  }
};

export const ChangeServerHandleRequest = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const isSent = await CreateSendOTP(
      configuration.OTP_LENGTH,
      user.email,
      "Change Server Handle Request",
      `Here is your OTP to change your server handle. Note this otp will be expired in ${configuration.OTP_EXPIRATION_IN_MINUTES} minute.`,
      configuration.OTP_EXPIRATION_IN_MINUTES
    );
    if (!isSent) {
      return res.status(400).json({ ok: false, msg: "Unable to sent otp" });
    }

    res.status(200).json({
      ok: true,
      msg: "We have sent you the otp. Please check your email inbox or spam folder.",
    });
  } catch (error) {
    if (configuration.IS_DEV_ENV) {
      console.log("Error in ChangeServerHandleRequest Function\n" + error);
    } else {
      res.status(500).json({ ok: false, msg: "Internal Server Error" });
    }
  }
};

export const ChangeServerHandle = async (req, res) => {
  try {
    const { otp, new_server_handle } = req.body;

    const isValidated = await ValidateOTP(otp);
    if (!isValidated.ok) {
      return res.status(400).json({ ok: false, msg: isValidated.msg });
    }

    if (new_server_handle === "") {
      return res
        .status(400)
        .json({ ok: false, msg: "New Server Handle Required." });
    }

    const isServerHandleAlreadyExists = await Server.findOne({
      server_handle: new_server_handle,
    });
    if (isServerHandleAlreadyExists) {
      return res
        .status(400)
        .json({ ok: false, msg: "Server handle not available" });
    }

    const isUpdated = await Server.findByIdAndUpdate(req.params.server_id, {
      $set: { server_handle: new_server_handle },
    });
    if (!isUpdated) {
      return res
        .status(400)
        .json({ ok: false, msg: "Unable to change server handle" });
    }
    res
      .status(200)
      .json({ ok: true, msg: "Server Handle Changed Successfully" });
  } catch (error) {
    if (configuration.IS_DEV_ENV) {
      console.log("Error in ChangeServerHandle Function\n" + error);
    } else {
      res.status(500).json({ ok: false, msg: "Internal Server Error" });
    }
  }
};

export const AddServerLink = async (req, res) => {
  try {
    const { title, url } = req.body;

    if (title == "" || url == "") {
      return res
        .status(400)
        .json({ ok: false, msg: "URL and Title is required." });
    }

    const isAdded = await Server.findByIdAndUpdate(req.params.server_id, {
      $push: {
        links: { title, url },
      },
    });
    if (!isAdded) {
      return res.status(400).json({ ok: false, msg: "Unable to add a link" });
    }

    res.status(200).json({ ok: true, msg: "Server Link Added Successfully" });
  } catch (error) {
    if (configuration.IS_DEV_ENV) {
      console.log("Error in AddServerLink Function\n" + error);
    } else {
      res.status(500).json({ ok: false, msg: "Internal Server Error" });
    }
  }
};

export const ChangeServerLink = async (req, res) => {
  try {
    const { title, url } = req.body;

    if (title == "" || url == "") {
      return res
        .status(400)
        .json({ ok: false, msg: "URL and Title is required" });
    }

    const isUpdated = await Server.findOneAndUpdate(
      {
        _id: req.params.server_id,
        "links._id": req.query.id,
      },
      {
        $set: {
          "links.$.title": title,
          "links.$.url": url,
        },
      }
    );

    if (!isUpdated) {
      return res.status(400).json({ ok: false, msg: "Unable to change link" });
    }

    res.status(200).json({ ok: true, msg: "Link Changed Successfully" });
  } catch (error) {
    if (configuration.IS_DEV_ENV) {
      console.log("Error in ChangeServerLink Function\n" + error);
    } else {
      res.status(500).json({ ok: false, msg: "Internal Server Error" });
    }
  }
};

export const RemoveServerLink = async (req, res) => {
  try {
    if (req.query.id === "" || req.params.server_id === "") {
      return res
        .status(400)
        .json({ ok: false, msg: "Missing server_id and link_id" });
    }

    const isUpdated = await Server.findByIdAndUpdate(req.params.server_id, {
      $pull: {
        links: { _id: req.query.id },
      },
    });

    if (!isUpdated) {
      return res.status(400).json({ ok: false, msg: "Unablet to remove link" });
    }

    res.status(200).json({ ok: true, msg: "Link Remove Successfully" });
  } catch (error) {
    if (configuration.IS_DEV_ENV) {
      console.log("Error in RemoveServerLink Function\n" + error);
    } else {
      res.status(500).json({ ok: false, msg: "Internal Server Error" });
    }
  }
};

export const DeleteServer = async (req, res) => {
    try {
        const isDeleted = await Server.findByIdAndDelete(req.params.server_id)
        if(!isDeleted){
            return res.status(400).json({ok:false,msg:'Unable to delete server'})
        }

        await User.findByIdAndUpdate(req.user.id,{$pull:{created_servers: req.params.server_id}})

        res.status(200).json({ok: true,msg: 'Server Deleted'})
    } catch (error) {
      if (configuration.IS_DEV_ENV) {
        console.log("Error in DeleteServer Function\n" + error);
      } else {
        res.status(500).json({ ok: false, msg: "Internal Server Error" });
      }
    }
  };