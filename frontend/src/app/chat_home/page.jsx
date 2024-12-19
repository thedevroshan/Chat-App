"use client";
import React from "react";
import Image from "next/image";

import Navbar from "../components/Navbar";
import NotSupportedPage from "../components/NotSupportedPage";
import ChatBoxDetailPanel from "../components/ChatBoxDetailPanel";

import { useScreenSupport } from "../contexts/useScreenSupported";

const ChatHome = () => {
  const isSupported = useScreenSupport();

  return (
    <>
      {isSupported && (
        <>
          <div className="w-[60vw] xl:w-[52vw] h-[100vh] flex flex-col px-4 rounded-tl-3xl rounded-bl-3xl bg-foreground ml-2 gap-3 py-4 items-center justify-center">
            <Image src={"/aurbhaii.png"} width={200} height={200} className="" alt="AURBHAII LOGO"/>

            <div className="w-80 flex items-center justify-center">
              <span className="text-xl font-semibold text-secondary-text text-center select-none">START YOUR CONVERSATION AND COMMUNITY WITH AURBHAII</span>
            </div>
          </div>
          <ChatBoxDetailPanel />
        </>
      )}
      {!isSupported && <NotSupportedPage />}
    </>
  );
};

export default ChatHome;
