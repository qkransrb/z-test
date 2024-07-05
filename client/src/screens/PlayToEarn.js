import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AnimaOfQuantmix from "../assets/videos/anima.mp4";
import { BiLinkExternal } from "react-icons/bi";

const P2E = () => {
  const { t } = useTranslation();

  return (
    <Fragment>
      <video
        muted
        autoPlay
        loop
        className="xl:fixed top-0 left-0 w-full xl:opacity-70 mt-20 mb-40 xl:my-0 rounded-md xl:rounded-none"
      >
        <source src={AnimaOfQuantmix} type="video/mp4" />
      </video>

      <div className="md:absolute bottom-28 right-10 lg:bottom-20 lg:right-32 xl:bottom-32 xl:right-44 flex flex-col justify-center items-center space-y-10">
        <div className="flex gap-4">
          <div className="relative group text-xl md:text-2xl min-w-[150px] md:min-w-[200px] text-center text-[#246bea] bg-white rounded-full shadow-lg font-bold px-6 py-1 md:py-2 hover:text-white hover:bg-[#246bea] duration-300 cursor-pointer">
            Exchange
            <div className="absolute hidden group-hover:flex top-0 left-0 w-full h-full bg-gray-700 rounded-full text-xl md:text-2xl text-white justify-center items-center">
              Coming Soon
            </div>
          </div>
          <div className="relative group text-xl md:text-2xl min-w-[150px] md:min-w-[200px] text-center text-[#246bea] bg-white rounded-full shadow-lg font-bold px-6 py-1 md:py-2 hover:text-white hover:bg-[#246bea] duration-300 cursor-pointer">
            History
            <div className="absolute hidden group-hover:flex top-0 left-0 w-full h-full bg-gray-700 rounded-full text-xl md:text-2xl text-white justify-center items-center">
              Coming Soon
            </div>
          </div>
        </div>
        {/* <a
          href="https://anima.quantfi.io"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm md:text-xl text-white hover:text-[#246bea] hover:underline duration-300"
        >
          <span>{t("p2eScreen.linkTo")}</span>
          <BiLinkExternal />
        </a> */}
      </div>
    </Fragment>
  );
};

export default P2E;
