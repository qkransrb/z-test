import React, { Fragment } from "react";
import { useTranslation } from "react-i18next";

const WithdrawHistory = () => {
  const { t } = useTranslation();

  return (
    <Fragment>
      {/* PC */}
      <div className="hidden md:block">
        <table className="w-full">
          <colgroup>
            <col width="10%" />
            <col width="15%" />
            <col width="25%" />
            <col width="20%" />
            <col width="10%" />
            <col width="15%" />
          </colgroup>
          <thead>
            <tr className="bg-gray-100 h-10">
              <th className="text-gray-700 text-sm font-semibold">No</th>
              <th className="text-gray-700 text-sm font-semibold">Network</th>
              <th className="text-gray-700 text-sm font-semibold">Address</th>
              <th className="text-gray-700 text-sm font-semibold">Date</th>
              <th className="text-gray-700 text-sm font-semibold">SNS</th>
              <th className="text-gray-700 text-sm font-semibold">Withdraw</th>
            </tr>
          </thead>
          <tbody>
            {/* <tr className="h-10">
              <td className="text-sm text-center text-gray-500">1</td>
              <td className="text-sm text-center text-gray-500">Klaytn</td>
              <td className="text-sm text-center text-gray-500">
                0xbad33da455f0d65f7670e36299782016a54b0754
              </td>
              <td className="text-sm text-center text-gray-500">2022.07.19</td>
              <td className="text-sm text-center text-gray-500">Google</td>
              <td className="text-sm text-center text-gray-500">10</td>
            </tr>

            <tr className="h-10">
              <td className="text-sm text-center text-gray-500">2</td>
              <td className="text-sm text-center text-gray-500">Ethereum</td>
              <td className="text-sm text-center text-gray-500">
                0xbad33da455f0d65f7670e36299782016a54b0754
              </td>
              <td className="text-sm text-center text-gray-500">2022.07.20</td>
              <td className="text-sm text-center text-gray-500">Apple</td>
              <td className="text-sm text-center text-gray-500">100</td>
            </tr> */}
          </tbody>
        </table>
        <p className="w-full text-center py-4 text-gray-700 text-sm font-semibold">
          {t("p2eScreen.noWithdrawHistory")}
        </p>
      </div>

      {/* Mobile */}
      <div className="md:hidden px-4 space-y-4">
        {/* <div className="bg-gray-100 p-4 rounded-md shadow-md space-y-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="flex items-center gap-2 text-xs">
                <span className="text-gray-700 font-semibold">No</span>
                <span className="text-gray-500">1</span>
              </div>
            </div>
            <span className="text-gray-500 text-xs">2022.07.19</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-gray-700 font-semibold">Withdraw</span>
            <span className="text-gray-500">10,000</span>
          </div>
          <div className="flex items-center text-xs gap-2">
            <span className="text-gray-700 font-semibold">Network</span>
            <span className="text-gray-500">Klaytn</span>
          </div>
          <div className="flex items-center text-xs gap-2">
            <span className="text-gray-700 font-semibold">SNS</span>
            <span className="text-gray-500">Google</span>
          </div>
          <div className="flex flex-col text-xs">
            <span className="text-gray-700 font-semibold">Address</span>
            <span className="text-gray-500">
              0xbad33da455f0d65f7670e36299782016a54b0754
            </span>
          </div>
        </div>

        <div className="bg-gray-100 p-4 rounded-md shadow-md space-y-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="flex items-center gap-2 text-xs">
                <span className="text-gray-700 font-semibold">No</span>
                <span className="text-gray-500">2</span>
              </div>
            </div>
            <span className="text-gray-500 text-xs">2022.07.20</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-gray-700 font-semibold">Withdraw</span>
            <span className="text-gray-500">15,000</span>
          </div>
          <div className="flex items-center text-xs gap-2">
            <span className="text-gray-700 font-semibold">Network</span>
            <span className="text-gray-500">Ethereum</span>
          </div>
          <div className="flex items-center text-xs gap-2">
            <span className="text-gray-700 font-semibold">SNS</span>
            <span className="text-gray-500">Apple</span>
          </div>
          <div className="flex flex-col text-xs">
            <span className="text-gray-700 font-semibold">Address</span>
            <span className="text-gray-500">
              0xbad33da455f0d65f7670e36299782016a54b0754
            </span>
          </div>
        </div> */}
        <p className="w-full text-center text-gray-700 text-sm">
          {t("p2eScreen.noWithdrawHistory")}
        </p>
      </div>
    </Fragment>
  );
};

export default WithdrawHistory;
