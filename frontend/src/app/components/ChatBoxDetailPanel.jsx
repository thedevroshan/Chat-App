"use client";
import React from "react";
import { useState, useEffect } from "react";

// API
import { GetOtherUserInfoAPI } from "../../../api/userAPI";

// Context
import { useSocket } from "../contexts/useSocketContext";

const ChatBoxDetailPanel = () => {
  const { onlineUser } = useSocket();
  // States
  const [users, setUsers] = useState([]);

  const GetOnlineUsers = async () => {
    onlineUser.forEach(async userId => {
        const res = await GetOtherUserInfoAPI(userId)
        if(!res.ok){
            console.log(res.msg)
            return
        }
        setUsers([{profilePic: res.data.profile_pic, id: res.data._id}])
    });
  }


  useEffect(() => {
    GetOnlineUsers()
    return () => {
      setUsers([])
    }
  }, [onlineUser])


  return (
    <div className="w-[34vw] xl:w-[24vw] bg-foreground border-l-2 border-border h-[100vh]">
      <div className="border-l border-border border-b w-full h-fit">
        <div className="bg-background w-full text-white px-2 py-1 border-b border-border">
          ACTIVE NOW
        </div>
        <div className="w-full h-fit flex bg-foreground overflow-x-scroll select-none scrollbar-hidden px-2 py-1">
            {users.map((user)=>(
                <img key={user.id} src={user.profilePic?user.profilePic:'/user-icon.png'} className="w-12 rounded-full border border-border"/>
            ))}
        </div>
      </div>

      <div className="flex flex-col w-full h-fit bg-foreground">
        <div className="w-full h-fit py-1 px-1 flex items-center justify-between bg-background border-border border-t border-b">
          <input
            type="text"
            readOnly
            className="font-semibold text-sm w-[16vw] bg-transparent outline-none border-none text-white"
            value={"Gaming Katha"}
          />

          <div className="flex h-full items-center gap-5">
            <img src="/spaces-icon.png" alt="" className="w-5 cursor-pointer" />
            <img
              src="/settings-icon.png"
              alt=""
              className="w-5 cursor-pointer"
            />
          </div>
        </div>

        <div className="bg-foreground w-full xl:h-[81vh] h-[78vh] px-2 py-2 overflow-x-hidden overflow-y-scroll scrollbar-hidden"></div>
      </div>
    </div>
  );
};

export default ChatBoxDetailPanel;
