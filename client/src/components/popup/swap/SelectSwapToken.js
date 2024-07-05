import React from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import PopupLayout from "../PopupLayout";
import { IoClose } from "react-icons/io5";
import { withComma } from "../../../utils/textUtil";

const SelectSwapToken = ({
  setTopTokenSwapOpen,
  setBottomTokenSwapOpen,
  topTokenSwapOpen,
  bottomTokenSwapOpen,
  selectedTopToken,
  selectedBottomToken,
  setSelectedTopToken,
  setSelectedBottomToken,
}) => {
  const { t } = useTranslation();

  const { balance } = useSelector((state) => state.balance);

  const selectTokenHandler = (token) => {
    // 상단 토큰 선택 시
    if (topTokenSwapOpen) {
      setSelectedTopToken(token); // 선택한 토큰으로 상단 토큰 state 변경
      if (token === selectedBottomToken) {
        setSelectedBottomToken(""); // 같은 토큰을 선택한 경우 최초 선택했던 토큰 값 초기화
      }
      setTopTokenSwapOpen(false); // 팝업 닫기
    }

    // 하단 토큰 선택 시
    if (bottomTokenSwapOpen) {
      setSelectedBottomToken(token); // 선택한 토큰으로 하단 토큰 state 변경
      if (selectedTopToken === token) {
        setSelectedTopToken(""); // 같은 토큰을 선택한 경우 최초 선택했던 토큰 값 초기화
      }
      setBottomTokenSwapOpen(false); // 팝업 닫기
    }
  };

  const onCloseHandler = () => {
    if (topTokenSwapOpen) {
      setTopTokenSwapOpen(false);
    }

    if (bottomTokenSwapOpen) {
      setBottomTokenSwapOpen(false);
    }
  };

  return (
    <PopupLayout className="w-full md:w-[450px] h-[550px] flex flex-col justify-between">
      <div>
        <div className="flex justify-between pb-8 border-b border-gray-300">
          <p className="text-lg font-bold text-gray-700">
            {t("layerPopup.selectToken")}
          </p>
          <button type="button" onClick={onCloseHandler}>
            <IoClose className="text-2xl text-gray-700" />
          </button>
        </div>

        <div className="flex justify-between items-center text-sm text-gray-700 font-semibold my-6 px-4">
          <span>{t("swapScreen.token")}</span>
          <span>{t("swapScreen.balance")}</span>
        </div>

        <div className="space-y-4">
          <button
            type="button"
            onClick={() => selectTokenHandler("qtbk")}
            className={`w-full flex justify-between items-center bg-gray-100 rounded-md shadow-md px-2 py-4 md:p-4 hover:brightness-95 duration-300 ${
              topTokenSwapOpen &&
              selectedTopToken === "qtbk" &&
              "border border-[#246bea]"
            } ${
              bottomTokenSwapOpen &&
              selectedBottomToken === "qtbk" &&
              "border border-[#246bea]"
            }`}
          >
            <div className="flex items-center space-x-2">
              <img
                src="/images/qtbk.png"
                alt="qtbk"
                className="w-8 h-8 rounded-full shadow-md"
              />
              <div className="flex flex-col items-start">
                <span className="text-sm text-gray-700 font-semibold">
                  {t("swapScreen.qtbk")}
                </span>
                <span className="text-xs text-gray-500">QTBK</span>
              </div>
            </div>
            <span className="text-gray-500 text-sm">
              {withComma(balance.qtbk)}
            </span>
          </button>
          <button
            type="button"
            onClick={() => selectTokenHandler("qtbg")}
            className={`w-full flex justify-between items-center bg-gray-100 rounded-md shadow-md px-2 py-4 md:p-4 hover:brightness-95 duration-300 ${
              topTokenSwapOpen &&
              selectedTopToken === "qtbg" &&
              "border border-[#246bea]"
            } ${
              bottomTokenSwapOpen &&
              selectedBottomToken === "qtbg" &&
              "border border-[#246bea]"
            }`}
          >
            <div className="flex items-center space-x-2">
              <img
                src="/images/qtbg.png"
                alt="qtbg"
                className="w-8 h-8 rounded-full shadow-md"
              />
              <div className="flex flex-col items-start">
                {/* PC */}
                <span className="text-sm text-gray-700 font-semibold hidden md:inline-block">
                  {t("swapScreen.qtbg")}
                </span>
                {/* Mobile */}
                <span className="text-sm text-gray-700 font-semibold md:hidden">
                  {t("swapScreen.qtbg2")}
                </span>
                <span className="text-xs text-gray-500">QTBG</span>
              </div>
            </div>
            <span className="text-gray-500 text-sm">
              {withComma(balance.qtbg)}
            </span>
          </button>
          <button
            type="button"
            onClick={() => selectTokenHandler("kusdt")}
            className={`w-full flex justify-between items-center bg-gray-100 rounded-md shadow-md px-2 py-4 md:p-4 hover:brightness-95 duration-300 ${
              topTokenSwapOpen &&
              selectedTopToken === "kusdt" &&
              "border border-[#246bea]"
            } ${
              bottomTokenSwapOpen &&
              selectedBottomToken === "kusdt" &&
              "border border-[#246bea]"
            }`}
          >
            <div className="flex items-center space-x-2">
              <img
                src="/images/kusdt.png"
                alt="kusdt"
                className="w-8 h-8 rounded-full shadow-md"
              />
              <div className="flex flex-col items-start">
                <span className="text-sm text-gray-700 font-semibold">
                  {t("swapScreen.kusdt")}
                </span>
                <span className="text-xs text-gray-500">KUSDT</span>
              </div>
            </div>
            <span className="text-gray-500 text-sm">
              {withComma(balance.kusdt)}
            </span>
          </button>
        </div>
      </div>
    </PopupLayout>
  );
};

export default SelectSwapToken;
