import React from "react";
import { useState } from "react";

// Components
import Button from "./Button";
import ProfilePic from "./ProfilePic";

// Stores
import useUserStore from "../store/useUserStore";

// API
import {
  AddFriendRequestAPI,
  DeclineFriendRequestAPI,
  AcceptFriendRequestAPI,
} from "../../../api/friendRequestAPI";

const SearchedUser = ({ username, name, profilePic, userId, isRequested,isAcceptable, isFriend }) => {
  const [hasRequested, setRequested] = useState(isRequested);
  const [isAccepted, setAccepted] = useState(false);
  const [isLoading, setLoading] = useState(false);

  // User Store
  const myId = useUserStore((state) => state._id);


  // Add Friend
  const AddFriend = async () => {
    setLoading(true);
    const res = await AddFriendRequestAPI(userId);
    if (!res.ok) {
      console.log(res.msg);
      setLoading(false);
      return;
    }
    setRequested(true);
    setLoading(false);
  };

  // Remove Friend Request
  const RemoveFriendRequest = async () => {
    setLoading(true);
    const res = await DeclineFriendRequestAPI(userId);
    if (!res.ok) {
      console.log(res.msg);
      setLoading(false);
      return;
    }
    setLoading(false);
    setRequested(false);
  };

    // Accept Friend Request
    const AcceptFriendRequest = async () => {
      setLoading(true);
      const res = await AcceptFriendRequestAPI(userId);
      if (!res.ok) {
        console.log(res.msg);
        setLoading(false);
        return;
      }
      setLoading(false);
      setAccepted(true)
    };

  return (
    <div className="w-full h-fit bg-transparent hover:bg-primary-nav-hover flex items-center justify-between py-2 px-2 select-none gap-2">
      <ProfilePic profile_pic={profilePic} defaultUserIcon={'/user-icon.png'} width={12} height={12}/>

      <div className="w-full h-full flex flex-col items-start justify-start">
        <span className="text-white font-semibold text-lg">{name}</span>
        <span className="text-secondary-text font-semibold text-sm">
          {username}
        </span>
      </div>

      {!isFriend && userId != myId && !hasRequested && !isAcceptable && (
        <Button
          variant="primary-loader-full"
          btnText="Add Friend"
          customSytle="w-[35vh]"
          onClick={AddFriend}
          onDisableBtnText={"Wait..."}
          disableOn={isLoading}
        />
      )}

      {hasRequested && (
        <Button
          variant="primary-loader-full"
          btnText="Requested"
          customSytle="w-[35vh]"
          onClick={RemoveFriendRequest}
          onDisableBtnText={"Wait..."}
          disableOn={isLoading}
        />
      )}

      {!hasRequested && !isFriend && isAcceptable && !isAccepted && (
        <Button
          variant="primary-loader-full"
          btnText="Accept"
          customSytle="w-[35vh]"
          onClick={AcceptFriendRequest}
          onDisableBtnText={"Wait..."}
          disableOn={isLoading}
        />
      )}
    </div>
  );
};

export default SearchedUser;
