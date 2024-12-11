"use client";
import React from "react";

import Navbar from "../components/Navbar";
import NotSupportedPage from "../components/NotSupportedPage";
import ChatBox from "../components/ChatBox";
import ChatBoxDetailPanel from "../components/ChatBoxDetailPanel";

import { useScreenSupport } from "../contexts/useScreenSupported";

const ChatHome = () => {
  const isSupported = useScreenSupport();

  return (
    <>
      {isSupported && (
        <>
          <Navbar />
          <div className="w-[60vw] xl:w-[52vw] h-[100vh] flex flex-col px-4 rounded-tl-3xl rounded-bl-3xl bg-foreground ml-2 gap-3 py-4"></div>
          <ChatBoxDetailPanel />
        </>
      )}
      {!isSupported && <NotSupportedPage />}
    </>
  );
};

export default ChatHome;
