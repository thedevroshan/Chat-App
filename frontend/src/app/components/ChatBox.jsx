"use client";
import React, { useEffect } from "react";
import { useState, useRef } from "react";

// Components
import Message from "./Message";
import ProfilePic from "./ProfilePic";

// Stores
import useUserStore from "../store/useUserStore";

// Context
import { useSocket } from "../contexts/useSocketContext";

// API
import { SendMessageAPI, GetAllMessagesAPI } from "../../../api/messageAPI";
import { GetLastActiveAPI } from "../../../api/userAPI";

const ChatBox = ({ userId }) => {
  // User Store
  const myId = useUserStore((state) => state._id);

  // States
  const [isOnline, setOnline] = useState(false);
  const [lastActive, setLastActive] = useState("");
  const [messages, setMessages] = useState([]);
  const [pendingMessages, setPendingMessage] = useState([]);
  const [newMessage, setNewMessage] = useState({ message: "", file: "" });

  // References
  const chatBoxRef = useRef();

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
    if(newMessage.message == ''){
      return
    }
    else if (e.target.id == 'send-message' || e.key == 'Enter') {
      // Showing Message Pending if internet is slow or server
      const pendingMessageId = Date.now();
      setPendingMessage((prevState) => [
        ...prevState,
        {
          _id: pendingMessageId,
          message: newMessage.message,
          file: newMessage.file,
          sender: myId,
        },
      ]);

      // Storing newMessage in new object,to make message input field blank So user can't send two same messages
      const date = new Date();
      const amPM = date.getHours() >= 12 ? "PM" : "AM";
      const time = date.getHours() + ":" + date.getMinutes() + " " + amPM;

      const messageObject = {...newMessage, time};
      setNewMessage({ message: "", file: "" });

      // Send Message API Request
      const res = await SendMessageAPI(messageObject, userId);
      if (!res.ok) {
        console.log(res.msg);
        return;
      }

      // Removing Pending Message
      setPendingMessage(
        (prevPendingMessages) => prevPendingMessages.filter(pendingMessage => pendingMessage._id != pendingMessageId)
      );

      setMessages((prevState) => [{...prevState[0], Today: [...prevState[0]['Today'],res.data]}])
    }
  };

  const GetAllMessages = async () => {
    const res = await GetAllMessagesAPI(userId);
    if (!res.ok) {
      console.log(res.msg);
      return;
    }
    setMessages((prevState) => [...prevState, ...res.data])
  };

  useEffect(() => {
    if (currentFriendDMDetails[0]) {
      setOnline(onlineUser.includes(currentFriendDMDetails[0]._id));
    }
    return () => {};
  }, [onlineUser]);

  useEffect(() => {
    GetLastActive();
    GetAllMessages();
    return () => {};
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("newMessage", (message) => {
        if (message.sender == currentFriendDMDetails[0]._id) {
          setMessages((prevState) => [{...prevState[0], Today: [...prevState[0]['Today'],message]}])
        }
      });
    }
    return () => {
      if (socket) {
        socket.off("newMessage");
      }
    };
  }, [socket]);

  // Auto Scroll
  useEffect(() => {
    chatBoxRef.current.scrollBy(0, chatBoxRef.current.scrollHeight * 1);
    return () => {};
  }, [messages, []]);

  return (
    <div className="w-[60vw] xl:w-[52vw] h-[100vh] flex flex-col rounded-tl-3xl rounded-bl-3xl bg-foreground ml-2 pb-4">
      <section className="bg-background flex items-center gap-4 w-full h-fit px-2 py-2 rounded-tl-3xl border border-border">
        {currentFriendDMDetails[0] && (
          <>
            <ProfilePic
              profile_pic={currentFriendDMDetails[0].profile_pic}
              defaultUserIcon={"/user-icon.png"}
              width={12}
              height={12}
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
        ref={chatBoxRef}
      >
        {messages[0] && Object.keys(messages[0]).map((day) => (
          <section
            className="bg-transparent w-full h-fit flex flex-col gap-3"
            key={day}
          >
            <span className="text-secondary-text select-none bg-background px-3 py-1 font-semibold rounded-md text-lg block w-fit mx-auto text-center">
              {day}
            </span>

            {messages[0][day].map((message) => (
              <Message key={message._id} message={message} myId={myId} />
            ))}
          </section>
        ))}

        {/* Pending Message Section */}
        <section
          id="pending-message-section"
          className="w-full h-fit gap-4 flex flex-col items-end"
        >
          {pendingMessages.map((message) => (
            <Message key={message._id} message={message} myId={myId} />
          ))}
        </section>
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
