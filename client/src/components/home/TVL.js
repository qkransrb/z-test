import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { withComma } from "../../utils/textUtil";
import { replaceDecimal } from "../../utils/numberUtil";
import counter from "counterup2";

const TVL = () => {
  const { t } = useTranslation();

  const { tvl } = useSelector((state) => state.default);
  const { buyback } = useSelector((state) => state.buyback);

  // useEffect(() => {
  //   setTimeout(() => {
  //     counter(document.querySelector(".counter"), {
  //       duration: 1000,
  //       delay: 10,
  //     });
  //   }, [150]);
  // }, []);

  return (
    <div className="bg-primary/80 py-8 px-6 md:p-8 rounded-lg">
      <div className="space-y-1 md:space-y-3 md:pb-3">
        <p className="text-base md:text-lg text-white">
          {t("homeScreen.lockedUpAsset")}
        </p>
        <div className="text-[28px] md:text-[55px] text-white">{`$ ${withComma(
          replaceDecimal(tvl.total, 6)
        )}`}</div>
      </div>
      {/* <hr className="border border-[#2a5cc0] hidden md:block" />
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between text-base md:text-lg pt-6 md:pt-8 space-y-1 md:space-y-0">
          <p className="text-[#64b0ff]">{t("homeScreen.buyBackFundAsset")}</p>
          <div className="text-white">{`$ ${withComma(buyback.asset)}`}</div>
        </div>
        <div className="flex flex-col md:flex-row justify-between text-base md:text-lg space-y-1 md:space-y-0">
          <p className="text-[#64b0ff]">{t("homeScreen.buyBackFundBurn")}</p>
          <div className="text-white">$ 0</div>
        </div>
      </div> */}
    </div>
  );
};

export default TVL;
