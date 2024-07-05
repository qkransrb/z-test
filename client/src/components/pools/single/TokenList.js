import React from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { withComma } from "../../../utils/textUtil";
import { replaceDecimal } from "../../../utils/numberUtil";

const TokenList = () => {
  const { t } = useTranslation();

  const { tvl } = useSelector((state) => state.default);
  const { myDeposit } = useSelector((state) => state.myDeposit);
  const { claimable } = useSelector((state) => state.claimable);
  const { shareOfMyPool } = useSelector((state) => state.shareOfMyPool);

  return (
    <div className="pt-8 md:pb-4 bg-white rounded-lg">
      <p className="text-base md:text-2xl text-[#222222] px-4 md:px-8 mb-4 md:mb-8 font-semibold md:font-normal">
        {t("poolsScreen.myDepositedAssetsSingle")}
      </p>

      {/* PC */}
      <div className="hidden md:block">
        <table className="w-full">
          <colgroup>
            <col width="20%" />
            <col width="20%" />
            <col width="20%" />
            <col width="20%" />
            <col width="20%" />
          </colgroup>
          <thead>
            <tr className="bg-gray-200 text-xs text-gray-600 h-10">
              <th>{t("poolsScreen.pairName")}</th>
              <th>{t("poolsScreen.tvl")}</th>
              <th>{t("poolsScreen.myDeposit")}</th>
              <th>{t("poolsScreen.claimableToken")}</th>
              <th>{t("poolsScreen.shareOfMyPool")}</th>
            </tr>
          </thead>
          <tbody>
            <tr className="h-[80px]">
              <td className="pl-10">
                <div className="flex items-center space-x-2">
                  <img
                    src="/images/zyno.jpg"
                    alt="zynoro"
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
              <td className="text-center text-sm text-[#222222]">
                {`$ ${withComma(replaceDecimal(tvl.zyno, 2))}`}
              </td>
              <td className="text-center text-sm text-[#222222]">{`$ ${withComma(
                myDeposit.zyno
              )}`}</td>
              <td className="text-center text-sm text-[#222222]">{`${withComma(
                replaceDecimal(claimable.zyno, 2)
              )} ZYNO`}</td>
              <td className="text-center text-primary text-xl font-semibold">
                {`${shareOfMyPool.zyno} %`}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Mobile */}
      <div className="px-4 space-y-4 md:hidden pb-8">
        <div className="bg-gray-100 rounded-md px-2 p-2 shadow-md">
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
          <div className="space-y-2 pb-2">
            <div className="flex justify-between items-center text-sm text-gray-700">
              <span>{t("poolsScreen.tvl")}</span>
              <span className="font-semibold">{`$ ${withComma(
                replaceDecimal(tvl.zyno, 2)
              )}`}</span>
            </div>
            <div className="flex justify-between items-center text-sm text-gray-700">
              <span>{t("poolsScreen.myDeposit")}</span>
              <span className="font-semibold">{`$ ${withComma(
                myDeposit.zyno
              )}`}</span>
            </div>
            <div className="flex justify-between items-center text-sm text-gray-700">
              <span>{t("poolsScreen.claimableToken")}</span>
              <span className="font-semibold">{`${withComma(
                replaceDecimal(claimable.zyno, 2)
              )} ZYNO`}</span>
            </div>
            <div className="flex justify-between items-center text-sm text-gray-700">
              <span>{t("poolsScreen.shareOfMyPool")}</span>
              <span className="font-semibold">{`${shareOfMyPool.zyno} %`}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenList;
