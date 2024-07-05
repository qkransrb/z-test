import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { IoClose } from "react-icons/io5";
import { RiExchangeFill } from "react-icons/ri";
import PopupLayout from "../PopupLayout";
import { withComma } from "../../../utils/textUtil";
import { fromPeb } from "../../../utils/tokenUtil";
import Spinner from "../../Spinner";
import {
  swapTransactionAction,
  swapTransactionCleanAction,
} from "../../../redux/actions/transactions/swapTxAction";
import { toast } from "react-toastify";
import { fetchBalanceAction } from "../../../redux/actions/balanceAction";

const SwapTransaction = ({
  setSwapTransactionOpen,
  selectedTopToken,
  selectedBottomToken,
  topTokenAmount,
  bottomTokenAmount,
  exchangeRate,
  minimumTradeQuantity,
  commissionResult,
  setTopTokenAmount,
  setBottomTokenAmount,
}) => {
  const { t } = useTranslation();

  const [swapTransaction, setSwapTransaction] = useState(false);

  const dispatch = useDispatch();

  const { loading, error, success } = useSelector((state) => state.swap);

  // 스왑 성공 시
  useEffect(() => {
    if (success) {
      setTimeout(() => {
        toast.success("Transaction Successfully.");

        dispatch(swapTransactionCleanAction());
        dispatch(fetchBalanceAction());

        setTopTokenAmount("");
        setBottomTokenAmount("");
        setSwapTransaction(false);
        setSwapTransactionOpen(false);
      }, 2000);
    }
  }, [success, dispatch]);

  // 스왑 실패 시
  useEffect(() => {
    if (error) {
      setTimeout(() => {
        toast.error("Transaction Failed.");

        dispatch(swapTransactionCleanAction());
        dispatch(fetchBalanceAction());

        setTopTokenAmount("");
        setBottomTokenAmount("");
        setSwapTransaction(false);
        setSwapTransactionOpen(false);
      }, 2000);
    }
  }, [error, dispatch]);

  const onCloseHandler = () => {
    setSwapTransactionOpen(false);
  };

  const swapTransactionHandler = () => {
    setSwapTransaction(true);
    dispatch(
      swapTransactionAction(
        selectedTopToken,
        selectedBottomToken,
        topTokenAmount,
        bottomTokenAmount
      )
    );
  };

  return (
    <PopupLayout className="w-[400px] h-[500px] flex flex-col justify-between">
      <div>
        <div className="flex justify-between mb-10">
          <p className="text-lg font-bold text-gray-700">
            {t("layerPopup.sendTransaction")}
          </p>
          {!loading && (
            <button type="button" onClick={onCloseHandler}>
              <IoClose className="text-2xl text-gray-700" />
            </button>
          )}
        </div>

        <div className="space-y-2 mb-4">
          <p className="text-base text-[#246bea] font-semibold">
            {t("layerPopup.swap")}
          </p>
          <div className="bg-gray-100 rounded-md text-lg text-gray-700 font-bold text-right px-2 py-3 shadow-md space-y-2">
            <div className="space-x-2">
              <span>{withComma(topTokenAmount)}</span>
              <span className="inline-block min-w-[70px]">
                {selectedTopToken && selectedTopToken.toUpperCase()}
              </span>
            </div>
            <div className="space-x-2">
              <span>
                {withComma(
                  fromPeb(bottomTokenAmount, selectedBottomToken, {
                    minimumFractionDigits: 6,
                    maximumFractionDigits: 6,
                  })
                )}
              </span>
              <span className="inline-block min-w-[70px]">
                {selectedBottomToken && selectedBottomToken.toUpperCase()}
              </span>
            </div>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center text-xs text-gray-500">
            <span>{t("layerPopup.exchangeRate")}</span>
            <div className="space-y-1 flex flex-col items-end">
              <div className="flex items-center space-x-2">
                <RiExchangeFill className="text-xl text-orange-500" />
                <div className="space-x-1">
                  <span>1</span>
                  <span className="font-semibold">
                    {selectedTopToken && selectedTopToken.toUpperCase()}
                  </span>
                </div>
                <span className="text-cyan-500 text-sm">≈</span>
                <div className="space-x-1">
                  <span>{exchangeRate}</span>
                  <span className="font-semibold">
                    {selectedBottomToken && selectedBottomToken.toUpperCase()}
                  </span>
                </div>
              </div>
              <div className="space-x-2">
                <span className="text-[#b39c7d]">
                  {t("swapScreen.differenceInCurrentRatio")}
                </span>
                <span className="text-red-400 font-semibold">{`< ${
                  Number(process.env.REACT_APP_SLIPPAGE) * 100
                } %`}</span>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center text-xs text-gray-500 pb-4 pt-5">
            <span>{t("layerPopup.minimumTradeQuantity")}</span>
            <div className="space-x-1">
              <span>{minimumTradeQuantity}</span>
              <span className="font-semibold">
                {selectedTopToken.toUpperCase()}
              </span>
            </div>
          </div>

          <div className="flex justify-between items-center text-xs text-gray-500 pt-4">
            <span>{t("layerPopup.commission")}</span>
            <div className="space-x-1">
              <span>{commissionResult}</span>
              <span className="font-semibold">
                {selectedBottomToken.toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center space-y-6">
        {swapTransaction ? (
          <Spinner />
        ) : (
          <button
            type="button"
            disabled={swapTransaction}
            onClick={swapTransactionHandler}
            className={`w-full text-white py-3 rounded-md text-sm font-semibold shadow-lg ${
              swapTransaction
                ? "bg-gray-500"
                : "bg-[#246bea] hover:brightness-125 active:brightness-125 duration-300"
            }`}
          >
            {t("layerPopup.swap")}
          </button>
        )}
      </div>
    </PopupLayout>
  );
};

export default SwapTransaction;
