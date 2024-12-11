"use client";
import { useEffect, useState } from "react";

import Button from "./components/Button";
import Register from "./components/Register";
import Login from "./components/Login";
import NotSupportedPage from "./components/NotSupportedPage";

import { useScreenSupport } from "./contexts/useScreenSupported";

// API
import { 
  IsLoggedInAPI,
 } from "../../api/userAPI";

export default function Home() {
  const [isRegisterComponentActive, setRegisterComponentActive] =
    useState(false);
  const [isLoginComponentActive, setLoginComponentActive] = useState(false);
  const [isHomeComponentActive, setHomeComponentActive] = useState(true);

  const isSupported = useScreenSupport();

  const SwitchAuthComponent = (e) => {
    setHomeComponentActive(false);
    if (e.target.innerHTML == "LOGIN") {
      setLoginComponentActive(true);
      setRegisterComponentActive(false);
    } else {
      setRegisterComponentActive(true);
      setLoginComponentActive(false);
    }
  };

  const StayOnHomePage = async () => {
    const res = await IsLoggedInAPI()
    if(!res.ok){
      console.warn('Something went wrong', res.msg)
      return
    }
    window.location.pathname = '/chat_home'
  };


  useEffect(() => {
    StayOnHomePage();
  }, []);

  return (
    <>
      {isSupported && (
        <>
          <div className="w-[100vw] h-[100vh] flex text-white select-none">
            {/* Home */}
            {isHomeComponentActive && (
              <div className="sm:w-[40vw] w-[100vw] h-[100vh] flex flex-col justify-center gap-2 px-5 ">
                <span className="font-medium sm:text-[3rem] lg:text-[5rem] text-[3rem] -mb-6 -ml-2">
                  AurBhaii
                </span>
                <p className="lg:text-lg sm:text-sm font-medium text-lg w-64">
                  An application to communicate to world, gaming and chill out
                  with friends
                </p>
                <div className="flex gap-4">
                  <Button
                    variant="primary"
                    children="LOGIN"
                    onClick={SwitchAuthComponent}
                  ></Button>
                  <Button
                    variant="secondary"
                    children="REGISTER"
                    onClick={SwitchAuthComponent}
                  ></Button>
                </div>
              </div>
            )}

            {isRegisterComponentActive && (
              <Register onClick={SwitchAuthComponent} />
            )}
            {isLoginComponentActive && <Login onClick={SwitchAuthComponent} />}

            {/* Image */}
            <div className="hidden md:flex w-[60vw] h-[100vh] flex-col justify-center items-center">
              <img
                src="/test1.png"
                alt=""
                className="w-[50vw] border border-border rounded-xl"
              />
              <img
                src="/test2.png"
                alt=""
                className="absolute w-[30vw] border border-border rounded-xl ml-44 mt-32 lg:ml-64 xl:mt-56 xl:ml-80"
              />
            </div>
          </div>
        </>
      )}

      {!isSupported && <NotSupportedPage/>}
    </>
  );
}
