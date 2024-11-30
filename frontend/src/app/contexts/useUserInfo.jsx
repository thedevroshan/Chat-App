"use client";
import React, { createContext, useEffect, useContext } from "react";

// Store
import useUserStore from "../store/useUserStore";

// Create a Context
const UserInfoContext = createContext();


// Provider Component
export const UserInfoProvider = ({ children }) => {
  const setUser = useUserStore((state)=>state.setUser)
  const FetchUser = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND}/api/user/getuserinfo`,
        {
          credentials: "include",
          method: "GET",
        }
      );
      const res = await response.json();
      if (!res.ok) {
        console.warn(res.msg);
      } else {
        setUser(res.data);
      }
    } catch (error) {
      console.warn(error);
    }
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
