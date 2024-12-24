"use client";
import React from "react";
import Image from "next/image";
import { useState } from "react";

const Message = ({ message, myId, setNewMessage,name }) => {
  const [isContextMenu, setContextMenu] = useState(false);
  console.log(message);

  return (
    <>
      <div
        className={`w-fit h-fit flex flex-col gap-1 ${
          myId == message.sender ? "ml-auto items-end" : "items-start"
        }`}
      >
        {/* Replied To Text */}
        {message.replied_text !== "" && (
          <div
            className={`h-fit flex flex-wrap w-fit max-w-[35vw] px-4 py-3 rounded-3xl ${myId === message.sender?'rounded-br-none':'rounded-bl-none'} border border-border bg-foreground text-white font-semibold`}
          >
            <span className="text-secondary-text text-sm select-none">{myId !== message.sender?name:'You'} Replied to {myId === message.sender?name:'You'}</span>
            <span className="text-wrap text-left break-words w-full whitespace-normal select-none">
              {message.replied_text}
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
            <div
              className="group px-1 py-1 hover:bg-light-secondary rounded-lg cursor-pointer transition-all"
              onClick={() => {
                setNewMessage((prevState) => ({
                  ...prevState,
                  replied_text: message.message,
                }));
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

            <div className="group px-1 py-1 hover:bg-light-secondary rounded-lg cursor-pointer transition-all">
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

            {myId === message.sender && (
              <div className="group px-1 py-1 hover:bg-light-secondary rounded-lg cursor-pointer transition-all">
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
