import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { IoClose } from "react-icons/io5";
import { withComma } from "../../../../utils/textUtil";
import Spinner from "../../../Spinner";
import PopupLayout from "../../PopupLayout";
import {
  singleDepositCleanAction,
  singleDepositTransactionAction,
} from "../../../../redux/actions/transactions/depositTxAction";
import {
  fetchMyDepositAction,
  fetchMyDepositAmountAction,
} from "../../../../redux/actions/myDepositAction";
import { fetchClaimableAction } from "../../../../redux/actions/claimableAction";
import { fetchShareOfMyPoolAction } from "../../../../redux/actions/shareAction";
import { fetchBalanceAction } from "../../../../redux/actions/balanceAction";
import { toast } from "react-toastify";

const SingleDepositTransaction = ({
  setDepositTransactionOpen,
  inputs,
  setInputs,
}) => {
  const { t } = useTranslation();

  const [sendTransaction, setSendTransaction] = useState(false);

  const dispatch = useDispatch();

  const { loading, error, success } = useSelector(
    (state) => state.singleDeposit
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
        dispatch(singleDepositCleanAction());

        setInputs({
          ...inputs,
          deposit: "",
        });
        setSendTransaction(false);
        setDepositTransactionOpen(false);
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
        dispatch(singleDepositCleanAction());

        setSendTransaction(false);
        setDepositTransactionOpen(false);
      }, 2000);
    }
  }, [error]);

  const onCloseHandler = () => {
    setDepositTransactionOpen(false);
  };

  const sendTransactionHandler = () => {
    setSendTransaction(true);

    // Send Transaction
    dispatch(singleDepositTransactionAction(inputs.deposit));
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

        <div className="space-y-2 mb-10">
          <p className="text-base text-[#246bea] font-semibold">
            {t("poolsScreen.deposit")}
          </p>
          <div className="bg-gray-100 rounded-md text-lg text-gray-700 font-bold text-right px-2 py-3 shadow-md space-x-2">
            <span>{withComma(inputs.deposit)}</span>
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
                : "bg-[#246bea] active:brightness-125 duration-300"
            }`}
          >
            {t("poolsScreen.deposit")}
          </button>
        )}
      </div>
    </PopupLayout>
  );
};

export default SingleDepositTransaction;
