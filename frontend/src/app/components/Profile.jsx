"use client";
import React from "react";
import { useState } from "react";

// Components
import Button from "./Button";
import ChangeProfilePic from "./ChangeProfilePic";

// Stores
import useUserStore from "../store/useUserStore";

// API
import { UpdateProfileAPI, RemoveProfilePicAPI } from "../../../api/userAPI";

const Profile = () => {
  const profile_pic = useUserStore((state) => state.profile_pic);
  const setProfilePic = useUserStore((state) => state.setProfilePic);
  const name = useUserStore((state) => state.name);
  const bio = useUserStore((state) => state.bio);
  const setName = useUserStore((state) => state.setName);
  const setBio = useUserStore((state) => state.setBio);

  // States
  const [isLoading, setIsLoading] = useState(false);
  const [isReadOnly, setReadOnly] = useState(true);
  const [changeProfilePic, setProfilePicture] = useState(false);
  const [errors, setErrors] = useState({ fetch_error: "" });

  const HandleOnChange = (e) => {
    e.target.name == "name" ? setName(e.target.value) : setBio(e.target.value);
  };

  const UpdateProfile = async (e) => {
    setReadOnly(false);
    if (name === "") {
      setErrors({ fetch_error: "Name is Required" });
      return;
    }

    if (e.target.innerHTML == "SAVE") {
      setIsLoading(true);
      const res = await UpdateProfileAPI({ name, bio });
      if (!res.ok) {
        setIsLoading(false);
        setErrors({ fetch_error: res.msg });
      }
      setIsLoading(false);
      setErrors({ fetch_error: "" });
      setReadOnly(true);
    }
  };

  const RemoveProfilePic = async () => {
    await RemoveProfilePicAPI();
    setProfilePic("");
  };


  return (
    <>
      <section className="bg-transparent w-full h-fit flex flex-col gap-3 px-4">
        <div className="w-full h-fit flex flex-col gap-3 lg:flex-row">
          {/* PROFILE PIC */}
          <div className="bg-background w-full h-fit rounded-2xl px-2 py-2 gap-24 flex items-center justify-between">
            <img
              src={profile_pic ? profile_pic : "/user-icon.png"}
              alt="Profile Pic"
              className="w-24 rounded-full"
            />

            <div className="flex w-full flex-col gap-2">
              <Button
                variant={"primary-full"}
                children={"CHANGE PROFILE PIC"}
                onClick={()=>{setProfilePicture(true)}}
                name={"profilepic-button"}
              />
              <Button
                variant={"secondary-full"}
                children={"REMOVE"}
                textColor={"text-white"}
                onClick={RemoveProfilePic}
              />
            </div>
          </div>
        </div>

        {/* PROFILE */}
        <div className="bg-background w-full h-fit flex flex-col px-3 py-2 rounded-3xl justify-center gap-5">
          {/* Basic Info */}
          <div className="w-full h-fit px-3 flex flex-col gap-2 justify-center">
            <span className="text-secondary-text font-semibold">
              BASIC INFO
            </span>

            <span className="text-red-800 text-center font-semibold">
              {errors.fetch_error}
            </span>

            <div className="w-full h-fit flex flex-col justify-center">
              <label
                htmlFor="name"
                className="text-secondary-text font-semibold"
              >
                NAME
              </label>
              <input
                type="text"
                id="name"
                className="bg-background border border-border rounded-xl text-lg py-1 px-2 outline-none text-white"
                readOnly={isReadOnly}
                value={name}
                onChange={HandleOnChange}
                name="name"
              />
            </div>

            <div className="w-full h-fit flex flex-col justify-center">
              <label
                htmlFor="bio"
                className="text-secondary-text font-semibold"
              >
                BIO
              </label>
              <textarea
                id="bio"
                className="bg-background border border-border rounded-xl resize-none outline-none text-white px-2 py-2"
                readOnly={isReadOnly}
                rows={10}
                value={bio}
                onChange={HandleOnChange}
                name="bio"
              ></textarea>
            </div>

            <Button
              variant={"primary-loader-full"}
              children={isReadOnly ? "EDIT" : "SAVE"}
              onClick={UpdateProfile}
              disableOn={isLoading}
              onDisableChildren={"Wait..."}
            />
          </div>
        </div>

        {changeProfilePic && <ChangeProfilePic setProfilePicture={setProfilePicture}/>}
      </section>
    </>
  );
};

export default Profile;
