import {
  // 클레임 리워드 - 싱글
  SINGLE_REWARDS_TRANSACTION_REQUEST,
  SINGLE_REWARDS_TRANSACTION_SUCCESS,
  SINGLE_REWARDS_TRANSACTION_FAILURE,
  SINGLE_REWARDS_TRANSACTION_CLEANUP,
  // 클레임 리워드 - 페어
  PAIR_REWARDS_TRANSACTION_REQUEST,
  PAIR_REWARDS_TRANSACTION_SUCCESS,
  PAIR_REWARDS_TRANSACTION_FAILURE,
  PAIR_REWARDS_TRANSACTION_CLEANUP,
} from "../../constants/transactions/rewardsTxConstant";
import { ethers } from "ethers";
import { saveClaimRewardsTransaction } from "../../../utils/api";

export const singleClaimRewardsAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: SINGLE_REWARDS_TRANSACTION_REQUEST });

    const network = getState().wallet.network;
    const claimable = getState().claimable.claimable.zyno;

    // 클레이튼 - 카이카스
    // if (network === "klaytn") {
    //   const receipt = await singleClaimRewardsOnKlaytnNetwork();

    //   saveClaimRewardsTransaction(
    //     claimable,
    //     receipt.from,
    //     receipt.to,
    //     receipt.transactionHash
    //   );

    //   dispatch({ type: SINGLE_REWARDS_TRANSACTION_SUCCESS, payload: receipt });
    // }

    // 이더리움 - 메타마스크
    if (network === "ethereum") {
      const receipt = await singleClaimRewardsOnKlaytnNetworkWithMetamask();

      // saveClaimRewardsTransaction(
      //   claimable,
      //   receipt.from,
      //   receipt.to,
      //   receipt.hash
      // );

      dispatch({ type: SINGLE_REWARDS_TRANSACTION_SUCCESS, payload: receipt });
    }
  } catch (error) {
    dispatch({
      type: SINGLE_REWARDS_TRANSACTION_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const pairClaimRewardsAction =
  (pairA, pairB) => async (dispatch, getState) => {
    try {
      dispatch({ type: PAIR_REWARDS_TRANSACTION_REQUEST });

      const network = getState().wallet.network;
      const claimable = getState().claimable.claimable[pairA + "_" + pairB];

      // 클레이튼 - 카이카스
      // if (network === "klaytn") {
      //   const receipt = await pairClaimRewardsOnKlaytnNetwork(pairA, pairB);

      //   saveClaimRewardsTransaction(
      //     claimable,
      //     receipt.from,
      //     receipt.to,
      //     receipt.transactionHash
      //   );

      //   dispatch({ type: PAIR_REWARDS_TRANSACTION_SUCCESS, payload: receipt });
      // }

      // 이더리움 - 메타마스크
      if (network === "ethereum") {
        const receipt = await pairClaimRewardsOnKlaytnNetworkWithMetamask(
          pairA,
          pairB
        );

        // saveClaimRewardsTransaction(
        //   claimable,
        //   receipt.from,
        //   receipt.to,
        //   receipt.hash
        // );

        dispatch({ type: PAIR_REWARDS_TRANSACTION_SUCCESS, payload: receipt });
      }
    } catch (error) {
      dispatch({
        type: PAIR_REWARDS_TRANSACTION_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const singleClaimRewardsCleanAction = () => async (dispatch) => {
  dispatch({ type: SINGLE_REWARDS_TRANSACTION_CLEANUP });
};

export const pairClaimRewardsCleanAction = () => async (dispatch) => {
  dispatch({ type: PAIR_REWARDS_TRANSACTION_CLEANUP });
};

// const singleClaimRewardsOnKlaytnNetwork = async () => {
//   try {
//     const caver = window.caver;

//     const contract = new caver.klay.Contract(
//       require("../../../abis/QtbkRouter.json"),
//       process.env.REACT_APP_ROUTER
//     );

//     return await contract.methods
//       .claimReward(
//         process.env.REACT_APP_QTBK,
//         Math.floor(Date.now() / 1000) + 60
//       )
//       .send({ from: window.klaytn.selectedAddress, gas: 50_0000 });
//   } catch (error) {
//     console.error(`[singleClaimRewardsOnKlaytnNetwork] - ${error}`);
//     throw error;
//   }
// };

// const pairClaimRewardsOnKlaytnNetwork = async (pairA, pairB) => {
//   try {
//     const caver = window.caver;

//     const contract = new caver.klay.Contract(
//       require("../../../abis/QtbkRouter.json"),
//       process.env.REACT_APP_ROUTER
//     );

//     return await contract.methods
//       .claimPairReward(
//         process.env[`REACT_APP_${pairA.toUpperCase()}`],
//         process.env[`REACT_APP_${pairB.toUpperCase()}`],
//         Math.floor(Date.now() / 1000) + 60
//       )
//       .send({ from: window.klaytn.selectedAddress, gas: 50_0000 });
//   } catch (error) {
//     console.error(`[pairClaimRewardsOnKlaytnNetwork] - ${error}`);
//     throw error;
//   }
// };

// 싱글 풀 보상 - (메타마스크)
const singleClaimRewardsOnKlaytnNetworkWithMetamask = async () => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const gasPrice = await provider.getGasPrice();
    const _hex = gasPrice._hex;

    const contract = new ethers.Contract(
      process.env.REACT_APP_ROUTER,
      require("../../../abis/ZynoroRouter.json"),
      provider
    ).connect(signer);

    return await contract.claimReward(
      process.env.REACT_APP_ZYNO,
      Math.floor(Date.now() / 1000) + 60,
      {
        from: window.ethereum.selectedAddress,
        gasPrice: _hex,
        gasLimit: 50_0000,
      }
    );
  } catch (error) {
    console.error(`[singleClaimRewardsOnKlaytnNetworkWithMetamask] - ${error}`);
    throw error;
  }
};

// 페어 풀 보상 - (메타마스크)
const pairClaimRewardsOnKlaytnNetworkWithMetamask = async (pairA, pairB) => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const gasPrice = await provider.getGasPrice();
    const _hex = gasPrice._hex;

    const contract = new ethers.Contract(
      process.env.REACT_APP_ROUTER,
      require("../../../abis/ZynoroRouter.json"),
      provider
    ).connect(signer);

    return await contract.claimPairReward(
      process.env[`REACT_APP_${pairA.toUpperCase()}`],
      process.env[`REACT_APP_${pairB.toUpperCase()}`],
      Math.floor(Date.now() / 1000) + 60,
      {
        from: window.ethereum.selectedAddress,
        gasPrice: _hex,
        gasLimit: 50_0000,
      }
    );
  } catch (error) {
    console.error(`[pairClaimRewardsOnKlaytnNetworkWithMetamask] - ${error}`);
    throw error;
  }
};
