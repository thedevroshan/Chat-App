import React from "react";
import { useState } from "react";

import Input from "./Input";
import Button from "./Button";

const Login = ({onClick}) => {
  const [formData, setFormData] = useState({
    username_or_email: '',
    password: ''
  })
  
  const HandleChange = (e) => {
    const {name, value} = e.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }))
  }

  const HandleLogin = () => {

  }

  return (
    <div className='md:w-[40vw] w-[100vw] h-[100vh] flex flex-col gap-4 items-center justify-center'>
        <div className='w-full flex flex-col items-center justify-center gap-2'>
          <img src="/test3.png" alt="" className='w-14'/>
          <span className='text-3xl'>
            WELCOME BACK
          </span>
          <span className='text-[12px] text-secondary-text font-semibold'>
            NEED AN ACCOUNT??
            <button className='text-primary-text' onClick={onClick}>REGISTER</button>
          </span>
        </div>

        <div className='lg:w-[400px] sm:w-[70vw] md:w-full w-full flex flex-col px-6 gap-2 items-center'>
          <Input varient={'primary-full'} placeholder={'USERNAME OR EMAIL'} name={'username_or_email'} value={formData.username_or_email} onChange={HandleChange}/>
          <Input varient={'password-full'} placeholder={'PASSWORD'} name={'password'} value={formData.password} onChange={HandleChange}/>
        </div>

        <div className='lg:w-[400px] sm:w-[70vw] md:w-full w-full px-6'>
          <Button variant={'primary-full'} children={'LOGIN'} onClick={HandleLogin}></Button>
        </div>
    </div>
  );
};

export default Login;
