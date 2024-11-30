"use client";
import React from "react";

// React Hooks
import { useState } from "react";

// Stores
import useUserStore from "../store/useUserStore";

const Account = () => {
  const setUsername = useUserStore((state) => state.setUsername);
  const username = useUserStore((state) => state.username);
  const name = useUserStore((state) => state.name);
  const email = useUserStore((state) => state.email);
  const profile_pic = useUserStore((state) => state.profile_pic);

  // State
  const [msg, setMsg] = useState({
    username: "",
    email: '',
    ok: false,
  });
  const [currentUsername, setCurrentUsername] = useState("");
  const [isReadOnly, setReadOnly] = useState(true);

  const HandleChange = (e) => {
    setUsername(e.target.value);
  };

  const ChangeUsername = async (e) => {
    // Storing the current username of user so that if user enter the same username then don't make request
    if (currentUsername == "") {
      setCurrentUsername(username);
    }

    try {
      setReadOnly(false)
      if (e.target.innerHTML == "Edit") {
        e.target.innerHTML = "Change";
        return;
      } 
      
      
      else if (e.target.innerHTML == "Change") {
        if(username == currentUsername){
          e.target.innerHTML = "Edit";
          setReadOnly(true)
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
            setReadOnly(true)
            setMsg({
              username: res.msg,
              ok: true,
            });
            // Storing the changed username
            setCurrentUsername(username)
          }
        }
      }
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <>
      <div className="w-[50vw] h-fit bg-background flex flex-col rounded-xl gap-2">
        {/* Banner Div */}
        <div className="w-full h-[20vh] bg-white rounded-tl-xl rounded-tr-xl">
          <img
            src="/test4.png"
            alt=""
            className="object-cover aspect-video w-full h-full rounded-tr-xl rounded-tl-xl"
          />
        </div>

        {/* User Basic Info Div */}
        <div className="w-full h-fit flex select-none py-1 px-2 items-center justify-center gap-3">
          <img
            src={profile_pic ? profile_pic : "/user-icon.png"}
            alt=""
            className="rounded-full w-24"
          />

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
              EMAIL{" "}
              <span className={`${msg.ok ? "text-white" : "text-red-800"}`}>
                {msg.email ? msg.email : ""}
              </span>
            </label>
            <div className="w-full flex items-center">
              <input
                type="text"
                id="email"
                className="rounded-tl-lg rounded-bl-lg py-1 px-1 text-lg outline-none border-t border-b border-l bg-background border-border w-full text-white"
                readOnly
                value={email}
              />
              <button className="text-secondary-text text-lg bg-background border-border border px-4 py-1 rounded-tr-lg rounded-br-lg">
                Edit
              </button>
            </div>
          </div>

          {/* PASSWORD */}
          <div className="flex flex-col w-full">
            <div className="w-full flex items-center">
              <button className="text-secondary-text text-lg bg-background border-border border px-4 py-1 rounded-lg hover:text-white transition-all">
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
    </>
  );
};

export default Account;
