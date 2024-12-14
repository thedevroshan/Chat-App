"use client";
import React from "react";
import { useState } from "react";

// Stores
import useAppStore from "../store/useAppStore";
import useUserStore from "../store/useUserStore";

import SearchedUser from "./SearchedUser";

// API
import { SearchAPI } from "../../../api/userAPI";

// Context
import { useScreenSupport } from "../contexts/useScreenSupported";

const Search = () => {
  const isSupported = useScreenSupport()

  const isSearch = useAppStore((state) => state.isSearch);
  const setSearch = useAppStore((state) => state.setSearch);
  const isSearching = useAppStore((state) => state.isSearching);
  const setSearching = useAppStore((state) => state.setSearching);

  const requested = useUserStore(state => state.requested)
  const myId = useUserStore(state => state._id)

  // States
  const [fetchMsg, setFetchMsg] = useState({
    msg: "",
    ok: false,
  });
  const [searchedUser, setSearchedUser] = useState([]);

  const HandleChange = async (e) => {
    setSearching(true);
    if(e.target.value != ''){
      const res = await SearchAPI(e.target.value);
      if (!res.ok) {
        setFetchMsg({
          msg: res.msg,
          ok: res.ok,
        });
        return;
      }
      setSearchedUser(res.data)
      setFetchMsg({ msg: res.msg, ok: res.ok });
    }
  };

  const OnSearch = async (e) => {
    if (e.key == "Enter") {
    }
  };


  return (
    <>
      {isSearch && isSupported && (
        <div className={`absolute flex w-[60vw] items-start justify-center h-[50vh] mx-[20vw] -mt-56 xl:w-[42vw] xl:mx-[30vw]`}>
          <div className="h-full w-[93%] flex flex-col justify-start">
            <input
              type="text"
              placeholder="Search"
              className={`h-10 border-l border-t border-b border-border bg-background outline-none px-2 rounded-tl-xl ${
                isSearching ? "" : "rounded-bl-xl"
              } placeholder:text-secondary-text text-white`}
              onChange={HandleChange}
              onKeyDown={OnSearch}
            />

            {isSearching && (
              <div className="bg-background w-full h-[44vh] rounded-bl-xl rounded-br-xl border-b border-r border-l border-border overflow-x-hidden overflow-y-scroll gap-2">
                {!fetchMsg.ok && (
                  <div className="flex w-full h-full items-center justify-center">
                    <span className="text-secondary-text font-semibold text-lg text-center">
                      {fetchMsg.msg}
                    </span>
                  </div>
                )}

                {fetchMsg.ok && searchedUser.map((user)=>(
                  <SearchedUser key={user._id} username={user.username} name={user.name} profilePic={user.profile_pic} userId={user._id} isRequested={requested.includes(user._id)} isAcceptable={user.requested.includes(myId)} isFriend={user.friends.includes(myId)}/>
                ))}
              </div>
            )}
          </div>

          <img
            src="/cross-icon.png"
            alt=""
            className="bg-background px-2 py-2 w-[40px] border border-border rounded-tr-xl rounded-br-xl hover:bg-light-secondary cursor-pointer"
            onClick={() => {
              setSearch(false);
              setSearching(false);
            }}
          />
        </div>
      )}
    </>
  );
};

export default Search;
