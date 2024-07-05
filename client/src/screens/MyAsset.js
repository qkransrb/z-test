import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { fetchBalanceAction } from "../redux/actions/balanceAction";
import { IoSearchOutline } from "react-icons/io5";
import { AiOutlineCheck } from "react-icons/ai";
import TokenList from "../components/myasset/TokenList";
import MobileTokenList from "../components/myasset/MobileTokenList";
import { ethers } from "ethers";
import Title from "../components/Title";
import { fetchDefaultAction } from "../redux/actions/defaultAction";

const MyAsset = () => {
  const [klayBalance, setKlayBalance] = useState(0);
  const [klayPrice, setKlayPrice] = useState(0);
  const [kasTokenList, setKasTokenList] = useState([]);

  const dispatch = useDispatch();

  const { address, network } = useSelector((state) => state.wallet);

  useEffect(() => {
    dispatch(fetchBalanceAction());
    dispatch(fetchDefaultAction());
    fetchKlaytnTokenPrice();
    fetchKlaytnTokenBalance(address, network);
    // fetchKasTokenList(address);
  }, [dispatch, address, network]);

  const fetchKlaytnTokenPrice = async () => {
    try {
      const { data } = await axios.get("/api/price/klay");
      setKlayPrice(data);
    } catch (error) {
      console.error(`fetchKlaytnTokenPrice - ${error}`);
      throw error;
    }
  };

  const fetchKlaytnTokenBalance = async (address, network) => {
    if (network === "klaytn") {
      const caver = window.caver;
      const balance = await caver.klay.getBalance(address);
      setKlayBalance(caver.utils.fromPeb(balance));
    }
    if (network === "ethereum") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const balance = await provider.getBalance(address);
      setKlayBalance(ethers.utils.formatEther(balance));
    }
  };

  const fetchKasTokenList = async (address) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_KAS_ENDPOINT}/v2/account/${address}/token?kind=ft`,
        {
          auth: {
            username: process.env.REACT_APP_KAS_ACCESS_KEY,
            password: process.env.REACT_APP_KAS_SECRET_KEY,
          },
          headers: {
            "x-chain-id": 8217, // baobab: 1001, cypress: 8217
          },
        }
      );
      setKasTokenList(data.items);
    } catch (error) {
      console.error(`fetchKasTokenList - ${error}`);
      throw error;
    }
  };

  return (
    <div className="space-y-7 pb-14">
      <Title title="myAssetScreen.title" />
      <div className="w-full bg-white rounded-lg shadow-md mt-24 py-8 md:pt-8 md:pb-4 space-y-6">
        {/* <div className="flex justify-end items-center px-8">
        <div className="flex items-center border-b border-gray-500 gap-6">
          <div className="flex items-center gap-3">
            <IoSearchOutline className="text-2xl text-gray-400" />
            <input
              type="text"
              placeholder="Enter token name or symbol"
              className="w-[240px] py-1 text-lg text-gray-700 focus:outline-none placeholder:text-gray-400 placeholder:text-base"
            />
          </div>
          <hr className="h-6 border-r border-gray-300" />
          <div>
            <button type="button" className="flex gap-2">
              <div className="border border-gray-400 rounded-full p-1">
                <AiOutlineCheck className="text-gray-400 text-sm" />
              </div>
              <span className="text-gray-400">Holdings only</span>
            </button>
          </div>
        </div>
      </div> */}

        {/* PC */}
        <TokenList
          klayBalance={klayBalance}
          klayPrice={klayPrice}
          kasTokenList={kasTokenList}
        />

        {/* Mobile */}
        <MobileTokenList
          klayBalance={klayBalance}
          klayPrice={klayPrice}
          kasTokenList={kasTokenList}
        />
      </div>
    </div>
  );
};

export default MyAsset;
