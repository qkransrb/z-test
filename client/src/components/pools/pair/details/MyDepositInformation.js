import React from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { withComma } from "../../../../utils/textUtil";

const MyDepositInformation = ({ pairA, pairB, setClaimRewardsOpen }) => {
  const { t } = useTranslation();

  const { amount } = useSelector((state) => state.myDepositAmount);
  const { claimable } = useSelector((state) => state.claimable);
  const { shareOfMyPool } = useSelector((state) => state.shareOfMyPool);

  return (
    <div className="py-5 px-4 md:px-10 bg-white rounded-lg flex flex-col md:flex-row justify-between md:space-x-8 space-y-2 md:space-y-0">
      <div className="w-full md:w-[50%] flex justify-between items-center md:items-start bg-gray-100 md:bg-transparent p-2 md:p-0 rounded-md md:rounded-none md:shadow-none">
        <div className="space-y-1">
          <p className="text-[#222222] text-sm font-bold">
            {t("poolsScreen.myDeposit")}
          </p>
          <p className="text-gray-500 text-[10px] space-x-2">
            <span>{t("poolsScreen.shareOfPool")}</span>
            <span className="font-bold">{`${
              pairA && pairB && shareOfMyPool[pairA + "_" + pairB]
            } %`}</span>
          </p>
        </div>
        <div className="flex flex-col items-end">
          <div className="space-x-2">
            <span className="text-[#222222] text-base font-bold">
              {pairA && pairB && withComma(amount[pairA + "_" + pairB][pairA])}
            </span>
            <span className="text-gray-500 text-sm font-semibold">
              {pairA && pairA.toUpperCase()}
            </span>
          </div>
          <div className="space-x-2">
            <span className="text-[#222222] text-base font-bold">{`+ ${
              pairA && pairB && withComma(amount[pairA + "_" + pairB][pairB])
            }`}</span>
            <span className="text-gray-500 text-sm font-semibold">
              {pairB && pairB.toUpperCase()}
            </span>
          </div>
        </div>
      </div>
      <div className="border-r border-gray-500 hidden md:block" />
      <div className="w-full md:w-[50%] bg-gray-100 md:bg-transparent p-2 md:p-0 rounded-md md:rounded-none md:shadow-none flex md:block flex-row justify-between items-center">
        <div className="flex flex-col md:flex-row justify-between">
          <p className="text-[#222222] text-sm font-bold">
            {t("poolsScreen.claimableToken")}
          </p>
          <div className="space-x-2">
            <span className="text-[#222222] text-sm md:text-base font-bold">
              {pairA &&
                pairB &&
                withComma(
                  claimable[pairA + "_" + pairB]
                    ? claimable[pairA + "_" + pairB]
                    : "0"
                )}
            </span>
            <span className="text-gray-500 text-sm font-semibold">ZYNO</span>
          </div>
        </div>
        <div>
          <button
            type="button"
            disabled={!Number(claimable[pairA + "_" + pairB]) > 0}
            onClick={() => setClaimRewardsOpen(true)}
            className={`text-white text-xs px-4 py-[2px] rounded-full font-semibold shadow-md ${
              !Number(claimable[pairA + "_" + pairB]) > 0
                ? "bg-gray-500"
                : "bg-primary hover:brightness-110 duration-300"
            }`}
          >
            {t("poolsScreen.rewards")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyDepositInformation;
