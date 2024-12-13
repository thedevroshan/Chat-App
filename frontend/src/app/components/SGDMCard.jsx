import React from "react";

// Components
import ProfilePic from "./ProfilePic";

const SGDMCard = ({ icon, name, notificationCount }) => {
  return (
    <div className="w-fit xl:w-[23vw] h-fit py-2 px-2 flex items-center justify-between rounded-2xl hover:bg-primary-nav-hover transition-all cursor-pointer">
      <div className="flex w-full h-fit gap-2 items-center">
        <ProfilePic profile_pic={icon} defaultUserIcon={'/user-icon.png'} width={9} height={9} customStyle={'md:w-10 md:h-10 xl:w-12 xl:h-12'}/>

        <input className="hidden xl:block text-white text-lg bg-transparent border-none outline-none cursor-pointer select-none" readOnly value={name}/>
      </div>

      {/* Notification */}
      <div className={`hidden xl:flex rounded-3xl ${notificationCount > 9?'px-1':'px-2'} bg-white`}>
        <span className={`text-black`}>
          {notificationCount > 9 ? "9+" : notificationCount}
        </span>
      </div>
    </div>
  );
};

export default SGDMCard;
