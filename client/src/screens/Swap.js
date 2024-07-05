import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Wrapper from "../components/Wrapper";
import Title from "../components/Title";
import { RiArrowDownSFill, RiArrowUpDownLine } from "react-icons/ri";
import { AiOutlineExclamation } from "react-icons/ai";
import { withComma } from "../utils/textUtil";
import { fetchBalanceAction } from "../redux/actions/balanceAction";
import SelectSwapToken from "../components/popup/swap/SelectSwapToken";
import { fromPeb, getDecimals, printReserve, toPeb } from "../utils/tokenUtil";
import {
  fetchSwapEstimatedBalanceAction,
  swapEstimatedBalanceCleanUp,
} from "../redux/actions/swapAction";
import { HiOutlineChevronDoubleRight } from "react-icons/hi";
import BigNumber from "bignumber.js";
import SwapTransaction from "../components/popup/swap/SwapTransaction";

const Swap = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBalanceAction());
  }, []);

  const { balance } = useSelector((state) => state.balance);
  const { estimatedBalance } = useSelector((state) => state.estimatedBalance);

  const [selectedTopToken, setSelectedTopToken] = useState("qtbk");
  const [selectedBottomToken, setSelectedBottomToken] = useState("");

  const [topTokenAmount, setTopTokenAmount] = useState("");
  const [bottomTokenAmount, setBottomTokenAmount] = useState("");

  useEffect(() => {
    if (
      topTokenAmount &&
      Number(topTokenAmount) > 0 &&
      balance[selectedTopToken] >= topTokenAmount &&
      selectedTopToken &&
      selectedBottomToken
    ) {
      const peb = toPeb(topTokenAmount, selectedTopToken);

      if (
        (selectedTopToken === "qtbg" && selectedBottomToken === "kusdt") ||
        (selectedTopToken === "kusdt" && selectedBottomToken === "qtbg")
      ) {
        dispatch(
          fetchSwapEstimatedBalanceAction(peb, [
            selectedTopToken,
            "qtbk",
            selectedBottomToken,
          ])
        );
      } else {
        dispatch(
          fetchSwapEstimatedBalanceAction(peb, [
            selectedTopToken,
            selectedBottomToken,
          ])
        );
      }
    } else {
      dispatch(swapEstimatedBalanceCleanUp());
    }
  }, [topTokenAmount, selectedTopToken, selectedBottomToken, dispatch]);

  useEffect(() => {
    setBottomTokenAmount(estimatedBalance);
  }, [estimatedBalance]);

  const onChangeHandler = (e) => {
    const value = e.target.value.replace(/[^0-9\.]$/g, "");

    if (balance[selectedTopToken] < Number(value)) {
      setTopTokenAmount("");
      setBottomTokenAmount("");
    } else {
      setTopTokenAmount(value);
    }
  };

  const maxButtonHandler = () => {
    setTopTokenAmount(balance[selectedTopToken]);
  };

  const exchangeTokenHandler = () => {
    const tempTopToken = selectedTopToken;
    const tempBottomToken = selectedBottomToken;

    setSelectedTopToken(tempBottomToken);
    setSelectedBottomToken(tempTopToken);

    setTopTokenAmount("");
    setBottomTokenAmount("");
  };

  const swapButtonValidator = () => {
    let result = false;

    if (
      topTokenAmount &&
      Number(topTokenAmount) > 0 &&
      bottomTokenAmount &&
      Number(bottomTokenAmount) > 0
    ) {
      result = true;
    }

    return result;
  };

  const swapButtonHandler = () => {
    setSwapTransactionOpen(true);
  };

  const outAmount = new BigNumber(bottomTokenAmount).dividedBy(
    `1e${getDecimals(selectedBottomToken)}`
  );

  const exchangeRate = printReserve(
    new BigNumber(outAmount).dividedBy(new BigNumber(topTokenAmount)),
    6
  );

  const minimumTradeQuantity = printReserve(
    new BigNumber(outAmount).multipliedBy(
      1 - Number(process.env.REACT_APP_SLIPPAGE)
    ),
    6
  );

  const commissionResult = printReserve(
    new BigNumber(topTokenAmount).multipliedBy(
      Number(process.env.REACT_APP_COMMISSION)
    ),
    6
  );

  /* ============================= 팝업 이벤트 ============================= */
  const [topTokenSwapOpen, setTopTokenSwapOpen] = useState(false);
  const [bottomTokenSwapOpen, setBottomTokenSwapOpen] = useState(false);

  const [swapTransactionOpen, setSwapTransactionOpen] = useState(false);

  return (
    <Wrapper>
      <Title title="swapScreen.title" />
      <div className="max-w-[800px] mx-auto bg-white rounded-lg flex flex-col md:flex-row mt-8">
        <div className="w-full md:w-[80%] px-4 md:px-8 py-6 space-y-8 md:space-y-6">
          {/* Token A */}
          <div className="flex justify-between items-center">
            <div className="w-[75%] space-y-2">
              <p className="text-[#246bea] md:text-xl font-bold">From</p>
              <input
                type="text"
                value={topTokenAmount}
                onChange={onChangeHandler}
                placeholder="0"
                className="py-1 text-xl md:text-2xl font-bold text-gray-700 focus:outline-none bg-transparent placeholder:text-gray-500"
              />
              <div className="flex items-center space-x-2 md:space-x-3 text-xs">
                <span className="text-[#b39c7d] font-semibold">
                  {t("swapScreen.balance")}
                </span>
                <span className="text-[#b39c7d]">
                  {selectedTopToken
                    ? withComma(balance[selectedTopToken])
                    : "0.000000"}
                </span>
                <button
                  type="button"
                  onClick={maxButtonHandler}
                  className="border border-[#246bea] px-1.5 md:px-2 rounded-full text-[#246bea] font-semibold hover:bg-[#246bea] hover:text-white duration-300"
                >
                  max
                </button>
              </div>
            </div>
            <div className="flex flex-col items-end space-y-4">
              <button
                type="button"
                onClick={() => setTopTokenSwapOpen(true)}
                className="flex items-center space-x-2"
              >
                <RiArrowDownSFill className="text-xl text-gray-500" />
                {selectedTopToken ? (
                  <img
                    src={`/images/${selectedTopToken}.png`}
                    alt={`${selectedTopToken}`}
                    className="w-9 h-9 rounded-full shadow-md"
                  />
                ) : (
                  <div className="border-2 border-orange-500 text-orange-500 rounded-full p-1 hover:bg-orange-500 hover:text-white active:brightness-125 duration-300 shadow-md">
                    <AiOutlineExclamation className="text-2xl" />
                  </div>
                )}
              </button>
              <span className="text-sm text-gray-700 font-bold">
                {selectedTopToken
                  ? selectedTopToken.toUpperCase()
                  : t("swapScreen.token")}
              </span>
            </div>
          </div>

          {/* Exchange */}
          <div className="flex justify-center items-center">
            <button
              type="button"
              onClick={exchangeTokenHandler}
              className="border-2 border-[#b39c7d] text-[#b39c7d] rounded-full p-1 shadow-lg hover:bg-[#b39c7d] hover:text-white active:brightness-125 duration-300"
            >
              <RiArrowUpDownLine className="text-2xl" />
            </button>
          </div>

          {/* Token B */}
          <div className="flex justify-between items-center">
            <div className="w-[75%] space-y-2">
              <p className="text-[#246bea] md:text-xl font-bold">To</p>
              <input
                type="text"
                placeholder="0"
                value={fromPeb(bottomTokenAmount, selectedBottomToken, {
                  minimumFractionDigits: 6,
                  maximumFractionDigits: 6,
                })}
                readOnly
                className="py-1 text-xl md:text-2xl font-bold text-gray-700 focus:outline-none bg-transparent placeholder:text-gray-500"
              />
              <div className="flex items-center space-x-2 md:space-x-3 text-xs">
                <span className="text-[#b39c7d] font-semibold">
                  {t("swapScreen.balance")}
                </span>
                <span className="text-[#b39c7d]">
                  {selectedBottomToken
                    ? withComma(balance[selectedBottomToken])
                    : "0.000000"}
                </span>
              </div>
            </div>
            <div className="flex flex-col items-end space-y-4">
              <button
                type="button"
                onClick={() => setBottomTokenSwapOpen(true)}
                className="flex items-center space-x-2"
              >
                <RiArrowDownSFill className="text-xl text-gray-500" />
                {!selectedBottomToken && (
                  <div className="border-2 border-orange-500 text-orange-500 rounded-full p-1 hover:bg-orange-500 hover:text-white active:brightness-125 duration-300 shadow-md">
                    <AiOutlineExclamation className="text-2xl" />
                  </div>
                )}
                {selectedBottomToken && (
                  <img
                    src={`/images/${selectedBottomToken}.png`}
                    alt="qtbk"
                    className="w-9 h-9 rounded-full shadow-md"
                  />
                )}
              </button>
              <span className="text-sm text-gray-700 font-bold">
                {selectedBottomToken
                  ? selectedBottomToken.toUpperCase()
                  : t("swapScreen.token")}
              </span>
            </div>
          </div>
        </div>
        <div
          className={`w-full md:w-[20%] p-8 bg-gray-500 rounded-b-lg md:rounded-tr-lg md:rounded-br-lg md:rounded-bl-none ${
            swapButtonValidator() &&
            "hover:bg-[#246bea] active:brightness-125 duration-500"
          }`}
        >
          <button
            type="button"
            disabled={!swapButtonValidator()}
            onClick={swapButtonHandler}
            className="w-full h-full flex justify-end items-end"
          >
            <span className="text-xl text-white font-bold">
              {t("layerPopup.swap")}
            </span>
          </button>
        </div>
      </div>

      {selectedTopToken && selectedBottomToken && (
        <div className="max-w-[800px] w-full mx-auto bg-white rounded-lg flex mt-8 mb-10">
          <div className="py-6 mx-4 md:px-8 w-full">
            <h3 className="text-[#246bea] md:text-lg font-semibold mb-2 md:mb-4">
              {t("swapScreen.expected")}
            </h3>

            <div>
              {/* Exchange Rate */}
              <div className="flex justify-between items-center">
                <span className="text-xs md:text-sm text-gray-500">
                  {t("swapScreen.exchangeRate")}
                </span>
                <div className="flex flex-col items-end -space-y-2">
                  <div className="flex items-center space-x-2 md:space-x-4">
                    <div className="space-x-1 text-gray-700 text-xs md:text-sm">
                      <span className="font-semibold">1</span>
                      <span>{selectedTopToken.toUpperCase()}</span>
                    </div>
                    <div className="text-cyan-500">≈</div>
                    <div className="space-x-1 text-gray-700 text-xs md:text-sm">
                      <span className="font-semibold">{exchangeRate}</span>
                      <span>{selectedBottomToken.toUpperCase()}</span>
                    </div>
                  </div>
                  <div className="space-x-2">
                    <span className="text-xs text-[#b39c7d]">
                      {t("swapScreen.differenceInCurrentRatio")}
                    </span>
                    <span className="text-xs text-red-400 font-semibold">{`< ${
                      Number(process.env.REACT_APP_SLIPPAGE) * 100
                    } %`}</span>
                  </div>
                </div>
              </div>

              {/* Minimum Trade Quantity */}
              <div className="flex justify-between items-center pb-3 pt-4">
                <span className="text-xs md:text-sm text-gray-500">
                  {t("swapScreen.minimumTradeQuantity")}
                </span>
                <div className="text-xs md:text-sm text-gray-700 space-x-1">
                  <span className="font-semibold">{minimumTradeQuantity}</span>
                  <span>{selectedBottomToken.toUpperCase()}</span>
                </div>
              </div>

              {/* Commission */}
              <div className="flex justify-between items-center py-3">
                <span className="text-xs md:text-sm text-gray-500">
                  {t("swapScreen.commission")}
                </span>
                <div className="text-xs md:text-sm text-gray-700 space-x-1">
                  <span className="font-semibold">{commissionResult}</span>
                  <span>{selectedTopToken.toUpperCase()}</span>
                </div>
              </div>

              {/* Transaction Path */}
              <div className="flex justify-between items-center pt-2 md:pt-3">
                <span className="text-xs md:text-sm text-gray-500">
                  {t("swapScreen.transactionPath")}
                </span>
                <div className="flex items-center space-x-4">
                  <div>
                    <img
                      src={`/images/${selectedTopToken}.png`}
                      alt={selectedTopToken}
                      className="w-7 h-7 rounded-full shadow-md"
                    />
                  </div>
                  <HiOutlineChevronDoubleRight className="text-base text-gray-500" />
                  <div>
                    <img
                      src={`/images/${selectedBottomToken}.png`}
                      alt={selectedBottomToken}
                      className="w-7 h-7 rounded-full shadow-md"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {topTokenSwapOpen && (
        <SelectSwapToken
          topTokenSwapOpen={topTokenSwapOpen}
          setTopTokenSwapOpen={setTopTokenSwapOpen}
          selectedTopToken={selectedTopToken}
          setSelectedTopToken={setSelectedTopToken}
          selectedBottomToken={selectedBottomToken}
          setSelectedBottomToken={setSelectedBottomToken}
        />
      )}

      {bottomTokenSwapOpen && (
        <SelectSwapToken
          bottomTokenSwapOpen={bottomTokenSwapOpen}
          setBottomTokenSwapOpen={setBottomTokenSwapOpen}
          selectedTopToken={selectedTopToken}
          setSelectedTopToken={setSelectedTopToken}
          selectedBottomToken={selectedBottomToken}
          setSelectedBottomToken={setSelectedBottomToken}
        />
      )}

      {swapTransactionOpen && (
        <SwapTransaction
          setSwapTransactionOpen={setSwapTransactionOpen}
          selectedTopToken={selectedTopToken}
          selectedBottomToken={selectedBottomToken}
          topTokenAmount={topTokenAmount}
          bottomTokenAmount={bottomTokenAmount}
          exchangeRate={exchangeRate}
          minimumTradeQuantity={minimumTradeQuantity}
          commissionResult={commissionResult}
          setTopTokenAmount={setTopTokenAmount}
          setBottomTokenAmount={setBottomTokenAmount}
        />
      )}
    </Wrapper>
  );
};

export default Swap;
