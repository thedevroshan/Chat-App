"use client";
import React, { createContext, useEffect, useContext } from "react";

// Store
import useServerStore from "../store/useServerStore";

// Create a Context
const ServerInfoContext = createContext();


// Provider Component
export const ServerInfoProvider = ({ children }) => {
  const setServer = useServerStore((state)=>state.setServer)
  const GetAllServers = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND}/api/user/getallservers`,
        {
          credentials: "include",
          method: "GET",
        }
      );
      const res = await response.json();
      if (!res.ok) {
        console.warn(res.msg);
      } else {
        setServer(res.data);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    GetAllServers()
  }, []);

  return (
    <ServerInfoContext.Provider value={setServer}>
      {children}
    </ServerInfoContext.Provider>
  );
};

// Custom Hook to use the context
export const useServerInfo = () => useContext(ServerInfoContext);