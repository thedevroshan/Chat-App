"use client";
import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";

// Components
import SGDMCard from "./SGDMCard";
import ProfilePic from "./ProfilePic";

// Stores
import useUserStore from "../store/useUserStore";
import useServerStore from "../store/useServerStore";
import useAppStore from "../store/useAppStore";
import useNotificationStore from "../store/useNotificationStore";

// API
import { GetAllFriendsAPI, GetUserServersAPI } from "../../../api/userAPI";

// Socket
import { useSocket } from "../contexts/useSocketContext";

const Navbar = () => {
  const profile_pic = useUserStore((state) => state.profile_pic);
  const username = useUserStore((state) => state.username);
  const name = useUserStore((state) => state.name);
  const friends = useUserStore((state) => state.friends);
  const setFriends = useUserStore((state) => state.setFriends);

  // Server Store
  const servers = useServerStore((state) => state.servers);
  const setServer = useServerStore((state) => state.setServer);

  // App Store
  const isSearch = useAppStore((state) => state.isSearch);
  const setSearch = useAppStore((state) => state.setSearch);
  const setSearching = useAppStore((state) => state.setSearching);
  const navbarListOption = useAppStore((state) => state.navbarListOption);
  const setNavbarListOption = useAppStore((state) => state.setNavbarListOption);

  // Notification Store
  const notifications = useNotificationStore((state) => state.notifications);
  const setNotification = useNotificationStore((state) => state.setNotification);
  const setShowNotificationCount = useNotificationStore((state) => state.setShowNotificationCount);
  const showNotificationCount = useNotificationStore((state) => state.showNotificationCount);

  // States
  const [isSmallListOption, setSmallListOption] = useState(false);

  // Socket
  const { socket } = useSocket();

  const NavLinks = [
    {
      name: "Notifications",
      icon: "/notification-icon.png",
      path: "/notification",
    },
    {
      name: "Spaces",
      icon: "/spaces-icon.png",
      path: "/spaces",
    },
    {
      name: "Pendings",
      icon: "/pending-icon.png",
      path: "/pendings",
    },
    {
      name: "Blocked",
      icon: "/blocked-icon.png",
      path: "/blocked",
    },
    {
      name: "Settings",
      icon: "/settings-icon.png",
      path: "/settings/account",
    },
  ];

  const GetAllFriends = async () => {
    const res = await GetAllFriendsAPI();
    if (!res.ok) {
      console.log(res.msg);
      return;
    }
    setFriends(res.data);
  };

  const GetAllServers = async () => {
    const res = await GetUserServersAPI();
    if (!res.ok) {
      console.warn("Something went wrong", res.msg);
      return;
    }
    setServer(res.data);
  };

  useEffect(() => {
    GetAllFriends();
    GetAllServers();
    return () => {};
  }, []);

  // Socket
  useEffect(() => {
    if (socket) {
      socket.on("newFriendRequest", (request) => {
        setNotification(request);
        setShowNotificationCount(true)
      });
    }
    return () => {
      if(socket){
        socket.off('newFriendRequest')
      }
    };
  }, [socket]);

  return (
    <nav className="hidden sm:flex xl:w-[24vw] bg-background w-[6vw] h-[100vh] flex-col select-none gap-2 items-center">
      {/* User Profile */}
      <Link href={"/settings/account"}>
        <div className="flex xl:w-[23vw] w-fit h-fit items-center gap-2 px-1 py-1 cursor-pointer hover:bg-primary-nav-hover mt-2 rounded-xl transition-all">
          <ProfilePic
            profile_pic={profile_pic}
            defaultUserIcon={"/user-icon.png"}
            width={9}
            height={9}
            customStyle={"md:w-10 md:h-10 xl:w-12 xl:h-12"}
          />

          <div className="flex-col h-fit hidden xl:flex">
            <span className="text-lg font-semibold xl:text-white">{name}</span>
            <span className="text-sm text-secondary-text font-semibold">
              {username}
            </span>
          </div>
        </div>
      </Link>

      {/* Nav Links */}
      <div className="flex flex-col w-full h-fit px-2 text-secondary-text gap-1">
        {/* Visible on xl(1280px) or bigger screens  */}
        <div className="flex-col w-full h-fit gap-1 hidden xl:flex">
          {/* Search Button */}
          <div
            className="flex items-center justify-start gap-3 hover:bg-primary-nav-hover group py-1 px-1 cursor-pointer transition-all rounded-lg"
            onClick={() => {
              setSearch(!isSearch);
              setSearching(false);
            }}
          >
            <img src="/search-icon.png" alt="search" className="xl:w-6" />
            <button className="hidden xl:block text-lg font-semibold transition-all group-hover:text-white">
              Search
            </button>
          </div>

          {/* Links */}
          {NavLinks.map((element) => (
            <Link
              key={element.name}
              href={element.path}
              className={`text-lg font-semibold flex w-full h-fit gap-2 py-1 px-1 rounded-lg  cursor-pointer group transition-all items-center justify-start hover:bg-primary-nav-hover hover:text-white`}
              onClick={(e) => {
                window.location.pathname.split("/")[1];
              }}
            >
              <img
                key={element.name}
                src={element.icon}
                alt={element.name}
                className="w-6"
              />
              {element.name}

              {notifications.length > 0 && element.name == 'Notifications' && showNotificationCount && (
                <span className="ml-auto mr-2 text-black rounded-full w-7 h-7 text-center bg-white">
                  {notifications.length <= 9
                    ? notifications.length
                    : "9+"}
                </span>
              )}
            </Link>
          ))}
        </div>

        {/* Visible on smaller than xl(1280px) screens */}
        <div className="flex-col w-full h-fit gap-3 items-center flex xl:hidden">
          {/* Search Button */}
          <div
            className="cursor-pointer"
            onClick={() => {
              setSearch(!isSearch);
              setSearching(false);
            }}
          >
            <img
              src="/search-icon.png"
              alt="search"
              className="w-12 lg:w-8 md:w-7"
            />
            <button className="hidden xl:block text-lg font-semibold transition-all group-hover:text-white">
              Search
            </button>
          </div>

          {/* Links */}
          {NavLinks.map((element) => (
            <Link key={element.name} href={element.path} className="">
              <img
                key={element.name}
                src={element.icon}
                alt={element.name}
                className="w-12 lg:w-8 md:w-7"
              />
            </Link>
          ))}
        </div>
      </div>

      {/* Options Header */}
      <div className="w-fit xl:flex xl:gap-2 xl:py-2 xl:px-2 xl:items-center xl:justify-between xl:w-[23vw] border border-border rounded-lg">
        <img
          src="/arrow-icon.png"
          alt=""
          className={`w-6 xl:hidden cursor-pointer transition-all ${
            isSmallListOption ? "rotate-180" : ""
          }`}
          onClick={() => {
            setSmallListOption(!isSmallListOption);
          }}
        />

        <div
          className={`flex flex-col xl:hidden bg-background border border-border w-56 h-64 absolute md:mx-[6vw] lg:mx-[5vw] mx-[8vw] -mt-4 lg:-mt-6 rounded-xl ${
            isSmallListOption
              ? "-translate-x-1 opacity-100"
              : "-translate-x-8 opacity-0"
          } transition-all px-2 py-2 gap-2`}
        >
          <button
            className={`w-full h-fit font-semibold py-2 rounded-xl  ${
              navbarListOption == "servers"
                ? "text-black bg-white"
                : "hover:bg-primary-nav-hover text-white"
            }`}
            onClick={() => {
              setNavbarListOption("servers");
            }}
          >
            SERVERS
          </button>

          <button
            className={`w-full h-fit font-semibold py-2 rounded-xl  ${
              navbarListOption == "directMessage"
                ? "text-black bg-white"
                : "hover:bg-primary-nav-hover text-white"
            }`}
            onClick={() => {
              setNavbarListOption("directMessage");
            }}
          >
            DIRECT MESSAGE
          </button>

          <button
            className={`w-full h-fit font-semibold py-2 rounded-xl  ${
              navbarListOption == "groups"
                ? "text-black bg-white"
                : "hover:bg-primary-nav-hover text-white"
            }`}
            onClick={() => {
              setNavbarListOption("groups");
            }}
          >
            GROUPS
          </button>

          <div className="hover:bg-primary-nav-hover flex w-full h-fit items-center justify-center py-2 rounded-xl cursor-pointer transition-all">
            <Image
              width={32}
              height={32}
              alt="Create Button"
              src={"/create-icon.png"}
            />
          </div>
        </div>

        <button
          className={`hidden xl:block xl:text-[10px] xl:font-semibold transition-all xl:text-black xl:px-2 xl:py-1 xl:rounded-md ${
            navbarListOption == "servers"
              ? "xl:bg-white"
              : "hover:bg-primary-nav-hover xl:text-white"
          }`}
          onClick={() => {
            setNavbarListOption("servers");
          }}
        >
          SERVERS
        </button>
        <button
          className={`hidden xl:block xl:text-[10px] xl:font-semibold transition-all xl:px-2 xl:py-1 xl:rounded-md ${
            navbarListOption == "directMessage"
              ? "xl:bg-white"
              : "hover:bg-primary-nav-hover xl:text-white"
          }`}
          onClick={() => {
            setNavbarListOption("directMessage");
          }}
        >
          DIRECT MESSAGE
        </button>
        <button
          className={`hidden xl:block xl:text-[10px] xl:font-semibold transition-all xl:px-2 xl:py-1 xl:rounded-md ${
            navbarListOption == "groups"
              ? "xl:bg-white"
              : "hover:bg-primary-nav-hover xl:text-white"
          }`}
          onClick={() => {
            setNavbarListOption("groups");
          }}
        >
          GROUPS
        </button>
        <img
          src="/create-icon.png"
          alt=""
          className="hidden xl:block w-4 cursor-pointer"
        />
      </div>

      {/* List of Servers, Direct Messsage and Groups*/}
      <div className="w-full h-full flex flex-col items-center bg-background overflow-y-scroll overflow-x-hidden scrollbar-hidden">
        {navbarListOption == "servers" &&
          servers.map((server) => (
            <Link href={`/chat_home/server/${server._id}`} key={server._id}>
              <SGDMCard name={server.server_name} icon={server.server_icon} />
            </Link>
          ))}

        {navbarListOption == "directMessage" &&
          friends.map((friend) => (
            <Link
              href={`/chat_home/directmessage/${friend._id}`}
              key={friend._id}
            >
              <SGDMCard name={friend.name} icon={friend.profile_pic} />
            </Link>
          ))}
      </div>
    </nav>
  );
};

export default Navbar;
