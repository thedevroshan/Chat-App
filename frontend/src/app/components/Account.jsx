"use client";
import React from "react";

// React Hooks
import { useState } from "react";

// Stores
import useUserStore from "../store/useUserStore";

// Components
import Button from "./Button";
import ProfilePic from "./ProfilePic";

const Account = () => {
  const setUsername = useUserStore((state) => state.setUsername);
  const username = useUserStore((state) => state.username);
  const name = useUserStore((state) => state.name);
  const email = useUserStore((state) => state.email);
  const profile_pic = useUserStore((state) => state.profile_pic);

  // State
  const [msg, setMsg] = useState({
    username: "",
    email: "",
    other: "",
    ok: true,
  });
  const [currentUsername, setCurrentUsername] = useState("");
  const [isReadOnly, setReadOnly] = useState(true);
  const [sendChangeEmailRequest, setSendChangeEmailRequest] = useState(false);
  const [isBtnDisable, setBtnDisable] = useState(false);
  const [otpSent, setOTPSent] = useState(false);
  const [isEmailChanged, setEmailChanged] = useState(false);
  const [changePassword, setChangePassword] = useState(false);

  const HandleChange = (e) => {
    setUsername(e.target.value);
  };

  const ChangeUsername = async (e) => {
    // Storing the current username of user so that if user enter the same username then don't make request
    if (currentUsername == "") {
      setCurrentUsername(username);
    }

    try {
      setReadOnly(false);
      if (e.target.innerHTML == "Edit") {
        e.target.innerHTML = "Change";
        return;
      } else if (e.target.innerHTML == "Change") {
        if (username == currentUsername) {
          e.target.innerHTML = "Edit";
          setReadOnly(true);
        }

        // Calling the API if username and currentusername is not equal
        else if (username != currentUsername) {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND}/api/user/change/username`,
            {
              method: "PUT",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                username,
              }),
            }
          );

          const res = await response.json();
          if (!res.ok) {
            setMsg({
              username: res.msg,
              ok: false,
            });
          } else {
            e.target.innerHTML = "Edit";
            setReadOnly(true);
            setMsg({
              username: res.msg,
              ok: true,
            });
            // Storing the changed username
            setCurrentUsername(username);
          }
        }
      }
    } catch (error) {
      console.warn(error);
    }
  };

  // Change Email Request
  const ChangeEmailRequest = async () => {
    try {
      setSendChangeEmailRequest(true);
      setBtnDisable(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND}/api/user/changeemailrequest`,
        {
          method: "PUT",
          credentials: "include",
        }
      );

      const res = await response.json();
      if (!res.ok) {
        setMsg({ email: res.msg, ok: false });
        setBtnDisable(false);
      } else {
        setMsg({
          email: "OTP Sent, Check your inbox or spam folder",
          ok: true,
        });
        setBtnDisable(false);
        setOTPSent(true);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  // Change Email
  const ChangeEmail = async (e) => {
    try {
      const parent = e.target.parentElement;
      setBtnDisable(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND}/api/user/change/email`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            otp: parent.children[1].value,
            email: parent.children[2].value,
          }),
        }
      );

      const res = await response.json();
      if (!res.ok) {
        setMsg({ other: res.msg, ok: false });
        setBtnDisable(false);
      } else {
        setMsg({ other: res.msg, ok: true });
        setBtnDisable(false);
        setEmailChanged(true);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  // Verify Email
  const VerifyEmail = async (e) => {
    try {
      const parent = e.target.parentElement;
      setBtnDisable(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND}/api/auth/verifyemail`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            otp: parent.children[1].value,
          }),
        }
      );

      const res = await response.json();
      if (!res.ok) {
        setMsg({ other: res.msg, ok: false });
        setBtnDisable(false);
      } else {
        setMsg({ other: res.msg, ok: true });
        setBtnDisable(false);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  // Change Password
  const ChangePassword = async (e) => {
    setChangePassword(true);
    const parent = e.target.parentElement;

    if (parent.children[0].value != "" && parent.children[1].value != "") {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND}/api/user/change/password`,
          {
            method: "PUT",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              current_password: parent.children[0].value,
              password: parent.children[1].value,
            }),
          }
        );

        const res = await response.json();
        if (!res.ok) {
          setMsg({ other: res.msg, ok: false });
        } else {
          setMsg({ other: res.msg, ok: true });
          setTimeout(() => {
            setChangePassword(false);
          }, 3000);
        }
      } catch (error) {
        console.warn(error);
      }
    } else if (
      parent.children[0].value === "" &&
      parent.children[1].value === ""
    ) {
      setChangePassword(false);
    }
  };

  return (
    <>
      <div className="w-[50vw] h-fit bg-background flex flex-col rounded-xl gap-2 py-3">
        {/* User Basic Info Div */}
        <div className="w-full h-fit flex select-none py-1 px-2 items-center justify-center gap-3">
          <div
            className={`rounded-full w-32 h-32 aspect-square flex items-center justify-center overflow-clip`}
          >
            <img
              src={profile_pic ? profile_pic : "/user-icon.png"}
              alt="Profile Pic"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col w-full h-fit">
            <span className="text-white text-xl">{name}</span>
            <span className="text-secondary-text text-md">{username}</span>
          </div>
        </div>

        {/* Details */}
        <div className="w-full h-fit flex px-5 flex-col gap-3 py-4">
          {/* USERNAME */}
          <div className="flex flex-col w-full">
            <label htmlFor="username" className="text-secondary-text">
              USERNAME{" "}
              <span className={`${msg.ok ? "text-white" : "text-red-800"}`}>
                {msg.username ? msg.username : ""}
              </span>
            </label>
            <div className="w-full flex items-center">
              <input
                type="text"
                id="username"
                className="rounded-tl-lg rounded-bl-lg py-1 px-1 text-lg outline-none border-t border-b border-l bg-background border-border w-full text-white"
                readOnly={isReadOnly}
                value={username}
                onChange={HandleChange}
              />
              <button
                className="text-secondary-text text-lg bg-background border-border border px-4 py-1 rounded-tr-lg rounded-br-lg"
                onClick={ChangeUsername}
              >
                Edit
              </button>
            </div>
          </div>

          {/* EMAIL */}
          <div className="flex flex-col w-full">
            <label htmlFor="email" className="text-secondary-text">
              EMAIL
            </label>
            <div className="w-full flex items-center">
              <input
                type="text"
                id="email"
                className="rounded-tl-lg rounded-bl-lg py-1 px-1 text-lg outline-none border-t border-b border-l bg-background border-border w-full text-white"
                readOnly
                value={email}
              />
              <button
                className="text-secondary-text text-lg bg-background border-border border px-4 py-1 rounded-tr-lg rounded-br-lg"
                onClick={() => {
                  setSendChangeEmailRequest(true);
                }}
              >
                Edit
              </button>
            </div>
          </div>

          {/* PASSWORD */}
          <div className="flex flex-col w-full">
            <div className="w-full flex flex-col items-start justify-center gap-2">
              {changePassword && (
                <>
                  <input
                    type="text"
                    className="bg-background border-border border placeholder:text-secondary-text px-2 py-1 text-lg text-white outline-none rounded-lg"
                    placeholder="Current Password"
                  />
                  <input
                    type="text"
                    className="bg-background border-border border placeholder:text-secondary-text px-2 py-1 text-lg text-white outline-none rounded-lg"
                    placeholder="New Password"
                  />
                </>
              )}
              <div>
                {changePassword && (
                  <span
                    className={`${
                      msg.ok ? "text-white" : "text-red-800"
                    } text-center`}
                  >
                    {msg.other}
                  </span>
                )}
              </div>
              <button
                className="text-secondary-text text-lg bg-background border-border border px-4 py-1 rounded-lg hover:text-white transition-all"
                onClick={ChangePassword}
              >
                Change Password
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* DELETE BUTTON */}
      <div className="w-[50vw] flex items-start mt-6">
        <button className="bg-red-800 px-4 py-2 font-semibold rounded-lg text-white">
          DELETE ACCOUNT
        </button>
      </div>

      {/* Change Email Code */}
      {sendChangeEmailRequest && (
        <div className="absolute w-[30vw] h-[40vh] bg-background border border-border translate-y-24 rounded-xl px-2 py-2 flex flex-col items-center">
          <div className="w-full h-fit flex items-center justify-end">
            <div className="w-full h-fit flex items-center justify-center">
              <span className="text-white font-semibold select-none text-xl">
                {!otpSent
                  ? "Send Change Email Request"
                  : otpSent
                  ? "Change Email"
                  : isEmailChanged
                  ? "Verify Email"
                  : ""}
              </span>
            </div>
            <img
              src="/cross-icon.png"
              alt="Close"
              className="w-8 cursor-pointer"
              onClick={() => {
                setSendChangeEmailRequest(false);
              }}
            />
          </div>

          <div className="w-full h-full flex flex-col justify-center items-center gap-2">
            {!otpSent && (
              <>
                <span
                  className={`text-2xl select-none text-center ${
                    msg.ok ? "text-white" : "text-red-800"
                  }`}
                >
                  {msg.email
                    ? msg.email
                    : "We will send you a OTP to change your email."}
                </span>
                <Button
                  variant="primary-loader-full"
                  btnText="Send OTP Request"
                  disableOn={isBtnDisable}
                  onDisableChildren="Wait...."
                  onClick={() => {
                    ChangeEmailRequest();
                  }}
                />
              </>
            )}

            {otpSent && !isEmailChanged && (
              <>
                <div className="flex flex-col w-full h-fit items-center gap-4">
                  <div className="w-full h-[2vh] flex justify-center items-center">
                    <span className="text-red-800">
                      {msg.other ? msg.other : ""}
                    </span>
                  </div>
                  <input
                    type="number"
                    className="font-semibold bg-background border-border px-2 py-1 w-full outline-none border rounded-lg text-white placeholder:text-secondary-text"
                    placeholder="OTP"
                  />
                  <input
                    type="text"
                    className="font-semibold bg-background border-border px-2 py-1 w-full outline-none border rounded-lg text-white placeholder:text-secondary-text"
                    placeholder="New Email"
                  />

                  <Button
                    variant="primary-loader-full"
                    btnText="Change Email"
                    disableOn={isBtnDisable}
                    onDisableChildren="Wait...."
                    onClick={ChangeEmail}
                  />
                </div>
              </>
            )}

            {isEmailChanged && otpSent && (
              <div className="w-full h-full flex flex-col items-center justify-center gap-4">
                <div className="w-full flex items-center justify-center h-fit">
                  <span className="text-white">
                    {msg.other ? msg.other : ""}
                  </span>
                </div>
                <input
                  type="number"
                  className="font-semibold bg-background border-border px-2 py-1 w-full outline-none border rounded-lg text-white placeholder:text-secondary-text"
                  placeholder="OTP"
                />

                <Button
                  variant="primary-loader-full"
                  btnText="Verify Email"
                  disableOn={isBtnDisable}
                  onDisableChildren="Wait...."
                  onClick={VerifyEmail}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Account;
