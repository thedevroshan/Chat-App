'use client'
import React, { createContext, useState, useEffect, useContext } from 'react';

// Create a Context
const ScreenSupportContext = createContext();

// Provider Component
export const ScreenSupportProvider = ({ children }) => {
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSupported(window.innerWidth > 640);
    };

    // Run the check initially
    checkScreenSize();

    // Add resize event listener
    window.addEventListener('resize', checkScreenSize);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  return (
    <ScreenSupportContext.Provider value={isSupported}>
      {children}
    </ScreenSupportContext.Provider>
  );
};

// Custom Hook to use the context
export const useScreenSupport = () => useContext(ScreenSupportContext);
