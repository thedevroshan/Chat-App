import React from "react";

// Components
import Button from "./Button";

const FriendRequestNotification = ({username}) => {
  return (
    <div className="bg-transparent hover:bg-light-secondary w-full h-fit flex gap-2 items-center py-2 px-2 justify-between">
      <div className="flex w-full h-fit items-center gap-2">
        <img src="/user-icon.png" alt="Profile Pic" className="w-16" />
        <span className="text-white text-lg select-none">
          Username has sent you friend request
        </span>
      </div>

      <div className="w-full h-fit flex items-center gap-2">
        <Button variant={"primary-full"} children={"ACCEPT"} />
        <Button variant={"secondary-full"} children={"DECLINE"} textColor={'text-white'} />
      </div>
    </div>
  );
};

export default FriendRequestNotification;
