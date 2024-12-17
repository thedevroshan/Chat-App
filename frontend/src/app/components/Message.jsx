"use client";
import React from "react";
import { useState } from "react";

// Components
import MessageContextMenu from "./MessageContextMenu";

const Message = ({ message, myId }) => {
  const [isContextMenu, setContextMenu] = useState(false);

  return (
    <>
      <div
        className={`h-fit flex flex-wrap w-fit max-w-[35vw] px-4 py-3 rounded-3xl border border-border bg-background text-white font-semibold ${
          myId == message.sender ? "ml-auto" : ""
        }`}
        onContextMenu={() => {
          setContextMenu(true);
        }}
      >
        <span className="text-wrap text-left break-words w-full whitespace-normal">
          {message.message}
        </span>

        <span className="text-secondary-text text-sm ml-auto select-none">
          {message.time ? message.time : "Sending..."}
        </span>

        <MessageContextMenu/>
      </div>
    </>
  );
};

export default Message;
