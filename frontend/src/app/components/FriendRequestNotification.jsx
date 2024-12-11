"use client";
import React from "react";
import { useState } from "react";

// Components
import Button from "./Button";

// API
import {
  DeclineFriendRequestAPI,
  AcceptFriendRequestAPI,
} from "../../../api/friendRequestAPI";

const FriendRequestNotification = ({ profilePic, username, requestId }) => {
  const [isHidden, setHidden] = useState(false);
  const [isRequestAccepted, setRequestAccepted] = useState(false);

  const DeclineFriendRequest = async () => {
    const res = await DeclineFriendRequestAPI(requestId);
    if (!res.ok) {
      console.log(res.msg);
      return;
    }
    setHidden(true);
  };

  const AcceptFriendRequest = async () => {
    const res = await AcceptFriendRequestAPI(requestId);
    if (!res.ok) {
      console.log(res.msg);
      return;
    }
    setRequestAccepted(true);
  };

  return (
    <div
      className={`bg-transparent hover:bg-light-secondary w-full h-fit gap-2 items-center py-2 px-2 justify-between ${
        isHidden ? "hidden" : "flex"
      }`}
    >
      <div className="flex w-full h-fit items-center gap-2">
        <img
          src={profilePic ? profilePic : "/user-icon.png"}
          alt="Profile Pic"
          className="w-16 rounded-full"
        />
        <span className="text-white text-lg select-none">
          {username}{" "}
          {isRequestAccepted
            ? "is now your friend"
            : "has sent you friend request"}
        </span>
      </div>

      <div className="w-full h-fit flex items-center gap-2">
        {!isRequestAccepted && (
          <>
            {" "}
            <Button
              variant="primary-full"
              btnText="ACCEPT"
              onClick={AcceptFriendRequest}
            />
            <Button
              variant="secondary-full"
              btnText="DECLINE"
              textColor="text-white"
              onClick={DeclineFriendRequest}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default FriendRequestNotification;
