import React from "react";
import { RiArrowDownSFill } from "react-icons/ri";

const More = () => {
  return (
    <div className="relative group cursor-pointer">
      <div className="text-sm text-white flex items-center space-x-1 py-2">
        <span>More</span>
        <RiArrowDownSFill className="group-hover:rotate-180 duration-300" />
      </div>
      <ul className="absolute top-8 -left-5 bg-white text-gray-700 text-sm p-4 rounded-md space-y-1 hidden group-hover:block shadow-lg">
        <li className="hover:text-primary">
          <a
            href="https://docs.quantfi.io"
            target="_blank"
            rel="noopener noreferrer"
          >
            Docs
          </a>
        </li>
        <li className="hover:text-primary">
          <a
            href="https://medium.com/@quantbook"
            target="_blank"
            rel="noopener noreferrer"
          >
            Medium
          </a>
        </li>
        <li className="hover:text-primary">
          <a
            href="https://t.me/quantbook_official_chat"
            target="_blank"
            rel="noopener noreferrer"
          >
            Telegram
          </a>
        </li>
      </ul>
    </div>
  );
};

export default More;
