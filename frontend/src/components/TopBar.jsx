import React from "react";
import Header from "./Header"; // right side (avatar)

const TopBar = ({ children }) => {
  return (
    <div className="fixed top-0 left-0 w-full flex justify-between px-4 h-[94px] border-b bg-gray-900 border-gray-700  z-50">
      <div className="flex items-center w-full gap-4 ">
        {children} {/* dynamic module header */}
      </div>
      <div>
        <Header /> {/* static right side */}
      </div>
    </div>
  );
};

export default TopBar;
