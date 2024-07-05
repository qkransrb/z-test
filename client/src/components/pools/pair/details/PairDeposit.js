import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { HiPlus } from "react-icons/hi";
import { RiErrorWarningFill } from "react-icons/ri";
import { replaceDecimal } from "../../../../utils/numberUtil";
import { withComma } from "../../../../utils/textUtil";
import BigNumber from "bignumber.js";
import { fromPeb, toPeb } from "../../../../utils/tokenUtil";
import PairDepositTransaction from "../../../popup/pools/pair/PairDepositTransaction";

const PairDeposit = ({ pairA, pairB }) => {
  const { t } = useTranslation();

  const [pairAInput, setPairAInput] = useState("");
  const [pairBInput, setPairBInput] = useState("");

  const [pairATransactionAmount, setPairATransactionAmount] = useState(0);
  const [pairBTransactionAmount, setPairBTransactionAmount] = useState(0);

  const { reserve, original } = useSelector((state) => state.default);
  const { balance } = useSelector((state) => state.balance);

  const pairAInputHandler = (e) => {
    const value = e.target.value.replace(/[^0-9\.]$/g, "");

    setPairAInput(value);

    if (!value || !Number(value)) {
      setPairBInput("");

      setPairATransactionAmount(0);
      setPairBTransactionAmount(0);
    } else {
      const pairAAmount = toPeb(value, pairA);

      setPairATransactionAmount(pairAAmount);

      const estimatedPairBAmount = new BigNumber(pairAAmount)
        .multipliedBy(new BigNumber(original[pairA + "_" + pairB][pairB]))
        .dividedBy(new BigNumber(original[pairA + "_" + pairB][pairA]))
        .integerValue(BigNumber.ROUND_FLOOR);

      setPairBInput(
        fromPeb(estimatedPairBAmount, pairB, {
          useGrouping: false,
          maximumFractionDigits: 6,
        })
      );

      setPairBTransactionAmount(estimatedPairBAmount.toString());
    }
  };

  const pairBInputHandler = (e) => {
    const value = e.target.value.replace(/[^0-9\.]$/g, "");

    setPairBInput(value);

    if (!value || !Number(value)) {
      setPairAInput("");

      setPairATransactionAmount(0);
      setPairBTransactionAmount(0);
    } else {
      const pairBAmount = toPeb(value, pairB);

      setPairBTransactionAmount(pairBAmount);

      const estimatedPairAAmount = new BigNumber(pairBAmount)
        .multipliedBy(new BigNumber(original[pairA + "_" + pairB][pairA]))
        .dividedBy(new BigNumber(original[pairA + "_" + pairB][pairB]))
        .integerValue(BigNumber.ROUND_FLOOR);

      setPairAInput(
        fromPeb(estimatedPairAAmount, pairA, {
          useGrouping: false,
          maximumFractionDigits: 6,
        })
      );

      setPairATransactionAmount(estimatedPairAAmount.toString());
    }
  };

  const pairAMaxButtonHandler = () => {
    const value = balance[pairA];
    setPairAInput(value);

    if (!value || !Number(value)) {
      setPairBInput("");

      setPairATransactionAmount(0);
      setPairBTransactionAmount(0);
    } else {
      const pairAAmount = toPeb(value, pairA);

      setPairATransactionAmount(pairAAmount);

      const estimatedPairBAmount = new BigNumber(pairAAmount)
        .multipliedBy(new BigNumber(original[pairA + "_" + pairB][pairB]))
        .dividedBy(new BigNumber(original[pairA + "_" + pairB][pairA]))
        .integerValue(BigNumber.ROUND_FLOOR);

      setPairBInput(
        fromPeb(estimatedPairBAmount, pairB, {
          useGrouping: false,
          maximumFractionDigits: 6,
        })
      );

      setPairBTransactionAmount(estimatedPairBAmount.toString());
    }
  };

  const pairBMaxButtonHandler = () => {
    const value = balance[pairB];
    setPairBInput(value);

    if (!value || !Number(value)) {
      setPairAInput("");

      setPairATransactionAmount(0);
      setPairBTransactionAmount(0);
    } else {
      const pairBAmount = toPeb(value, pairB);

      setPairBTransactionAmount(pairBAmount);

      const estimatedPairAAmount = new BigNumber(pairBAmount)
        .multipliedBy(new BigNumber(original[pairA + "_" + pairB][pairA]))
        .dividedBy(new BigNumber(original[pairA + "_" + pairB][pairB]))
        .integerValue(BigNumber.ROUND_FLOOR);

      setPairAInput(
        fromPeb(estimatedPairAAmount, pairA, {
          useGrouping: false,
          maximumFractionDigits: 6,
        })
      );

      setPairATransactionAmount(estimatedPairAAmount.toString());
    }
  };

  const transactionValidation = () => {
    let result = false;

    if (
      pairAInput !== "" &&
      Number(pairAInput) > 0 &&
      pairBInput !== "" &&
      Number(pairBInput) > 0 &&
      balance[pairA] >= Number(pairAInput) &&
      balance[pairB] >= Number(pairBInput)
    ) {
      result = true;
    }

    return result;
  };

  const depositTransactionHandler = () => {
    setPairDepositTransactionOpen(true);
  };

  /* ==================== 팝업 이벤트 ==================== */
  const [pairDepositTransactionOpen, setPairDepositTransactionOpen] =
    useState(false);

  return (
    <Fragment>
      <div className="flex flex-col md:flex-row items-center md:space-x-6 space-y-8 md:space-y-0">
        <div className="w-full md:w-[65%] md:min-h-[350px]">
          <div className="relative flex flex-col">
            {/* Token A */}
            <div className="flex flex-col md:flex-row justify-between items-center bg-gray-100 p-4 md:p-8 rounded-md md:rounded-2xl mb-2">
              <div className="w-full md:w-[30%] flex items-center space-x-2 text-sm text-gray-700 font-bold">
                <img
                  src="/images/zyno.jpg"
                  alt="zyno"
                  className="w-9 md:w-11 h-9 md:h-11 rounded-full shadow-md"
                />
                <p>{pairA.toUpperCase()}</p>
              </div>
              <div className="w-full md:w-[70%] flex flex-col items-end space-y-2 md:space-y-4">
                <input
                  type="text"
                  value={pairAInput}
                  onChange={pairAInputHandler}
                  placeholder="0"
                  className="w-full text-xl md:text-2xl text-end text-gray-700 font-bold bg-transparent focus:outline-none placeholder:text-gray-700"
                />
                <div className="flex items-center space-x-4">
                  <p className="space-x-2 text-xs text-gray-500 md:font-semibold">
                    <span>{t("poolsScreen.balance")}</span>
                    <span>{withComma(balance[pairA])}</span>
                  </p>
                  <button
                    type="button"
                    onClick={pairAMaxButtonHandler}
                    disabled={!Number(balance[pairA]) > 0}
                    className={`text-xs font-semibold px-3 border  rounded-full ${
                      !Number(balance[pairA]) > 0
                        ? "text-gray-500 border-gray-500"
                        : "text-[#246bea] border-[#246bea] hover:bg-[#246bea] hover:text-white duration-300"
                    }`}
                  >
                    Max
                  </button>
                </div>
              </div>
            </div>

            <div className="absolute w-10 md:w-14 h-10 md:h-14 top-[50%] left-[50%] border-8 border-white rounded-full flex justify-center items-center text-4xl -translate-x-[50%] -translate-y-[50%] bg-gray-100 text-gray-500">
              <HiPlus />
            </div>

            {/* Token B */}
            <div className="flex flex-col md:flex-row justify-between items-center bg-gray-100 p-4 md:p-8 rounded-md md:rounded-2xl">
              <div className="w-full md:w-[30%] flex items-center space-x-2 text-sm text-gray-700 font-bold">
                <img
                  src={`/images/${pairB}.png`}
                  alt={pairB}
                  className="w-9 md:w-11 h-9 md:h-11 rounded-full shadow-md"
                />
                <p>{pairB.toUpperCase()}</p>
              </div>
              <div className="w-full md:w-[70%] flex flex-col items-end space-y-2 md:space-y-4">
                <input
                  type="text"
                  value={pairBInput}
                  onChange={pairBInputHandler}
                  placeholder="0"
                  className="w-full text-xl md:text-2xl text-end text-gray-700 font-bold bg-transparent focus:outline-none placeholder:text-gray-700"
                />
                <div className="flex items-center space-x-4">
                  <p className="space-x-2 text-xs text-gray-500 md:font-semibold">
                    <span>{t("poolsScreen.balance")}</span>
                    <span>{withComma(balance[pairB])}</span>
                  </p>
                  <button
                    type="button"
                    onClick={pairBMaxButtonHandler}
                    disabled={!Number(balance[pairB]) > 0}
                    className={`text-xs font-semibold px-3 border  rounded-full ${
                      !Number(balance[pairB]) > 0
                        ? "text-gray-500 border-gray-500"
                        : "text-[#246bea] border-[#246bea] hover:bg-[#246bea] hover:text-white duration-300"
                    }`}
                  >
                    Max
                  </button>
                </div>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={depositTransactionHandler}
            disabled={!transactionValidation()}
            className={`w-full text-white md:text-xl font-bold rounded-md md:rounded-full py-3 shadow-md mt-2 md:mt-6 ${
              transactionValidation()
                ? "bg-[#246bea] hover:brightness-125 duration-300"
                : "bg-gray-500"
            }`}
          >
            LP Deposit
          </button>
        </div>
        <div className="w-full md:w-[35%] md:min-h-[350px] flex flex-col items-center space-y-8 bg-gray-100 md:bg-transparent py-4 rounded-md">
          <p className="md:w-[80%] bg-white md:bg-gray-100 text-center text-gray-900 text-sm font-bold px-14 md:px-0 py-1 rounded-full shadow-md md:shadow-none">
            More Information
          </p>
          <div className="w-full space-y-2 px-4">
            <p className="text-sm text-gray-700 font-semibold">
              {t("poolsScreen.exchangeRate")}
            </p>
            <div className="flex text-gray-500 text-xs space-x-3">
              <div className="space-x-1">
                <span>1</span>
                <span className="font-semibold">{pairA.toUpperCase()}</span>
              </div>
              <div>≈</div>
              <div className="space-x-1">
                <span>
                  {pairA &&
                    pairB &&
                    replaceDecimal(
                      reserve[pairA + "_" + pairB][pairB] /
                        reserve[pairA + "_" + pairB][pairA],
                      6
                    )}
                </span>
                <span className="font-semibold">{pairB.toUpperCase()}</span>
              </div>
              {/* <div>($0.000408)</div> */}
            </div>
          </div>
          <hr className="border border-gray-300 w-full hidden md:block" />
          <div className="w-full space-y-2 px-4">
            <div className="flex items-center space-x-1">
              <RiErrorWarningFill className="text-red-500" />
              <span className="text-sm text-gray-700 font-semibold">
                Notice
              </span>
            </div>
            <p className="text-gray-500 text-[10px]">
              {t("poolsScreen.noticeDeposit")}
            </p>
          </div>
        </div>
      </div>

      {
        // Pair Deposit Transaction
        pairDepositTransactionOpen && (
          <PairDepositTransaction
            pairA={pairA}
            pairB={pairB}
            pairAInput={pairAInput}
            pairBInput={pairBInput}
            setPairAInput={setPairAInput}
            setPairBInput={setPairBInput}
            pairATransactionAmount={pairATransactionAmount}
            pairBTransactionAmount={pairBTransactionAmount}
            setPairDepositTransactionOpen={setPairDepositTransactionOpen}
          />
        )
      }
    </Fragment>
  );
};

export default PairDeposit;
