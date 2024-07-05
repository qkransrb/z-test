import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { withComma } from "../../../utils/textUtil";
import { replaceDecimal } from "../../../utils/numberUtil";

const DepositList = () => {
  const { t } = useTranslation();

  const { tvl, apr } = useSelector((state) => state.default);

  return (
    <div className="pt-8 pb-4 bg-white rounded-lg">
      <p className="text-baes md:text-2xl text-[#222222] px-4 md:px-8 mb-4 md:mb-8 font-semibold md:font-normal">
        {t("poolsScreen.pairSubTitle")}
      </p>
      <div>
        {/* PC */}

        <div className="hidden md:block">
          <table className="w-full">
            <colgroup>
              <col width="25%" />
              <col width="20%" />
              <col width="20%" />
              <col width="20%" />
              <col width="15%" />
            </colgroup>

            <tbody className="border-t border-gray-300">
              <tr className="h-[80px]">
                <td className="pl-10">
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center -space-x-2">
                      <img
                        src="/images/zyno.jpg"
                        alt="zyno"
                        className="w-11 h-11 rounded-full shadow-md"
                      />
                      <img
                        src="/images/kusdt.png"
                        alt="tether"
                        className="w-11 h-11 rounded-full shadow-md"
                      />
                    </div>
                    <div>
                      <p className="text-sm text-[#222222] font-semibold">
                        Zynoro + Tether
                      </p>
                      <p className="text-xs text-gray-500">ZYNO + BUSDT</p>
                    </div>
                  </div>
                </td>
                <td className="text-center text-sm text-[#222222]">
                  <div className="flex justify-around items-center">
                    <span>{t("poolsScreen.apr")}</span>
                    <span className="font-semibold">{`${withComma(
                      replaceDecimal(apr.zyno_busdt, 2)
                    )} %`}</span>
                  </div>
                </td>
                <td className="text-center text-sm text-[#222222]">
                  <div className="flex justify-around items-center">
                    <span>{t("poolsScreen.tvl")}</span>
                    <span className="font-semibold">{`$ ${withComma(
                      replaceDecimal(tvl.zyno_busdt, 2)
                    )}`}</span>
                  </div>
                </td>
                <td className="text-center text-sm text-[#222222]">
                  <div className="flex justify-around items-center">
                    <span>{t("poolsScreen.dailyRewards")}</span>
                    <span className="font-semibold">1,000.000 ZYNO</span>
                  </div>
                </td>
                <td className="text-center">
                  <Link
                    to="/pools/pair/zyno-busdt"
                    className="bg-primary text-sm text-white rounded-sm px-6 py-2"
                  >
                    {t("poolsScreen.deposit")}
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Mobile */}
        <div className="px-4 space-y-4 md:hidden pb-2">
          {/* ZYNO-BUSDT */}
          <div className="bg-gray-100 rounded-md p-2 shadow-md">
            <div className="flex items-center space-x-2 pb-4 pt-2">
              <div className="flex items-center -space-x-2">
                <img
                  src="/images/zyno.jpg"
                  alt="zyno"
                  className="w-9 h-9 rounded-full shadow-md"
                />
                <img
                  src="/images/kusdt.png"
                  alt="qtbk"
                  className="w-9 h-9 rounded-full shadow-md"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-gray-700 font-semibold">
                  Zynoro + Tether
                </span>
                <span className="text-xs text-primary">ZYNO + BUSDT</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm text-gray-700">
                <span>{t("poolsScreen.tvl")}</span>
                <span className="font-semibold">{`$ ${withComma(
                  replaceDecimal(tvl.zyno_busdt, 2)
                )}`}</span>
              </div>
              <div className="flex justify-between items-center text-sm text-gray-700">
                <span>{t("poolsScreen.apr")}</span>
                <span className="font-semibold">{`${withComma(
                  replaceDecimal(apr.zyno_busdt, 2)
                )} %`}</span>
              </div>
              <div className="flex justify-between items-center text-sm text-gray-700">
                <span>{t("poolsScreen.dailyRewards")}</span>
                <span className="font-semibold">1,000.000 ZYNO</span>
              </div>
            </div>
            <div className="w-full mt-4 pb-2">
              <Link
                to="/pools/pair/zyno-busdt"
                className="inline-block w-full bg-primary text-sm text-white rounded-md shadow-md text-center py-2"
              >
                {t("poolsScreen.deposit")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepositList;
