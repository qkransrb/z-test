import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import PopupLayout from "../../PopupLayout";
import { IoClose } from "react-icons/io5";
import { withComma } from "../../../../utils/textUtil";
import { RiExchangeFill } from "react-icons/ri";
import { replaceDecimal } from "../../../../utils/numberUtil";
import Spinner from "../../../Spinner";
import {
  pairDepositApproveAction,
  pairDepositApproveCleanAction,
  pairDepositCleanAction,
  pairDepositTransactionAction,
} from "../../../../redux/actions/transactions/depositTxAction";
import { toast } from "react-toastify";
import { fetchMyDepositAmountAction } from "../../../../redux/actions/myDepositAction";
import { fetchClaimableAction } from "../../../../redux/actions/claimableAction";
import { fetchShareOfMyPoolAction } from "../../../../redux/actions/shareAction";
import { fetchBalanceAction } from "../../../../redux/actions/balanceAction";
import BigNumber from "bignumber.js";
import { fetchDefaultAction } from "../../../../redux/actions/defaultAction";

const PairDepositTransaction = ({
  pairA,
  pairB,
  pairAInput,
  pairBInput,
  setPairAInput,
  setPairBInput,
  pairATransactionAmount,
  pairBTransactionAmount,
  setPairDepositTransactionOpen,
}) => {
  const { t } = useTranslation();

  const [token1Approved, setToken1Approved] = useState(false);
  const [token2Approved, setToken2Approved] = useState(false);
  const [sendTransaction, setSendTransaction] = useState(false);

  const dispatch = useDispatch();

  const { reserve } = useSelector((state) => state.default);
  const { shareOfMyPool } = useSelector((state) => state.shareOfMyPool);

  const {
    approve1_loading,
    approve1_error,
    approve1_success,
    approve2_loading,
    approve2_error,
    approve2_success,
  } = useSelector((state) => state.pairDepositApprove);

  const { loading, error, success } = useSelector((state) => state.pairDeposit);

  // Approve 성공 시
  useEffect(() => {
    if (approve1_success) {
      toast.success("Transaction Successfully.");
      setToken1Approved(true);
      dispatch(pairDepositApproveCleanAction());
    }
    if (approve2_success) {
      toast.success("Transaction Successfully.");
      setToken2Approved(true);
      dispatch(pairDepositApproveCleanAction());
    }
  }, [approve1_success, approve2_success, dispatch]);

  // Approve 실패 시
  useEffect(() => {
    if (approve1_error) {
      toast.error("Transaction Failed.");
      setToken1Approved(false);
      dispatch(pairDepositApproveCleanAction());
    }
    if (approve2_error) {
      toast.error("Transaction Failed.");
      setToken1Approved(false);
      dispatch(pairDepositApproveCleanAction());
    }
  }, [approve1_error, approve2_error, dispatch]);

  // 페어 예치 성공 시
  useEffect(() => {
    if (success) {
      setTimeout(() => {
        dispatch(pairDepositCleanAction());

        toast.success("Transaction Successfully.");

        dispatch(fetchDefaultAction());
        dispatch(fetchMyDepositAmountAction());
        dispatch(fetchClaimableAction());
        dispatch(fetchShareOfMyPoolAction());
        dispatch(fetchBalanceAction());

        setPairAInput("");
        setPairBInput("");
        setSendTransaction(false);
        setPairDepositTransactionOpen(false);
      }, 2000);
    }
  }, [success, dispatch]);

  // 페어 예치 실패 시
  useEffect(() => {
    if (error) {
      setTimeout(() => {
        dispatch(pairDepositCleanAction());

        toast.error("Transaction Failed.");

        dispatch(fetchDefaultAction());
        dispatch(fetchMyDepositAmountAction());
        dispatch(fetchClaimableAction());
        dispatch(fetchShareOfMyPoolAction());
        dispatch(fetchBalanceAction());

        setSendTransaction(false);
        setPairDepositTransactionOpen(false);
      }, 2000);
    }
  }, [error, dispatch]);

  const onCloseHandler = () => {
    setPairDepositTransactionOpen(false);
  };

  // Token 1 Approve
  const token1ApprovedHandler = () => {
    dispatch(
      pairDepositApproveAction(pairA, new BigNumber(pairATransactionAmount), 1)
    );
  };

  // Token 2 Approve
  const token2ApprovedHandler = () => {
    dispatch(
      pairDepositApproveAction(pairB, new BigNumber(pairBTransactionAmount), 2)
    );
  };

  // LP Deposit
  const sendTransactionHandler = () => {
    setSendTransaction(true);

    // Send Transaction
    dispatch(
      pairDepositTransactionAction(
        pairA,
        pairB,
        new BigNumber(pairATransactionAmount),
        new BigNumber(pairBTransactionAmount),
        pairATransactionAmount,
        pairBTransactionAmount,
        1,
        1
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
          {(!approve1_loading || !approve2_loading || !loading) && (
            <button type="button" onClick={onCloseHandler}>
              <IoClose className="text-2xl text-gray-700" />
            </button>
          )}
        </div>

        <div className="space-y-2 mb-4">
          <p className="text-base text-[#246bea] font-semibold">
            {t("layerPopup.deposit")}
          </p>
          <div className="bg-gray-100 rounded-md text-lg text-gray-700 font-bold text-right px-2 py-3 shadow-md space-y-2">
            <div className="space-x-2">
              <span>{withComma(pairAInput)}</span>
              <span className="inline-block min-w-[70px]">
                {pairA.toUpperCase()}
              </span>
            </div>
            <div className="space-x-2">
              <span>{withComma(pairBInput)}</span>
              <span className="inline-block min-w-[70px]">
                {pairB.toUpperCase()}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center text-xs text-gray-500">
            <span>{t("layerPopup.exchangeRate")}</span>
            <div className="flex items-center space-x-2">
              <RiExchangeFill className="text-xl text-orange-500" />
              <div className="space-x-1">
                <span>1</span>
                <span className="font-semibold">{pairA.toUpperCase()}</span>
              </div>
              <span className="text-cyan-500 text-sm">≈</span>
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
            </div>
          </div>

          <div className="flex justify-between items-center text-xs text-gray-500">
            <span>{t("layerPopup.mySharePercentage")}</span>
            <div className="space-x-1 font-semibold">
              <span>{shareOfMyPool[pairA + "_" + pairB]}</span>
              <span>%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center space-y-6">
        <div className="w-full flex space-x-6">
          <div className="w-[50%] flex justify-center items-center">
            {approve1_loading ? (
              <Spinner />
            ) : (
              <button
                type="button"
                onClick={token1ApprovedHandler}
                disabled={token1Approved}
                className={`w-full text-white py-3 rounded-md text-sm font-semibold shadow-lg ${
                  token1Approved
                    ? "bg-gray-500"
                    : "bg-[#246bea] hover:brightness-125 active:brightness-125 duration-300"
                }`}
              >
                {t("layerPopup.approved1")}
              </button>
            )}
          </div>

          <div className="w-[50%] flex justify-center items-center">
            {approve2_loading ? (
              <Spinner />
            ) : (
              <button
                type="button"
                onClick={token2ApprovedHandler}
                disabled={!token1Approved || token2Approved}
                className={`w-full text-white py-3 rounded-md text-sm font-semibold shadow-lg ${
                  !token1Approved || token2Approved
                    ? "bg-gray-500"
                    : "bg-[#246bea] hover:brightness-125 active:brightness-125 duration-300"
                }`}
              >
                {t("layerPopup.approved2")}
              </button>
            )}
          </div>
        </div>
        {sendTransaction ? (
          <Spinner />
        ) : (
          <button
            type="button"
            onClick={sendTransactionHandler}
            disabled={!token1Approved || !token2Approved || sendTransaction}
            className={`w-full text-white py-3 rounded-md text-sm font-semibold shadow-lg ${
              !token1Approved || !token2Approved || sendTransaction
                ? "bg-gray-500"
                : "bg-[#246bea] hover:brightness-125 active:brightness-125 duration-300"
            }`}
          >
            {t("layerPopup.lpDeposit")}
          </button>
        )}
      </div>
    </PopupLayout>
  );
};

export default PairDepositTransaction;
