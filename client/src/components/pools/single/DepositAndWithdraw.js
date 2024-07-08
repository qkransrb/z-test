import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import ClaimRewards from "../../popup/pools/single/ClaimRewards";
import SingleDepositInformation from "../../popup/pools/single/SingleDepositInformation";
import SingleWithdrawInformation from "../../popup/pools/single/SingleWithdrawInformation";
import { withComma } from "../../../utils/textUtil";
import SingleDepositTransaction from "../../popup/pools/single/SingleDepositTransaction";
import SingleWithdrawTransaction from "../../popup/pools/single/SingleWithdrawTransaction";
import { replaceDecimal } from "../../../utils/numberUtil";

const DepositAndWithdraw = () => {
  const { t } = useTranslation();

  const { tvl } = useSelector((state) => state.default);
  const { apr } = useSelector((state) => state.default);
  const { claimable } = useSelector((state) => state.claimable);
  const { amount } = useSelector((state) => state.myDepositAmount);
  const { balance } = useSelector((state) => state.balance);

  const [tabIndex, setTabIndex] = useState(0);
  const [inputs, setInputs] = useState({
    deposit: "",
    withdraw: "",
  });

  const { deposit, withdraw } = inputs;

  const onChangeHandler = (e) => {
    const value = e.target.value.replace(/[^0-9\.]$/g, "");

    if (e.target.name === "deposit") {
      if (balance.zyno < Number(value)) {
        setInputs({
          ...inputs,
          [e.target.name]: "",
        });
        return;
      }
    }

    if (e.target.name === "withdraw") {
      if (amount.zyno < Number(value)) {
        setInputs({
          ...inputs,
          [e.target.name]: "",
        });
        return;
      }
    }

    setInputs({
      ...inputs,
      [e.target.name]: value,
    });
  };

  const tabIndexHandler = (index) => {
    setInputs({
      deposit: "",
      withdraw: "",
    });
    setTabIndex(index);
  };

  const maxButtonHandler = (type) => {
    if (type === "deposit") {
      setInputs({
        ...inputs,
        deposit: balance.zyno,
      });
    }

    if (type === "withdraw") {
      setInputs({
        ...inputs,
        withdraw: amount.zyno,
      });
    }
  };

  /* ===================== 팝업 이벤트 ===================== */
  const [depositInformationOpen, setDepositInformationOpen] = useState(false);
  const [depositTransactionOpen, setDepositTransactionOpen] = useState(false);

  const depositHandler = () => {
    setDepositInformationOpen(true);
  };

  const [withdrawInformationOpen, setWithdrawInformationOpen] = useState(false);
  const [withdrawTransactionOpen, setWithdrawTransactionOpen] = useState(false);

  const withdrawHandler = () => {
    setWithdrawInformationOpen(true);
  };

  const [claimRewardsOpen, setClaimRewardsOpen] = useState(false);

  const claimRewardsHandler = () => {
    setClaimRewardsOpen(true);
  };

  return (
    <div className="pt-8 bg-white rounded-lg">
      <p className="px-4 md:px-8 text-base md:text-2xl text-[#222222] md:border-b border-b-gray-300 pb-4 md:pb-8 font-semibold md:font-normal">
        {t("poolsScreen.singleSubTitle")}
      </p>

      {/* PC */}
      <div className="hidden md:block">
        <table className="w-full">
          <colgroup>
            <col width="20%" />
            <col width="25%" />
            <col width="30%" />
            <col width="25%" />
          </colgroup>
          <tbody>
            <tr className="h-[80px]">
              <td className="pl-10">
                <div className="flex items-center space-x-2">
                  <img
                    src="/images/zyno.jpg"
                    alt="zyno"
                    className="w-11 h-11 rounded-full shadow-md"
                  />
                  <div>
                    <p className="text-sm text-[#222222] font-semibold">
                      Zynoro
                    </p>
                    <p className="text-xs text-gray-500">ZYNO</p>
                  </div>
                </div>
              </td>
              <td>
                <div className="flex justify-around items-center text-sm text-[#222222]">
                  <span>{t("poolsScreen.apr")}</span>
                  <span className="font-semibold">{`${withComma(
                    replaceDecimal(apr.zyno, 2)
                  )} %`}</span>
                </div>
              </td>
              <td>
                <div className="flex justify-around items-center text-sm text-[#222222]">
                  <span>{t("poolsScreen.tvl")}</span>
                  <span className="font-semibold">{`$ ${withComma(
                    replaceDecimal(tvl.zyno, 2)
                  )}`}</span>
                </div>
              </td>
              <td className="pr-4">
                <div className="flex justify-around items-center text-sm text-[#222222]">
                  <span>{t("poolsScreen.dailyRewards")}</span>
                  <span className="font-semibold">1,000.000 ZYNO</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Mobile */}
      <div className="px-4 space-y-4 md:hidden mb-8">
        <div className="bg-gray-100 rounded-md px-2 py-2 shadow-md">
          <div className="flex items-center space-x-2 pb-4 pt-2">
            <img
              src="/images/zyno.jpg"
              alt="zyno"
              className="w-9 h-9 rounded-full shadow-md"
            />
            <div className="flex flex-col">
              <span className="text-sm text-gray-700 font-semibold">
                Zynoro
              </span>
              <span className="text-xs text-[#246bea]">ZYNO</span>
            </div>
          </div>
          <div className="space-y-2 pb-2">
            <div className="flex justify-between items-center text-sm text-gray-700">
              <span>{t("poolsScreen.tvl")}</span>
              <span className="font-semibold">{`$ ${withComma(
                replaceDecimal(tvl.zyno, 2)
              )}`}</span>
            </div>
            <div className="flex justify-between items-center text-sm text-gray-700">
              <span>{t("poolsScreen.apr")}</span>
              <span className="font-semibold">{`${withComma(
                replaceDecimal(apr.zyno, 2)
              )} %`}</span>
            </div>
            <div className="flex justify-between items-center text-sm text-gray-700">
              <span>{t("poolsScreen.dailyRewards")}</span>
              <span className="font-semibold">1,000.000 ZYNO</span>
            </div>
          </div>
        </div>
      </div>

      {/* PC & Mobile */}
      <div className="py-8 px-4 md:px-10 bg-gray-100 rounded-b-lg flex flex-col md:flex-row justify-between md:space-x-20 space-y-8 md:space-y-0">
        <div className="w-full md:w-[50%]">
          <div className="space-x-4 mb-8 flex">
            <button
              type="button"
              onClick={() => tabIndexHandler(0)}
              className={`w-full md:max-w-[110px] text-sm border px-4 py-1 rounded-md hover:bg-[#246bea] hover:border-[#246bea] hover:text-white active:brightness-125 duration-300 ${
                tabIndex === 0
                  ? "bg-[#246bea] border-[#246bea] text-white"
                  : "border-gray-400 text-gray-400"
              }`}
            >
              {t("poolsScreen.depositButton")}
            </button>
            <button
              type="button"
              onClick={() => tabIndexHandler(1)}
              className={`w-full md:max-w-[110px] text-sm border px-4 py-1 rounded-md hover:bg-red-400 hover:border-red-400 hover:text-white active:brightness-125 duration-300 ${
                tabIndex === 1
                  ? "bg-red-400 border-red-400 text-white"
                  : "border-gray-400 text-gray-400"
              }`}
            >
              {t("poolsScreen.withdrawButton")}
            </button>
          </div>

          {/* Single Pool Deposit */}
          {tabIndex === 0 && (
            <>
              <div className="bg-gray-200 px-2 md:px-4 py-1 md:py-2 flex items-center space-x-2 md:space-x-6 mb-2 rounded-sm">
                <input
                  type="text"
                  name="deposit"
                  value={deposit}
                  placeholder="0"
                  onChange={onChangeHandler}
                  className="w-[70%] flex-1 py-1 bg-transparent focus:outline-none placeholder:text-gray-700"
                />
                <span className="text-sm md:text-base">ZYNO</span>
                <button
                  type="button"
                  onClick={() => maxButtonHandler("deposit")}
                  disabled={!Number(balance.zyno) > 0}
                  className={`text-white text-sm px-4 py-1 rounded-md ${
                    amount.zyno > 0
                      ? "bg-[#246bea] active:brightness-125 duration-300"
                      : "bg-gray-500"
                  }`}
                >
                  MAX
                </button>
              </div>

              <div className="flex justify-between items-center mb-4 md:mb-8">
                <p className="text-gray-500 text-xs md:text-sm">
                  {t("poolsScreen.walletBalance")}
                </p>
                <div className="space-x-2 text-xs md:text-sm text-[#222222]">
                  <span>{withComma(replaceDecimal(balance.zyno, 6))}</span>
                  <span>ZYNO</span>
                </div>
              </div>

              <button
                type="button"
                onClick={depositHandler}
                disabled={!deposit || !Number(deposit)}
                className={`text-white text-sm md:text-base w-full py-2 md:py-3 rounded-md ${
                  !deposit || !Number(deposit)
                    ? "bg-gray-500"
                    : "bg-[#246bea] active:brightness-125 duration-300"
                }`}
              >
                {t("poolsScreen.deposit")}
              </button>
            </>
          )}

          {/* Single Pool Withdraw */}
          {tabIndex === 1 && (
            <>
              <div className="bg-gray-200 px-2 md:px-4 py-1 md:py-2 flex items-center space-x-2 md:space-x-6 mb-2 rounded-sm">
                <input
                  type="text"
                  name="withdraw"
                  value={withdraw}
                  placeholder="0"
                  onChange={onChangeHandler}
                  className="w-[70%] flex-1 py-1 bg-transparent focus:outline-none placeholder:text-gray-700"
                />
                <span className="text-sm md:text-base">ZYNO</span>
                <button
                  type="button"
                  onClick={() => maxButtonHandler("withdraw")}
                  disabled={!Number(amount.zyno) > 0}
                  className={`text-white text-sm px-4 py-1 rounded-md ${
                    amount.zyno > 0
                      ? "bg-red-400 active:brightness-125 duration-300"
                      : "bg-gray-500"
                  }`}
                >
                  MAX
                </button>
              </div>

              <div className="flex justify-between items-center mb-4 md:mb-8">
                <p className="text-gray-500 text-xs md:text-sm">
                  {t("poolsScreen.poolBalance")}
                </p>
                <div className="space-x-2 text-xs md:text-sm text-[#222222]">
                  <span>{withComma(replaceDecimal(amount.zyno, 6))}</span>
                  <span>ZYNO</span>
                </div>
              </div>

              <button
                type="button"
                onClick={withdrawHandler}
                disabled={!withdraw || !Number(withdraw)}
                className={`text-white text-sm md:text-base w-full py-2 md:py-3 rounded-md ${
                  !withdraw || !Number(withdraw)
                    ? "bg-gray-500"
                    : "bg-red-400 active:brightness-125 duration-300"
                }`}
              >
                {t("poolsScreen.withdraw")}
              </button>
            </>
          )}
        </div>
        <div className="w-full md:w-[50%] flex flex-col justify-end">
          <div className="space-y-2 md:space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-gray-500 text-sm md:text-base">
                {t("poolsScreen.deposit")}
              </p>
              <div className="space-x-2">
                <span className="text-[#222222] text-sm md:text-lg font-semibold">
                  {withComma(amount.zyno)}
                </span>
                <span className="text-sm md:text-base">ZYNO</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-gray-500 text-sm md:text-base">
                {t("poolsScreen.earnRewards")}
              </p>
              <div className="space-x-2">
                <span className="text-cyan-500 text-sm md:text-lg">≈</span>
                <span className="text-[#222222] text-sm md:text-lg font-semibold">
                  {withComma(claimable.zyno)}
                </span>
                <span className="text-sm md:text-base">ZYNO</span>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={claimRewardsHandler}
            disabled={!Number(claimable.zyno) > 0}
            className={`text-white text-sm md:text-base w-full py-2 md:py-3 rounded-md mt-4 md:mt-12 ${
              !Number(claimable.zyno) > 0
                ? "bg-gray-500"
                : "bg-primary active:brightness-125 duration-300"
            }`}
          >
            {t("poolsScreen.claimRewards2")}
          </button>
        </div>
      </div>
      {
        // Deposit Information
        depositInformationOpen && (
          <SingleDepositInformation
            setDepositInformationOpen={setDepositInformationOpen}
            setDepositTransactionOpen={setDepositTransactionOpen}
            inputs={inputs}
            setInputs={setInputs}
          />
        )
      }

      {
        // Deposit Transaction
        depositTransactionOpen && (
          <SingleDepositTransaction
            setDepositTransactionOpen={setDepositTransactionOpen}
            inputs={inputs}
            setInputs={setInputs}
          />
        )
      }

      {
        // Withdrawal Information
        withdrawInformationOpen && (
          <SingleWithdrawInformation
            setWithdrawInformationOpen={setWithdrawInformationOpen}
            setWithdrawTransactionOpen={setWithdrawTransactionOpen}
            inputs={inputs}
            setInputs={setInputs}
          />
        )
      }

      {
        // Withdrawal Transaction
        withdrawTransactionOpen && (
          <SingleWithdrawTransaction
            setWithdrawTransactionOpen={setWithdrawTransactionOpen}
            inputs={inputs}
            setInputs={setInputs}
          />
        )
      }

      {claimRewardsOpen && (
        <ClaimRewards setClaimRewardsOpen={setClaimRewardsOpen} />
      )}
    </div>
  );
};

export default DepositAndWithdraw;
