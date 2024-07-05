import React from "react";
import { Link, withRouter } from "react-router-dom";
import { SiGitbook, SiMedium, SiTelegram } from "react-icons/si";

const MobileNavagation = ({ location }) => {
  return (
    <div className="flex flex-col p-4 space-y-4">
      <Link
        to="/"
        className={`${
          location.pathname === "/"
            ? "text-primary font-semibold"
            : "text-gray-700"
        } bg-white p-2 rounded-md shadow-md text-sm`}
      >
        Home
      </Link>
      <Link
        to="/pools/single"
        className={`${
          location.pathname === "/pools/single"
            ? "text-primary font-semibold"
            : "text-gray-700"
        } bg-white p-2 rounded-md shadow-md text-sm`}
      >
        Single Pool
      </Link>
      <Link
        to="/pools/pair"
        className={`${
          location.pathname.includes("/pools/pair")
            ? "text-primary font-semibold"
            : "text-gray-700"
        } bg-white p-2 rounded-md shadow-md text-sm`}
      >
        Pair Pool
      </Link>
      {/* <Link
        to="/swap"
        className={`${
          location.pathname === "/swap"
            ? "text-[#246bea] font-semibold"
            : "text-gray-700"
        } bg-white p-2 rounded-md shadow-md text-sm`}
      >
        Swap
      </Link>
      <Link
        to="/myasset"
        className={`${
          location.pathname === "/myasset"
            ? "text-[#246bea] font-semibold"
            : "text-gray-700"
        } bg-white p-2 rounded-md shadow-md text-sm`}
      >
        My Asset
      </Link>
      <Link
        to="/dashboard"
        className={`${
          location.pathname === "/dashboard"
            ? "text-[#246bea] font-semibold"
            : "text-gray-700"
        } bg-white p-2 rounded-md shadow-md text-sm`}
      >
        Dashboard
      </Link>
      <Link
        to="/p2e"
        className={`${
          location.pathname.includes("/p2e")
            ? "text-[#246bea] font-semibold"
            : "text-gray-700"
        } bg-white p-2 rounded-md shadow-md text-sm`}
      >
        P2E
      </Link> */}
      <div className="flex justify-between items-center">
        <a
          href="https://"
          target="_blank"
          rel="noopener noreferrer"
          className="w-[31%] flex justify-center items-center space-x-1 bg-white p-2 rounded-md shadow-md"
        >
          <SiGitbook className="text-xl text-primary" />
          <span className="text-sm text-gray-700">Docs</span>
        </a>

        <a
          href="https://medium.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-[31%] flex justify-center items-center space-x-1 bg-white p-2 rounded-md shadow-md"
        >
          <SiMedium className="text-xl text-primary" />
          <span className="text-sm text-gray-700">Medium</span>
        </a>

        <a
          href="https://t.me/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-[31%] flex justify-center items-center space-x-1 bg-white p-2 rounded-md shadow-md"
        >
          <SiTelegram className="text-xl text-primary" />
          <span className="text-sm text-gray-700">Telegram</span>
        </a>
      </div>
    </div>
  );
};

export default withRouter(MobileNavagation);
