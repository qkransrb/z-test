import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { withComma } from "../../utils/textUtil";
import { replaceDecimal } from "../../utils/numberUtil";

const PoolList = () => {
  const { t } = useTranslation();

  const { tvl, apr } = useSelector((state) => state.default);

  return (
    <div className="bg-white rounded-lg">
      <div className="flex flex-col md:flex-row justify-between md:items-center py-8 px-6 md:p-8 space-y-4 md:space-y-0">
        <p className="text-base md:text-xl text-[#222222] font-semibold md:font-normal">
          {t("homeScreen.assetsAvailableForDeposit")}
        </p>
        <div className="flex items-center space-x-2 md:space-x-4">
          <img
            src="/images/zyno.jpg"
            alt="zyno"
            className="w-9 md:w-11 h-9 md:h-11 rounded-md shsadow-md"
          />
          <p className="space-x-2">
            <span className="text-sm md:text-lg text-gray-500">
              {t("homeScreen.totalDailyRewards")}
            </span>
            <span className="text-sm md:text-lg text-primary font-semibold">
              1,000.00
            </span>
          </p>
        </div>
      </div>

      {/* PC */}
      <div className="pb-8 hidden md:block">
        <table className="w-full">
          <colgroup>
            <col width="28%" />
            <col width="18%" />
            <col width="18%" />
            <col width="18%" />
            <col width="18%" />
          </colgroup>
          <thead>
            <tr className="bg-gray-100 text-gray-700 h-[50px]">
              <th className="font-normal">{t("homeScreen.pairName")}</th>
              <th className="font-normal">{t("homeScreen.tvl")}</th>
              <th className="font-normal">{t("homeScreen.apr")}</th>
              <th className="font-normal">{t("homeScreen.dailyReward")}</th>
              <th className="font-normal">{t("homeScreen.deposit")}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="flex items-center space-x-2 py-5 pl-14">
                <img
                  src="/images/zyno.jpg"
                  alt="zyno"
                  className="w-11 h-11 rounded-full shadow-md"
                />
                <div>
                  <p className="text-sm font-semibold">Zynoro</p>
                  <p className="text-xs text-gray-500">ZYNO</p>
                </div>
              </td>
              <td className="text-center">{`$ ${withComma(
                replaceDecimal(tvl.zyno, 2)
              )}`}</td>
              <td className="text-center">{`${withComma(
                replaceDecimal(apr.zyno, 2)
              )} %`}</td>
              <td className="text-center">1,000.000 ZYNO</td>
              <td className="text-center">
                <Link
                  to="/pools/single"
                  className="px-6 py-2 bg-primary rounded-sm text-white text-sm hover:brightness-125 duration-300"
                >
                  {t("homeScreen.deposit")}
                </Link>
              </td>
            </tr>

            <tr>
              <td className="flex items-center space-x-2 py-5 pl-14">
                <div className="flex -space-x-2">
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
                  <p className="text-sm font-semibold">Zynoro + Tether</p>
                  <p className="text-xs text-gray-500">ZYNO + BUSDT</p>
                </div>
              </td>
              <td className="text-center">{`$ ${withComma(
                replaceDecimal(tvl.zyno_busdt, 2)
              )}`}</td>
              <td className="text-center">{`${withComma(
                replaceDecimal(apr.zyno_busdt, 2)
              )} %`}</td>
              <td className="text-center">1,000.000 ZYNO</td>
              <td className="text-center">
                <Link
                  to="/pools/pair/zyno-busdt"
                  className="px-6 py-2 bg-primary rounded-sm text-white text-sm hover:brightness-125 duration-300"
                >
                  {t("homeScreen.deposit")}
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Mobile */}
      <div className="pb-8 px-4 space-y-4 shadow-md md:hidden">
        <div className="bg-gray-100 rounded-md p-2">
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
              <span className="text-xs text-primary">ZYNO</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm text-gray-700">
              <span>{t("homeScreen.tvl")}</span>
              <span className="font-semibold">{`$ ${withComma(
                replaceDecimal(tvl.zyno, 2)
              )}`}</span>
            </div>
            <div className="flex justify-between items-center text-sm text-gray-700">
              <span>{t("homeScreen.apr")}</span>
              <span className="font-semibold">{`${withComma(
                replaceDecimal(apr.zyno, 2)
              )} %`}</span>
            </div>
            <div className="flex justify-between items-center text-sm text-gray-700">
              <span>{t("homeScreen.dailyReward")}</span>
              <span className="font-semibold">1,000.000 ZYNO</span>
            </div>
          </div>
          <div className="w-full mt-4 pb-2">
            <Link
              to="/pools/single"
              className="inline-block w-full bg-primary text-sm text-white rounded-md shadow-md text-center py-2"
            >
              {t("homeScreen.deposit")}
            </Link>
          </div>
        </div>

        <div className="bg-gray-100 rounded-md p-2">
          <div className="flex items-center space-x-2 pb-4 pt-2">
            <div className="flex items-center -space-x-2">
              <img
                src="/images/zyno.jpg"
                alt="zyno"
                className="w-9 h-9 rounded-full shadow-md"
              />
              <img
                src="/images/kusdt.png"
                alt="kusdt"
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
              <span>{t("homeScreen.tvl")}</span>
              <span className="font-semibold">{`$ ${withComma(
                replaceDecimal(tvl.zyno_busdt, 2)
              )}`}</span>
            </div>
            <div className="flex justify-between items-center text-sm text-gray-700">
              <span>{t("homeScreen.apr")}</span>
              <span className="font-semibold">{`${withComma(
                replaceDecimal(apr.zyno_busdt, 2)
              )} %`}</span>
            </div>
            <div className="flex justify-between items-center text-sm text-gray-700">
              <span>{t("homeScreen.dailyReward")}</span>
              <span className="font-semibold">1,000.000 ZYNO</span>
            </div>
          </div>
          <div className="w-full mt-4 pb-2">
            <Link
              to="/pools/pair/zyno-busdt"
              className="inline-block w-full bg-primary text-sm text-white rounded-md shadow-md text-center py-2"
            >
              {t("homeScreen.deposit")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoolList;
