import {
  // 단일 출금
  SINGLE_WITHDRAW_TRANSACTION_REQUEST,
  SINGLE_WITHDRAW_TRANSACTION_SUCCESS,
  SINGLE_WITHDRAW_TRANSACTION_FAILURE,
  SINGLE_WITHDRAW_TRANSACTION_CLEANUP,
  // 페어 출금
  PAIR_WITHDRAW_TRANSACTION_REQUEST,
  PAIR_WITHDRAW_TRANSACTION_SUCCESS,
  PAIR_WITHDRAW_TRANSACTION_FAILURE,
  PAIR_WITHDRAW_TRANSACTION_CLEANUP,
  // 페어 출금 승인
  PAIR_WITHDRAW_APPROVE_REQUEST,
  PAIR_WITHDRAW_APPROVE_SUCCESS,
  PAIR_WITHDRAW_APPROVE_FAILURE,
  PAIR_WITHDRAW_APPROVE_CLEANUP,
} from "../../constants/transactions/withdrawTxConstant";
import { toPeb, toWei } from "../../../utils/tokenUtil";
import BigNumber from "bignumber.js";
import { ethers } from "ethers";
import {
  savePairWithdrawApproveTransaction,
  savePairWithdrawTransaction,
  saveSingleWithdrawTransaction,
} from "../../../utils/api";
import { replaceDecimal } from "../../../utils/numberUtil";

