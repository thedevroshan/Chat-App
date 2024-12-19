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
  const [isAcceptLoading, setAcceptLoading] = useState(false);
  const [isDeclineLoading, setDeclineLoading] = useState(false);
  const [isRequestAccepted, setRequestAccepted] = useState(false);

  const DeclineFriendRequest = async () => {
    setDeclineLoading(true)
    const res = await DeclineFriendRequestAPI(requestId);
    if (!res.ok) {
      console.log(res.msg);
      setDeclineLoading(false)
      return;
    }
    setHidden(true);
    setDeclineLoading(false)
  };

  const AcceptFriendRequest = async () => {
    setAcceptLoading(true)
    const res = await AcceptFriendRequestAPI(requestId);
    if (!res.ok) {
      console.log(res.msg);
      setAcceptLoading(false)
      return;
    }
    setRequestAccepted(true);
    setAcceptLoading(false)
  };
  

  return (
    <div
      className={`bg-transparent hover:bg-light-secondary w-full h-fit gap-2 items-center py-2 px-2 justify-between ${
        isHidden ? "hidden" : "flex"
      }`}
    >
      <div className="flex w-full h-fit items-center gap-2">
        <ProfilePic profile_pic={profilePic} defaultUserIcon={'/user-icon.png'} width={12} height={12}/>

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
              disableOn={isAcceptLoading}
              onDisableBtnText={'Wait...'}
            />
            <Button
              variant="secondary-loader-full"
              btnText="DECLINE"
              onClick={DeclineFriendRequest}
              disableOn={isDeclineLoading}
              onDisableBtnText={'Wait...'}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default FriendRequestNotification;
