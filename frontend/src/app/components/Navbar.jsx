"use client";
import React from "react";
import Link from "next/link";
import { useState } from "react";

// Components
import Search from "./Search";
import SGCard from "./SGCard";

// Stores
import useUserStore from "../store/useUserStore";
import useServerStore from "../store/useServerStore";

const Navbar = () => {
  const profile_pic = useUserStore((state) => state.profile_pic);
  const username = useUserStore((state) => state.username);
  const name = useUserStore((state) => state.name);

  // Server Store
  const servers = useServerStore((state) => state.servers);

  // States
  const [isSeacrh, setSeacrh] = useState(false)

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

  const ActiveSearch = () => {
    setSeacrh(true)
  }

  return (
    <nav className="hidden sm:flex xl:w-[24vw] bg-background w-[6vw] h-[100vh] flex-col select-none gap-2 items-center">
      {/* User Profile */}
      <Link href={"/settings/account"}>
        <div className="flex xl:w-[23vw] w-fit h-fit items-center gap-2 px-1 py-1 cursor-pointer hover:bg-primary-nav-hover mt-2 rounded-xl transition-all">
          <img
            src={profile_pic ? profile_pic : "/user-icon.png"}
            alt="Profile Pic"
            className="w-12 rounded-full"
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
          <div className="flex items-center justify-start gap-3 hover:bg-primary-nav-hover group py-1 px-1 cursor-pointer transition-all rounded-lg">
            <img src="/search-icon.png" alt="search" className="xl:w-6" />
            <button className="hidden xl:block text-lg font-semibold transition-all group-hover:text-white" onClick={ActiveSearch}>
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
            </Link>
          ))}
        </div>

        {/* Visible on smaller than xl(1280px) screens */}
        <div className="flex-col w-full h-fit gap-3 items-center flex xl:hidden">
          {/* Search Button */}
          <div className="">
            <img src="/search-icon.png" alt="search" className="" />
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
                className="w-7"
              />
            </Link>
          ))}
        </div>
      </div>

      {/* Options Header */}
      <div className="w-fit xl:flex xl:gap-2 xl:py-2 xl:px-2 xl:items-center xl:justify-between xl:w-[23vw] border border-border rounded-lg">
        <img src="/arrow-icon.png" alt="" className="w-6 xl:hidden" />
        <button className="hidden xl:block xl:text-[10px] xl:font-semibold hover:bg-primary-nav-hover transition-all xl:text-black xl:bg-white xl:px-2 xl:py-1 xl:rounded-md">
          SERVERS
        </button>
        <button className="hidden xl:block xl:text-[10px] xl:font-semibold hover:bg-primary-nav-hover transition-all xl:px-2 xl:py-1 xl:rounded-md xl:text-white">
          DIRECT MESSAGE
        </button>
        <button className="hidden xl:block xl:text-[10px] xl:font-semibold hover:bg-primary-nav-hover transition-all xl:px-2 xl:py-1 xl:rounded-md xl:text-white">
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
        {servers.map((server) => (
          <Link href={`/chat_home/server/${server._id}`} key={server._id}>
            <SGCard name={server.server_name} icon={server.server_icon}/>
          </Link>
        ))}
      </div>

      <Search/>
    </nav>
  );
};

export default Navbar;
