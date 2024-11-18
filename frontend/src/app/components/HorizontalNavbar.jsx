import React from "react";
import Link from "next/link";

const HorizontalNavbar = () => {
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
      path: "/settings",
    },
  ];

  return (
    <nav className="bg-background w-full h-[8vh] fixed top-[92%] flex items-center px-2 py-1 sm:hidden">
      {/* Visible on smaller than xl(1280px) screens */}
      <div className="w-full h-fit items-center flex">
        {NavLinks.map((element) => (
          <Link
            key={element.name}
            href={element.path}
            className="text-lg font-semibold flex w-full h-fit gap-2 py-1 px-1 rounded-lg hover:bg-primary-nav-hover cursor-pointer group transition-all items-center justify-center"
          >
            <img
              key={element.name}
              src={element.icon}
              alt={element.name}
              className="w-6"
            />
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default HorizontalNavbar;
