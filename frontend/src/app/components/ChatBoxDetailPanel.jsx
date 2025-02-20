"use client";
import React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";

// API
import { GetOtherUserInfoAPI } from "../../../api/userAPI";

// Context
import { useSocket } from "../contexts/useSocketContext";

// Components
import ProfilePic from "./ProfilePic";

const ChatBoxDetailPanel = ({ currentChatUser }) => {
  const { onlineUser } = useSocket();
  // States
  const [users, setUsers] = useState([]);

  const GetOnlineUsers = async () => {
    onlineUser.forEach(async (userId) => {
      const res = await GetOtherUserInfoAPI(userId);
      if (!res.ok) {
        console.log(res.msg);
        return;
      }
      setUsers([{ profilePic: res.data.profile_pic, id: res.data._id }]);
    });
  };

  useEffect(() => {
    GetOnlineUsers();
    return () => {
      setUsers([]);
    };
  }, [onlineUser]);

  return (
    <div className="w-[34vw] xl:w-[24vw] bg-foreground border-l-2 border-border h-[100vh]">
      <div className="border-l border-border border-b w-full h-fit">
        <div className="bg-background w-full text-white px-2 py-1 border-b border-border">
          ACTIVE NOW
        </div>
        <div className="w-full h-fit flex bg-foreground overflow-x-scroll select-none scrollbar-hidden px-2 py-1">
          {users.map((user) => (
            <ProfilePic
              key={user.id}
              profile_pic={user.profilePic}
              defaultUserIcon={"/user-icon.png"}
              width={12}
              height={12}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col w-full h-fit bg-foreground">
        <div className="w-full h-fit py-1 px-1 flex items-center justify-between bg-background border-border border-t border-b">
          <input
            type="text"
            readOnly
            className="font-semibold text-sm w-[16vw] bg-transparent outline-none border-none text-white"
            defaultValue={""}
          />
        </div>

        <div className="bg-foreground w-full xl:h-[81vh] h-[78vh] px-2 py-2 overflow-x-hidden overflow-y-scroll scrollbar-hidden">
          <div className="w-full h-fit flex flex-col px-2 py-2 gap-2 items-center justify-center">
            <div
              className={`rounded-full w-56 h-56 aspect-square flex items-center justify-center overflow-clip`}
            >
              {/* <Image
                width={1000}
                height={1000}
                src={"/user-icon.png"}
                alt="Profile Pic"
                className="w-full h-full object-cover"
              /> */}

            </div>
              {/* <span className="text-3xl text-white select-none">{currentChatUser.name}</span>
              <span className="text-xl select-none text-secondary-text">{currentChatUser.username}</span> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBoxDetailPanel;
