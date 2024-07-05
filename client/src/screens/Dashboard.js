import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import axios from "axios";
import StakingChart from "../components/dashboard/StakingChart";
import TradingChart from "../components/dashboard/TradingChart";
import { fetchBuybackAssetAction } from "../redux/actions/buybackAction";
import { withComma } from "../utils/textUtil";
import { replaceDecimal } from "../utils/numberUtil";
import { BiLinkExternal } from "react-icons/bi";
import Title from "../components/Title";
import { fetchDefaultAction } from "../redux/actions/defaultAction";

const Dashboard = () => {
  const { t } = useTranslation();

  // QTBG 총 유통량
  const [qtbgTotalCirculation, setQtbgTotalCirculation] = useState("0");

  // QTBG 총 스테이킹 수량
  const [qtbgTotalStakingQuantity, setQtbgTotalStakingQuantity] = useState("0");

  const [totalDepositQuantity, setTotalDepositQuantity] = useState("");
  const [totalDepositDate, setTotalDepositDate] = useState("");

  const [totalServiceQuantity, setTotalServiceQuantity] = useState("");
  const [totalServiceDate, setTotalServiceDate] = useState("");

  const [percentage, setPercentage] = useState("w-[0%]");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDefaultAction());
    dispatch(fetchBuybackAssetAction());
  }, [dispatch]);

  // QTBK, QTBG Price
  const { price } = useSelector((state) => state.default);

  // Buyback Fund Assets
  const {
    buyback: { asset },
  } = useSelector((state) => state.buyback);

  // 보상 수령, Claim Rewards 수량의 총합 (Provider 계정 제외)
  const fetchQtbgClaimRewardsQuantity = async () => {
    const { data } = await axios.get("/api/dashboard/rewards");
    return data;
  };

  // 페어 풀, QTBG 예치 수량의 총합 (Provider 계정 제외)
  const fetchPairQtbgDepositQuantity = async () => {
    const { data } = await axios.get("/api/dashboard/deposit");
    return data;
  };

  // 페어 풀, QTBG 출금 수량의 총합 (Provider 계정 제외)
  const fetchPairQtbgWithdrawQuantity = async () => {
    const { data } = await axios.get("/api/dashboard/withdraw");
    return data;
  };

  const fetchQtbgTotalCirculation = async () => {
    const qtbg_claim_rewards_quantity = await fetchQtbgClaimRewardsQuantity();
    const qtbg_pair_deposit_quantity = await fetchPairQtbgDepositQuantity();
    const qtbg_pair_withdraw_quantity = await fetchPairQtbgWithdrawQuantity();

    setQtbgTotalCirculation(
      qtbg_pair_deposit_quantity -
        qtbg_pair_withdraw_quantity +
        qtbg_claim_rewards_quantity
    );

    setQtbgTotalStakingQuantity(
      qtbg_pair_deposit_quantity - qtbg_pair_withdraw_quantity
    );
  };

  // 총 서비스 거래량 - (스왑)
  // const fetchTotalServiceVolume = async () => {
  //   try {
  //     const body = {};
  //     const config = {
  //       headers: {
  //         Accept: "application/json",
  //       },
  //     };
  //     const { data } = await axios.post(
  //       "https://api.quantfi.io:9443/api/selectServiceTrading",
  //       body,
  //       config
  //     );
  //   } catch (error) {
  //     console.error("fetchTotalServiceVolume - ", error);
  //   }
  // };

  useEffect(() => {
    fetchQtbgTotalCirculation();
    getCirculationPercentage();
    // fetchTotalServiceVolume();
  }, []);

  const getCirculationPercentage = () => {
    const percent = qtbgTotalCirculation / 10000000;

    if (percent < 10) {
      return setPercentage("w-[10%]");
    } else if (10 <= percent && percent < 20) {
      return setPercentage("w-[10%]");
    } else if (20 <= percent && percent < 30) {
      return setPercentage("w-[20%]");
    } else if (30 <= percent && percent < 40) {
      return setPercentage("w-[30%]");
    } else if (40 <= percent && percent < 50) {
      return setPercentage("w-[40%]");
    } else if (50 <= percent && percent < 60) {
      return setPercentage("w-[50%]");
    } else if (60 <= percent && percent < 70) {
      return setPercentage("w-[60%]");
    } else if (70 <= percent && percent < 80) {
      return setPercentage("w-[70%]");
    } else if (80 <= percent && percent < 90) {
      return setPercentage("w-[80%]");
    } else if (90 <= percent && percent <= 100) {
      return setPercentage("w-[90%]");
    }
  };

  return (
    <div className="space-y-7 pb-14">
      <Title title="dashboardScreen.title" />

      <div className="md:bg-dashboard md:h-[640px] md:p-12 rounded-[10px] flex flex-col justify-between items-center space-y-6 md:space-y-0">
        {/* Top */}
        <div className="md:h-[45%] w-full flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          {/* Top Left */}
          <div className="w-full md:w-[45%] h-[300px] md:h-[250px] flex flex-col justify-between items-center relative bg-dashboard md:bg-none p-4 md:p-0 rounded-md">
            <div className="w-full flex flex-col justify-center items-start">
              <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center">
                <p className="text-white">
                  {t("dashboardScreen.totalDepositAmountForService")}
                </p>
                <p className="text-sm text-[#64b0ff]">{totalDepositDate}</p>
              </div>
              <p className="text-2xl text-[#00ffb4] font-semibold mt-1">
                {`$ ${withComma(totalDepositQuantity)}`}
              </p>
            </div>
            <div className="w-full h-[90%] md:h-[100%] absolute top-6 md:top-0 left-0 p-4 md:p-0">
              <StakingChart
                setTotalDepositQuantity={setTotalDepositQuantity}
                setTotalDepositDate={setTotalDepositDate}
              />
            </div>
          </div>

          {/* Top Right */}
          <div className="w-full md:w-[45%] h-[250px] flex justify-between items-center bg-dashboard md:bg-none p-4 md:p-0 rounded-md">
            <div className="w-full h-full flex flex-col justify-between items-start">
              <p className="text-white h-[15%]">
                {t("dashboardScreen.circulation")}
              </p>
              <div className="w-full h-[85%] flex flex-col justify-between items-start">
                <div className="w-full flex justify-start items-end">
                  <p className="text-white text-xl md:text-5xl font-[500]">
                    {withComma(replaceDecimal(qtbgTotalCirculation, 6))}
                  </p>
                  <p className="text-white text-base md:text-2xl ml-2">QTBG</p>
                </div>
                <div className="w-full flex flex-col justify-start items-start">
                  <div className="w-full bg-white h-4 rounded-full">
                    <div
                      className={`${percentage} bg-[#7dc3ff] h-full rounded-full`}
                    />
                  </div>
                  <div className="flex justify-center items-center">
                    <p className="py-2">
                      <span className="text-[#64b0ff] text-sm mr-2">
                        {t("dashboardScreen.totalIssuedQuantity")}
                      </span>
                      <span className="text-white text-sm md:text-lg mr-2">
                        10,000,000
                      </span>
                      <span className="text-white text-sm md:text-lg">
                        QTBG
                      </span>
                    </p>
                  </div>
                </div>
                <div className="w-full flex flex-col md:flex-row justify-between items-start py-4 border-t border-t-[#2a5cc0] border-b border-b-[#2a5cc0]">
                  <div className="w-full md:w-[50%] flex justify-between md:justify-start items-center">
                    <p className="text-[#64b0ff] text-sm md:text-base font-[500] mr-2">
                      {t("dashboardScreen.qtbgPrice")}
                    </p>
                    <p className="text-white text-sm md:text-base font-[500]">{`$ ${withComma(
                      replaceDecimal(price.qtbg, 6)
                    )}`}</p>
                  </div>
                  <div className="w-full md:w-[50%] flex justify-between md:justify-start items-center">
                    <p className="text-[#64b0ff] text-sm md:text-base font-[500] mr-2">
                      {t("dashboardScreen.qtbkPrice")}
                    </p>
                    <p className="text-white text-sm md:text-base font-[500]">{`$ ${withComma(
                      replaceDecimal(price.qtbk, 6)
                    )}`}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="md:h-[45%] w-full flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          {/* Bottom Left */}
          <div className="w-full md:w-[45%] h-[300px] md:h-[250px] flex flex-col justify-between items-center relative bg-dashboard md:bg-none p-4 md:p-0 rounded-md">
            <div className="w-full flex flex-col justify-center items-start">
              <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center">
                <p className="text-white">
                  {t("dashboardScreen.totalServiceVolume")}
                </p>
                <p className="text-sm text-[#64b0ff]">{totalServiceDate}</p>
              </div>
              <p className="text-2xl text-[#7dc3ff] font-semibold mt-1">
                {`$ ${totalServiceQuantity}`}
              </p>
            </div>
            <div className="w-full h-[90%] md:h-[100%] absolute top-6 md:top-0 left-0 p-4 md:p-0">
              <TradingChart
                setTotalServiceQuantity={setTotalServiceQuantity}
                setTotalServiceDate={setTotalServiceDate}
              />
            </div>
          </div>

          {/* Bottom Right */}
          <div className="w-full md:w-[45%] h-[250px] flex flex-col justify-between items-center bg-dashboard md:bg-none p-4 md:p-0 rounded-md">
            <div className="w-full flex justify-between items-center">
              <p className="text-white text-sm md:text-base h-full">
                {t("dashboardScreen.totalStakingQuantity")}
              </p>
              <div className="flex flex-col justify-center items-end">
                <div className="flex justify-center items-end">
                  <p className="text-sm md:text-2xl text-white font-semibold">
                    {withComma(replaceDecimal(qtbgTotalStakingQuantity, 6))}
                  </p>
                  <p className="ml-2 text-sm md:text-xl text-white font-semibold">
                    QTBG
                  </p>
                </div>
                <div className="flex justify-center items-end pt-1">
                  <p className="text-sm text-[#64b0ff]">
                    {t("dashboardScreen.stakingRate")}
                  </p>
                  <p className="ml-2 text-sm md:text-base text-white">
                    {`${(
                      (qtbgTotalStakingQuantity / qtbgTotalCirculation) *
                      100
                    ).toFixed(2)} %`}
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full flex justify-between items-center">
              <p className="text-white text-sm md:text-base h-full">
                {t("dashboardScreen.burned")}
              </p>
              <div className="flex flex-col justify-center items-end">
                <div className="flex justify-center items-end">
                  <p className="text-sm md:text-2xl text-white font-semibold">
                    0
                  </p>
                  <p className="ml-2 text-sm md:text-xl text-white font-semibold">
                    QTBG
                  </p>
                </div>
                <div className="flex justify-center items-end pt-1">
                  <a
                    className="border border-[#64b0ff] text-[#64b0ff] text-xs md:text-sm rounded-sm px-4 py-1 hover:brightness-125 duration-300"
                    href="https://scope.klaytn.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t("dashboardScreen.detailedBurnedHistory")}
                  </a>
                </div>
              </div>
            </div>
            <div className="w-full flex justify-between items-center">
              <div className="w-full flex h-full flex-col justify-between items-start">
                <p className="text-white text-sm md:text-base h-full">
                  {t("dashboardScreen.buybackFund")}
                </p>
                <div className="w-full flex justify-start items-center">
                  <a
                    href="https://scope.klaytn.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#64b0ff] text-xs md:text-sm flex justify-start items-center hover:brightness-125 duration-300"
                  >
                    <span className="mr-1">View on Klaytn Scope</span>
                    {/* <img src="/images/ic-blank.png" alt="blank" /> */}
                    <BiLinkExternal className="text-lg" />
                  </a>
                </div>
              </div>
              <div className="w-full flex flex-col justify-center items-end">
                <div className="flex justify-center items-end">
                  <p className="text-sm md:text-2xl text-white font-semibold">
                    {`$ ${asset}`}
                  </p>
                </div>
                <div className="flex justify-center items-end pt-1">
                  <p className="text-sm text-[#64b0ff]">
                    {t("dashboardScreen.buybackDone")}
                  </p>
                  <p className="ml-2 text-sm md:text-base text-white">$ 0</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
