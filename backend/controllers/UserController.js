import { validationResult } from "express-validator";
import bcrypt from "bcrypt";

// Config
import { configuration } from "../config/config.js";

// Models
import { User } from "../models/user.js";
import { Server } from "../models/server.js";

// Utils
import { CreateSendOTP } from "../utils/CreateSendOTP.js";
import { ValidateOTP } from "../utils/ValidateOTP.js";

// Appwrite
import { storage } from "../config/appwrite.js";
import { InputFile } from "node-appwrite/file";
import { socketIO, GetUserSocketId } from "../socket/socket.js";

export const GetUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ ok: false, msg: "User Not Found" });
    }

    res
      .status(200)
      .json({ ok: true, msg: `Info of ${req.user.id}`, data: user });
  } catch (error) {
    if (configuration.IS_DEV_ENV) {
      console.log("Error in GetUserInfo Function\n" + error);
    } else {
      res.status(500).json({ ok: false, msg: "Internal Server Error" });
    }
  }
};

export const GetOtherUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select("-password");
    if (!user) {
      return res.status(404).json({ ok: false, msg: "User Not Found" });
    }

    res
      .status(200)
      .json({ ok: true, msg: `Info of ${req.user.id}`, data: user });
  } catch (error) {
    if (configuration.IS_DEV_ENV) {
      console.log("Error in GetOtherUserInfo Function\n" + error);
    } else {
      res.status(500).json({ ok: false, msg: "Internal Server Error" });
    }
  }
};

export const GetAllServers = async (req, res) => {
  try {
    const servers = await Server.find({ admin: req.user.id }).select(
      "-roles -members -categories"
    );
    if (servers.length === 0) {
      return res.status(404).json({ ok: false, msg: "No Servers Found" });
    }

    res.status(200).json({ ok: true, msg: "Servers Found", data: servers });
  } catch (error) {
    if (configuration.IS_DEV_ENV) {
      console.log("Error in GetAllServers Function\n" + error);
    } else {
      res.status(500).json({ ok: false, msg: "Internal Server Error" });
    }
  }
};

export const ChangeEmailRequest = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const isSent = await CreateSendOTP(
      configuration.OTP_LENGTH,
      user.email,
      "Email Change Request",
      `Here is your OTP to change your email. Note this otp will be valid for ${configuration.OTP_EXPIRATION_IN_MINUTES} minutes.`,
      configuration.OTP_EXPIRATION_IN_MINUTES
    );

    if (!isSent) {
      return res.status(400).json({
        ok: false,
        msg: "Sorry, There is some problem to send otp. Please try again later",
      });
    }

    res.status(200).json({ ok: true, msg: "OTP Sent" });
  } catch (error) {
    if (configuration.IS_DEV_ENV) {
      console.log("Error in ChangeEmailRequest Function\n" + error);
    } else {
      res.status(500).json({ ok: false, msg: "Internal Server Error" });
    }
  }
};

export const ChangeEmail = async (req, res) => {
  try {
    const { otp, email } = req.body;
    const validated = await ValidateOTP(otp);

    if (!validated.ok) {
      return res.status(400).json({ ok: false, msg: validated.msg });
    }

    const isUpated = await User.findByIdAndUpdate(req.user.id, {
      $set: {
        email,
        verified: false,
      },
    });

    if (!isUpated) {
      return res
        .status(400)
        .json({ ok: false, msg: "Unable to upated email." });
    }

    await CreateSendOTP(
      configuration.OTP_LENGTH,
      email,
      "Email Verification",
      `Here is your otp to verify your email. Note this email will be expired in ${configuration.OTP_EXPIRATION_IN_MINUTES} minutes.`,
      configuration.OTP_EXPIRATION_IN_MINUTES
    );
    res.status(200).json({ ok: true, msg: "Email Changed Successfully" });
  } catch (error) {
    if (configuration.IS_DEV_ENV) {
      console.log("Error in ChangeEmail Function\n" + error);
    } else {
      res.status(500).json({ ok: false, msg: "Internal Server Error" });
    }
  }
};

