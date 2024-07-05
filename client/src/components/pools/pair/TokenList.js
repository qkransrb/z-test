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
    <div className="pt-8 pb-4 bg-white rounded-lg">
      <p className="text-base md:text-2xl text-[#222222] px-4 md:px-8 mb-4 md:mb-8 font-semibold md:font-normal">
        {t("poolsScreen.myDepositedAssetsPair")}
      </p>
      {/* PC */}
      <div className="hidden md:block">
        <table className="w-full">
          <colgroup>
            <col width="28%" />
            <col width="18%" />
            <col width="18%" />
            <col width="18%" />
            <col width="18%" />
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
                {`$ ${withComma(replaceDecimal(tvl.zyno_busdt, 2))}`}
              </td>
              <td className="text-center text-sm text-[#222222]">{`$ ${withComma(
                myDeposit.zyno_busdt
              )}`}</td>
              <td className="text-center text-sm text-[#222222]">{`${
                claimable.zyno_busdt
                  ? withComma(replaceDecimal(claimable.zyno_busdt, 2))
                  : "0"
              } ZYNO`}</td>
              <td className="text-center text-primary text-xl font-semibold">
                {`${
                  shareOfMyPool.zyno_busdt ? shareOfMyPool.zyno_busdt : "0"
                } %`}
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
                alt="tether"
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
              <span>{t("poolsScreen.myDeposit")}</span>
              <span className="font-semibold">{`$ ${withComma(
                myDeposit.zyno_busdt
              )}`}</span>
            </div>
            <div className="flex justify-between items-center text-sm text-gray-700">
              <span>{t("poolsScreen.claimableToken")}</span>
              <span className="font-semibold">{`${
                claimable.zyno_busdt
                  ? withComma(replaceDecimal(claimable.zyno_busdt, 2))
                  : "0"
              } ZYNO`}</span>
            </div>
            <div className="flex justify-between items-center text-sm text-gray-700">
              <span>{t("poolsScreen.shareOfMyPool")}</span>
              <span className="font-semibold">{`${
                shareOfMyPool.zyno_busdt ? shareOfMyPool.zyno_busdt : "0"
              } %`}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenList;
