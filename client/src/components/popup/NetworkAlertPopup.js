import React from "react";
import { useTranslation } from "react-i18next";
import PopupLayout from "./PopupLayout";
import { IoClose } from "react-icons/io5";
import { RiErrorWarningFill } from "react-icons/ri";

const NetworkAlertPopup = ({ setNetworkAlertPopupOpen }) => {
  const { t } = useTranslation();

  return (
    <PopupLayout className="w-[580px]">
      <div className="space-y-10">
        <div className="flex justify-between mb-10">
          <h3 className="text-base md:text-xl text-gray-700 font-semibold">
            {t("network.title")}
          </h3>
          <button type="button" onClick={() => setNetworkAlertPopupOpen(false)}>
            <IoClose className="text-2xl text-gray-700" />
          </button>
        </div>

        <div className="flex flex-col justify-center items-center space-y-6">
          <RiErrorWarningFill className="text-3xl md:text-5xl text-red-400" />
          <p className="text-red-400 text-center text-sm md:text-base">
            {t("network.subtitle")}
          </p>
          <p className="text-gray-500 text-xs md:text-sm">
            {t("network.message")}
          </p>
        </div>
      </div>
    </PopupLayout>
  );
};

export default NetworkAlertPopup;
