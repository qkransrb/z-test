import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import MyDepositInformation from "../components/pools/pair/details/MyDepositInformation";
import PairInformation from "../components/pools/pair/details/PairInformation";
import PairDeposit from "../components/pools/pair/details/PairDeposit";
import PairWithdraw from "../components/pools/pair/details/PairWithdraw";
import { fetchMyDepositAmountAction } from "../redux/actions/myDepositAction";
import { fetchClaimableAction } from "../redux/actions/claimableAction";
import { fetchShareOfMyPoolAction } from "../redux/actions/shareAction";
import { fetchBalanceAction } from "../redux/actions/balanceAction";
import ClaimRewards from "../components/popup/pools/pair/ClaimRewards";
import { fetchDefaultAction } from "../redux/actions/defaultAction";

const PairPoolDetail = ({ location }) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const [pairA, setPairA] = useState("");
  const [pairB, setPairB] = useState("");

  const [tabIndex, setTabIndex] = useState(0); // 0: Deposit, 1: Withdraw

  const dispatchActionFunction = () => {
    dispatch(fetchDefaultAction());
    dispatch(fetchMyDepositAmountAction());
    dispatch(fetchClaimableAction());
    dispatch(fetchShareOfMyPoolAction());
    dispatch(fetchBalanceAction());
  };

  useEffect(() => {
    setPairA(location.pathname.split("/")[3].split("-")[0]);
    setPairB(location.pathname.split("/")[3].split("-")[1]);

    dispatchActionFunction();

    const interval = setInterval(() => {
      dispatchActionFunction();
    }, 1000 * 60);
    return () => clearInterval(interval);
  }, []);

  /* ==================== 팝업 이벤트 ==================== */
  const [claimRewardsOpen, setClaimRewardsOpen] = useState(false);

  return (
    <div className="py-14 max-w-[800px] mx-auto space-y-6">
      <PairInformation pairA={pairA} pairB={pairB} />
      <MyDepositInformation
        pairA={pairA}
        pairB={pairB}
        setClaimRewardsOpen={setClaimRewardsOpen}
      />
      <div className="py-8 px-4 md:px-10 bg-white rounded-lg">
        <div className="space-x-4 mb-4 md:mb-8">
          <button
            type="button"
            onClick={() => setTabIndex(0)}
            className={`${
              tabIndex === 0 ? "text-[#246bea]" : "text-gray-300"
            } md:text-xl font-bold`}
          >
            {t("poolsScreen.deposit")}
          </button>
          <button
            type="button"
            onClick={() => setTabIndex(1)}
            className={`${
              tabIndex === 1 ? "text-red-400" : "text-gray-300"
            } md:text-xl font-bold`}
          >
            {t("poolsScreen.withdraw")}
          </button>
        </div>
        {tabIndex === 0 && <PairDeposit pairA={pairA} pairB={pairB} />}
        {tabIndex === 1 && <PairWithdraw pairA={pairA} pairB={pairB} />}
      </div>

      {claimRewardsOpen && (
        <ClaimRewards
          setClaimRewardsOpen={setClaimRewardsOpen}
          pairA={pairA}
          pairB={pairB}
        />
      )}
    </div>
  );
};

export default PairPoolDetail;
