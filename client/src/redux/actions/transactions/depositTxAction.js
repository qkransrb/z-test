import {
  // 단일 예치
  SINGLE_DEPOSIT_TRANSACTION_REQUEST,
  SINGLE_DEPOSIT_TRANSACTION_SUCCESS,
  SINGLE_DEPOSIT_TRANSACTION_FAILURE,
  SINGLE_DEPOSIT_TRANSACTION_CLEANUP,
  // 페어 예치
  PAIR_DEPOSIT_TRANSACTION_REQUEST,
  PAIR_DEPOSIT_TRANSACTION_SUCCESS,
  PAIR_DEPOSIT_TRANSACTION_FAILURE,
  PAIR_DEPOSIT_TRANSACTION_CLEANUP,
  // 페어 승인
  PAIR_DEPOSIT_APPROVE1_REQUEST,
  PAIR_DEPOSIT_APPROVE1_SUCCESS,
  PAIR_DEPOSIT_APPROVE1_FAILURE,
  PAIR_DEPOSIT_APPROVE2_REQUEST,
  PAIR_DEPOSIT_APPROVE2_SUCCESS,
  PAIR_DEPOSIT_APPROVE2_FAILURE,
  PAIR_DEPOSIT_APPROVE_CLEANUP,
} from "../../constants/transactions/depositTxConstant";
import {
  fromPeb,
  getDecimals,
  printReserve,
  toPeb,
  toWei,
} from "../../../utils/tokenUtil";
import { ethers } from "ethers";
import {
  savePairDepositApproveTransaction,
  savePairDepositTransaction,
  saveSingleDepositTransaction,
} from "../../../utils/api";
import { replaceDecimal } from "../../../utils/numberUtil";

