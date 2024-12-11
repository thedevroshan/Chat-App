'use client'
import React from "react";
import { useState } from "react";

const Input = ({ varient, placeholder,onChange,name,value }) => {
    const [showPassword, setShowPassword] = useState('password')

  const ShowPassword = (e) => {
    if(e.target.innerHTML == 'Show'){
        setShowPassword('text')
        e.target.innerHTML = 'Hide'
    }
    else {
        setShowPassword('password')
        e.target.innerHTML = 'Show'
    }
  };

  return (
    <>
      {varient == "primary" ? (
        <input
          type="text"
          className="outline-none border border-border bg-background placeholder:text-secondary-text px-2 py-2 rounded-md font-semibold"
          placeholder={placeholder}
          onChange={onChange}
          name={name}
          value={value}
        />
      ) : (
        ""
      )}
      {varient == "primary-full" ? (
        <input
          type="text"
          className="w-full outline-none border border-border bg-background placeholder:text-secondary-text px-2 py-2 rounded-md font-semibold"
          placeholder={placeholder}
          onChange={onChange}
          name={name}
          value={value}
        />
      ) : (
        ""
      )}
      {varient == "password" ? (
        <div className="flex w-full">
          <input
            type={showPassword}
            className="outline-none border border-border bg-background placeholder:text-secondary-text px-2 py-2 rounded-tl-md rounded-bl-md font-semibold border-r-0"
            placeholder={placeholder}
            onChange={onChange}
            name={name}
            value={value}
          />
          <button onClick={ShowPassword} className="text-sm font-semibold bg-background px-1 border-t border-b border-r border-border rounded-tr-md rounded-br-md">
            Show
          </button>
        </div>
      ) : (
        ""
      )}
      {varient == "password-full" ? (
        <div className="flex w-full">
          <input
            type={showPassword}
            className="w-full outline-none border border-border bg-background placeholder:text-secondary-text px-2 py-2 rounded-tl-md rounded-bl-md font-semibold border-r-0"
            placeholder={placeholder}
            onChange={onChange}
            name={name}
            value={value}
          />
          <button onClick={ShowPassword} className="text-sm font-semibold bg-background px-1 border-t border-b border-r border-border rounded-tr-md rounded-br-md">
            Show
          </button>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Input;
