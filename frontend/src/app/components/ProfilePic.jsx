'use client'
import React from "react";
import Image from "next/image";

const ProfilePic = ({
  profile_pic,
  defaultUserIcon,
  height,
  width,
  customStyle,
}) => {

  return (
    <div
      className={`rounded-full w-${width} h-${height} aspect-square flex items-center justify-center overflow-clip ${
        customStyle ? customStyle : ""
      }`}
    >
      <Image
        width={1000}
        height={1000}
        src={profile_pic ? profile_pic : defaultUserIcon}
        alt="Profile Pic"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default ProfilePic;
