"use client";
import React, { useEffect } from "react";
import { useState } from "react";

// Components
import Message from "./Message";

// Stores
import useUserStore from "../store/useUserStore";

// Context
import { useSocket } from "../contexts/useSocketContext";

// API
import { SendMessageAPI, GetAllMessagesAPI } from "../../../api/messageAPI";
import { GetLastActiveAPI } from "../../../api/userAPI";

const ChatBox = ({ userId }) => {
  let count;

  // User Store
  const myId = useUserStore((state) => state._id);

  // States
  const [isOnline, setOnline] = useState(false);
  const [lastActive, setLastActive] = useState("");
  const [messages, setMessages] = useState([{ Today: [] }]);
  const [newMessage, setNewMessage] = useState({ message: "", file: "" });

  // Filtering out the friend whom user is talking. So that user can see user's details at the top of chatbox
  const friends = useUserStore((state) => state.friends);
  const currentFriendDMDetails = friends.filter(
    (friend) => friend._id == userId
  );

  // Socket
  const { onlineUser, socket } = useSocket();


  const GetLastActive = async () => {
    const res = await GetLastActiveAPI(userId);
    if (!res.ok) {
      console.log(res.msg);
      return;
    }
    setLastActive(res.data);
  };

  const SendMessage = async (e) => {
    if (e.key == "Enter" || e.target.id == "send-message" && newMessage != '') {
      const res = await SendMessageAPI(newMessage, userId);
      if (!res.ok) {
        console.log(res.msg);
        return;
      }
      setMessages([{ Today: [...messages[0].Today, res.data] }]);
      console.log(messages)
      setNewMessage({ message: "", file: "" });
    }
  };

  const GetAllMessages = async () => {
    const res = await GetAllMessagesAPI(userId)
    if(!res.ok){
      console.log(res.msg)
      return
    }
    const newMessagesArray = res.data.filter(day => {
      const key = Object.keys(day)[0]
      return day[key].length != 0
    })
    setMessages(newMessagesArray)
  }

  useEffect(() => {
    if (currentFriendDMDetails[0]) {
      setOnline(onlineUser.includes(currentFriendDMDetails[0]._id));
    }
    return () => {};
  }, [onlineUser]);

  useEffect(() => {
    GetLastActive();
    GetAllMessages()
    return () => {};
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("newMessage", (message) => {
        setMessages(prevMessages => [
          {
            Today: [
              ...prevMessages[0].Today,  // Spread the previous messages
              message                     // Add the new message
            ]
          }
        ])
      });
    }
    return () => {
      if (socket) {
        socket.off("newMessage");
      }
    };
  }, [socket]);

  return (
    <div className="w-[60vw] xl:w-[52vw] h-[100vh] flex flex-col rounded-tl-3xl rounded-bl-3xl bg-foreground ml-2 pb-4">
      <section className="bg-background flex items-center gap-4 w-full h-fit px-2 py-2 rounded-tl-3xl border border-border">
        {currentFriendDMDetails[0] && (
          <>
            <img
              src={
                currentFriendDMDetails[0].profile_pic
                  ? currentFriendDMDetails[0].profile_pic
                  : "/user-icon.png"
              }
              alt="Profile Pic"
              className="rounded-full border border-border w-12"
            />

            <div className="flex flex-col w-full h-fit select-none">
              <span className="text-white font-semibold text-lg">
                {currentFriendDMDetails[0].name}
              </span>
              <span className="text-white font-semibold text-sm">
                {isOnline
                  ? "Active Now"
                  : lastActive != ""
                  ? `Active ${lastActive}`
                  : ""}
              </span>
            </div>
          </>
        )}
      </section>

      {/* Chat Section */}
      <section
        id="chat-section"
        className="w-full h-full gap-4 flex flex-col px-4 py-2 overflow-x-hidden overflow-y-scroll"
      >
        {messages.map((days) => (
          <section
            className="bg-transparent w-full h-fit flex flex-col gap-3"
            key={Object.keys(days)[0]}
          >
            <span className="text-secondary-text select-none bg-background px-3 py-1 font-semibold rounded-md text-lg block w-fit mx-auto text-center">
              {Object.keys(days)[0]}
            </span>

            {days[Object.keys(days)[0]].map((message) => (
              <Message key={message._id} message={message} myId={myId}/>
            ))}
          </section>
        ))}
      </section>

      <section
        id="message-input-section"
        className="w-full h-12 shadow-md pt-2 px-4"
      >
        <div className="bg-foreground w-full h-full flex rounded-xl border border-border items-center justify-between gap-3">
          <input
            type="text"
            className="h-full w-full rounded-xl bg-background placeholder:text-secondary-text px-3 text-lg text-white outline-none border-r border-border"
            placeholder="Message..."
            value={newMessage.message}
            onChange={(e) => {
              setNewMessage({ message: e.target.value });
            }}
            onKeyDown={SendMessage}
          />
          <img
            src="/send-icon.png"
            alt="Send"
            className="w-9 h-9 aspect-square hover:bg-primary-nav-hover px-2 py-2 rounded-md cursor-pointer"
            id="send-message"
            onClick={SendMessage}
          />
          <img
            src="/attachment-icon.png"
            alt="Attachment"
            className="w-9 h-9 aspect-square px-2 py-2 rounded-md mr-1 cursor-pointer hover:bg-primary-nav-hover"
          />
        </div>
      </section>
    </div>
  );
};

export default ChatBox;
