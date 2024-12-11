import React from "react";
import { useState } from "react";

// Components
import Button from "./Button";

// Stores
import useUserStore from "../store/useUserStore";

// API
import { AddFriendRequestAPI } from "../../../api/friendRequestAPI";

const SearchedUser = ({ username, name, profilePic, userId, isRequested }) => {
  const [isFriend, setFriend] = useState(false);
  const [hasRequested, setRequested] = useState(isRequested);

  // User Store
  const friends = useUserStore((state) => state.friends);
  const myId = useUserStore((state) => state._id)



  // Checking that is friend or not, if user friend then set friend to true else false
  if (userId && !isFriend) {
    friends.forEach((user) => {
      if (user._id == userId) {
        setFriend(true);
      }
    });
  }

  // Add Friend
  const AddFriend = async () => {
    const res = await AddFriendRequestAPI(userId)
    if(!res.ok){
      console.log(res.msg)
      return
    }
    setRequested(true)
  }

  return (
    <div className="w-full h-fit bg-transparent hover:bg-primary-nav-hover flex items-center justify-between py-2 px-2 select-none gap-2">
      <img
        src={profilePic ? profilePic : "/user-icon.png"}
        alt="Profile Pic"
        className="border border-border w-12 rounded-full"
      />

      <div className="w-full h-full flex flex-col items-start justify-start">
        <span className="text-white font-semibold text-lg">{name}</span>
        <span className="text-secondary-text font-semibold text-sm">
          {username}
        </span>
      </div>

      {!isFriend && userId != myId && !hasRequested && (
        <Button
          variant="primary"
          btnText="Add Friend"
          customSytle="w-[35vh]"
          onClick={AddFriend}
        />
      )}

      {hasRequested && (
        <Button
          variant="secondary"
          btnText="Requested"
          customSytle="w-[35vh]"
        />
      )}
    </div>
  );
};

export default SearchedUser;
