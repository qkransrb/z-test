import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Title from "../components/Title";
import { RiArrowUpDownLine } from "react-icons/ri";
import { GrFormNextLink } from "react-icons/gr";
import { fetchBalanceAction } from "../redux/actions/balanceAction";
import { withComma } from "../utils/textUtil";

const PlayToEarnExchange = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const { balance } = useSelector((state) => state.balance);

  const [topToken, setTopToken] = useState("qtbg");
  const [bottomToken, setBottomToken] = useState("ap");

  const [inputs, setInputs] = useState({
    topTokenAmount: "",
    bottomTokenAmount: "",
  });

  const { topTokenAmount, bottomTokenAmount } = inputs;

  useEffect(() => {
    dispatch(fetchBalanceAction());
  }, []);

  const exchangeHandler = () => {
    const tempTopToken = topToken;
    const tempBottomToken = bottomToken;

    setTopToken(tempBottomToken);
    setBottomToken(tempTopToken);

    setInputs({
      topTokenAmount: "",
      bottomTokenAmount: "",
    });
  };

  const maxButtonHandler = (symbol) => {
    if (symbol === "qtbg") {
      if (topToken === "qtbg") {
        setInputs({
          ...inputs,
          topTokenAmount: balance.qtbg,
        });
      } else {
        setInputs({
          ...inputs,
          bottomTokenAmount: balance.qtbg,
        });
      }
    }

    if (symbol === "ap") {
      if (topToken === "ap") {
        setInputs({
          ...inputs,
          topTokenAmount: "",
        });
      } else {
        setInputs({
          ...inputs,
          bottomTokenAmount: "",
        });
      }
    }
  };

  const onChangeHandler = (e) => {
    const value = e.target.value.replace(/[^0-9\.]$/g, "");

    setInputs({
      ...inputs,
      [e.target.name]: value,
    });
  };

  return (
    <div className="space-y-7 pb-14">
      <Title title="p2eScreen.title1" />
      <div className="max-w-[800px] w-full mx-auto bg-white rounded-lg shadow-md mt-24 py-8 px-6 md:px-10 space-y-4 md:space-y-6">
        <div className="flex items-center gap-6">
          <span className="text-base md:text-xl text-gray-700 font-semibold">{`${t(
            "p2eScreen.exchangeRate"
          )} (QTBG : AP)`}</span>
          <span className="text-lg md:text-3xl text-[#246bea] font-semibold">
            1 : 42
          </span>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end space-y-4 md:space-y-0">
          <div className="flex flex-col text-sm text-gray-500 gap-1">
            <span className="text-xs md:text-sm">
              {t("p2eScreen.oneTimeWithdrawLimit")}
            </span>
            <span className="text-xs md:text-sm">
              {t("p2eScreen.oneDayWithdrawLimit")}
            </span>
          </div>
          <Link
            to="/p2e/history"
            className="text-gray-700 text-xs md:text-sm hover:text-[#246bea] hover:underline duration-300 flex items-center gap-1"
          >
            <GrFormNextLink className="text-sm md:text-xl text-[#246bea]" />
            <span>{t("p2eScreen.history")}</span>
          </Link>
        </div>

        <div className="bg-gray-100 p-4 md:p-10 rounded-md shadow-md space-y-10">
          <div className="space-y-6">
            {/* Top Token */}
            <div className="space-y-2">
              <div className="flex items-center py-2 px-2 md:px-6 bg-white rounded-md shadow-md">
                <img
                  src={`/images/${topToken}.png`}
                  alt={topToken}
                  className="w-8 md:w-11 h-8 md:h-11 rounded-full shadow-md"
                />
                <input
                  type="text"
                  name="topTokenAmount"
                  value={topTokenAmount}
                  onChange={onChangeHandler}
                  placeholder="0"
                  className="min-w-[120px] flex-1 text-lg md:text-2xl text-gray-700 focus:outline-none placeholder:text-gray-300 px-4 bg-transparent"
                />
                <button
                  type="button"
                  onClick={() => maxButtonHandler(topToken)}
                  className="bg-[#246bea] text-white text-xs md:text-base rounded-md px-2 md:px-4 py-1 hover:brightness-125 duration-300"
                >
                  MAX
                </button>
              </div>
              <div className="flex items-center gap-2 md:gap-4 text-xs md:text-sm text-gray-500">
                <span>{t("p2eScreen.myBalance")}</span>
                {topToken === "qtbg" ? (
                  <span>{withComma(balance.qtbg)}</span>
                ) : (
                  <span>0</span>
                )}
              </div>
            </div>

            {/* Exchange Button */}
            <div className="flex justify-center items-center">
              <button
                type="button"
                onClick={exchangeHandler}
                className="border-2 border-[#b39c7d] text-[#b39c7d] rounded-full p-1 shadow-lg hover:bg-[#b39c7d] hover:text-white active:brightness-125 duration-300"
              >
                <RiArrowUpDownLine className="text-base md:text-2xl" />
              </button>
            </div>

            {/* Bottom Token */}
            <div className="space-y-2">
              <div className="flex items-center py-2 px-2 md:px-6 bg-white rounded-md shadow-md">
                <img
                  src={`/images/${bottomToken}.png`}
                  alt={bottomToken}
                  className="w-8 md:w-11 h-8 md:h-11 rounded-full shadow-md"
                />
                <input
                  type="text"
                  name="bottomTokenAmount"
                  value={bottomTokenAmount}
                  onChange={onChangeHandler}
                  placeholder="0"
                  className="min-w-[120px] flex-1 text-lg md:text-2xl text-gray-700 focus:outline-none placeholder:text-gray-300 px-4 bg-transparent"
                />
                <button
                  type="button"
                  onClick={() => maxButtonHandler(bottomToken)}
                  className="bg-[#246bea] text-white text-xs md:text-base rounded-md px-2 md:px-4 py-1 hover:brightness-125 duration-300"
                >
                  MAX
                </button>
              </div>
              <div className="flex items-center gap-2 md:gap-4 text-xs md:text-sm text-gray-500">
                <span>{t("p2eScreen.myBalance")}</span>
                {bottomToken === "qtbg" ? (
                  <span>{withComma(balance.qtbg)}</span>
                ) : (
                  <span>0</span>
                )}
              </div>
            </div>
          </div>

          <button
            type="button"
            className="w-full bg-gray-500 text-sm md:text-lg text-white py-2 md:py-3 rounded-md shadow-md md:font-semibold hover:brightness-125 duration-300"
          >
            {t("p2eScreen.exchange")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayToEarnExchange;
