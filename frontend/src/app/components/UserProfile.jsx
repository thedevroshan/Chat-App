import React from "react";

const UserProfile = ({ username, profile_pic }) => {
  return (
    <div className="sm:hidden bg-background border-b py-1 border-border w-full h-fit flex gap-2 text-white font-semibold items-center justify-between px-2">
      <div className="flex items-center gap-1">
        <img src={profile_pic} alt="" className="w-10" />
        <span>{username}</span>
      </div>

    </div>
  );
};

export default UserProfile;
