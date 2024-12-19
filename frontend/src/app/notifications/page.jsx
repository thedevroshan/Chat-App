"use client";
import React, { useEffect } from "react";

// Components
import ChatBoxDetailPanel from "../components/ChatBoxDetailPanel";
import FriendRequestNotification from "../components/FriendRequestNotification";
import NotSupportedPage from "../components/NotSupportedPage";

// Context
import { useScreenSupport } from "../contexts/useScreenSupported";

// Stores
import useNotificationStore from "../store/useNotificationStore";

// API
import { GetAllRequestsAPI } from "../../../api/friendRequestAPI";

const NotificationPage = () => {
  // isSupported or not
  const isSupported = useScreenSupport();

  const notifications = useNotificationStore((state) => state.notifications);
  const setNewNotificationArray = useNotificationStore((state) => state.setNewNotificationArray);
  const setShowNotificationCount = useNotificationStore((state) => state.setShowNotificationCount);

  const GetAllFriendRequest = async () => {
    const res = await GetAllRequestsAPI();
    if (!res.ok) {
      console.log(res.msg)
      return;
    }
    setNewNotificationArray(...res.data);
  };

  useEffect(()=>{
    GetAllFriendRequest()
    setShowNotificationCount(false)
    return () => {}
  }, [])

  return (
    <>
      {!isSupported && <NotSupportedPage />}
      {isSupported && (
        <>
          <div className="w-[60vw] xl:w-[52vw] h-[100vh] flex flex-col rounded-tl-3xl rounded-bl-3xl bg-foreground ml-2">
            <header className="bg-background h-fit w-full px-4 py-2 rounded-tl-3xl border-b border-border">
              <span className="text-xl text-white font-semibold select-none">
                Notifications
              </span>
            </header>

            <section className="w-full h-full flex flex-col overflow-x-hidden overflow-y-scroll gap-3">
              {notifications.map((notification) => (
                <FriendRequestNotification
                  key={notification._id}
                  profilePic={notification.sender_profile_pic}
                  username={notification.sender_username}
                  requestId={notification._id}
                />
              ))}
            </section>
          </div>
          <ChatBoxDetailPanel />
        </>
      )}
    </>
  );
};

export default NotificationPage;
