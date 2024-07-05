import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { IoClose } from "react-icons/io5";
import { withComma } from "../../../../utils/textUtil";
import PopupLayout from "../../PopupLayout";
import {
  fetchMyDepositAction,
  fetchMyDepositAmountAction,
} from "../../../../redux/actions/myDepositAction";
import { fetchClaimableAction } from "../../../../redux/actions/claimableAction";
import { fetchShareOfMyPoolAction } from "../../../../redux/actions/shareAction";
import { fetchBalanceAction } from "../../../../redux/actions/balanceAction";
import {
  singleWithdrawCleanAction,
  singleWithdrawTransactionAction,
} from "../../../../redux/actions/transactions/withdrawTxAction";
import { toast } from "react-toastify";
import Spinner from "../../../Spinner";

const SingleWithdrawTransaction = ({
  setWithdrawTransactionOpen,
  inputs,
  setInputs,
}) => {
  const { t } = useTranslation();

  const [sendTransaction, setSendTransaction] = useState(false);

  const dispatch = useDispatch();

  const { shareOfMyPool } = useSelector((state) => state.shareOfMyPool);
  const { claimable } = useSelector((state) => state.claimable);

  const { loading, error, message, success } = useSelector(
    (state) => state.singleWithdraw
  );

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        toast.success("Transaction Successfully.");

        dispatch(fetchMyDepositAction());
        dispatch(fetchClaimableAction());
        dispatch(fetchShareOfMyPoolAction());
        dispatch(fetchMyDepositAmountAction());
        dispatch(fetchBalanceAction());
        dispatch(singleWithdrawCleanAction());

        setInputs({
          ...inputs,
          withdraw: "",
        });
        setSendTransaction(false);
        setWithdrawTransactionOpen(false);
      }, 2000);
    }
  }, [success, dispatch]);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        toast.error("Transaction Failed.");

        dispatch(fetchMyDepositAction());
        dispatch(fetchClaimableAction());
        dispatch(fetchShareOfMyPoolAction());
        dispatch(fetchMyDepositAmountAction());
        dispatch(fetchBalanceAction());
        dispatch(singleWithdrawCleanAction());

        setSendTransaction(false);
        setWithdrawTransactionOpen(false);
      }, 2000);
    }
  }, [error]);

  const onCloseHandler = () => {
    setWithdrawTransactionOpen(false);
  };

  const sendTransactionHandler = () => {
    setSendTransaction(true);

    // Send Transaction
    dispatch(singleWithdrawTransactionAction(inputs.withdraw));
  };

  return (
    <PopupLayout className="w-[400px] h-[500px] flex flex-col justify-between">
      <div>
        <div className="flex justify-between mb-10">
          <p className="text-lg font-bold text-gray-700">Send Transaction</p>
          {!loading && (
            <button type="button" onClick={onCloseHandler}>
              <IoClose className="text-2xl text-gray-700" />
            </button>
          )}
        </div>

        <div className="space-y-2 mb-10">
          <p className="text-base text-red-400 font-semibold">
            {t("poolsScreen.withdraw")}
          </p>
          <div className="bg-gray-100 rounded-md text-lg text-gray-700 font-bold text-right px-2 py-3 shadow-md space-x-2">
            <span>{withComma(inputs.withdraw)}</span>
            <span>ZYNO</span>
          </div>
        </div>
        <div className="text-xs text-gray-500 mb-4 flex justify-between items-center">
          <span>Share Percentage</span>
          <div className="space-x-1">
            <span className="font-semibold">
              {withComma(shareOfMyPool.zyno)}
            </span>
            <span>%</span>
          </div>
        </div>
        <div className="text-xs text-gray-500 flex justify-between items-center">
          <span>Claim Rewards</span>
          <div className="space-x-1">
            <span className="font-semibold">{withComma(claimable.zyno)}</span>
            <span>ZYNO</span>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center">
        {sendTransaction ? (
          <Spinner />
        ) : (
          <button
            type="button"
            onClick={sendTransactionHandler}
            disabled={sendTransaction}
            className={`w-full text-white py-3 rounded-md text-sm font-semibold shadow-lg ${
              sendTransaction
                ? "bg-gray-500"
                : "bg-red-400 active:brightness-125 duration-300"
            }`}
          >
            {t("poolsScreen.withdraw")}
          </button>
        )}
      </div>
    </PopupLayout>
  );
};

export default SingleWithdrawTransaction;
