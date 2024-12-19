"use client";
import React, { createContext, useEffect, useContext } from "react";

// Store
import useUserStore from "../store/useUserStore";
import useAppStore from "../store/useAppStore";

// API
import { GetUserInfoAPI } from "../../../api/userAPI";

// Create a Context
const UserInfoContext = createContext();


// Provider Component
export const UserInfoProvider = ({ children }) => {
  // User Store
  const setUser = useUserStore((state)=>state.setUser)

  // App Store
  const setIsLoggedIn = useAppStore(state => state.setIsLoggedIn)

  const FetchUser = async () => {
    const res = await GetUserInfoAPI()
    
    if(!res.ok){
      console.warn(res.msg)
      if(window.location.pathname != '/'){
        window.location.pathname = '/'
      }
      setIsLoggedIn(false)
      return
    }
    setUser(res.data)
    setIsLoggedIn(true)
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
