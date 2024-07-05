import React, { useState, useEffect } from "react";
import { getBlockNumber } from "../../utils/blockNumber";
import { withComma } from "../../utils/textUtil";

const BlockNumber = () => {
  const [blockNumber, setBlockNumber] = useState(0);

  // useEffect(() => {
  //   const fetchBlockNumber = async () => {
  //     setBlockNumber(await getBlockNumber());
  //   };
  //   fetchBlockNumber();
  // }, []);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setBlockNumber((number) => number + 1);
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, [blockNumber]);

  return (
    <div className="text-sm text-gray-700 lg:text-white flex items-center space-x-4">
      <div className="flex items-center space-x-1">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse duration-300" />
        <div className="font-semibold">mainnet</div>
      </div>
      <div className="flex items-center space-x-1">
        <span className="text-green-500 font-semibold">#</span>
        <span>{withComma(blockNumber)}</span>
      </div>
    </div>
  );
};

export default BlockNumber;
