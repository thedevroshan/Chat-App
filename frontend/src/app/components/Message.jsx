"use client";
import React from "react";
import Image from "next/image";
import { useState, useRef } from "react";

const Message = ({ message, myId, setNewMessage,setEditMessage,editMessage,chatUserName,chatUserId }) => {
  const [isContextMenu, setContextMenu] = useState(false);

  // References
  const messageDiv = useRef()

  return (
    <>
      <div
        className={`w-fit h-fit flex flex-col gap-1 ${
          myId == message.sender ? "ml-auto items-end" : "items-start"
        }`} ref={messageDiv}
        >
        <span className={`text-sm text-primary-blue select-none ${message.is_edited?'block':'hidden'}`}>Edited</span>
        {/* Replied To Text */}
        {message.replied_to_text !== "" && (
          <div
            className={`h-fit flex flex-wrap w-fit max-w-[35vw] px-4 py-3 rounded-3xl ${myId === message.sender?'rounded-br-none':'rounded-bl-none'} border border-border bg-foreground text-white font-semibold`}
          >
            <span className="text-secondary-text text-sm select-none">{myId !== message.sender?chatUserName:'You'} Replied to {message.replied_to_user == chatUserId?chatUserName:'You'}</span>
            <span className="text-wrap text-left break-words w-full whitespace-normal select-none">
              {message.replied_to_text}
            </span>
          </div>
        )}

        <div
          className={`h-fit flex flex-wrap w-fit max-w-[35vw] px-4 py-3 rounded-3xl border border-border bg-background text-white font-semibold`}
          onContextMenu={(e) => {
            e.preventDefault();
            setContextMenu(!isContextMenu);
          }}
        >
          <span className="text-wrap text-left break-words w-full whitespace-normal">
            {message.message}
          </span>

          <span className="text-secondary-text text-sm ml-auto select-none">
            {message.time ? message.time : "Sending..."}
          </span>
        </div>

        {isContextMenu && (
          <div
            className={`w-fit h-fit py-1 bg-background border border-border rounded-xl flex gap-2 items-center justify-center px-1 ${
              myId == message.sender ? "ml-auto" : ""
            }`}
          >
            {/* Reply To Message */}
            <div
              className="group px-1 py-1 hover:bg-light-secondary rounded-lg cursor-pointer transition-all"
              onClick={() => {
                setNewMessage((prevState) => ({
                  ...prevState,
                  replied_to_text: message.message,
                  replied_to_messageId: message._id,
                  replied_to_user: message.sender,
                }));
                editMessage.isEdit && setEditMessage({isEdit: false, messageId: ''})
                setContextMenu(false)
              }}
            >
              <Image
                src={"/reply-icon.png"}
                width={30}
                height={30}
                alt="Reply"
                className="group-hover:hidden block"
              />
              <span className="text-white text-sm group-hover:block hidden py-1">
                Reply
              </span>
            </div>

            <div className="group px-1 py-1 hover:bg-light-secondary rounded-lg cursor-pointer transition-all">
              <Image
                src={"/forward-icon.png"}
                width={30}
                height={30}
                alt="Reply"
                className="group-hover:hidden block"
              />
              <span className="text-white text-sm group-hover:block hidden py-1">
                Forward
              </span>
            </div>

            {/* Divider */}
            <div className="border border-border h-[32px] rounded-xl"></div>

            <div className="group px-1 py-1 hover:bg-light-secondary rounded-lg cursor-pointer transition-all" onClick={async (e)=>{
              await navigator.clipboard.writeText(message.message)
              e.target.innerHTML = 'Copied!'
            }}>
              <Image
                src={"/copy-icon.png"}
                width={30}
                height={30}
                alt="Reply"
                className="group-hover:hidden block"
              />
              <span className="text-white text-sm group-hover:block hidden py-1">
                Copy
              </span>
            </div>

            {/* Edit Message */}
            {myId === message.sender && (
              <div className="group px-1 py-1 hover:bg-light-secondary rounded-lg cursor-pointer transition-all" onClick={()=>{
                setEditMessage({
                  isEdit: true,
                  messageId: message._id,
                })
                setNewMessage((prevState) => ({
                  ...prevState,
                  message: message.message,
                  replied_to_text: '',
                  replied_to_messageId: '',
                  replied_to_user: ''
                }))
                setContextMenu(false)
              }}>
                <Image
                  src={"/edit-icon.png"}
                  width={30}
                  height={30}
                  alt="Reply"
                  className="group-hover:hidden block"
                />
                <span className="text-white text-sm group-hover:block hidden py-1">
                  Edit
                </span>
              </div>
            )}

            {/* Divider */}
            <div className="border border-border h-[32px] rounded-xl"></div>

            {myId === message.sender && (
              <button className="text-red-800 transition-all px-2 hover:bg-light-secondary py-1 rounded-lg">
                Unsend
              </button>
            )}
            <button
              className="text-red-800 transition-all px-2 hover:bg-light-secondary py-1 rounded-lg"
              onClick={() => {
                setContextMenu(false);
              }}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Message;