// 단일 예치
export const singleDepositTransactionAction =
  (amount) => async (dispatch, getState) => {
    try {
      dispatch({ type: SINGLE_DEPOSIT_TRANSACTION_REQUEST });

      // const network = getState().wallet.network;
      const peb = toWei(amount, "zyno");

      // const tvl = replaceDecimal(getState().default.tvl.total, 6);
      // const price = replaceDecimal(getState().default.price.zyno, 6);

      const receipt = await singleDepositOnKlaytnNetworkWithMetamask(peb);

      // saveSingleDepositTransaction(
      //   receipt.from,
      //   receipt.to,
      //   receipt.hash,
      //   tvl,
      //   price,
      //   amount
      // );

      return dispatch({
        type: SINGLE_DEPOSIT_TRANSACTION_SUCCESS,
        payload: receipt,
      });
    } catch (error) {
      dispatch({
        type: SINGLE_DEPOSIT_TRANSACTION_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

// 단일 예치 초기화
export const singleDepositCleanAction = () => (dispatch) => {
  dispatch({ type: SINGLE_DEPOSIT_TRANSACTION_CLEANUP });
};

// 페어 승인 - Approve
export const pairDepositApproveAction =
  (token, amount, sequence) => async (dispatch, getState) => {
    try {
      dispatch({
        type:
          sequence === 1
            ? PAIR_DEPOSIT_APPROVE1_REQUEST
            : PAIR_DEPOSIT_APPROVE2_REQUEST,
      });

      const network = getState().wallet.network;

      // 클레이튼 네트워크 - 카이카스
      // if (network === "klaytn") {
      //   const receipt = await pairApproveOnKlaytnNetwork(token, amount);

      //   savePairDepositApproveTransaction(
      //     token,
      //     receipt.from,
      //     receipt.to,
      //     receipt.transactionHash
      //   );

      //   return dispatch({
      //     type:
      //       sequence === 1
      //         ? PAIR_DEPOSIT_APPROVE1_SUCCESS
      //         : PAIR_DEPOSIT_APPROVE2_SUCCESS,
      //     payload: receipt,
      //   });
      // }

      // 이더리움 네트워크 - 메타마스크
      if (network === "ethereum") {
        const receipt = await pairApproveOnKlaytnNetworkWithMetamask(
          token,
          amount
        );

        // savePairDepositApproveTransaction(
        //   token,
        //   receipt.from,
        //   receipt.to,
        //   receipt.hash
        // );

        return dispatch({
          type:
            sequence === 1
              ? PAIR_DEPOSIT_APPROVE1_SUCCESS
              : PAIR_DEPOSIT_APPROVE2_SUCCESS,
          payload: receipt,
        });
      }
    } catch (error) {
      dispatch({
        type:
          sequence === 1
            ? PAIR_DEPOSIT_APPROVE1_FAILURE
            : PAIR_DEPOSIT_APPROVE2_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

// 페어 승인 초기화
export const pairDepositApproveCleanAction = () => (dispatch) => {
  dispatch({ type: PAIR_DEPOSIT_APPROVE_CLEANUP });
};

// 페어 예치 - Send Transaction
export const pairDepositTransactionAction =
  (
    pairA,
    pairB,
    pairAAmount,
    pairBAmount,
    pairAOriginalAmount,
    pairBOriginalAmount,
    pairAMin,
    pairBMin
  ) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: PAIR_DEPOSIT_TRANSACTION_REQUEST });

      const network = getState().wallet.network;
      // const { reserve, tvl } = getState().default;

      // 클레이튼 네트워크 - 카이카스
      // if (network === "klaytn") {
      //   const receipt = await pairDepositOnKlaytnNetwork(
      //     pairA,
      //     pairB,
      //     pairAAmount,
      //     pairBAmount,
      //     pairAMin,
      //     pairBMin
      //   );

      //   savePairDepositTransaction(
      //     pairA.toUpperCase(),
      //     pairB.toUpperCase(),
      //     fromPeb(pairAOriginalAmount, pairA),
      //     fromPeb(pairBOriginalAmount, pairB),
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
      //     fromPeb(pairAOriginalAmount, pairA) +
      //       fromPeb(pairBOriginalAmount, pairB)
      //   );

      //   return dispatch({
      //     type: PAIR_DEPOSIT_TRANSACTION_SUCCESS,
      //     payload: receipt,
      //   });
      // }

      // 이더리움 네트워크 - 메타마스크
      if (network === "ethereum") {
        const receipt = await pairDepositOnKlaytnNetworkWithMetamask(
          pairA,
          pairB,
          pairAAmount,
          pairBAmount,
          pairAMin,
          pairBMin
        );

        // savePairDepositTransaction(
        //   pairA.toUpperCase(),
        //   pairB.toUpperCase(),
        //   fromPeb(pairAOriginalAmount, pairA),
        //   fromPeb(pairBOriginalAmount, pairB),
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
        //   Number(fromPeb(pairAOriginalAmount, pairA)) +
        //     Number(fromPeb(pairBOriginalAmount, pairB))
        // );

        return dispatch({
          type: PAIR_DEPOSIT_TRANSACTION_SUCCESS,
          payload: receipt,
        });
      }
    } catch (error) {
      dispatch({
        type: PAIR_DEPOSIT_TRANSACTION_FAILURE,
        payload: error.message,
      });
    }
  };

// 페어 예치 초기화
export const pairDepositCleanAction = () => async (dispatch, getState) => {
  dispatch({ type: PAIR_DEPOSIT_TRANSACTION_CLEANUP });
};

// 클레이튼 네트워크 - 단일 예치
// const singleDepositOnKlaytnNetwork = async (peb) => {
//   try {
//     const caver = window.caver;

//     const tokenContract = new caver.klay.Contract(
//       require("../../../abis/IERC20.abi.json"),
//       process.env.REACT_APP_QTBK
//     );

//     const routerContract = new caver.klay.Contract(
//       require("../../../abis/QtbkRouter.json"),
//       process.env.REACT_APP_ROUTER
//     );

//     await tokenContract.methods
//       .approve(process.env.REACT_APP_ROUTER, peb)
//       .send({ from: window.klaytn.selectedAddress, gas: 50_0000 });

//     return await routerContract.methods
//       .deposit(
//         process.env.REACT_APP_QTBK,
//         peb,
//         Math.floor(Date.now() / 1000) + 60
//       )
//       .send({ from: window.klaytn.selectedAddress, gas: 50_0000 });
//   } catch (error) {
//     console.error(`[depositSingleOnKlaytnNetwork] - ${error}`);
//     throw error;
//   }
// };

// 클레이튼 네트워크 - 페어 예치
// const pairDepositOnKlaytnNetwork = async (
//   pairA,
//   pairB,
//   pairAAmount,
//   pairBAmount,
//   pairAMin,
//   pairBMin
// ) => {
//   try {
//     const caver = window.caver;

//     const routerContract = new caver.klay.Contract(
//       require("../../../abis/QtbkRouter.json"),
//       process.env.REACT_APP_ROUTER
//     );

//     return await routerContract.methods
//       .addLiquidity(
//         process.env[`REACT_APP_${pairA.toUpperCase()}`],
//         process.env[`REACT_APP_${pairB.toUpperCase()}`],
//         pairAAmount.toString(10),
//         pairBAmount.toString(10),
//         pairAMin.toString(10),
//         pairBMin.toString(10),
//         window.klaytn.selectedAddress,
//         Math.floor(Date.now() / 1000) + 60
//       )
//       .send({ from: window.klaytn.selectedAddress, gas: 500_0000 });
//   } catch (error) {
//     console.error(`[pairDepositOnKlaytnNetwork] - ${error}`);
//     throw error;
//   }
// };

// 클레이튼 네트워크 - 페어 승인
// const pairApproveOnKlaytnNetwork = async (token, amount) => {
//   try {
//     const caver = window.caver;

//     const tokenContract = new caver.klay.Contract(
//       require("../../../abis/IERC20.abi.json"),
//       process.env[`REACT_APP_${token.toUpperCase()}`]
//     );

//     return tokenContract.methods
//       .approve(process.env.REACT_APP_ROUTER, amount.toString(10))
//       .send({ from: window.klaytn.selectedAddress, gas: 50_0000 });
//   } catch (error) {
//     console.error(`[pairApproveOnKlaytnNetwork] - ${error}`);
//     throw error;
//   }
// };

// 단일 예치 (메타마스크)
const singleDepositOnKlaytnNetworkWithMetamask = async (wei) => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const tokenContract = new ethers.Contract(
      process.env.REACT_APP_ZYNO,
      require("../../../abis/IERC20.json"),
      provider
    ).connect(signer);

    const routerContract = new ethers.Contract(
      process.env.REACT_APP_ROUTER,
      require("../../../abis/ZynoroRouter.json"),
      provider
    ).connect(signer);

    const gasPrice = await provider.getGasPrice();
    const _hex = gasPrice._hex;

    await tokenContract.approve(process.env.REACT_APP_ROUTER, wei, {
      from: window.ethereum.selectedAddress,
      gasPrice: _hex,
      gasLimit: 50_0000,
    });

    return await routerContract.deposit(
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
    console.error(`[singleDepositOnKlaytnNetworkWithMetamask] - ${error}`);
    throw error;
  }
};

// 클레이튼 네트워크 - 페어 승인 (메타마스크)
const pairApproveOnKlaytnNetworkWithMetamask = async (token, amount) => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const gasPrice = await provider.getGasPrice();
    const _hex = gasPrice._hex;

    const tokenContract = new ethers.Contract(
      process.env[`REACT_APP_${token.toUpperCase()}`],
      require("../../../abis/IERC20.json"),
      provider
    ).connect(signer);

    return await tokenContract.approve(
      process.env.REACT_APP_ROUTER,
      amount.toString(10),
      {
        from: window.ethereum.selectedAddress,
        gasPrice: _hex,
        gasLimit: 50_0000,
      }
    );
  } catch (error) {
    console.error(`[pairApproveOnKlaytnNetworkWithMetamask] - ${error}`);
    throw error;
  }
};

// 페어 예치 (메타마스크)
const pairDepositOnKlaytnNetworkWithMetamask = async (
  pairA,
  pairB,
  pairAAmount,
  pairBAmount,
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

    return await routerContract.addLiquidity(
      process.env[`REACT_APP_${pairA.toUpperCase()}`],
      process.env[`REACT_APP_${pairB.toUpperCase()}`],
      pairAAmount.toString(10),
      pairBAmount.toString(10),
      pairAMin.toString(10),
      pairBMin.toString(10),
      window.ethereum.selectedAddress,
      Math.floor(Date.now() / 1000) + 60,
      {
        from: window.ethereum.selectedAddress,
        gasPrice: _hex,
        gasLimit: 500_0000,
      }
    );
  } catch (error) {
    console.error(`[pairDepositOnKlaytnNetworkWithMetamask] - ${error}`);
    throw error;
  }
};
