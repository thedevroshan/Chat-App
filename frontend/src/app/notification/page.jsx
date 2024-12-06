'use client'
import React from "react";

// Components
import Navbar from "../components/Navbar";
import ChatBoxDetailPanel from "../components/ChatBoxDetailPanel";
import FriendRequestNotification from "../components/FriendRequestNotification";
import NotSupportedPage from "../components/NotSupportedPage";

import { useScreenSupport } from "../contexts/useScreenSupported";

const NotificationPage = () => {
  // isSupported or not
  const isSupported = useScreenSupport();

  return (
    <>
      {!isSupported && <NotSupportedPage />}
      {isSupported && (
        <>
          <Navbar></Navbar>
          <div className="w-[60vw] xl:w-[52vw] h-[100vh] flex flex-col rounded-tl-3xl rounded-bl-3xl bg-foreground ml-2">
            <header className="bg-background h-fit w-full px-4 py-2 rounded-tl-3xl border-b border-border">
              <span className="text-xl text-white font-semibold select-none">
                Notifications
              </span>
            </header>

            <section className="w-full h-full flex flex-col overflow-x-hidden overflow-y-scroll gap-3"></section>
          </div>
          <ChatBoxDetailPanel />
        </>
      )}
    </>
  );
};

export default NotificationPage;
