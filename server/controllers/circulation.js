const axios = require("axios");

// 단일 풀, QTBK 예치 수량의 총합 (Provider 계정 제외)
exports.fetchSingleQtbkDepositQuantity = async (req, res, next) => {
  try {
    const body = {};
    const config = {
      headers: {
        Accept: "application/json",
      },
    };

    const { data } = await axios.post(
      "https://api.quantfi.io:9443/api/selectSingleDepositSum",
      body,
      config
    );

    return res.json(data.data[0].qtbk_single_deposit_quantity);
  } catch (error) {
    console.error(`[controller] fetchSingleQtbkDepositQuantity - ${error}`);
    return res.status(500).json({ message: error.message });
  }
};

// 단일 풀, QTBK 출금 수량의 총합 (Provider 계정 제외)
exports.fetchSingleQtbkWithdrawQuantity = async (req, res, next) => {
  try {
    const body = {};
    const config = {
      headers: {
        Accept: "application/json",
      },
    };

    const { data } = await axios.post(
      "https://api.quantfi.io:9443/api/selectSingleWithdrawSum",
      body,
      config
    );

    return res.json(data.data[0].qtbk_single_withdraw_quantity);
  } catch (error) {
    console.error(`[controller] fetchSingleQtbkWithdrawQuantity - ${error}`);
    return res.status(500).json({ message: error.message });
  }
};

// 페어 풀, QTBK 예치 수량의 총합 (Provider 계정 제외)
exports.fetchPairQtbkDepositQuantity = async (req, res, next) => {
  try {
    const body = {};
    const config = {
      headers: {
        Accept: "application/json",
      },
    };

    const { data } = await axios.post(
      "https://api.quantfi.io:9443/api/selectPairDepositSum",
      body,
      config
    );

    return res.json(data.data[0].qtbk_pair_deposit_quantity);
  } catch (error) {
    console.error(`[controller] fetchPairQtbkDepositQuantity - ${error}`);
    return res.status(500).json({ message: error.message });
  }
};

// 페어 풀, QTBK 출금 수량의 총합 (Provider 계정 제외)
exports.fetchPairQtbkWithdrawQuantity = async (req, res, next) => {
  try {
    const body = {};
    const config = {
      headers: {
        Accept: "application/json",
      },
    };

    const { data } = await axios.post(
      "https://api.quantfi.io:9443/api/selectPairWithdrawSum",
      body,
      config
    );

    return res.json(data.data[0].qtbk_pair_withdraw_quantity);
  } catch (error) {
    console.error(`[controller] fetchPairQtbkWithdrawQuantity - ${error}`);
    return res.status(500).json({ message: error.message });
  }
};

// 보상 수령, Claim Rewards 수량의 총합 (Provider 계정 제외)
exports.fetchQtbgClaimRewardsQuantity = async (req, res, next) => {
  try {
    const body = {};
    const config = {
      headers: {
        Accept: "application/json",
      },
    };

    const { data } = await axios.post(
      "https://api.quantfi.io:9443/api/selectPairRewardSum",
      body,
      config
    );

    return res.json(data.data[0].qtbg_claim_rewards_quantity);
  } catch (error) {
    console.error(`[controller] fetchQtbgClaimRewardsQuantity - ${error}`);
    return res.status(500).json({ message: error.message });
  }
};

// 페어 풀, QTBG 예치 수량의 총합 (Provider 계정 제외)
exports.fetchPairQtbgDepositQuantity = async (req, res, next) => {
  try {
    const body = {};
    const config = {
      headers: {
        Accept: "application/json",
      },
    };

    const { data } = await axios.post(
      "https://api.quantfi.io:9443/api/selectQtbgDepositSum",
      body,
      config
    );

    return res.json(data.data[0].qtbg_pair_deposit_quantity);
  } catch (error) {
    console.error(`[controller] fetchPairQtbgDepositQuantity - ${error}`);
    return res.status(500).json({ message: error.message });
  }
};

// 페어 풀, QTBG 출금 수량의 총합 (Provider 계정 제외)
exports.fetchPairQtbgWithdrawQuantity = async (req, res, next) => {
  try {
    const body = {};
    const config = {
      headers: {
        Accept: "application/json",
      },
    };

    const { data } = await axios.post(
      "https://api.quantfi.io:9443/api/selectQtbgWithdrawtSum",
      body,
      config
    );

    return res.json(data.data[0].qtbg_pair_withdraw_quantity);
  } catch (error) {
    console.error(`[controller] fetchPairQtbgWithdrawQuantity - ${error}`);
    return res.status(500).json({ message: error.message });
  }
};
