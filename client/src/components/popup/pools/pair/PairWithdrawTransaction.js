import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import PopupLayout from "../../PopupLayout";
import { IoClose } from "react-icons/io5";
import { withComma } from "../../../../utils/textUtil";
import { RiExchangeFill } from "react-icons/ri";
import { replaceDecimal } from "../../../../utils/numberUtil";
import BigNumber from "bignumber.js";
import { fromPeb, toPeb } from "../../../../utils/tokenUtil";
import {
  pairWithdrawApproveAction,
  pairWithdrawApproveCleanAction,
  pairWithdrawCleanAction,
  pairWithdrawTransactionAction,
} from "../../../../redux/actions/transactions/withdrawTxAction";
import Spinner from "../../../Spinner";
import { toast } from "react-toastify";
import { fetchMyDepositAmountAction } from "../../../../redux/actions/myDepositAction";
import { fetchClaimableAction } from "../../../../redux/actions/claimableAction";
import { fetchShareOfMyPoolAction } from "../../../../redux/actions/shareAction";
import { fetchBalanceAction } from "../../../../redux/actions/balanceAction";
import { fetchLiquidityAction } from "../../../../redux/actions/liquidityAction";
import { fetchDefaultAction } from "../../../../redux/actions/defaultAction";

const PairWithdrawTransaction = ({
  pairA,
  pairB,
  withdrawInput,
  setWithdrawInput,
  setPairWithdrawTransactionOpen,
}) => {
  const { t } = useTranslation();

  const [estimatedPairA, setEstimatedPairA] = useState(0);
  const [estimatedPairB, setEstimatedPairB] = useState(0);

  const [approved, setApproved] = useState(false);
  const [sendTransaction, setSendTransaction] = useState(false);

  const dispatch = useDispatch();

  const { original: liquidity } = useSelector((state) => state.liquidity);
  const { reserve, original } = useSelector((state) => state.default);
  const { shareOfMyPool } = useSelector((state) => state.shareOfMyPool);
  const { claimable } = useSelector((state) => state.claimable);

  useEffect(() => {
    calculateWithdrawAmount();
  }, []);

  // Withdraw Approve
  const { approve_loading, approve_error, approve_success } = useSelector(
    (state) => state.pairWithdrawApprove
  );

  // Withdraw Transaction
  const { loading, error, success } = useSelector(
    (state) => state.pairWithdraw
  );

  // Withdraw Approve
  useEffect(() => {
    if (approve_success) {
      toast.success("Transaction Successfully.");
      setApproved(true);
      dispatch(pairWithdrawApproveCleanAction());
    }
  }, [approve_success, dispatch]);

  useEffect(() => {
    if (approve_error) {
      toast.error("Transaction Failed.");
      setApproved(false);
      dispatch(pairWithdrawApproveCleanAction());
    }
  }, [approve_error, dispatch]);

  // Withdraw Transaction
  useEffect(() => {
    if (success) {
      setTimeout(() => {
        toast.success("Transaction Successfully.");
        dispatch(pairWithdrawCleanAction());

        dispatch(fetchDefaultAction());
        dispatch(fetchMyDepositAmountAction());
        dispatch(fetchClaimableAction());
        dispatch(fetchShareOfMyPoolAction());
        dispatch(fetchBalanceAction());
        dispatch(fetchLiquidityAction(pairA, pairB));

        setWithdrawInput("");
        setApproved(false);
        setSendTransaction(false);
        setPairWithdrawTransactionOpen(false);
      }, 2000);
    }
  }, [success, dispatch, pairA, pairB]);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        toast.error("Transaction Failed.");
        dispatch(pairWithdrawCleanAction());

        dispatch(fetchDefaultAction());
        dispatch(fetchMyDepositAmountAction());
        dispatch(fetchClaimableAction());
        dispatch(fetchShareOfMyPoolAction());
        dispatch(fetchBalanceAction());
        dispatch(fetchLiquidityAction(pairA, pairB));

        setApproved(false);
        setSendTransaction(false);
        setPairWithdrawTransactionOpen(false);
      }, 2000);
    }
  }, [error, dispatch, pairA, pairB]);

  const calculateWithdrawAmount = () => {
    const pairAAmount = new BigNumber(toPeb(withdrawInput, "zyno"))
      .multipliedBy(new BigNumber(original[pairA + "_" + pairB][pairA]))
      .dividedBy(liquidity.total)
      .integerValue(BigNumber.ROUND_DOWN);

    const pairBAmount = new BigNumber(toPeb(withdrawInput, "zyno"))
      .multipliedBy(new BigNumber(original[pairA + "_" + pairB][pairB]))
      .dividedBy(liquidity.total)
      .integerValue(BigNumber.ROUND_DOWN);

    setEstimatedPairA(pairAAmount);
    setEstimatedPairB(pairBAmount);
  };

  const onCloseHandler = () => {
    setPairWithdrawTransactionOpen(false);
  };

  // Token 1 Approve
  const approvedHandler = () => {
    dispatch(pairWithdrawApproveAction(pairA, pairB, withdrawInput));
  };

  // LP Deposit
  const sendTransactionHandler = () => {
    setSendTransaction(true);

    // Send Transaction...
    dispatch(
      pairWithdrawTransactionAction(
        pairA,
        pairB,
        withdrawInput,
        1,
        1,
        fromPeb(estimatedPairA, pairA, {
          minimumFractionDigits: 6,
          maximumFractionDigits: 6,
        }),
        fromPeb(estimatedPairB, pairB, {
          minimumFractionDigits: 6,
          maximumFractionDigits: 6,
        })
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
          <button type="button" onClick={onCloseHandler}>
            <IoClose className="text-2xl text-gray-700" />
          </button>
        </div>

        <div className="space-y-2 mb-4">
          <p className="text-base text-red-400 font-semibold">
            {t("layerPopup.withdraw")}
          </p>
          <div className="bg-gray-100 rounded-md text-lg text-gray-700 font-bold text-right px-2 py-3 shadow-md space-y-2">
            <div className="space-x-2">
              <span>
                {withComma(
                  fromPeb(estimatedPairA, pairA, {
                    minimumFractionDigits: 6,
                    maximumFractionDigits: 6,
                  })
                )}
              </span>
              <span className="inline-block min-w-[70px]">
                {pairA.toUpperCase()}
              </span>
            </div>
            <div className="space-x-2">
              <span>
                {withComma(
                  fromPeb(estimatedPairB, pairB, {
                    minimumFractionDigits: 6,
                    maximumFractionDigits: 6,
                  })
                )}
              </span>
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

          <div className="flex justify-between items-center text-xs text-gray-500">
            <span>{t("layerPopup.claimRewards2")}</span>
            <div className="space-x-1">
              <span>{withComma(claimable[pairA + "_" + pairB])}</span>
              <span className="font-semibold">QTBG</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center space-y-4">
        <div className="w-full flex space-x-4">
          {approve_loading ? (
            <div className="w-full flex justify-center items-center">
              <Spinner />
            </div>
          ) : (
            <button
              type="button"
              onClick={approvedHandler}
              disabled={approved}
              className={`w-full text-white py-3 rounded-md text-sm font-semibold shadow-lg ${
                approved
                  ? "bg-gray-500"
                  : "bg-red-400 hover:brightness-125 active:brightness-125 duration-300"
              }`}
            >
              {t("layerPopup.approved")}
            </button>
          )}
        </div>
        {sendTransaction ? (
          <div className="w-full flex justify-center items-center">
            <Spinner />
          </div>
        ) : (
          <button
            type="button"
            onClick={sendTransactionHandler}
            disabled={!approved || sendTransaction}
            className={`w-full text-white py-3 rounded-md text-sm font-semibold shadow-lg ${
              !approved || sendTransaction
                ? "bg-gray-500"
                : "bg-red-400 hover:brightness-125 active:brightness-125 duration-300"
            }`}
          >
            {t("layerPopup.lpWithdraw")}
          </button>
        )}
      </div>
    </PopupLayout>
  );
};

export default PairWithdrawTransaction;
