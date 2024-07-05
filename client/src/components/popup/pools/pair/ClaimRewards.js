import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import PopupLayout from "../../PopupLayout";
import { IoClose } from "react-icons/io5";
import { withComma } from "../../../../utils/textUtil";
import { toast } from "react-toastify";
import Spinner from "../../../Spinner";
import {
  pairClaimRewardsAction,
  pairClaimRewardsCleanAction,
} from "../../../../redux/actions/transactions/rewardsTxAction";
import { fetchMyDepositAmountAction } from "../../../../redux/actions/myDepositAction";
import { fetchClaimableAction } from "../../../../redux/actions/claimableAction";
import { fetchShareOfMyPoolAction } from "../../../../redux/actions/shareAction";
import { fetchBalanceAction } from "../../../../redux/actions/balanceAction";
import { fetchDefaultAction } from "../../../../redux/actions/defaultAction";

const ClaimRewards = ({ setClaimRewardsOpen, pairA, pairB }) => {
  const { t } = useTranslation();

  const [sendTransaction, setSendTransaction] = useState(false);

  const dispatch = useDispatch();

  const { claimable } = useSelector((state) => state.claimable);

  const { loading, error, success } = useSelector(
    (state) => state.pairClaimRewards
  );

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        toast.success("Transaction Successfully.");

        dispatch(fetchDefaultAction());
        dispatch(fetchMyDepositAmountAction());
        dispatch(fetchClaimableAction());
        dispatch(fetchShareOfMyPoolAction());
        dispatch(fetchBalanceAction());
        dispatch(pairClaimRewardsCleanAction());

        setSendTransaction(false);
        setClaimRewardsOpen(false);
      }, 2000);
    }
  }, [success, dispatch]);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        toast.error("Transaction Failed.");

        dispatch(fetchDefaultAction());
        dispatch(fetchMyDepositAmountAction());
        dispatch(fetchClaimableAction());
        dispatch(fetchShareOfMyPoolAction());
        dispatch(fetchBalanceAction());
        dispatch(pairClaimRewardsCleanAction());

        setSendTransaction(false);
        setClaimRewardsOpen(false);
      }, 2000);
    }
  }, [error, dispatch]);

  const onCloseHandler = () => {
    setClaimRewardsOpen(false);
  };

  const sendTransactionHandler = () => {
    setSendTransaction(true);
    dispatch(pairClaimRewardsAction(pairA, pairB));
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
          <p className="text-base text-primary font-semibold">
            {t("layerPopup.claimRewards2")}
          </p>
          <div className="bg-gray-100 rounded-md text-lg text-gray-700 font-bold text-right px-2 py-3 shadow-md space-x-2">
            <span>{withComma(claimable[pairA + "_" + pairB])}</span>
            <span>ZYNO</span>
          </div>
        </div>
        <p className="text-xs text-gray-400 mb-2">{t("layerPopup.rewards1")}</p>
        <p className="text-xs text-gray-400">{t("layerPopup.rewards2")}</p>
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
                : "bg-primary active:brightness-125 duration-300"
            }`}
          >
            {t("layerPopup.receive")}
          </button>
        )}
      </div>
    </PopupLayout>
  );
};

export default ClaimRewards;
