import React from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { withComma } from "../../../../utils/textUtil";
import { replaceDecimal } from "../../../../utils/numberUtil";

const PairInformation = ({ pairA, pairB }) => {
  const { t } = useTranslation();

  const { tvl, apr } = useSelector((state) => state.default);

  return (
    <div className="py-5 px-4 md:px-10 bg-white rounded-lg flex flex-col md:flex-row justify-between">
      <div className="flex flex-col justify-between space-y-2">
        <div className="flex items-center space-x-2">
          <p className="text-xl font-bold">{`${
            pairA && pairA.toUpperCase()
          } + ${pairB && pairB.toUpperCase()}`}</p>
          <div className="flex items-center -space-x-1">
            <img
              src="/images/zyno.jpg"
              alt="zyno"
              className="w-7 h-7 rounded-full shadow-md"
            />
            <img
              src="/images/kusdt.png"
              alt="tether"
              className="w-7 h-7 rounded-full shadow-md"
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-start md:items-center space-x-0 md:space-x-4 space-y-1 md:space-y-0 text-[10px] text-gray-500">
          <p className="space-x-1 md:space-x-2">
            <span>{t("poolsScreen.poolSize")}</span>
            <span>{`$ ${
              pairA &&
              pairB &&
              withComma(replaceDecimal(tvl[pairA + "_" + pairB], 2))
            }`}</span>
          </p>
          <p className="space-x-1 md:space-x-2">
            <span>{t("poolsScreen.dailyDistribution")}</span>
            <span>54,794 ZYNO</span>
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-between items-end space-y-0 md:space-y-2">
        <p className="text-xs font-semibold">{t("poolsScreen.apr")}</p>
        <span className="text-xl md:text-2xl text-primary font-bold">{`${
          pairA &&
          pairB &&
          withComma(replaceDecimal(apr[pairA + "_" + pairB], 2))
        } %`}</span>
      </div>
    </div>
  );
};

export default PairInformation;
