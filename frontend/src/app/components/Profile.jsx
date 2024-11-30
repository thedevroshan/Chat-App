import React from "react";
import Button from "./Button";

// Stores
import useUserStore from "../store/useUserStore";

const Profile = () => {
  const profile_pic = useUserStore((state) => state.profile_pic);

  return (
    <></>
  );
};

export default Profile;
