'use client'
import React from "react";
import { useState } from "react";
import { redirect } from "next/navigation";

import Input from "./Input";
import Button from "./Button";
import Verify from "./Verify";

const Login = ({ onClick }) => {
  const [formData, setFormData] = useState({
    username_or_email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoggingIn, setIsLogging] = useState(false);
  const [isVerificationNeeded, setVerificationNeed] = useState(false);

  const HandleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const HandleLogin = async () => {
    try {
      setIsLogging(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND}/api/auth/login`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
          }),
        }
      );

      const res = await response.json();
      setIsLogging(false);

      if (response.status == 401) {
        setVerificationNeed(true);
      }

      if (!res.ok) {
        setErrors({
          fetch_error: res.msg,
        });
      }else {
        window.location.pathname = '/chat_home'
      }
    } catch (error) {
      setErrors({
        fetch_error: "Something went wrong. Please try again later.",
      });
      setIsLogging(false);
    }
  };

  return (
    <>
      {!isVerificationNeeded && (
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
          </div>

          <div className="lg:w-[400px] sm:w-[70vw] md:w-full w-full px-6">
            <Button
              variant={"primary-loader-full"}
              children={"LOGIN"}
              onClick={HandleLogin}
              disableOn={isLoggingIn}
              onDisableChildren={"Wait..."}
            ></Button>
          </div>
        </div>
      )}
      {isVerificationNeeded && <Verify errors={errors} setErrors={setErrors}/>}
    </>
  );
};

export default Login;
