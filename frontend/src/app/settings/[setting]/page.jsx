"use client";
import React from "react";
import Navbar from "@/app/components/Navbar";
import SettingNavbar from "@/app/components/SettingNavbar";
import { useScreenSupport } from "@/app/contexts/useScreenSupported";
import NotSupportedPage from "@/app/components/NotSupportedPage";
import Account from "@/app/components/Account";
import Profile from "@/app/components/Profile";


const Settings = ({ params }) => {
  const router = React.use(params);
  const isSupported = useScreenSupport();

  return (
    <>
      {isSupported && (
        <>
          <Navbar />
          <div className="w-full h-[100vh] flex flex-col rounded-tl-3xl rounded-bl-3xl bg-foreground ml-2">
            <header className="w-full h-fit py-2 bg-background text-white rounded-tl-3xl border-border border-b border-r px-6">
              <span className="select-none">Settings</span>
            </header>
            <div className="w-full h-full flex rounded-bl-3xl bg-foreground">
              <SettingNavbar currentSetting={router.setting} />
              <div className="bg-foreground flex items-center flex-col w-full h-[93vh] overflow-y-scroll gap-4 py-12">
                {router.setting == "account" && <Account/>}
                {router.setting == "profile" && <Profile/>}
              </div>
            </div>
          </div>
        </>
      )}

      {!isSupported && <NotSupportedPage />}
    </>
  );
};

export default Settings;