export const UpdateProfile = async (req, res) => {
  try {
    const { name, bio } = req.body;

    const isUpdated = await User.findByIdAndUpdate(req.user.id, {
      $set: {
        name,
        bio,
      },
    });

    if (!isUpdated) {
      return res
        .status(400)
        .json({ ok: false, msg: "Unable to update profile" });
    }

    res.status(200).json({ ok: true, msg: "Profile Updated Successfully" });
  } catch (error) {
    if (configuration.IS_DEV_ENV) {
      console.log("Error in UpdateProfile Function\n" + error);
    } else {
      res.status(500).json({ ok: false, msg: "Internal Server Error" });
    }
  }
};

export const ChangeUsername = async (req, res) => {
  try {
    const isUsernameExists = await User.findOne({
      username: req.body.username,
    });

    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ ok: false, msg: result.array()[0].msg });
    }

    if (isUsernameExists) {
      return res.status(400).json({ ok: false, msg: "Username not available" });
    }

    const isUpdated = await User.findByIdAndUpdate(req.user.id, {
      $set: {
        username: req.body.username,
      },
    });

    if (!isUpdated) {
      return res.status(400).json({ ok: false, msg: "Unable to username" });
    }

    res.status(200).json({ ok: true, msg: "Username Changed Successfully" });
  } catch (error) {
    if (configuration.IS_DEV_ENV) {
      console.log("Error in ChangeUsername Function\n" + error);
    } else {
      res.status(500).json({ ok: false, msg: "Internal Server Error" });
    }
  }
};

export const ChangePassword = async (req, res) => {
  try {
    const { current_password, password } = req.body;

    const user = await User.findById(req.user.id);

    const isCurrentPassword = await bcrypt.compare(
      current_password,
      user.password
    );
    if (!isCurrentPassword) {
      return res
        .status(400)
        .json({ ok: false, msg: "Incorrect Current Password" });
    }

    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ ok: false, msg: result.array()[0].msg });
    }

    const salt = await bcrypt.genSalt(configuration.SALT_LENGTH);
    const hashedPassword = await bcrypt.hash(password, salt);

    const isUpdated = await User.findByIdAndUpdate(req.user.id, {
      $set: {
        password: hashedPassword,
      },
    });

    if (!isUpdated) {
      return res
        .status(400)
        .json({ ok: false, msg: "Unable to change password" });
    }

    res.status(200).json({ ok: true, msg: "Password Changed Successfully" });
  } catch (error) {
    if (configuration.IS_DEV_ENV) {
      console.log("Error in ChangePassword Function\n" + error);
    } else {
      res.status(500).json({ ok: false, msg: "Internal Server Error" });
    }
  }
};

export const ForgotPassword = async (req, res) => {
  try {
    const user =
      (await User.findOne({ username: req.body.username_or_email })) ||
      (await User.findOne({ email: req.body.username_or_email }));

    if (!user) {
      return res.status(404).json({ ok: false, msg: "User not found" });
    }

    await CreateSendOTP(
      configuration.OTP_LENGTH,
      user.email,
      "Forgot Password",
      `Here is your otp to reset your password. Note this otp will be expired in ${configuration.OTP_EXPIRATION_IN_MINUTES} minutes.`,
      configuration.OTP_EXPIRATION_IN_MINUTES
    );

    res.status(200).json({ ok: true, msg: "We have sent the otp your email" });
  } catch (error) {
    if (configuration.IS_DEV_ENV) {
      console.log("Error in ForgotPassword Function\n" + error);
    } else {
      res.status(500).json({ ok: false, msg: "Internal Server Error" });
    }
  }
};

