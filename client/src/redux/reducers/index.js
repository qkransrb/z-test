import { combineReducers } from "redux";
import balanceReducer from "./balanceReducer";
import buybackReducer from "./buybackReducer";
import claimableReducer from "./claimableReducer";
import defaultReducer from "./defaultReducer";
import liquidityReducer from "./liquidityReducer";
import myDepositAmountReducer from "./myDepositAmountReducer";
import myDepositReducer from "./myDepositReducer";
import shareOfMyPoolReducer from "./shareReducer";
import { estimatedBalanceReducer } from "./swapReducer";
import {
  pairApproveReducer,
  pairDepositReducer,
  singleDepositReducer,
} from "./transactions/depositTxReducer";
import {
  pairClaimRewardsReducer,
  singleClaimRewardsReducer,
} from "./transactions/rewardsTxReducer";
import { swapTransactionReducer } from "./transactions/swapTxReducer";
import {
  pairWithdrawApproveReducer,
  pairWithdrawReducer,
  singleWithdrawReducer,
} from "./transactions/withdrawTxReducer";
import { connectWalletReducer } from "./walletReducer";

export default combineReducers({
  wallet: connectWalletReducer,
  default: defaultReducer,
  myDeposit: myDepositReducer,
  claimable: claimableReducer,
  shareOfMyPool: shareOfMyPoolReducer,
  myDepositAmount: myDepositAmountReducer,
  buyback: buybackReducer,
  balance: balanceReducer,
  liquidity: liquidityReducer,
  estimatedBalance: estimatedBalanceReducer,
  singleDeposit: singleDepositReducer,
  singleWithdraw: singleWithdrawReducer,
  pairDepositApprove: pairApproveReducer,
  pairDeposit: pairDepositReducer,
  pairWithdrawApprove: pairWithdrawApproveReducer,
  pairWithdraw: pairWithdrawReducer,
  singleClaimRewards: singleClaimRewardsReducer,
  pairClaimRewards: pairClaimRewardsReducer,
  // swap: swapTransactionReducer,
});
