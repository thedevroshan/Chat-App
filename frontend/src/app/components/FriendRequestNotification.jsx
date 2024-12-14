"use client";
import React from "react";
import { useState } from "react";

// Components
import Button from "./Button";
import ProfilePic from "./ProfilePic";

// API
import {
  DeclineFriendRequestAPI,
  AcceptFriendRequestAPI,
} from "../../../api/friendRequestAPI";

const FriendRequestNotification = ({ profilePic, username, requestId }) => {
  const [isHidden, setHidden] = useState(false);
  const [isLoading, setLoading] = useState(false);
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
    setLoading(true)
    const res = await AcceptFriendRequestAPI(requestId);
    if (!res.ok) {
      console.log(res.msg);
      setLoading(false)
      return;
    }
    setRequestAccepted(true);
    setLoading(false)
  };

  return (
    <div
      className={`bg-transparent hover:bg-light-secondary w-full h-fit gap-2 items-center py-2 px-2 justify-between ${
        isHidden ? "hidden" : "flex"
      }`}
    >
      <div className="flex w-full h-fit items-center gap-2">
        <ProfilePic profile_pic={profilePic} defaultUserIcon={'/user-icon.png'} width={16} height={16}/>

        <span className="text-white text-lg select-none">
          <span className="font-semibold">{username}</span>{" "}
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
              variant="primary-loader-full"
              btnText="ACCEPT"
              onClick={AcceptFriendRequest}
              disableOn={isLoading}
              onDisableBtnText={'Wait...'}
            />
            <Button
              variant="secondary-loader-full"
              btnText="DECLINE"
              textColor="text-white"
              onClick={DeclineFriendRequest}
              disableOn={isLoading}
              onDisableBtnText={'Wait...'}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default FriendRequestNotification;
