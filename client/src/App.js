import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route, withRouter } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Private from "./components/Private";
import Dashboard from "./screens/Dashboard";
import Home from "./screens/Home";
import MyAsset from "./screens/MyAsset";
import NotFound from "./screens/NotFound";
import PlayToEarn from "./screens/PlayToEarn";
import PlayToEarnExchange from "./screens/PlayToEarnExchange";
import PlayToEarnHistory from "./screens/PlayToEarnHistory";
import PairPool from "./screens/PairPool";
import PairPoolDetail from "./screens/PairPoolDetail";
import SinglePool from "./screens/SinglePool";
import Swap from "./screens/Swap";
import { ToastContainer } from "react-toastify";
import moment from "moment";
import Announcement from "./components/popup/announcement/Announcement";
import { accountsChangedAction } from "./redux/actions/walletAction";
import NetworkAlertPopup from "./components/popup/NetworkAlertPopup";

const App = ({ location }) => {
  const [announcementPopupOpen, setAnnouncementPopupOpen] = useState(false);
  const [networkAlertPopupOpen, setNetworkAlertPopupOpen] = useState(false);

  const dispatch = useDispatch();

  const { address, network } = useSelector((state) => state.wallet);

  // useEffect(() => {
  //   // 공지사항 팝업
  //   (!localStorage.getItem("qfi_announcement") ||
  //     (address &&
  //       moment(new Date().getTime()).unix() >
  //         localStorage.getItem("qfi_announcement"))) &&
  //     setAnnouncementPopupOpen(true);
  // }, [address]);

  // useEffect(() => {
  //   validateNetworkVersion();
  // }, [network, location]);

  const validateNetworkVersion = () => {
    // Kaikas 지갑 주소 변경 감지 & 네트워크 변경 감지
    if (
      network &&
      network === "klaytn" &&
      typeof window.klaytn !== "undefined"
    ) {
      window.klaytn.on("accountsChanged", function (accounts) {
        dispatch(accountsChangedAction(accounts[0]));
      });

      const cypress = 8217;
      // const baobab = 1001;

      if (
        window.klaytn.networkVersion &&
        window.klaytn.networkVersion !== cypress
      ) {
        setNetworkAlertPopupOpen(true);
      } else {
        setNetworkAlertPopupOpen(false);
      }

      window.klaytn.on("networkChanged", function () {
        if (
          window.klaytn.networkVersion &&
          window.klaytn.networkVersion !== cypress
        ) {
          setNetworkAlertPopupOpen(true);
        } else {
          setNetworkAlertPopupOpen(false);
        }
      });
    }

    // MetaMask 지갑 주소 변경 감지 & 네트워크 변경 감지
    if (
      network &&
      network === "ethereum" &&
      typeof window.ethereum !== "undefined"
    ) {
      window.ethereum.on("accountsChanged", function (accounts) {
        dispatch(accountsChangedAction(accounts[0]));
      });

      const cypress = "0x2019";
      // const baobab = "0x3e9";

      // cypress: 0x2019, baobab: 0x3e9
      if (window.ethereum.chainId && window.ethereum.chainId !== cypress) {
        setNetworkAlertPopupOpen(true);
      } else {
        setNetworkAlertPopupOpen(false);
      }

      window.ethereum.on("chainChanged", function () {
        if (window.ethereum.chainId && window.ethereum.chainId !== cypress) {
          setNetworkAlertPopupOpen(true);
        } else {
          setNetworkAlertPopupOpen(false);
        }
      });
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-between items-start bg-zynoro bg-center bg-cover bg-no-repeat">
      <Header />
      <main className="w-full flex-1 max-w-[1160px] mx-auto px-2 md:px-6 lg:px-0">
        <Switch>
          <Route exact path="/" component={Home} />
          <Private exact path="/pools/single" component={SinglePool} />
          <Private exact path="/pools/pair" component={PairPool} />
          <Private
            exact
            path="/pools/pair/zyno-busdt"
            component={PairPoolDetail}
          />
          {/* <Private exact path="/swap" component={Swap} /> */}
          {/* <Private exact path="/myasset" component={MyAsset} /> */}
          {/* <Route exact path="/dashboard" component={Dashboard} /> */}
          {/* <Route exact path="/p2e" component={PlayToEarn} /> */}
          {/* <Private exact path="/p2e/exchange" component={PlayToEarnExchange} /> */}
          {/* <Private exact path="/p2e/history" component={PlayToEarnHistory} /> */}
          <Route exact path={"*"} component={NotFound} />
        </Switch>
      </main>
      <Footer />

      {/* React Toastify */}
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        theme="colored"
      />

      {
        // 서비스 이용 유의사항 팝업
        announcementPopupOpen && (
          <Announcement setAnnouncementPopupOpen={setAnnouncementPopupOpen} />
        )
      }

      {
        // 네트워크 변경 감지
        networkAlertPopupOpen && (
          <NetworkAlertPopup
            setNetworkAlertPopupOpen={setNetworkAlertPopupOpen}
          />
        )
      }
    </div>
  );
};

export default withRouter(App);
