import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { BsQuestionCircle } from "react-icons/bs";
import { withComma } from "../../utils/textUtil";
import { TbNorthStar } from "react-icons/tb";
import {
  fetchPairDepositQuantity,
  fetchPairQtbgDepositQuantity,
  fetchPairQtbgWithdrawQuantity,
  fetchPairWithdrawQuantity,
  fetchQtbgClaimRewardsQuantity,
  fetchSingleDepositQuantity,
  fetchSingleWithdrawQuantity,
} from "../../utils/api";
import { replaceDecimal } from "../../utils/numberUtil";

const Circulation = () => {
  const { t } = useTranslation();

  const { price } = useSelector((state) => state.default);

  const [qtbkTotalCirculation, setQtbkTotalCirculation] = useState(0);
  const [qtbgTotalCirculation, setQtbgTotalCirculation] = useState(0);

  // useEffect(() => {
  //   fetchQtbkTotalCirculation();
  //   fetchQtbgTotalCirculation();
  // }, []);

  // QTBK Total Circulation
  // const fetchQtbkTotalCirculation = async () => {
  //   const singleDeposit = await fetchSingleDepositQuantity();
  //   const singleWithdraw = await fetchSingleWithdrawQuantity();
  //   const pairDeposit = await fetchPairDepositQuantity();
  //   const pairWithdraw = await fetchPairWithdrawQuantity();

  //   setQtbkTotalCirculation(
  //     singleDeposit - singleWithdraw + pairDeposit - pairWithdraw
  //   );
  // };

  // QTBG Total Circulation
  // const fetchQtbgTotalCirculation = async () => {
  //   const qtbgRewards = await fetchQtbgClaimRewardsQuantity();
  //   const qtbgDeposit = await fetchPairQtbgDepositQuantity();
  //   const qtbgWithdraw = await fetchPairQtbgWithdrawQuantity();

  //   setQtbgTotalCirculation(qtbgRewards - qtbgDeposit + qtbgWithdraw);
  // };

  return (
    <div className="bg-white rounded-lg py-8 px-6 md:p-8 flex flex-col justify-between">
      <div className="space-y-4 md:space-y-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2 md:space-x-4">
            <img
              src="/images/zyno.jpg"
              alt="zyno"
              className="w-9 md:w-11 h-9 md:h-11 rounded-full shadow-md"
            />
            <div className="text-gray-700 text-xl md:text-[28px]">{`$ ${withComma(
              replaceDecimal(price.zyno, 6)
            )}`}</div>
          </div>
          <Link
            to="/swap"
            className="bg-primary text-white text-xs md:text-sm px-4 py-2 rounded-md md:rounded-sm hover:brightness-110 duration-300"
          >
            Buy ZYNO
          </Link>
        </div>
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <p className="text-sm md:text-lg text-[#222222] font-semibold">
              Zynoro
            </p>
            <p className="text-primary text-sm md:text-base">ZYNO</p>
          </div>
          <div className="space-y-2 flex flex-col items-end">
            <div className="flex items-center space-x-1">
              <p className="text-sm text-gray-500">
                {t("homeScreen.totalCirculation")}
              </p>
              <div className="relative group">
                <BsQuestionCircle className="text-sm text-gray-500 cursor-pointer" />
                <div className="absolute top-5 right-0 bg-black/70 text-gray-100 w-[300px] md:min-w-[380px] p-4 rounded-md shadow-md hidden group-hover:block">
                  <div className="text-sm flex items-center space-x-1 pb-2">
                    <TbNorthStar className="text-yellow-400" />
                    <span className="font-semibold underline">
                      ZYNO Total Circulation
                    </span>
                  </div>
                  <p
                    className="text-xs"
                    // dangerouslySetInnerHTML={{
                    //   __html: t("homeScreen.qtbkTotalCirculation"),
                    // }}
                  >{`{ZYNO(싱글, 페어) 풀에 예치된 Deposit 합계} - {ZYNO(싱글, 페어) 풀에서 출금된 Withdraw합계}의 합산 수량이 표시됩니다.`}</p>
                </div>
              </div>
            </div>
            <div className="text-sm md:text-xl text-[#222222]">
              {withComma(replaceDecimal(qtbkTotalCirculation, 6))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Circulation;
