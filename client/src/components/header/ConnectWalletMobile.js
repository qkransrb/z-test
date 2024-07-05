import React, { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { shortenAddress } from "../../utils/textUtil";
import ConnectWalletPopup from "../popup/ConnectWalletPopup";
import kaikas from "../../assets/images/ic-kaikas.svg";
import metamask from "../../assets/images/ic-metamask.svg";
import klip from "../../assets/images/ic-klip.svg";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import { disconnectWalletAction } from "../../redux/actions/walletAction";

const ConnectWalletMobile = () => {
  const [openPopup, setOpenPopup] = useState(false);

  const dispatch = useDispatch();

  const { connected, network, address } = useSelector((state) => state.wallet);

  useEffect(() => {
    if (connected) {
      setOpenPopup(false);
    }
  }, [connected]);

  const connectWalletHandler = () => {
    if (!connected) {
      setOpenPopup(true);
    }
  };

  const copyNotify = () => {
    toast.info("Address was copied.");
  };

  const changetWalletHandler = () => {
    dispatch(disconnectWalletAction());
    setOpenPopup(true);
  };

  const disconnectWalletHandler = () => {
    dispatch(disconnectWalletAction());
  };

  return (
    <Fragment>
      <div className="w-full flex justify-center items-center">
        {connected ? (
          <div className="w-full flex flex-col justify-center items-center space-y-3">
            <CopyToClipboard text={address}>
              <div
                onClick={copyNotify}
                className={`w-[90%] text-sm font-semibold py-2 border flex justify-center items-center space-x-2 rounded-md shadow-md ${
                  network === "klaytn"
                    ? "bg-kaikas border-gray-700 text-white"
                    : network === "ethereum"
                    ? "bg-metamask border-gray-700 text-gray-700"
                    : "bg-klip"
                }`}
              >
                <span>{shortenAddress(address)}</span>

                {network === "klaytn" && (
                  <img src={kaikas} alt="kaikas" className="w-5" />
                )}
                {network === "ethereum" && (
                  <img src={metamask} alt="ethereum" className="w-5" />
                )}
                {network === "klip" && (
                  <img src={klip} alt="klip" className="w-6" />
                )}
              </div>
            </CopyToClipboard>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={changetWalletHandler}
                className="text-xs text-gray-500 px-4 border border-gray-500 rounded-full shadow-md"
              >
                Change
              </button>
              <button
                type="button"
                onClick={disconnectWalletHandler}
                className="text-xs text-red-400 px-1 border border-red-400 rounded-full shadow-md"
              >
                Disconnect
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={connectWalletHandler}
            className="w-[90%] bg-[#14204a] text-sm font-semibold text-white py-2 hover:bg-[#246bea] hover:border-[#246bea] rounded-md shadow-md"
          >
            Connect Wallet
          </button>
        )}
      </div>

      {
        // 지갑 연결 팝업 호출
        openPopup && <ConnectWalletPopup setOpenPopup={setOpenPopup} />
      }
    </Fragment>
  );
};

export default ConnectWalletMobile;
