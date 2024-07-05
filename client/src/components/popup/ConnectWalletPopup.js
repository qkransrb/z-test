import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import kaikas from "../../assets/images/ic-kaikas.svg";
import metamask from "../../assets/images/ic-metamask.svg";
import klip from "../../assets/images/ic-klip.svg";
import {
  connectKaikasAction,
  connectMetamaskAction,
} from "../../redux/actions/walletAction";
import Spinner from "../Spinner";

const ConnectWalletPopup = ({ setOpenPopup, history }) => {
  const dispatch = useDispatch();

  const { loading, error, message } = useSelector((state) => state.wallet);

  const goHomeHandler = () => {
    if (typeof setOpenPopup !== "undefined") {
      setOpenPopup(false);
    }
    history.push("/");
  };

  return (
    <div className="fixed top-0 left-0 bg-black/50 w-full h-full flex justify-center items-center px-6 md:px-0">
      <div className="bg-white w-full md:w-[600px] rounded-sm mb-14 px-4 py-8 md:p-8">
        <div className="space-y-4">
          <p className="text-lg text-[#222222] font-semibold">
            Connect to Zynoro
          </p>
          <p className="text-sm text-gray-500">Choose your wallet</p>
        </div>
        {loading ? (
          <div className="flex justify-center items-center py-14">
            <Spinner />
          </div>
        ) : (
          <Fragment>
            <div className="py-6 space-y-5">
              {/* <button
                type="button"
                onClick={() => dispatch(connectKaikasAction())}
                className="w-full bg-kaikas flex justify-center items-center space-x-2 py-3 md:py-5 rounded-sm shadow-lg"
              >
                <img src={kaikas} alt="kaikas" className="w-6" />
                <span className="text-sm text-white">Kaikas Wallet</span>
              </button> */}
              <button
                type="button"
                onClick={() => dispatch(connectMetamaskAction())}
                className="w-full bg-metamask flex justify-center items-center space-x-2 py-3 md:py-5 rounded-sm shadow-lg"
              >
                <img src={metamask} alt="metamask" className="w-6" />
                <span className="text-sm text-[#222222]">MetaMask Wallet</span>
              </button>
              {/* <button className="w-full bg-klip flex justify-center items-center space-x-2 py-3 md:py-5 rounded-sm shadow-lg">
                <img src={klip} alt="klip" className="w-8" />
                <span className="text-sm text-[#222222]">
                  Klip Wallet with Kakao Talk
                </span>
              </button> */}
            </div>
            <div className="flex justify-center items-center">
              <button
                type="button"
                onClick={goHomeHandler}
                className="text-sm text-white hover:brightness-110 duration-300 bg-gray-500 rounded-full px-3 py-[2px] shadow-md"
              >
                Home
              </button>
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default withRouter(ConnectWalletPopup);
