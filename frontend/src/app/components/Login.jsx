"use client";
import React from "react";
import { useState } from "react";

import Input from "./Input";
import Button from "./Button";
import Verify from "./Verify";

// API
import { LoginAPI } from "../../../api/authAPI";
import { ForgotPasswordAPI, ResetPasswordAPI } from "../../../api/userAPI";

// Utils
import { ValidatePassword } from "../utils/Validation";

const Login = ({ onClick }) => {
  const [formData, setFormData] = useState({
    username_or_email: "",
    password: "",
    otp: "",
    confirm_password: "",
  });
  const [errors, setErrors] = useState({
    fetch_error: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isVerificationNeeded, setVerificationNeed] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isResetPassword, setIsResetPassword] = useState(false);

  const HandleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const HandleLogin = async () => {
    if (formData.username_or_email == "" || formData.password == "") {
      setErrors({
        fetch_error: "Username or Email and Password are required.",
      });
      return;
    }

    // Loading True
    setIsLoading(true);

    // Login api call
    const res = await LoginAPI(formData);

    //  if User is unverified
    if (res.statusCode == 401) {
      setErrors({
        fetch_error: res.msg,
      });
      setVerificationNeed(true);
      return;
    } else if (!res.ok) {
      setErrors({ fetch_error: res.msg });
      setIsLoading(false);
      return;
    }

    // If ok is true
    window.location.pathname = "/chat_home";
    setIsLoading(false);
  };

  const HandleForgotPassword = async () => {
    if (formData.username_or_email == "") {
      setErrors({ fetch_error: "Username or Email Required" });
      return;
    }

    setIsLoading(true);
    const res = await ForgotPasswordAPI(formData.username_or_email);

    if (!res.ok) {
      setErrors({
        fetch_error: res.msg,
      });
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
    setIsResetPassword(true);
    setErrors({ fetch_error: "" });
  };

  const HandleResetPassword = async () => {
    if(formData.confirm_password !== formData.password){
      setErrors({fetch_error: 'New Password and Confirm Password Should be same.'})
      return
    }

    if (ValidatePassword(formData, setErrors)) {
      setIsLoading(true)
      const res = await ResetPasswordAPI(formData)

      if(!res.ok){
        setIsLoading(false)
        setErrors({
          fetch_error: res.msg
        })
        return
      }

      setIsLoading(false)
      setVerificationNeed(false)
      setIsForgotPassword(false)
      setIsResetPassword(false)
    }
  };

  return (
    <>
      {!isVerificationNeeded && !isForgotPassword && (
        <div className="md:w-[40vw] w-[100vw] h-[100vh] flex flex-col gap-4 items-center justify-center">
          <div className="w-full flex flex-col items-center justify-center gap-2">
            <img src="/test3.png" alt="" className="w-14" />
            <span className="text-3xl">WELCOME BACK</span>
            <span className="text-[12px] text-secondary-text font-semibold">
              NEED AN ACCOUNT??
              <button className="text-primary-text" onClick={onClick}>
                REGISTER
              </button>
            </span>
          </div>

          {errors.fetch_error && (
            <div className="w-full flex items-center justify-center px-2 text-red-800 -mt-2 font-semibold">
              <span className="text-md text-center">{errors.fetch_error}</span>
            </div>
          )}

          <div className="lg:w-[400px] sm:w-[70vw] md:w-full w-full flex flex-col px-6 gap-2 items-center">
            <Input
              varient={"primary-full"}
              placeholder={"USERNAME OR EMAIL"}
              name={"username_or_email"}
              value={formData.username_or_email}
              onChange={HandleChange}
            />
            <Input
              varient={"password-full"}
              placeholder={"PASSWORD"}
              name={"password"}
              value={formData.password}
              onChange={HandleChange}
            />
            <div className="w-full h-fit flex justify-end">
              <button
                className="hover:text-secondary-text transition-all"
                onClick={() => {
                  setIsForgotPassword(true);
                }}
              >
                Forgot Password
              </button>
            </div>
          </div>

          <div className="lg:w-[400px] sm:w-[70vw] md:w-full w-full px-6">
            <Button
              variant={"primary-loader-full"}
              children={"LOGIN"}
              onClick={HandleLogin}
              disableOn={isLoading}
              onDisableChildren={"Wait..."}
            ></Button>
          </div>
        </div>
      )}

      {isVerificationNeeded && <Verify />}

      {isForgotPassword && !isResetPassword && (
        <div className="md:w-[40vw] w-[100vw] h-[100vh] flex flex-col gap-4 items-center justify-center">
          <div className="w-full flex flex-col items-center justify-center gap-2">
            <img src="/test3.png" alt="" className="w-14" />
            <span className="text-3xl">Forgot Password</span>
            <span className="text-md text-center text-secondary-text font-semibold px-2">
              Fill your username or email which you have used in your account.
            </span>
          </div>

          {errors.fetch_error && (
            <div className="w-full flex items-center justify-center px-2 text-red-800 -mt-2 font-semibold">
              <span className="text-md text-center">{errors.fetch_error}</span>
            </div>
          )}

          <div className="lg:w-[400px] sm:w-[70vw] md:w-full w-full flex flex-col px-6 gap-2 items-center">
            <Input
              varient={"primary-full"}
              placeholder={"USERNAME OR EMAIL"}
              name={"username_or_email"}
              value={formData.username_or_email}
              onChange={HandleChange}
            />
          </div>

          <div className="lg:w-[400px] sm:w-[70vw] md:w-full w-full px-6">
            <Button
              variant={"primary-loader-full"}
              children={"SEND OTP"}
              onClick={HandleForgotPassword}
              disableOn={isLoading}
              onDisableChildren={"Wait..."}
            ></Button>
          </div>
        </div>
      )}

      {isForgotPassword && isResetPassword && (
      <div className="md:w-[40vw] w-[100vw] h-[100vh] flex flex-col gap-4 items-center justify-center">
        <div className="w-full flex flex-col items-center justify-center gap-2">
          <img src="/test3.png" alt="" className="w-14" />
          <span className="text-3xl">Reset Password</span>
          <span className="text-md text-center text-secondary-text font-semibold px-2">
            Now You Can Reset Password
          </span>
        </div>

        {errors.password && (
            <div className="w-full flex items-center justify-center px-2 text-red-800 font-semibold">
              <span className="text-md text-center">{errors.password}</span>
            </div>
          )}

        {errors.fetch_error && (
            <div className="w-full flex items-center justify-center px-2 text-red-800 -mt-2 font-semibold">
              <span className="text-md text-center">{errors.fetch_error}</span>
            </div>
          )}

        <div className="lg:w-[400px] sm:w-[70vw] md:w-full w-full flex flex-col px-6 gap-2 items-center">
          <Input
            varient={"primary-full"}
            placeholder={"OTP"}
            name={"otp"}
            value={formData.otp}
            onChange={HandleChange}
          />

          <Input
            varient={"password-full"}
            placeholder={"NEW PASSWORD"}
            name={"password"}
            value={formData.password}
            onChange={HandleChange}
          />

          <Input
            varient={"password-full"}
            placeholder={"CONFIRM PASSWORD"}
            name={"confirm_password"}
            value={formData.confirm_password}
            onChange={HandleChange}
          />
        </div>

        <div className="lg:w-[400px] sm:w-[70vw] md:w-full w-full px-6">
          <Button
            variant={"primary-loader-full"}
            children={"RESET PASSWORD"}
            onClick={HandleResetPassword}
            disableOn={isLoading}
            onDisableChildren={"Wait..."}
          ></Button>
        </div>
      </div>
    )}
    </>
  );
};

export default Login;
