"use client";
import React from "react";
import Button from "./Button";
import Input from "./Input";

import { useState } from "react";

// Utils
import { Validate } from "../utils/Validation";

const Register = ({ onClick }) => {
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({})

  const HandleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const HandleSubmit = async () => {
    if(Validate(formData, setErrors)){
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/auth/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            ...formData
          })
        })
        const res = await response.json()
        console.log(res)
      } catch (error) {
        setErrors({
          fetch_error: 'Something went wrong. Please try again later'
        })
      }
    }
  }

  return (
    <div className="md:w-[40vw] w-[100vw] h-[100vh] flex flex-col gap-4 items-center justify-center">
      <div className="w-full flex flex-col items-center justify-center gap-2">
        <img src="/test3.png" alt="" className="w-14" />
        <span className="text-3xl">BAATCHIT</span>
        <span className="text-[12px] text-secondary-text font-semibold">
          ALREADY HAVE AN ACCOUNT??
          <button className="text-primary-text" onClick={onClick}>
            LOGIN
          </button>
        </span>
      </div>

      {errors.fetch_error && <div className="w-full flex items-center justify-center px-2 text-red-800 -mt-2 font-semibold"><span className="text-md">{errors.fetch_error}</span></div>}

      <div className="lg:w-[400px] sm:w-[70vw] md:w-full w-full flex flex-col px-6 gap-2 items-center">
        <Input
          varient={"primary-full"}
          placeholder={"USERNAME"}
          name={"username"}
          onChange={HandleChange}
          value={formData.username}
        />
        {errors.username && <div className="w-full flex items-start h-2 text-red-800 -mt-2 font-semibold"><span className="text-[11px]">{errors.username}</span></div>}
        <Input
          varient={"primary-full"}
          placeholder={"NAME"}
          name={"name"}
          onChange={HandleChange}
          value={formData.name}
        />
        {errors.name && <div className="w-full flex items-start h-2 text-red-800 -mt-2 font-semibold"><span className="text-[11px]">{errors.name}</span></div>}
        <Input
          varient={"primary-full"}
          placeholder={"EMAIL"}
          name={"email"}
          onChange={HandleChange}
          value={formData.email}
        />
        {errors.email && <div className="w-full flex items-start h-2 text-red-800 -mt-2 font-semibold"><span className="text-[11px]">{errors.email}</span></div>}
        <Input
          varient={"password-full"}
          placeholder={"PASSWORD"}
          name={"password"}
          onChange={HandleChange}
          value={formData.password}
        />
        {errors.password && <div className="w-full flex items-start h-2 text-red-800 -mt-2 font-semibold"><span className="text-[11px]">{errors.password}</span></div>}
      </div>

      <div className="lg:w-[400px] sm:w-[70vw] md:w-full w-full px-6">
        <Button variant={"primary-full"} children={"REGISTER"} onClick={HandleSubmit}></Button>
      </div>
    </div>
  );
};

export default Register;
