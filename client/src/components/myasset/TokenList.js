import React from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { withComma } from "../../utils/textUtil";
import { replaceDecimal } from "../../utils/numberUtil";

const TokenList = ({ klayBalance, klayPrice, kasTokenList }) => {
  const { t } = useTranslation();

  const { balance } = useSelector((state) => state.balance);
  const { price } = useSelector((state) => state.default);

  return (
    <div className="hidden md:block">
      <table className="w-full">
        <colgroup>
          <col width="30%" />
          <col width="25%" />
          <col width="25%" />
          <col width="25%" />
        </colgroup>
        <thead>
          <tr className="bg-gray-100 h-12">
            <th className="text-gray-500 font-semibold">
              {t("myAssetScreen.token")}
            </th>
            <th className="text-gray-500 font-semibold">
              {t("myAssetScreen.quantity")}
            </th>
            <th className="text-gray-500 font-semibold">
              {t("myAssetScreen.price")}
            </th>
            <th className="text-gray-500 font-semibold">
              {t("myAssetScreen.value")}
            </th>
          </tr>
        </thead>
        <tbody>
          {/* QTBK */}
          <tr>
            <td className="flex justify-between items-center py-6 px-8">
              <div className="flex items-center gap-2">
                <img
                  src="/images/qtbk.png"
                  alt="qtbk"
                  className="w-11 h-11 rounded-full shadow-md"
                />
                <div className="flex flex-col">
                  <span className="text-base text-gray-700 font-semibold">
                    {t("myAssetScreen.qtbk")}
                  </span>
                  <span className="text-sm text-gray-400">QTBK</span>
                </div>
              </div>
            </td>
            <td className="text-center text-gray-700">
              {withComma(balance.qtbk)}
            </td>
            <td className="text-center text-gray-700">{`$ ${withComma(
              replaceDecimal(price.qtbk, 6)
            )}`}</td>
            <td className="text-center text-gray-700">
              {`$ ${withComma(replaceDecimal(balance.qtbk * price.qtbk, 6))}`}
            </td>
          </tr>

          {/* QTBG */}
          <tr>
            <td className="flex justify-between items-center py-6 px-8">
              <div className="flex items-center gap-2">
                <img
                  src="/images/qtbg.png"
                  alt="qtbg"
                  className="w-11 h-11 rounded-full shadow-md"
                />
                <div className="flex flex-col">
                  <span className="text-base text-gray-700 font-semibold">
                    {t("myAssetScreen.qtbg")}
                  </span>
                  <span className="text-sm text-gray-400">QTBG</span>
                </div>
              </div>
            </td>
            <td className="text-center text-gray-700">
              {withComma(balance.qtbg)}
            </td>
            <td className="text-center text-gray-700">{`$ ${withComma(
              replaceDecimal(price.qtbg, 6)
            )}`}</td>
            <td className="text-center text-gray-700">
              {`$ ${withComma(replaceDecimal(balance.qtbg * price.qtbg, 6))}`}
            </td>
          </tr>

          {/* KUSDT */}
          <tr>
            <td className="flex justify-between items-center py-6 px-8">
              <div className="flex items-center gap-2">
                <img
                  src="/images/kusdt.png"
                  alt="kusdt"
                  className="w-11 h-11 rounded-full shadow-md"
                />
                <div className="flex flex-col">
                  <span className="text-base text-gray-700 font-semibold">
                    {t("myAssetScreen.kusdt")}
                  </span>
                  <span className="text-sm text-gray-400">KUSDT</span>
                </div>
              </div>
            </td>
            <td className="text-center text-gray-700">
              {withComma(balance.kusdt)}
            </td>
            <td className="text-center text-gray-700">{`$ 1.000000`}</td>
            <td className="text-center text-gray-700">
              {`$ ${withComma(replaceDecimal(balance.kusdt * 1, 6))}`}
            </td>
          </tr>

          {/* KLAY */}
          <tr>
            <td className="flex justify-between items-center py-6 px-8">
              <div className="flex items-center gap-2">
                <img
                  src="/images/klay.svg"
                  alt="klay"
                  className="w-11 h-11 rounded-full shadow-md"
                />
                <div className="flex flex-col">
                  <span className="text-base text-gray-700 font-semibold">
                    {t("myAssetScreen.klay")}
                  </span>
                  <span className="text-sm text-gray-400">KLAY</span>
                </div>
              </div>
            </td>
            <td className="text-center text-gray-700">
              {withComma(replaceDecimal(klayBalance, 6))}
            </td>
            <td className="text-center text-gray-700">{`$ ${withComma(
              replaceDecimal(klayPrice, 6)
            )}`}</td>
            <td className="text-center text-gray-700">
              {`$ ${withComma(replaceDecimal(klayBalance * klayPrice, 6))}`}
            </td>
          </tr>

          {/* OTHERS */}
          {/* {kasTokenList.map((token) => {
            //   KSP
            if (token.extras.symbol === "KSP") {
              return (
                <tr
                  key={token.contractAddress}
                  className="border-b border-gray-300"
                >
                  <td className="flex justify-between items-center py-4 px-8">
                    <div className="flex items-center gap-2">
                      <img
                        src="/images/kusdt.png"
                        alt="kusdt"
                        className="w-11 h-11 rounded-full shadow-md"
                      />
                      <div className="flex flex-col">
                        <span className="text-base text-gray-700 font-semibold">
                          {token.extras.name}
                        </span>
                        <span className="text-sm text-gray-400">
                          {token.extras.symbol}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="text-center text-gray-700">
                    {withComma(replaceDecimal(token.extras.formattedValue))}
                  </td>
                  <td className="text-center text-gray-700">{`$ 1.000000`}</td>
                  <td className="text-center text-gray-700">{`$ 0`}</td>
                </tr>
              );
            }
          })} */}
        </tbody>
      </table>
    </div>
  );
};

export default TokenList;
