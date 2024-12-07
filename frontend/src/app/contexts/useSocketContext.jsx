"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

// Stores
import useUserStore from "../store/useUserStore";

// Create a Context
const SocketContext = createContext();

// Provider Component
export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUser, setOnlineUser] = useState([]);

  // Get UserId
  const userId = useUserStore((state) => state._id);

  useEffect(() => {
    if (userId) {
      const newSocket = io(process.env.NEXT_PUBLIC_BACKEND, {
        query: {
          userId,
        },
      });

      setSocket(newSocket);

      newSocket.on("getOnlineUsers", (users) => {
        const newOnlineUsers = users.filter(user => user != userId)
        setOnlineUser(newOnlineUsers)
      });

      return () => {
        newSocket.close();
        setSocket(null);
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [userId]);

  return (
    <SocketContext.Provider value={{ socket, onlineUser }}>
      {children}
    </SocketContext.Provider>
  );
};

// Custom Hook to use the context
export const useSocket = () => useContext(SocketContext);
