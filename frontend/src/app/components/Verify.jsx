"use client";
import React from "react";
import { useState } from "react";

import Input from "./Input";
import Button from "./Button";

// API
import { VerfiyEmailAPI, ResendOTPAPI } from "../../../api/authAPI";

const Verify = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    fetch_error: ''
  });
  const [otpForm, setOTPForm] = useState({
    otp: "",
  });

  const HandleChange = (e) => {
    const { name, value } = e.target;

    setOTPForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    return;
  };

  const HandleVerification = async () => {
    if(otpForm.otp == ''){
      setErrors({fetch_error: 'OTP is required.'})
      return
    }

    setIsLoading(true)
    const res = await VerfiyEmailAPI(otpForm)

    if(!res.ok){
      setErrors({fetch_error: res.msg})
      setIsLoading(false)
      return
    }

    // if verification successfull
    localStorage.removeItem('email')
    setIsLoading(false)
    window.location.pathname = '/chat_home'
  };

  // Resend OTP
  const ResendOTP = async () => {
    const res = ResendOTPAPI(localStorage.getItem('email'));
    if(!res.ok){
      setErrors({fetch_error: res.msg})
      return
    }
    setErrors({fetch_error:''})
  };

  return (
    <div className="md:w-[40vw] w-[100vw] h-[100vh] flex flex-col gap-4 items-center justify-center">
      <div className="w-full flex flex-col items-center justify-center gap-2">
        <img src="/test3.png" alt="" className="w-14" />
        <span className="text-2xl">EMAIL VERIFICATION</span>
        <span className="text-[12px] text-center text-secondary-text font-semibold">
          WE HAVE SENT YOU THE OTP. PLEASE CHECK YOUR INBOX OR SPAM FOLDER
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
          placeholder={"OTP"}
          name={"otp"}
          value={otpForm.otp}
          onChange={HandleChange}
        />
        <div className="flex w-full justify-end">
          <button
            className="hover:text-secondary-text transition-all"
            onClick={ResendOTP}
          >
            Resend
          </button>
        </div>
      </div>

      <div className="lg:w-[400px] sm:w-[70vw] md:w-full w-full px-6">
        <Button
          variant={"primary-loader-full"}
          children={"VERIFY"}
          onClick={HandleVerification}
          disableOn={isLoading}
          onDisableChildren={"Wait..."}
        ></Button>
      </div>
    </div>
  );
};

export default Verify;
