import React from "react";

const OptionHeader = () => {
  return (
    <div className="w-fit xl:flex xl:gap-2 xl:py-2 xl:px-2 xl:items-center xl:justify-between xl:w-[23vw] border border-border rounded-lg">
      <img src="/arrow-icon.png" alt="" className="w-6 xl:hidden" />
      <button className="hidden xl:block xl:text-[10px] xl:font-semibold hover:bg-primary-nav-hover transition-all xl:text-black xl:bg-white xl:px-2 xl:py-1 xl:rounded-md">
        SERVERS
      </button>
      <button className="hidden xl:block xl:text-[10px] xl:font-semibold hover:bg-primary-nav-hover transition-all xl:px-2 xl:py-1 xl:rounded-md">
        DIRECT MESSAGE
      </button>
      <button className="hidden xl:block xl:text-[10px] xl:font-semibold hover:bg-primary-nav-hover transition-all xl:px-2 xl:py-1 xl:rounded-md">
        GROUPS
      </button>
      <img src="/create-icon.png" alt="" className="hidden xl:block w-4" />
    </div>
  );
};

export default OptionHeader;
