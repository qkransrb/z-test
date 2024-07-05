import React from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import PopupLayout from "../../PopupLayout";
import { IoClose } from "react-icons/io5";
import { withComma } from "../../../../utils/textUtil";

const SingleWithdrawInformation = ({
  setWithdrawInformationOpen,
  setWithdrawTransactionOpen,
  inputs,
  setInputs,
}) => {
  const { t } = useTranslation();

  const { amount } = useSelector((state) => state.myDepositAmount);
  const { shareOfMyPool } = useSelector((state) => state.shareOfMyPool);

  const onChangeHandler = (e) => {
    const value = e.target.value.replace(/[^0-9\.]$/g, "");

    if (amount.zyno < Number(value)) {
      setInputs({
        ...inputs,
        withdraw: "",
      });
      return;
    }

    setInputs({
      ...inputs,
      withdraw: value,
    });
  };

  const onCloseHandler = () => {
    setInputs({
      deposit: "",
      withdraw: "",
    });
    setWithdrawInformationOpen(false);
  };

  const nextStepHandler = () => {
    setWithdrawInformationOpen(false);
    setWithdrawTransactionOpen(true);
  };

  return (
    <PopupLayout className="w-[400px] h-[500px] flex flex-col justify-between">
      <div>
        <div className="flex justify-between mb-10">
          <p className="text-lg font-bold text-gray-700">{`ZYNO ${t(
            "layerPopup.withdraw"
          )}`}</p>
          <button type="button" onClick={onCloseHandler}>
            <IoClose className="text-2xl text-gray-700" />
          </button>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center md:space-x-2 space-y-4 md:space-y-0 mb-10">
          <div className="w-full bg-gray-100 rounded-md shadow-md space-y-3 py-2 px-4">
            <p className="text-xs text-red-400 font-semibold">
              {t("layerPopup.myDepositAssets")}
            </p>
            <div className="text-xs text-gray-700 font-semibold space-x-1">
              <span>{withComma(amount.zyno)}</span>
              <span>ZYNO</span>
            </div>
          </div>
          <div className="w-full bg-gray-100 rounded-md shadow-md space-y-3 py-2 px-4">
            <p className="text-xs text-red-400 font-semibold">
              {t("layerPopup.mySharePercentage")}
            </p>
            <div className="text-xs text-gray-700 font-semibold space-x-1">
              <span>{withComma(shareOfMyPool.zyno)}</span>
              <span>%</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-4">
          <div className="bg-gray-100 rounded-md p-1 flex justify-between items-center shadow-md">
            <input
              type="text"
              value={inputs.withdraw}
              onChange={onChangeHandler}
              placeholder="0"
              className={`w-[70%] bg-transparent py-2 px-3 text-lg text-gray-700 font-bold placeholder:text-gray-500 focus:outline-none ${
                (!inputs.withdraw || !Number(inputs.withdraw)) &&
                "border border-red-500 rounded-md"
              }`}
            />
            <div className="flex items-center space-x-2 mr-3">
              <img src="/images/zyno.jpg" alt="zyno" className="w-7 h-7" />
              <span className="text-sm text-gray-700 font-bold">ZYNO</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-xs text-gray-700 font-semibold space-x-2">
              <span>{t("layerPopup.withdrawalPossible")}</span>
              <span>{withComma(amount.zyno)}</span>
            </div>
            {
              // 보유 수량보다 입력 수량이 큰 경우 || 보유 수량이 0인 경우
              (!inputs.withdraw || !Number(inputs.withdraw)) && (
                <p className="text-xs text-red-500 font-semibold">
                  {t("layerPopup.insufficientQuantity")}
                </p>
              )
            }
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center">
        <button
          type="button"
          onClick={nextStepHandler}
          disabled={!inputs.withdraw || !Number(inputs.withdraw)}
          className={`w-full text-white py-3 rounded-md text-sm font-semibold shadow-lg ${
            !inputs.withdraw || !Number(inputs.withdraw)
              ? "bg-gray-500"
              : "bg-red-400 active:brightness-125 duration-300"
          }`}
        >
          {t("layerPopup.nextStep")}
        </button>
      </div>
    </PopupLayout>
  );
};

export default SingleWithdrawInformation;
