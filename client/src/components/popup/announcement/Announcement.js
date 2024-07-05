import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import moment from "moment";
import PopupLayout from "../PopupLayout";
import { AiOutlineCheck } from "react-icons/ai";

const Announcement = ({ setAnnouncementPopupOpen }) => {
  const { t } = useTranslation();

  const [isChecked, setIsChecked] = useState(undefined);
  const [afterSevendays, setAfterSevendays] = useState(false);

  const confirmAnnouncementHandler = () => {
    if (isChecked !== true) {
      setIsChecked(false);
      return;
    }

    if (afterSevendays) {
      localStorage.setItem(
        "qfi_announcement",
        moment(new Date().getTime()).add("7", "d").unix()
      );
    } else {
      localStorage.setItem(
        "qfi_announcement",
        moment(new Date().getTime()).add("1", "d").unix()
      );
    }

    setAnnouncementPopupOpen(false);
  };

  return (
    <PopupLayout className="w-[580px]">
      <div className="z-30">
        <div className="flex justify-between items-center">
          <p className="text-lg md:text-2xl font-semibold pb-4">
            Risk & Security
          </p>
          <select
            defaultValue="en"
            onChange={(e) => i18next.changeLanguage(e.target.value)}
            className="focus:outline-none border border-gray-500 p-1 text-xs md:text-base"
          >
            <option value="en">EN</option>
            <option value="kr">KR</option>
          </select>
        </div>
        <p className="text-sm md:text-base pb-6">
          {t("announcement.subtitle")}
        </p>
        <ul className="pl-[20px] pb-6 max-h-[240px] md:max-h-screen overflow-scroll mb-6 md:mb-0">
          <li className="list-disc text-gray-500 pb-4">
            <p className="text-xs md:text-sm font-nromal">
              {t("announcement.message1")}
            </p>
          </li>
          <li className="list-disc text-gray-500 pb-4">
            <p className="text-xs md:text-sm font-normal">
              {t("announcement.message2")}
            </p>
          </li>
          <li className="list-disc text-gray-500 pb-4">
            <p className="text-xs md:text-sm font-normal">
              {t("announcement.message3")}
            </p>
          </li>
          <li className="list-disc text-gray-500 pb-4">
            <p className="text-xs md:text-sm font-normal">
              {t("announcement.message4")}
            </p>
          </li>
        </ul>
        <div className="border border-gray-300 p-4">
          <label className="flex justify-center items-center cursor-pointer">
            <input
              type="checkbox"
              className="hidden"
              value={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
            />
            <div
              className={`w-5 md:w-7 h-5 md:h-7 flex justify-center items-center rounded-full border border-gray-300 ${
                isChecked && "bg-[#246bea]"
              }`}
            >
              {isChecked ? (
                <AiOutlineCheck className="text-xs md:text-base text-white" />
              ) : (
                <AiOutlineCheck className="text-xs md:text-base text-gray-300" />
              )}
            </div>
            <p className="w-[90%] text-xs md:text-sm ml-2 md:ml-4 font-semibold">
              {t("announcement.agreement")}
            </p>
          </label>
        </div>
        {isChecked === false && (
          <p className="text-xs text-red-500 pt-2 font-semibold">
            {t("announcement.alertMessage")}
          </p>
        )}

        <div className="mt-8 md:mt-16 pb-8">
          <label className="flex justify-start items-center cursor-pointer">
            <input
              type="checkbox"
              className="hidden"
              value={afterSevendays}
              onChange={(e) => setAfterSevendays(e.target.checked)}
            />
            <div
              className={`w-4 md:w-5 h-4 md:h-5 flex justify-center items-center rounded-sm border border-gray-300 ${
                afterSevendays && "bg-[#246bea]"
              }`}
            >
              {afterSevendays ? (
                <AiOutlineCheck className="text-xs md:text-base text-white" />
              ) : (
                <AiOutlineCheck className="text-xs md:text-base text-gray-300" />
              )}
            </div>
            <p className="text-sm ml-2 md:ml-4 text-black/70">
              {t("announcement.checkSevendays")}
            </p>
          </label>
        </div>

        <button
          className="w-full py-3 bg-[#246bea] text-white rounded-sm"
          onClick={confirmAnnouncementHandler}
        >
          {t("announcement.confirm")}
        </button>
      </div>
    </PopupLayout>
  );
};

export default Announcement;