export const ResetPassword = async (req, res) => {
  try {
    const isOTPValidated = await ValidateOTP(req.body.otp);

    if (!isOTPValidated.ok) {
      return res.status(400).json({ ok: false, msg: isOTPValidated.msg });
    }

    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ ok: false, msg: result.array() });
    }

    if (req.body.password !== req.body.confirm_password) {
      return res.status(400).json({
        ok: false,
        msg: "Password and Confirm Password must be same.",
      });
    }

    const salt = await bcrypt.genSalt(configuration.SALT_LENGTH);
    const hashedPassword = await bcrypt.hash(req.body.confirm_password, salt);

    const isUpdated = await User.findOneAndUpdate(
      { email: isOTPValidated.user },
      {
        $set: {
          password: hashedPassword,
        },
      }
    );

    if (!isUpdated) {
      return res
        .status(400)
        .json({ ok: false, msg: "Unable to reset password" });
    }

    res.status(200).json({ ok: true, msg: "Password Reset Successfully" });
  } catch (error) {
    if (configuration.IS_DEV_ENV) {
      console.log("Error in ResetPassword Function\n" + error);
    } else {
      res.status(500).json({ ok: false, msg: "Internal Server Error" });
    }
  }
};

export const AddLink = async (req, res) => {
  try {
    const { title, url } = req.body;

    if (title == "" || url == "") {
      return res
        .status(400)
        .json({ ok: false, msg: "URL and Title is required." });
    }

    const isAdded = await User.findByIdAndUpdate(req.user.id, {
      $push: {
        links: { title, url },
      },
    });
    if (!isAdded) {
      return res.status(400).json({ ok: false, msg: "Unable to add a link" });
    }

    res.status(200).json({ ok: true, msg: "Link Added Successfully" });
  } catch (error) {
    if (configuration.IS_DEV_ENV) {
      console.log("Error in AddLink Function\n" + error);
    } else {
      res.status(500).json({ ok: false, msg: "Internal Server Error" });
    }
  }
};

export const ChangeLink = async (req, res) => {
  try {
    const { title, url } = req.body;

    if (title == "" || url == "") {
      return res
        .status(400)
        .json({ ok: false, msg: "URL and Title is required" });
    }

    const isUpdated = await User.findOneAndUpdate(
      {
        _id: req.user.id,
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
      return res.status(400).json({ ok: false, msg: "Unablet to change link" });
    }

    res.status(200).json({ ok: true, msg: "Link Changed Successfully" });
  } catch (error) {
    if (configuration.IS_DEV_ENV) {
      console.log("Error in ChangeLink Function\n" + error);
    } else {
      res.status(500).json({ ok: false, msg: "Internal Server Error" });
    }
  }
};

export const RemoveLink = async (req, res) => {
  try {
    const isUpdated = await User.findByIdAndUpdate(req.user.id, {
      $pull: {
        links: {
          _id: req.query.id,
        },
      },
    });

    if (!isUpdated) {
      return res.status(400).json({ ok: false, msg: "Unablet to remove link" });
    }

    res.status(200).json({ ok: true, msg: "Link Removed Successfully" });
  } catch (error) {
    if (configuration.IS_DEV_ENV) {
      console.log("Error in ChangeLink Function\n" + error);
    } else {
      res.status(500).json({ ok: false, msg: "Internal Server Error" });
    }
  }
};

export const ChangeProfilePic = async (req, res) => {
  try {
    if (!req.body || req.body.length === 0) {
      return res.status(400).json({ ok: false, msg: "No Picture Uploaded." });
    }

    if (req.body.length > 5 * 1024 * 1024) {
      return re
        .status(400)
        .json({ ok: false, msg: "File size is too big. 5MB is the max limit" });
    }

    try {
      await storage.deleteFile(configuration.PROFILEPIC_BUCKET_ID, req.user.id);
    } catch (error) {
      // Simply passing
    }

    const isUploaded = await storage.createFile(
      configuration.PROFILEPIC_BUCKET_ID,
      req.user.id,
      InputFile.fromBuffer(req.body, `${req.user.id}.png`)
    );

    if (!isUploaded) {
      return res
        .status(400)
        .json({ ok: false, msg: "Unable to change profile pic" });
    }

    const fileViewURL =
      configuration.APPWRITE_ENDPOINT +
      `/storage/buckets/${configuration.PROFILEPIC_BUCKET_ID}/files/${isUploaded.$id}/view?project=${configuration.APPWRITE_PROJECT_ID}`;

    const isUserUpdated = await User.findByIdAndUpdate(req.user.id, {
      $set: {
        profile_pic: fileViewURL,
      },
    });

    if (!isUserUpdated) {
      return res
        .status(400)
        .json({ ok: false, msg: "Unable to update profile pic" });
    }

    res
      .status(200)
      .json({ ok: true, msg: "Profile Pic Changed", data: fileViewURL });
  } catch (error) {
    if (configuration.IS_DEV_ENV) {
      console.log("Error in ChangeProfilePic Function\n" + error);
    } else {
      res.status(500).json({ ok: false, msg: "Internal Server Error" });
    }
  }
};

export const RemoveProfilePic = async (req, res) => {
  try {
    try {
      await storage.deleteFile(configuration.PROFILEPIC_BUCKET_ID, req.user.id);
      const isUserUpdated = await User.findByIdAndUpdate(req.user.id, {
        $set: {
          profile_pic: "",
        },
      });

      if (!isUserUpdated) {
        return res
          .status(400)
          .json({ ok: false, msg: "Unable to update profile pic" });
      }

      res.status(200).json({ ok: true, msg: "Profile Pic Removed" });
    } catch (error) {
      // Simply passing
      res.status(400).json({ ok: false, msg: "Unable to remvoe profile pic" });
    }
  } catch (error) {
    if (configuration.IS_DEV_ENV) {
      console.log("Error in ChangeProfilePic Function\n" + error);
    } else {
      res.status(500).json({ ok: false, msg: "Internal Server Error" });
    }
  }
};

export const GetAllFriends = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ ok: false, msg: "User Not Found" });
    }

    const allFriends = await Promise.all(
      user.friends.map(async (userId) => {
        return await User.findById(userId).select("-password");
      })
    );

    if (allFriends.length === user.friends.length) {
      res.status(200).json({ ok: true, msg: "All Friends", data: allFriends });
    }
  } catch (error) {
    if (configuration.IS_DEV_ENV) {
      console.log("Error in GetAllFriends Controller\n" + error);
    } else {
      res.status(500).json({ ok: false, msg: "Internal Server Error" });
    }
  }
};

