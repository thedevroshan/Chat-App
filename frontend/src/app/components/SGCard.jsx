import React from "react";

const SGCard = ({ icon, name, notificationCount }) => {
  return (
    <div className="w-fit xl:w-[23vw] h-fit py-1 px-1 flex items-center justify-between rounded-xl hover:bg-primary-nav-hover transition-all cursor-pointer">
      <div className="flex w-full h-fit gap-2 items-center">
        <img src={icon} alt="" className="rounded-xl w-12" />

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

export default SGCard;
