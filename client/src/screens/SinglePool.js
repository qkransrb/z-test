import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import DepositAndWithdraw from "../components/pools/single/DepositAndWithdraw";
import TokenList from "../components/pools/single/TokenList";
import Title from "../components/Title";
import { fetchBalanceAction } from "../redux/actions/balanceAction";
import { fetchClaimableAction } from "../redux/actions/claimableAction";
import { fetchDefaultAction } from "../redux/actions/defaultAction";
import {
  fetchMyDepositAction,
  fetchMyDepositAmountAction,
} from "../redux/actions/myDepositAction";
import { fetchShareOfMyPoolAction } from "../redux/actions/shareAction";

const SinglePool = () => {
  const dispatch = useDispatch();

  const dispatchActionFunction = () => {
    dispatch(fetchDefaultAction());
    dispatch(fetchMyDepositAction());
    dispatch(fetchClaimableAction());
    dispatch(fetchShareOfMyPoolAction());
    dispatch(fetchMyDepositAmountAction());
    dispatch(fetchBalanceAction());
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
      <DepositAndWithdraw />
    </div>
  );
};

export default SinglePool;