export const Search = async (req, res) => {
  try {
    const isSearchedUserExists = await User.findOne({username: {$regex: req.params.username_or_name, $options: 'i'}}).select('-password') || await User.findOne({name: {$regex: req.params.username_or_name, $options: 'i'}}).select('-password')

    if(!isSearchedUserExists){
      return res.status(404).json({ok: false, msg: 'User Not Found'})
    }

    res.status(200).json({ok: true,msg:'User Found', data: [isSearchedUserExists]})
  } catch (error) {
    if (configuration.IS_DEV_ENV) {
      console.log("Error in Search Controller\n" + error);
    } else {
      res.status(500).json({ ok: false, msg: "Internal Server Error" });
    }
  }
};

export const GetLastActive = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
    if(!user){
      return res.status(404).json({ok: false,msg: 'User Not Found'})
    }

    const minutes = (Date.now() - parseInt(user.lastActive))/60000
    if(Math.round(minutes/60) >= 48 && Math.round(minutes/60) != 0){
      return res.status(200).json({ok: true, msg: 'Last Active', data: (Math.round(minutes/60))/24 + 'days ago'})
    }
    else if(Math.round(minutes/60) >= 24 && Math.round(minutes/60) != 0){
      return res.status(200).json({ok: true, msg: 'Last Active', data: 'Yesterday'})
    } 
    else if(Math.round(minutes/60) < 24 && Math.round(minutes/60) != 0) {
      return res.status(200).json({ok: true, msg: 'Last Active', data: Math.round(minutes/60) + 'h ago'})
    }
    res.status(200).json({ok: true, msg: 'Last Active', data: Math.round(minutes) != 0?Math.round(minutes) + 'm ago':''})
  } catch (error) {
    if (configuration.IS_DEV_ENV) {
      console.log("Error in GetLastActive Controller\n" + error);
    } else {
      res.status(500).json({ ok: false, msg: "Internal Server Error" });
    }
  }
};

