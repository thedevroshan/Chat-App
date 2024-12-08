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
import { SendMessageAPI } from "../../../api/messageAPI";

const ChatBox = ({ userId }) => {
  // User Store
  const myId = useUserStore((state) => state._id);

  const [isOnline, setOnline] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessages] = useState("");

  const friends = useUserStore((state) => state.friends);
  const currentFriendDMDetails = friends.filter(
    (friend) => friend._id == userId
  );

  // Socket
  const { onlineUser, socket } = useSocket();

  useEffect(() => {
    if (currentFriendDMDetails[0]) {
      setOnline(onlineUser.includes(currentFriendDMDetails[0]._id));
    }
    return () => {};
  }, [onlineUser]);

  const SendMessage = async (e) => {
    const date = new Date();
    const newDate = date.getHours() + ":" + date.getMinutes();

    if (e.key == "Enter" || e.target.id == "send-message") {
      if (newMessage !== "") {
        const res = await SendMessageAPI(newMessage, newDate, userId);
        if (!res.ok) {
          console.log(res.msg);
          return;
        }
        setMessages((prevMessage) => [
          ...prevMessage,
          { message: newMessage, date: newDate },
        ]);
        setNewMessages("");
        // Auto Scroll
      }
    }
  };

  useEffect(() => {
    if (socket) {
      socket.on("newMessage", (message) => {
        setMessages((prevMessage) => [...prevMessage, message]);
        // AutoScroll
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
                {isOnline ? "Online" : "Offline"}
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
        {messages &&
          messages.map((message, index) => (
            <Message
              key={index}
              message={message.message}
              date={message.date}
              userId={message.sender ? message.sender : myId}
              myId={myId}
            />
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
            onKeyDown={SendMessage}
            value={newMessage}
            onChange={(e) => {
              setNewMessages(e.target.value);
            }}
          />
          <img
            src="/send-icon.png"
            alt="Send"
            className="w-9 h-9 aspect-square hover:bg-primary-nav-hover px-2 py-2 rounded-md cursor-pointer"
            onClick={SendMessage}
            id="send-message"
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
