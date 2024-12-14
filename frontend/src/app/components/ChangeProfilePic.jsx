"use client";
import React, { useState } from "react";
import Button from "./Button";

// API
import { UploadProfilePicAPI } from "../../../api/userAPI";

const ChangeProfilePic = ({ setProfilePicture }) => {
  // States
  const [isImageSelected, setIsImageSelected] = useState();
  const [imageBinary, setImageBinary] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    msg: "",
    isError: false,
  });

  const ChangeImage = (e) => {
    if (e.target.files[0]) {
      setIsImageSelected(URL.createObjectURL(e.target.files[0]));
      const reader = new FileReader();
      reader.readAsArrayBuffer(e.target.files[0]);
      reader.onload = function () {
        const binaryData = new Uint8Array(reader.result);
        setImageBinary(binaryData);
      };
    }
  };

  const UploadProfilePic = async () => {
    setIsLoading(true);
    const res = await UploadProfilePicAPI(imageBinary);
    if (!res.ok) {
      setErrors({ msg: res.msg, isError: true });
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
    setErrors({ msg: "Profile Pic Changed Successfully" });
  };


  return (
    <div className="absolute bg-background flex flex-col items-center py-2 px-3 border-border border w-[60vw] h-[80vh] xl:w-[54vw] rounded-xl gap-2">
      <span
        className={`text-2xl font-semibold select-none ${
          errors.isError ? "text-red-800" : "text-white"
        }`}
      >
        {errors.msg ? errors.msg : "Change Profile Pic"}
      </span>

      <div className="h-full w-full rounded-xl flex items-center justify-center overflow-auto">
            {!isImageSelected && (
              <>
                <label
                  htmlFor="profilepic"
                  className={`bg-white px-4 py-2 font-semibold rounded-xl cursor-pointer hover:bg-primary-btn-hover transition-all`}
                >
                  SELECT IMAGE
                </label>
                <input
                  type="file"
                  id="profilepic"
                  className="text-white hidden"
                  accept="image/*"
                  onChange={ChangeImage}
                />
              </>
            )}

            {isImageSelected && (
              <div className="rounded-full w-[250px] h-[250px] aspect-square border border-border mx-auto overflow-clip">
                <img
                  src={isImageSelected}
                  alt=""
                  className="w-[250px] h-[250px] aspect-square object-cover"
                />
              </div>
            )}
          </div>
          <div className="w-full h-fit flex gap-4">
            {isImageSelected && (
              <Button
                variant="primary-loader-full"
                btnText="Upload"
                disableOn={isLoading}
                onDisableBtnText={isLoading ? "Wait..." : "Upload"}
                onClick={UploadProfilePic}
              />
            )}
            {!isImageSelected && (
              <Button
                variant="primary-loader-full"
                btnText="Upload"
                disableOn={true}
                onDisableBtnText="Upload"
              />
            )}
            <Button
              variant="secondary-full"
              btnText="Cancel"
              textColor="text-white"
              onClick={() => {
                setProfilePicture(false);
              }}
            />
          </div>
    </div>
  );
};

export default ChangeProfilePic;
