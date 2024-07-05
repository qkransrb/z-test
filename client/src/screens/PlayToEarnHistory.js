import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import DepositHistory from "../components/p2e/DepositHistory";
import WithdrawHistory from "../components/p2e/WithdrawHistory";
import Title from "../components/Title";

const PlayToEarnHistory = () => {
  const { t } = useTranslation();

  const [tabIndex, setTabIndex] = useState(0); // 0: Deposit, 1: Withdraw

  return (
    <div className="space-y-7 pb-14">
      <Title title="p2eScreen.title2" />
      <div className="w-full bg-white rounded-lg shadow-md mt-24 py-6 md:py-10 space-y-6">
        <div className="flex justify-between items-center px-4 md:px-10">
          {tabIndex === 0 && (
            <span className="md:text-xl text-[#246bea] font-semibold">
              {t("p2eScreen.deposit")}
            </span>
          )}
          {tabIndex === 1 && (
            <span className="md:text-xl text-red-400 font-semibold">
              {t("p2eScreen.withdraw")}
            </span>
          )}
          <div className="flex items-center gap-2 md:gap-4">
            <button
              type="button"
              onClick={() => setTabIndex(0)}
              className={`min-w-[70px] md:min-w-[120px] text-xs md:text-sm border border-[#246bea] rounded-md py-1 hover:bg-[#246bea] hover:text-white duration-300 ${
                tabIndex === 0 ? "bg-[#246bea] text-white" : "text-[#246bea]"
              }`}
            >
              {t("p2eScreen.deposit")}
            </button>
            <button
              type="button"
              onClick={() => setTabIndex(1)}
              className={`min-w-[70px] md:min-w-[120px] text-xs md:text-sm border border-red-400 rounded-md py-1 hover:bg-red-400 hover:text-white duration-300 ${
                tabIndex === 1 ? "bg-red-400 text-white" : "text-red-400"
              }`}
            >
              {t("p2eScreen.withdraw")}
            </button>
          </div>
        </div>
        {tabIndex === 0 && <DepositHistory />}
        {tabIndex === 1 && <WithdrawHistory />}
      </div>
    </div>
  );
};

export default PlayToEarnHistory;
