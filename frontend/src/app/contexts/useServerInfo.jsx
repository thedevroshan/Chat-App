"use client";
import React, { createContext, useEffect, useContext } from "react";

// Store
import useServerStore from "../store/useServerStore";

// API
import { GetUserServersAPI } from "../../../api/userAPI";

// Create a Context
const ServerInfoContext = createContext();


// Provider Component
export const ServerInfoProvider = ({ children }) => {
  const setServer = useServerStore((state)=>state.setServer)
  const GetAllServers = async () => {
    const res = await GetUserServersAPI()
    if(!res.ok){
      console.warn('Something went wrong', res.msg)
      return
    }

    setServer(res.data)
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