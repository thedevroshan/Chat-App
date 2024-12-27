"use client";
import React, { useEffect } from "react";
import { useState, useRef } from "react";
import Image from "next/image";

// Components
import Message from "./Message";
import ProfilePic from "./ProfilePic";

// Stores
import useUserStore from "../store/useUserStore";

// Context
import { useSocket } from "../contexts/useSocketContext";

// API
import { SendMessageAPI, GetAllMessagesAPI,EditMessageAPI } from "../../../api/messageAPI";
import { GetLastActiveAPI } from "../../../api/userAPI";

const ChatBox = ({ userId }) => {
  // User Store
  const myId = useUserStore((state) => state._id);

  // States
  const [isOnline, setOnline] = useState(false);
  const [lastActive, setLastActive] = useState("");
  const [messages, setMessages] = useState([]);
  const [pendingMessages, setPendingMessage] = useState([]);
  const [newMessage, setNewMessage] = useState({
    message: "",
    file: "",
    replied_to_text: "",
    replied_to_messageId: "",
    replied_to_user: "",
  });
  const [editMessage, setEditMessage] = useState({
    isEdit: false,
    messageId: "",
  });

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

  const SendMessage = async () => {
    // Showing Message Pending if internet is slow or server
    const pendingMessageId = Date.now();
    setPendingMessage((prevState) => [
      ...prevState,
      {
        _id: pendingMessageId,
        message: newMessage.message,
        replied_to_text: newMessage.replied_to_text,
        replied_to_messageId: newMessage.replied_to_messageId,
        replied_to_user: newMessage.replied_to_user,
        file: newMessage.file,
        sender: myId,
        is_edited: false
      },
    ]);

    // Storing newMessage in new object,to make message input field blank So user can't send two same messages
    const date = new Date();
    const amPM = date.getHours() >= 12 ? "PM" : "AM";
    const time = date.getHours() + ":" + date.getMinutes() + " " + amPM;

    const messageObject = { ...newMessage, time };
    setNewMessage({
      message: "",
      file: "",
      replied_to_text: "",
      replied_to_messageId: "",
      replied_to_user: "",
    });

    // Send Message API Request
    const res = await SendMessageAPI(messageObject, userId);
    if (!res.ok) {
      console.log(res.msg);
      return;
    }

    // Removing Pending Message
    setPendingMessage((prevPendingMessages) =>
      prevPendingMessages.filter(
        (pendingMessage) => pendingMessage._id != pendingMessageId
      )
    );

    setMessages((prevState) => [
      { ...prevState[0], Today: [...prevState[0]["Today"], res.data] },
    ]);
  };

  // Edit Message
  const EditMessage = async () => {
    const res = await EditMessageAPI({message: newMessage.message, messageId: editMessage.messageId})
    if(!res.ok){
      console.log(res.msg)
      return
    }
    setMessages(prevState => 
      prevState.map(messageObject => ({
        ...messageObject,
        [res.data.createdOn]: messageObject[res.data.createdOn].map(message => {
          if (message._id === editMessage.messageId) {
            return { ...message, ...res.data }; 
          }
          return message; // Leave other messages untouched
        })
      }))
    );
    
    setEditMessage({isEdit: false, messageId: ''})
    setNewMessage({
      message: "",
      file: "",
      replied_to_text: "",
      replied_to_messageId: "",
      replied_to_user: "",
    });
  };



  // Get All Messages
  const GetAllMessages = async () => {
    const res = await GetAllMessagesAPI(userId);
    if (!res.ok) {
      console.log(res.msg);
      return;
    }
    setMessages((prevState) => [...prevState, ...res.data]);
  };

  // Getting the user is online or not
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
        if (currentFriendDMDetails[0] && message.sender == currentFriendDMDetails[0]._id) {
          if(!message.is_edited){
            setMessages((prevState) => [
              { ...prevState[0], Today: [...prevState[0]["Today"], message] },
            ]);
          }else {
            setMessages(prevState => 
              prevState.map(messageObject => ({
                ...messageObject,
                [message.createdOn]: messageObject[message.createdOn].map(prevMessage => {
                  if (message._id === prevMessage._id) {
                    return { ...prevMessage, ...message }; 
                  }
                  return prevMessage; // Leave other messages untouched
                })
              }))
            );
          }
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
        {messages[0] &&
          Object.keys(messages[0]).map((day) => (
            <section
              className="bg-transparent w-full h-fit flex flex-col gap-5"
              key={day}
            >
              <span className="text-secondary-text select-none bg-background px-3 py-1 font-semibold rounded-md text-lg block w-fit mx-auto text-center">
                {day}
              </span>

              {messages[0][day].map((message) => (
                <Message
                  key={message._id}
                  message={message}
                  myId={myId}
                  setNewMessage={setNewMessage}
                  chatUserName={
                    currentFriendDMDetails[0] ? currentFriendDMDetails[0].name : ""
                  }
                  chatUserId={currentFriendDMDetails[0]?currentFriendDMDetails[0]._id:''}
                  setEditMessage={setEditMessage}
                  editMessage={editMessage}
                />
              ))}
            </section>
          ))}

        {/* Pending Message Section */}
        <section
          id="pending-message-section"
          className="w-full h-fit gap-4 flex flex-col items-end"
        >
          {pendingMessages.map((message) => (
            <Message
              key={message._id}
              message={message}
              myId={myId}
              chatUserName={
                currentFriendDMDetails[0] ? currentFriendDMDetails[0].name : ""
              }
              chatUserId={currentFriendDMDetails[0]?currentFriendDMDetails[0]._id:''}
            />
          ))}
        </section>
      </section>

      <section
        id="message-input-section"
        className="w-full h-fit shadow-md px-4"
      >
        {/* Replied To Text */}
        {newMessage.replied_to_text != "" && (
          <div className="bg-background px-4 border-t border-l border-r border-border rounded-tr-xl rounded-tl-xl text-secondary-text font-semibold select-none py-2 w-72 text-wrap flex flex-col justify-center">
            <span className="text-sm">
              Replying to{" "}
              {myId == newMessage.replied_to_user
                ? "Yourself"
                : currentFriendDMDetails[0]
                ? currentFriendDMDetails[0].name
                : ""}
            </span>
            <div className="flex">
              <input
                type="text"
                value={newMessage.replied_to_text}
                readOnly
                className="bg-transparent outline-none border-none w-full"
              />
              <Image
                src={"/cross-icon.png"}
                alt="Cancel"
                width={24}
                height={24}
                className="cursor-pointer"
                onClick={() => {
                  setNewMessage((prevState) => ({
                    ...prevState,
                    replied_to_text: "",
                    replied_to_messageId: "",
                    replied_to_user: "",
                  }));
                }}
              />
            </div>
          </div>
        )}

        {/* Edit Message */}
        {editMessage.isEdit != "" && (
          <div className="bg-background px-4 border-t border-l border-r border-border rounded-tr-xl rounded-tl-xl text-secondary-text font-semibold select-none py-2 w-72 text-wrap flex flex-col justify-center">
            <span className="text-sm">Edit Message</span>
            <div className="flex">
              <input
                type="text"
                value={newMessage.message}
                readOnly
                className="bg-transparent outline-none border-none w-full"
              />
              <Image
                src={"/cross-icon.png"}
                alt="Cancel"
                width={24}
                height={24}
                className="cursor-pointer"
                onClick={() => {
                  setNewMessage((prevState) => ({
                    ...prevState,
                    message: "",
                  }));
                  setEditMessage({
                    isEdit: false,
                    messageId: "",
                  });
                }}
              />
            </div>
          </div>
        )}

        <div className="bg-foreground w-full h-10 flex rounded-xl border border-border items-center justify-between gap-3">
          <input
            type="text"
            className={`h-full w-full ${
              newMessage.replied_to_text || editMessage.isEdit
                ? "rounded-bl-xl rounded-br-xl rounded-tr-xl"
                : "rounded-xl"
            } bg-background placeholder:text-secondary-text px-3 text-lg text-white outline-none border-r border-border`}
            placeholder="Message..."
            value={newMessage.message}
            onChange={(e) => {
              setNewMessage((prevState) => ({
                ...prevState,
                message: e.target.value,
              }));
            }}
            onKeyDown={(e) => {
              if(newMessage.message == '' || e.key != 'Enter'){
                return
              }
              else if (editMessage.isEdit) {
                EditMessage();
              } else {
                SendMessage();
              }
            }}
          />
          <img
            src="/send-icon.png"
            alt="Send"
            className="w-8 h-8 aspect-square hover:bg-primary-nav-hover px-1 py-1 rounded-md cursor-pointer"
            id="send-message"
            onClick={() => {
              if(newMessage.message == ''){
                return
              }
              else if (editMessage.isEdit) {
                EditMessage();
              } else {
                SendMessage();
              }
            }}
          />
          <img
            src="/attachment-icon.png"
            alt="Attachment"
            className="w-8 h-8 aspect-square hover:bg-primary-nav-hover px-1 py-1 rounded-md cursor-pointer mr-1"
          />
        </div>
      </section>
    </div>
  );
};

export default ChatBox;
