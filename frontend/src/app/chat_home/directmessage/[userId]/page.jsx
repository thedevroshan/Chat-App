"use client";
import React from "react";

// Components
import NotSupportedPage from "@/app/components/NotSupportedPage";
import ChatBox from "@/app/components/ChatBox";
import ChatBoxDetailPanel from "@/app/components/ChatBoxDetailPanel";

// Stores
import useUserStore from "@/app/store/useUserStore";

import { useScreenSupport } from "@/app/contexts/useScreenSupported";

const ChatHome = ({ params }) => {
  const router = React.use(params);
  const isSupported = useScreenSupport();

  // Filtering out the friend whom user is talking. So that user can see user's details at the top of chatbox
  const friends = useUserStore((state) => state.friends);
  const currentFriendDMDetails = friends.filter(
    (friend) => friend._id == router.userId
  );

  return (
    <>
      {isSupported && (
        <>
          <ChatBox userId={router.userId} currentFriendDMDetails={currentFriendDMDetails[0]?currentFriendDMDetails[0]:''} />
          <ChatBoxDetailPanel currentChatUser={currentFriendDMDetails[0]?currentFriendDMDetails[0]:''}/>
        </>
      )}
      {!isSupported && <NotSupportedPage />}
    </>
  );
};

export default ChatHome;
