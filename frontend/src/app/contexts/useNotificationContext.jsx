"use client";
import React, { createContext, useEffect, useContext } from "react";

// Socket Context
import { useSocket } from "./useSocketContext";

// Create a Context
const NotificationContext = createContext();

// Stores
import useNotificationStore from "../store/useNotificationStore";

// API
import { GetAllRequestsAPI } from "../../../api/friendRequestAPI";

// Provider Component
export const NotificationProvider = ({ children }) => {
  const { socket } = useSocket();

  // Notification Store
  const notifications = useNotificationStore(
    (state) => state.notifications
  );
  const setNotification = useNotificationStore(
    (state) => state.setNotification
  );
  const setNewNotificationArray = useNotificationStore(
    (state) => state.setNewNotificationArray
  );
  const setShowNotificationCount = useNotificationStore(
    (state) => state.setShowNotificationCount
  );

  // Async Function
  const GetAllFriendRequest = async () => {
    const res = await GetAllRequestsAPI()
    if(!res.ok){
        console.log(res.msg)
        setShowNotificationCount(false)
        return
    }
    setNewNotificationArray(...res.data)
    setShowNotificationCount(true)
  }

  // Getting all notification of auth User
  useEffect(() => {
    GetAllFriendRequest()
    return () => {
    };
  }, []); // useEffect will run when ever page loads


  // Real time notification
  useEffect(() => {
    if(socket){
      socket.on("newFriendRequest", (newFriendRequest) => {
        setNotification(newFriendRequest);
        setShowNotificationCount(true)
      });  
    }
    return () => {
      if (socket) {
        socket.off("newFriendRequest");
      }
    };
  }, [socket]); // useEffect will run when ever socket changes

  return (
    <NotificationContext.Provider value={notifications}>{children}</NotificationContext.Provider>
  );
};

// Custom Hook to use the context
export const useNotificationContext = () => useContext(NotificationContext);
