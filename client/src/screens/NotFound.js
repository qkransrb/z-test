import React from "react";
import { IoWarningOutline } from "react-icons/io5";

const NotFound = () => {
  return (
    <div className="w-full absolute top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%]">
      <div className="flex flex-col justify-center items-center gap-14">
        <div className="text-4xl md:text-5xl text-white font-bold">404</div>
        <div className="flex items-center gap-2">
          <IoWarningOutline className="text-xl md:text-3xl text-red-400" />
          <p className="text-white text-sm md:text-xl">
            The requested URL was not found on this server.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
