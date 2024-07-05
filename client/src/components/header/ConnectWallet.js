import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { disconnectWalletAction } from "../../redux/actions/walletAction";
import { shortenAddress } from "../../utils/textUtil";
import ConnectWalletPopup from "../popup/ConnectWalletPopup";
import kaikas from "../../assets/images/ic-kaikas.svg";
import metamask from "../../assets/images/ic-metamask.svg";
import klip from "../../assets/images/ic-klip.svg";
import { RiFileCopyLine } from "react-icons/ri";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ConnectWallet = ({ location }) => {
  const [openPopup, setOpenPopup] = useState(false);

  const pathname = location.pathname;

  const dispatch = useDispatch();

  const { connected, address, network } = useSelector((state) => state.wallet);

  useEffect(() => {
    const isUnlocked = async () => {
      if (!(await window.ethereum._metamask.isUnlocked())) {
        return dispatch(disconnectWalletAction());
      } else {
        if (window.ethereum?.networkVersion !== "97") {
          try {
            await window.ethereum?.request({
              method: "wallet_switchEthereumChain",
              params: [{ chainId: "0x61" }],
            });
          } catch (error) {
            if (error.code === 4902) {
              try {
                await window.ethereum?.request({
                  method: "wallet_addEthereumChain",
                  params: [
                    {
                      chainId: "0x61",
                      chainName: "Binance Smart Chain Testnet",
                      nativeCurrency: {
                        name: "Binance",
                        symbol: "BSC",
                        decimals: 18,
                      },
                      rpcUrls: [
                        "https://data-seed-prebsc-1-s1.binance.org:8545",
                      ],
                      blockExplorerUrls: ["https://testnet.bscscan.com"],
                    },
                  ],
                });
              } catch (error) {
                console.log(error);
              }
            }
          }
        }
      }
    };
    isUnlocked();
  }, [pathname, dispatch]);

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

  const changetWalletHandler = () => {
    dispatch(disconnectWalletAction());
    setOpenPopup(true);
  };

  const disconnectWalletHandler = () => {
    dispatch(disconnectWalletAction());
  };

  const copyNotify = () => {
    toast.info("Address was copied.");
  };

  return (
    <Fragment>
      <div className="relative group cursor-pointer hidden lg:flex">
        {connected ? (
          <div
            className={`text-sm font-semibold px-4 py-1 border flex items-center space-x-2 ${
              network === "klaytn"
                ? "bg-kaikas border-white"
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
        ) : (
          <button
            type="button"
            onClick={connectWalletHandler}
            className="text-sm font-semibold border border-white px-4 py-1 hover:bg-primary hover:border-primary"
          >
            Connect Wallet
          </button>
        )}
        {connected && (
          <div className="absolute top-0 right-0 hidden group-hover:block pt-10">
            <div className="bg-white rounded-md shadow-md py-6 px-10 space-y-6">
              <div className="flex flex-col justify-center items-center space-y-4">
                <span className="text-primary text-sm font-semibold">
                  Account
                </span>
                <div className="text-gray-500 text-xs flex items-center space-x-1 hover:text-gray-700 duration-300">
                  <CopyToClipboard text={address}>
                    <button type="button" onClick={copyNotify}>
                      {address}
                    </button>
                  </CopyToClipboard>
                  <span>
                    <RiFileCopyLine className="text-sm" />
                  </span>
                </div>
              </div>
              <div className="flex justify-around items-center">
                <button
                  type="button"
                  onClick={changetWalletHandler}
                  className="bg-gray-500 text-white text-xs px-7 py-1 rounded-md shadow-md font-semibold hover:brightness-125 duration-300"
                >
                  Change
                </button>
                <button
                  type="button"
                  onClick={disconnectWalletHandler}
                  className="bg-red-500 text-white text-xs px-4 py-1 rounded-md shadow-md font-semibold hover:brightness-125 duration-300"
                >
                  Disconnect
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {
        // 지갑 연결 팝업 호출
        openPopup && <ConnectWalletPopup setOpenPopup={setOpenPopup} />
      }
    </Fragment>
  );
};

export default withRouter(ConnectWallet);
