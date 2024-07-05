import React from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { withComma } from "../../utils/textUtil";
import { replaceDecimal } from "../../utils/numberUtil";

const MobileTokenList = ({ klayBalance, klayPrice, kasTokenList }) => {
  const { t } = useTranslation();

  const { balance } = useSelector((state) => state.balance);
  const { price } = useSelector((state) => state.default);

  return (
    <div className="px-4 space-y-6 md:hidden">
      {/* QTBK */}
      <div className="p-4 bg-gray-100 rounded-md shadow-md space-y-4">
        <div className="py-2">
          <div className="flex items-center gap-2">
            <img
              src="/images/qtbk.png"
              alt="qtbk"
              className="w-9 h-9 rounded-full shadow-md"
            />
            <div className="flex flex-col">
              <span className="text-sm text-gray-700 font-semibold">
                {t("myAssetScreen.qtbk")}
              </span>
              <span className="text-xs text-gray-500">QTBK</span>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-700">
            {t("myAssetScreen.quantity")}
          </span>
          <span className="text-sm text-gray-700 font-semibold">
            {withComma(balance.qtbk)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-700">
            {t("myAssetScreen.price")}
          </span>
          <span className="text-sm text-gray-700 font-semibold">
            {`$ ${withComma(replaceDecimal(price.qtbk, 6))}`}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-700">
            {t("myAssetScreen.value")}
          </span>
          <span className="text-sm text-gray-700 font-semibold">
            {`$ ${withComma(replaceDecimal(balance.qtbk * price.qtbk))}`}
          </span>
        </div>
      </div>

      {/* QTBG */}
      <div className="p-4 bg-gray-100 rounded-md shadow-md space-y-4">
        <div className="py-2">
          <div className="flex items-center gap-2">
            <img
              src="/images/qtbg.png"
              alt="qtbg"
              className="w-9 h-9 rounded-full shadow-md"
            />
            <div className="flex flex-col">
              <span className="text-sm text-gray-700 font-semibold">
                {t("myAssetScreen.qtbg")}
              </span>
              <span className="text-xs text-gray-500">QTBG</span>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-700">
            {t("myAssetScreen.quantity")}
          </span>
          <span className="text-sm text-gray-700 font-semibold">
            {withComma(balance.qtbg)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-700">
            {t("myAssetScreen.price")}
          </span>
          <span className="text-sm text-gray-700 font-semibold">
            {`$ ${withComma(replaceDecimal(price.qtbg, 6))}`}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-700">
            {t("myAssetScreen.value")}
          </span>
          <span className="text-sm text-gray-700 font-semibold">
            {`$ ${withComma(replaceDecimal(balance.qtbg * price.qtbg))}`}
          </span>
        </div>
      </div>

      {/* KUSDT */}
      <div className="p-4 bg-gray-100 rounded-md shadow-md space-y-4">
        <div className="py-2">
          <div className="flex items-center gap-2">
            <img
              src="/images/kusdt.png"
              alt="kusdt"
              className="w-9 h-9 rounded-full shadow-md"
            />
            <div className="flex flex-col">
              <span className="text-sm text-gray-700 font-semibold">
                {t("myAssetScreen.kusdt")}
              </span>
              <span className="text-xs text-gray-500">KUSDT</span>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-700">
            {t("myAssetScreen.quantity")}
          </span>
          <span className="text-sm text-gray-700 font-semibold">
            {withComma(balance.kusdt)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-700">
            {t("myAssetScreen.price")}
          </span>
          <span className="text-sm text-gray-700 font-semibold">
            {`$ 1.000000`}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-700">
            {t("myAssetScreen.value")}
          </span>
          <span className="text-sm text-gray-700 font-semibold">
            {`$ ${withComma(replaceDecimal(balance.kusdt * 1))}`}
          </span>
        </div>
      </div>

      {/* KLAY */}
      <div className="p-4 bg-gray-100 rounded-md shadow-md space-y-4">
        <div className="py-2">
          <div className="flex items-center gap-2">
            <img
              src="/images/klay.svg"
              alt="klay"
              className="w-9 h-9 rounded-full shadow-md"
            />
            <div className="flex flex-col">
              <span className="text-sm text-gray-700 font-semibold">
                {t("myAssetScreen.klay")}
              </span>
              <span className="text-xs text-gray-500">KLAY</span>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-700">
            {t("myAssetScreen.quantity")}
          </span>
          <span className="text-sm text-gray-700 font-semibold">
            {withComma(replaceDecimal(klayBalance, 6))}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-700">
            {t("myAssetScreen.price")}
          </span>
          <span className="text-sm text-gray-700 font-semibold">
            {`$ ${withComma(replaceDecimal(klayPrice, 6))}`}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-700">
            {t("myAssetScreen.value")}
          </span>
          <span className="text-sm text-gray-700 font-semibold">
            {`$ ${withComma(replaceDecimal(klayBalance * klayPrice, 6))}`}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MobileTokenList;
