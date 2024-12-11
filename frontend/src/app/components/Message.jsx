import React from "react";
import Link from "next/link";

const Message = ({ message, myId }) => {
  const extractUrl = (input) => {
    const regex = /https?:\/\/[^\s]+/g;
    const matches = input.match(regex);
    return matches ? matches[0] : null;
  };

  return (
    <div
      className={`h-fit flex flex-wrap w-fit max-w-[35vw] px-4 py-3 rounded-3xl border border-border bg-background text-white font-semibold ${
        myId == message.sender ? "ml-auto" : ""
      }`}
    >
      <span className="text-wrap text-left break-words w-full whitespace-normal">
        {message.message}
      </span>

      <span className="text-secondary-text text-sm ml-auto select-none">
        {message.time}
      </span>
    </div>
  );
};

export default Message;
