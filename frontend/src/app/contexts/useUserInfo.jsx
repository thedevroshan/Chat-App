"use client";
import React, { createContext, useEffect, useContext } from "react";

// Store
import useUserStore from "../store/useUserStore";

// API
import { GetUserInfoAPI } from "../../../api/userAPI";

// Create a Context
const UserInfoContext = createContext();


// Provider Component
export const UserInfoProvider = ({ children }) => {
  const setUser = useUserStore((state)=>state.setUser)
  const FetchUser = async () => {
    const res = await GetUserInfoAPI()
    
    if(!res.ok){
      console.warn(res.msg)
      if(window.location.pathname != '/'){
        window.location.pathname = '/'
      }
      return
    }
    setUser(res.data)
  };

  useEffect(() => {
    FetchUser()
  }, []);

  return (
    <UserInfoContext.Provider value={setUser}>
      {children}
    </UserInfoContext.Provider>
  );
};

// Custom Hook to use the context
export const useUserInfo = () => useContext(UserInfoContext);