// 단일 출금 - Action 함수
export const singleWithdrawTransactionAction =
  (amount) => async (dispatch, getState) => {
    try {
      dispatch({ type: SINGLE_WITHDRAW_TRANSACTION_REQUEST });

      const network = getState().wallet.network;
      const wei = toWei(amount, "zyno");

      const tvl = replaceDecimal(getState().default.tvl.total, 6);
      const price = replaceDecimal(getState().default.price.qtbk, 6);

      // if (network === "klaytn") {
      //   const receipt = await singleWithdrawOnKlaytnNetwork(peb);

      //   saveSingleWithdrawTransaction(
      //     receipt.from,
      //     receipt.to,
      //     receipt.transactionHash,
      //     tvl,
      //     price,
      //     amount
      //   );

      //   return dispatch({
      //     type: SINGLE_WITHDRAW_TRANSACTION_SUCCESS,
      //     payload: receipt,
      //   });
      // }

      if (network === "ethereum") {
        const receipt = await singleWithdrawOnKlaytnNetworkWithMetamask(wei);

        // saveSingleWithdrawTransaction(
        //   receipt.from,
        //   receipt.to,
        //   receipt.hash,
        //   tvl,
        //   price,
        //   amount
        // );

        return dispatch({
          type: SINGLE_WITHDRAW_TRANSACTION_SUCCESS,
          payload: receipt,
        });
      }
    } catch (error) {
      dispatch({
        type: SINGLE_WITHDRAW_TRANSACTION_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const singleWithdrawCleanAction = () => (dispatch) => {
  dispatch({ type: SINGLE_WITHDRAW_TRANSACTION_CLEANUP });
};

// 단일 출금 승인 - Action 함수
export const pairWithdrawApproveAction =
  (pairA, pairB, amount) => async (dispatch, getState) => {
    try {
      dispatch({ type: PAIR_WITHDRAW_APPROVE_REQUEST });

      const network = getState().wallet.network;

      // if (network === "klaytn") {
      //   const receipt = await pairWithdrawApproveOnKlaytnNetwork(
      //     pairA,
      //     pairB,
      //     amount
      //   );

      //   savePairWithdrawApproveTransaction(
      //     `${pairA.toUpperCase()}-${pairB.toUpperCase()}`,
      //     receipt.from,
      //     receipt.to,
      //     receipt.transactionHash
      //   );

      //   dispatch({ type: PAIR_WITHDRAW_APPROVE_SUCCESS, payload: receipt });
      // }

      if (network === "ethereum") {
        const receipt = await pairWithdrawApproveOnKlaytnNetworkWithMetamask(
          pairA,
          pairB,
          amount
        );

        // savePairWithdrawApproveTransaction(
        //   `${pairA.toUpperCase()}-${pairB.toUpperCase()}`,
        //   receipt.from,
        //   receipt.to,
        //   receipt.hash
        // );

        dispatch({ type: PAIR_WITHDRAW_APPROVE_SUCCESS, payload: receipt });
      }
    } catch (error) {
      dispatch({
        type: PAIR_WITHDRAW_APPROVE_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const pairWithdrawApproveCleanAction = () => (dispatch) => {
  dispatch({ type: PAIR_WITHDRAW_APPROVE_CLEANUP });
};

// 페어 출금 - Action 함수
export const pairWithdrawTransactionAction =
  (
    pairA,
    pairB,
    amount,
    pairAMin,
    pairBMin,
    pairAWithdrawAmount,
    pairBWithdrawAmount
  ) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: PAIR_WITHDRAW_TRANSACTION_REQUEST });

      const network = getState().wallet.network;
      const { reserve, tvl } = getState().default;

      // if (network === "klaytn") {
      //   const receipt = await pairWithdrawOnKlaytnNetwork(
      //     pairA,
      //     pairB,
      //     amount,
      //     pairAMin,
      //     pairBMin
      //   );

      //   savePairWithdrawTransaction(
      //     pairA.toUpperCase(),
      //     pairB.toUpperCase(),
      //     pairAWithdrawAmount,
      //     pairBWithdrawAmount,
      //     replaceDecimal(
      //       reserve[pairA + "_" + pairB][pairB] /
      //         reserve[pairA + "_" + pairB][pairA],
      //       6
      //     ),
      //     receipt.from,
      //     receipt.to,
      //     receipt.transactionHash,
      //     `${pairA.toUpperCase()}-${pairB.toUpperCase()}`,
      //     replaceDecimal(tvl.total, 6),
      //     1,
      //     Number(pairAWithdrawAmount) + Number(pairBWithdrawAmount)
      //   );

      //   dispatch({ type: PAIR_WITHDRAW_TRANSACTION_SUCCESS, payload: receipt });
      // }

      if (network === "ethereum") {
        const receipt = await pairWithdrawOnKlaytnNetworkWithMetamask(
          pairA,
          pairB,
          amount,
          pairAMin,
          pairBMin
        );

        // savePairWithdrawTransaction(
        //   pairA.toUpperCase(),
        //   pairB.toUpperCase(),
        //   pairAWithdrawAmount,
        //   pairBWithdrawAmount,
        //   replaceDecimal(
        //     reserve[pairA + "_" + pairB][pairB] /
        //       reserve[pairA + "_" + pairB][pairA],
        //     6
        //   ),
        //   receipt.from,
        //   receipt.to,
        //   receipt.hash,
        //   `${pairA.toUpperCase()}-${pairB.toUpperCase()}`,
        //   replaceDecimal(tvl.total, 6),
        //   1,
        //   Number(pairAWithdrawAmount) + Number(pairBWithdrawAmount)
        // );

        dispatch({ type: PAIR_WITHDRAW_TRANSACTION_SUCCESS, payload: receipt });
      }
    } catch (error) {
      dispatch({
        type: PAIR_WITHDRAW_TRANSACTION_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const pairWithdrawCleanAction = () => (dispatch) => {
  dispatch({ type: PAIR_WITHDRAW_TRANSACTION_CLEANUP });
};

// 클레이튼 네트워크 - 단일 출금
// const singleWithdrawOnKlaytnNetwork = async (peb) => {
//   try {
//     const caver = window.caver;

//     const routerContract = new caver.klay.Contract(
//       require("../../../abis/QtbkRouter.json"),
//       process.env.REACT_APP_ROUTER
//     );

//     return await routerContract.methods
//       .withdraw(
//         process.env.REACT_APP_QTBK,
//         peb,
//         Math.floor(Date.now() / 1000) + 60
//       )
//       .send({ from: window.klaytn.selectedAddress, gas: 50_0000 });
//   } catch (error) {
//     console.error(`[singleWithdrawOnKlaytnNetwork] - ${error}`);
//     throw error;
//   }
// };

// const pairWithdrawApproveOnKlaytnNetwork = async (pairA, pairB, amount) => {
//   try {
//     const caver = window.caver;

//     const factory = new caver.klay.Contract(
//       require("../../../abis/QuantfiFactory.json"),
//       process.env.REACT_APP_FACTORY
//     );

//     const pairAddress = await factory.methods
//       .getPair(
//         process.env[`REACT_APP_${pairA.toUpperCase()}`],
//         process.env[`REACT_APP_${pairB.toUpperCase()}`]
//       )
//       .call();

//     const contract = new caver.klay.Contract(
//       require("../../../abis/IERC20.abi.json"),
//       pairAddress
//     );

//     return await contract.methods
//       .approve(
//         process.env.REACT_APP_ROUTER,
//         new BigNumber(amount).multipliedBy(1e18).toString(10)
//       )
//       .send({ from: window.klaytn.selectedAddress, gas: 50_0000 });
//   } catch (error) {
//     console.error(`[pairWithdrawApproveOnKlaytnNetwork] - ${error}`);
//     throw error;
//   }
// };

// 클레이튼 네트워크 - 페어 출금
// const pairWithdrawOnKlaytnNetwork = async (
//   pairA,
//   pairB,
//   amount,
//   pairAMin,
//   pairBMin
// ) => {
//   try {
//     const caver = window.caver;

//     const routerContract = new caver.klay.Contract(
//       require("../../../abis/QtbkRouter.json"),
//       process.env.REACT_APP_ROUTER
//     );

//     const method = routerContract.methods.removeLiquidity(
//       process.env[`REACT_APP_${pairA.toUpperCase()}`],
//       process.env[`REACT_APP_${pairB.toUpperCase()}`],
//       toPeb(amount, "quantfi"),
//       pairAMin,
//       pairBMin,
//       window.klaytn.selectedAddress,
//       Math.floor(Date.now() / 1000) + 60
//     );

//     const estimatedGas = await method.estimateGas({
//       from: window.klaytn.selectedAddress,
//     });

//     return await routerContract.methods
//       .removeLiquidity(
//         process.env[`REACT_APP_${pairA.toUpperCase()}`],
//         process.env[`REACT_APP_${pairB.toUpperCase()}`],
//         toPeb(amount, "quantfi"),
//         pairAMin,
//         pairBMin,
//         window.klaytn.selectedAddress,
//         Math.floor(Date.now() / 1000) + 60
//       )
//       .send({
//         from: window.klaytn.selectedAddress,
//         gas: estimatedGas,
//       });
//   } catch (error) {
//     console.error(`[singleWithdrawOnKlaytnNetwork] - ${error}`);
//     throw error;
//   }
// };

// 클레이튼 네트워크 - 단일 출금 (메타마스크)
const singleWithdrawOnKlaytnNetworkWithMetamask = async (wei) => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const routerContract = new ethers.Contract(
      process.env.REACT_APP_ROUTER,
      require("../../../abis/ZynoroRouter.json"),
      provider
    ).connect(signer);

    const gasPrice = await provider.getGasPrice();
    const _hex = gasPrice._hex;

    return await routerContract.withdraw(
      process.env.REACT_APP_ZYNO,
      wei,
      Math.floor(Date.now() / 1000) + 60,
      {
        from: window.ethereum.selectedAddress,
        gasPrice: _hex,
        gasLimit: 50_0000,
      }
    );
  } catch (error) {
    console.error(`[singleWithdrawOnKlaytnNetworkWithMetamask] - ${error}`);
    throw error;
  }
};

// 클레이튼 네트워크 - 페어 출금 승인 (메타마스크)
const pairWithdrawApproveOnKlaytnNetworkWithMetamask = async (
  pairA,
  pairB,
  amount
) => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const gasPrice = await provider.getGasPrice();
    const _hex = gasPrice._hex;

    const factory = new ethers.Contract(
      process.env.REACT_APP_FACTORY,
      require("../../../abis/ZynoroFactory.json"),
      provider
    ).connect(signer);

    const pairAddress = await factory.callStatic.getPair(
      process.env[`REACT_APP_${pairA.toUpperCase()}`],
      process.env[`REACT_APP_${pairB.toUpperCase()}`]
    );

    const contract = new ethers.Contract(
      pairAddress,
      require("../../../abis/IERC20.json"),
      provider
    ).connect(signer);

    return await contract.approve(
      process.env.REACT_APP_ROUTER,
      new BigNumber(amount).multipliedBy(1e18).toString(10),
      {
        from: window.ethereum.selectedAddress,
        gasPrice: _hex,
        gasLimit: 50_0000,
      }
    );
  } catch (error) {
    console.error(
      `[pairWithdrawApproveOnKlaytnNetworkWithMetamask] - ${error}`
    );
    throw error;
  }
};

// 클레이튼 네트워크 - 페어 출금 (메타마스크)
const pairWithdrawOnKlaytnNetworkWithMetamask = async (
  pairA,
  pairB,
  amount,
  pairAMin,
  pairBMin
) => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const gasPrice = await provider.getGasPrice();
    const _hex = gasPrice._hex;

    const routerContract = new ethers.Contract(
      process.env.REACT_APP_ROUTER,
      require("../../../abis/ZynoroRouter.json"),
      provider
    ).connect(signer);

    return await routerContract.removeLiquidity(
      process.env[`REACT_APP_${pairA.toUpperCase()}`],
      process.env[`REACT_APP_${pairB.toUpperCase()}`],
      toWei(amount, "zyno"),
      pairAMin,
      pairBMin,
      window.ethereum.selectedAddress,
      Math.floor(Date.now() / 1000) + 60,
      {
        from: window.ethereum.selectedAddress,
        gasPrice: _hex,
        gasLimit: 50_0000,
      }
    );
  } catch (error) {
    console.error(`[pairWithdrawOnKlaytnNetworkWithMetamask] - ${error}`);
    throw error;
  }
};
