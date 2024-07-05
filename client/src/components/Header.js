import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import i18next from "i18next";
import BlockNumber from "./header/BlockNumber";
import Language from "./header/Language";
import More from "./header/More";
import logo from "../assets/images/logo.png";
import Navigation from "./header/Navigation";
import ConnectWallet from "./header/ConnectWallet";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import ConnectWalletMobile from "./header/ConnectWalletMobile";
import MobileNavagation from "./header/MobileNavagation";

const Header = ({ location }) => {
  const [language, setLanguage] = useState("en");
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    setShowMobileMenu(false);
  }, [location]);

  const changeLanguageHandler = (language) => {
    i18next.changeLanguage(language);
    setLanguage(language);
    setShowMobileMenu(false);
  };

  return (
    <header className="max-w-[1160px] w-full mx-auto flex flex-col space-y-4 py-2 z-50 px-6 lg:px-0 relative">
      <div className="hidden lg:flex justify-end items-center space-x-6 absolute right-0">
        {/* More */}
        <More />

        {/* Block Number */}
        <BlockNumber />

        {/* Language */}
        <Language />
      </div>
      <div className="justify-center hidden md:flex">
        <Link to="/" className="flex items-center gap-x-4">
          <img
            src="/images/zyno.jpg"
            alt="zynoro"
            width={40}
            className="rounded-full"
          />
          <h1 className="text-primary text-2xl font-bold">ZYNORO</h1>
        </Link>
      </div>
      <div className="text-white flex justify-between items-center">
        {/* Navigation */}
        <Navigation />

        {/* Connect Wallet */}
        <ConnectWallet />

        <div
          className="lg:hidden cursor-pointer"
          onClick={() => setShowMobileMenu(true)}
        >
          <AiOutlineMenu className="text-white text-2xl" />
        </div>
        <div
          className={`${
            showMobileMenu ? "block" : "hidden"
          } absolute top-0 right-0 w-screen h-screen bg-black/70`}
        >
          <div className="text-black flex justify-center items-center px-6 pt-6">
            <div className="max-w-[480px] w-full bg-gray-100 rounded-md py-4">
              <div className="flex justify-end items-center px-4 pb-4">
                <AiOutlineClose
                  className="text-gray-700 text-xl"
                  onClick={() => setShowMobileMenu(false)}
                />
              </div>
              <div className="flex justify-between items-center px-4 mb-4">
                <BlockNumber />
                <div className="space-x-2">
                  <button
                    type="button"
                    onClick={() => changeLanguageHandler("en")}
                    className={`text-sm bg-white py-1 px-4 shadow-md rounded-md ${
                      language === "en"
                        ? "text-primary font-semibold"
                        : "text-gray-700"
                    }`}
                  >
                    EN
                  </button>
                  <button
                    type="button"
                    onClick={() => changeLanguageHandler("kr")}
                    className={`text-sm bg-white py-1 px-4 shadow-md rounded-md ${
                      language === "kr"
                        ? "text-primary font-semibold"
                        : "text-gray-700"
                    }`}
                  >
                    KR
                  </button>
                </div>
              </div>
              <ConnectWalletMobile />
              <MobileNavagation />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default withRouter(Header);
