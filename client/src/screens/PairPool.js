import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import DepositList from "../components/pools/pair/DepositList";
import TokenList from "../components/pools/pair/TokenList";
import Title from "../components/Title";
import { fetchClaimableAction } from "../redux/actions/claimableAction";
import { fetchDefaultAction } from "../redux/actions/defaultAction";
import { fetchMyDepositAction } from "../redux/actions/myDepositAction";
import { fetchShareOfMyPoolAction } from "../redux/actions/shareAction";

// TVL, APR, Claimable, My Deposit, Share of My Pool
const PairPool = () => {
  const dispatch = useDispatch();

  const dispatchActionFunction = () => {
    dispatch(fetchDefaultAction());
    dispatch(fetchMyDepositAction());
    dispatch(fetchClaimableAction());
    dispatch(fetchShareOfMyPoolAction());
  };

  useEffect(() => {
    dispatchActionFunction();

    const interval = setInterval(() => {
      dispatchActionFunction();
    }, 1000 * 60);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-7 pb-14">
      <Title title="poolsScreen.title" />
      <TokenList />
      <DepositList />
    </div>
  );
};

export default PairPool;
