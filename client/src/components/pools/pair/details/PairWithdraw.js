import React, { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { RiErrorWarningFill } from "react-icons/ri";
import { replaceDecimal } from "../../../../utils/numberUtil";
import { fetchLiquidityAction } from "../../../../redux/actions/liquidityAction";
import { withComma } from "../../../../utils/textUtil";
import PairWithdrawTransaction from "../../../popup/pools/pair/PairWithdrawTransaction";

const PairWithdraw = ({ pairA, pairB }) => {
  const { t } = useTranslation();

  const [withdrawInput, setWithdrawInput] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLiquidityAction(pairA, pairB));
  }, []);

  const { reserve } = useSelector((state) => state.default);
  const { liquidity } = useSelector((state) => state.liquidity);

  const withdrawInputHandler = (e) => {
    const value = e.target.value.replace(/[^0-9\.]$/g, "");

    if (liquidity.my < value) {
      const adjusted = Math.min(value, liquidity.my);
      setWithdrawInput(adjusted);
    } else {
      setWithdrawInput(value);
    }
  };

  const withdrawMaxButtonHandler = () => {
    setWithdrawInput(liquidity.my);
  };

  const withdrawTransactionHandler = () => {
    setPairWithdrawTransactionOpen(true);
  };

  /* ==================== 팝업 이벤트 ==================== */
  const [pairWithdrawTransactionOpen, setPairWithdrawTransactionOpen] =
    useState(false);

  return (
    <Fragment>
      <div className="flex flex-col md:flex-row items-center md:space-x-6 space-y-8 md:space-y-0">
        <div className="w-full md:w-[65%] md:min-h-[280px]">
          <div className="relative flex flex-col">
            <div className="flex flex-col md:flex-row justify-between items-center bg-gray-100 p-4 md:px-8 md:py-12 rounded-md md:rounded-2xl mb-2">
              <div className="w-full md:w-[50%] flex items-center space-x-2">
                <div className="flex items-center -space-x-2">
                  <img
                    src="/images/zyno.jpg"
                    alt="zyno"
                    className="w-9 md:w-11 h-9 md:h-11 rounded-full shadow-md"
                  />
                  <img
                    src={`/images/${pairB}.png`}
                    alt={pairB}
                    className="w-9 md:w-11 h-9 md:h-11 rounded-full shadow-md"
                  />
                </div>
                <p className="text-sm text-gray-700 font-bold">{`${pairA.toUpperCase()} - ${pairB.toUpperCase()}`}</p>
              </div>
              <div className="w-full md:w-[50%] flex flex-col items-end space-y-2 md:space-y-4">
                <input
                  type="text"
                  value={withdrawInput}
                  onChange={withdrawInputHandler}
                  placeholder="0"
                  className="w-full text-xl md:text-2xl text-end text-gray-700 font-bold bg-transparent focus:outline-none placeholder:text-gray-700"
                />
                <div className="flex items-center space-x-4">
                  <p className="space-x-2 text-xs text-gray-500 md:font-semibold">
                    <span>{t("poolsScreen.balance")}</span>
                    <span>{withComma(liquidity.my)}</span>
                  </p>
                  <button
                    type="button"
                    onClick={withdrawMaxButtonHandler}
                    disabled={!Number(liquidity.my) > 0}
                    className={`text-xs font-semibold px-3 border  rounded-full ${
                      !Number(liquidity.my) > 0
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
            disabled={!withdrawInput || !Number(withdrawInput)}
            onClick={withdrawTransactionHandler}
            className={`w-full text-white md:text-xl font-bold rounded-md md:rounded-full py-3 shadow-md md:mt-6 ${
              !withdrawInput || !Number(withdrawInput)
                ? "bg-gray-500"
                : "bg-red-400 hover:brightness-125 duration-300"
            }`}
          >
            LP Withdraw
          </button>
        </div>
        <div className="w-full md:w-[35%] md:min-h-[280px] flex flex-col items-center space-y-8 bg-gray-100 md:bg-transparent py-4 rounded-md">
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
              {t("poolsScreen.noticeWithdraw")}
            </p>
          </div>
        </div>
      </div>

      {pairWithdrawTransactionOpen && (
        <PairWithdrawTransaction
          pairA={pairA}
          pairB={pairB}
          withdrawInput={withdrawInput}
          setWithdrawInput={setWithdrawInput}
          setPairWithdrawTransactionOpen={setPairWithdrawTransactionOpen}
        />
      )}
    </Fragment>
  );
};

export default PairWithdraw;
