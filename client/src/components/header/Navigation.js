import React from "react";
import { Link, withRouter } from "react-router-dom";
import { RiArrowDownSFill } from "react-icons/ri";

const Navigation = ({ location }) => {
  return (
    <div className="hidden lg:block">
      <nav className="">
        <ul className="flex items-center space-x-14">
          <li
            className={`hover:border-b border-primary hover:text-primary ${
              location.pathname === "/" && "text-primary font-semibold border-b"
            }`}
          >
            <Link to="/">Home</Link>
          </li>
          <li
            className={`hover:border-b border-primary hover:text-primary cursor-pointer group relative flex items-center space-x-1 ${
              location.pathname.includes("/pools") &&
              "text-primary font-semibold border-b"
            }`}
          >
            <span>Pools</span>
            <RiArrowDownSFill className="group-hover:rotate-180 duration-300" />
            <div className="absolute top-4 -left-3 pt-4">
              <div className=" p-4 pr-5 bg-white rounded-md hidden group-hover:block shadow-lg">
                <ul className="space-y-2">
                  <li
                    className={`text-gray-700 text-sm font-normal hover:text-primary ${
                      location.pathname === "/pools/single" && "text-primary"
                    }`}
                  >
                    <Link to="/pools/single">Single</Link>
                  </li>
                  <li
                    className={`text-gray-700 text-sm font-normal hover:text-primary ${
                      location.pathname === "/pools/pair" && "text-primary"
                    }`}
                  >
                    <Link to="/pools/pair">Pair</Link>
                  </li>
                </ul>
              </div>
            </div>
          </li>
          {/* <li
            className={`hover:border-b border-primary hover:text-primary ${
              location.pathname.includes("/swap") &&
              "text-primary font-semibold border-b"
            }`}
          >
            <Link to="/swap">Swap</Link>
          </li>
          <li
            className={`hover:border-b border-primary hover:text-primary ${
              location.pathname.includes("/myasset") &&
              "text-primary font-semibold border-b"
            }`}
          >
            <Link to="/myasset">My Asset</Link>
          </li>
          <li
            className={`hover:border-b border-primary hover:text-primary ${
              location.pathname.includes("/dashboard") &&
              "text-primary font-semibold border-b"
            }`}
          >
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li
            className={`hover:border-b border-primary hover:text-primary ${
              location.pathname.includes("/p2e") &&
              "text-primary font-semibold border-b"
            }`}
          >
            <Link to="/p2e">P2E</Link>
          </li> */}
        </ul>
      </nav>
    </div>
  );
};

export default withRouter(Navigation);
