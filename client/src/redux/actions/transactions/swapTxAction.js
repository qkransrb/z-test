import {
  SWAP_TRANSACTION_REQUEST,
  SWAP_TRANSACTION_SUCCESS,
  SWAP_TRANSACTION_FAILURE,
  SWAP_TRANSACTION_CLEANUP,
} from "../../constants/transactions/swapTxConstant";
import { ethers } from "ethers";
import BigNumber from "bignumber.js";
import { toPeb } from "../../../utils/tokenUtil";

export const swapTransactionAction =
  (fromToken, toToken, fromAmount, toAmount) => async (dispatch, getState) => {
    try {
      dispatch({ type: SWAP_TRANSACTION_REQUEST });

      const network = getState().wallet.network;

      if (network === "klaytn") {
        const receipt = await swapTransactionOnKlaytnNetwork(
          fromToken,
          toToken,
          fromAmount,
          toAmount
        );
        dispatch({ type: SWAP_TRANSACTION_SUCCESS, payload: receipt });
      }

      if (network === "ethereum") {
        const receipt = await swapTransactionOnKlaytnNetworkWithMetamask(
          fromToken,
          toToken,
          fromAmount,
          toAmount
        );
        dispatch({ type: SWAP_TRANSACTION_SUCCESS, payload: receipt });
      }
    } catch (error) {
      dispatch({
        type: SWAP_TRANSACTION_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const swapTransactionCleanAction = () => (dispatch) => {
  dispatch({ type: SWAP_TRANSACTION_CLEANUP });
};

const swapTransactionOnKlaytnNetwork = async (
  fromToken,
  toToken,
  fromAmount,
  toAmount
) => {
  try {
    const caver = window.caver;

    const amountIn = toPeb(fromAmount, fromToken);

    const minimumAmount = new BigNumber(toAmount)
      .multipliedBy(1 - Number(process.env.REACT_APP_SLIPPAGE))
      .integerValue(BigNumber.ROUND_FLOOR)
      .toString(10);

    let path = [
      process.env[`REACT_APP_${fromToken.toUpperCase()}`],
      process.env[`REACT_APP_${toToken.toUpperCase()}`],
    ];

    if (
      (fromToken.toUpperCase() === "QTBG" &&
        toToken.toUpperCase() === "KUSDT") ||
      (fromToken.toUpperCase() === "KUSDT" && toToken.toUpperCase() === "QTBG")
    ) {
      path = [
        process.env[`REACT_APP_${fromToken.toUpperCase()}`],
        process.env.REACT_APP_QTBK,
        process.env[`REACT_APP_${toToken.toUpperCase()}`],
      ];
    }

    const routerContract = new caver.klay.Contract(
      require("../../../abis/ZynoroRouter.json"),
      process.env.REACT_APP_ROUTER
    );

    const tokenContract = new caver.klay.Contract(
      require("../../../abis/IERC20.json"),
      path[0]
    );

    await tokenContract.methods
      .approve(process.env.REACT_APP_ROUTER, amountIn)
      .send({ from: window.klaytn.selectedAddress, gas: 50_0000 });

    return await routerContract.methods
      .swapExactTokensForTokens(
        amountIn,
        minimumAmount,
        path,
        window.klaytn.selectedAddress,
        Math.floor(Date.now() / 1000) + 60
      )
      .send({ from: window.klaytn.selectedAddress, gas: 50_0000 });
  } catch (error) {
    console.error(`[swapTransactionOnKlaytnNetwork] - ${error}`);
    throw error;
  }
};

// // 토큰 스왑 - (메타마스크)
const swapTransactionOnKlaytnNetworkWithMetamask = async (
  fromToken,
  toToken,
  fromAmount,
  toAmount
) => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const gasPrice = await provider.getGasPrice();
    const _hex = gasPrice._hex;

    const amountIn = toPeb(fromAmount, fromToken);

    const minimumAmount = new BigNumber(toAmount)
      .multipliedBy(1 - Number(process.env.REACT_APP_SLIPPAGE))
      .integerValue(BigNumber.ROUND_FLOOR)
      .toString(10);

    let path = [
      process.env[`REACT_APP_${fromToken.toUpperCase()}`],
      process.env[`REACT_APP_${toToken.toUpperCase()}`],
    ];

    if (
      (fromToken.toUpperCase() === "QTBG" &&
        toToken.toUpperCase() === "KUSDT") ||
      (fromToken.toUpperCase() === "KUSDT" && toToken.toUpperCase() === "QTBG")
    ) {
      path = [
        process.env[`REACT_APP_${fromToken.toUpperCase()}`],
        process.env.REACT_APP_QTBK,
        process.env[`REACT_APP_${toToken.toUpperCase()}`],
      ];
    }

    const tokenContract = new ethers.Contract(
      path[0],
      require("../../../abis/IERC20.json"),
      provider
    ).connect(signer);

    await tokenContract.approve(process.env.REACT_APP_ROUTER, amountIn, {
      from: window.ethereum.selectedAddress,
      gasPrice: _hex,
      gasLimit: 50_0000,
    });

    const routerContract = new ethers.Contract(
      process.env.REACT_APP_ROUTER,
      require("../../../abis/ZynoroRouter.json"),
      provider
    ).connect(signer);

    return await routerContract.swapExactTokensForTokens(
      amountIn,
      minimumAmount,
      path,
      window.ethereum.selectedAddress,
      Math.floor(Date.now() / 1000) + 60,
      {
        from: window.ethereum.selectedAddress,
        gasPrice: _hex,
        gasLimit: 50_0000,
      }
    );
  } catch (error) {
    console.error(`[swapTransactionOnKlaytnNetworkWithMetamask] - ${error}`);
    throw error;
  }
};
