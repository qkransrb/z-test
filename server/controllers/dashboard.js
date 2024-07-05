const axios = require("axios");

exports.rewards = async (req, res, next) => {
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
    console.error(`[controller] dashboard rewards - ${error}`);
    return res.status(500).json({ message: error });
  }
};

exports.deposit = async (req, res, next) => {
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
    console.error(`[controller] dashboard deposit - ${error}`);
    return res.status(500).json({ message: error });
  }
};

exports.withdraw = async (req, res, next) => {
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
    console.error(`[controller] dashboard withdraw - ${error}`);
    return res.status(500).json({ message: error });
  }
};

exports.totalAmount = async (req, res, next) => {
  try {
    const body = {};
    const config = {
      headers: {
        Accept: "application/json",
      },
    };

    const { data } = await axios.post(
      "https://api.quantfi.io:9443/api/selectServiceDeposit",
      body,
      config
    );

    return res.json(data.data);
  } catch (error) {
    console.error(`[controller] dashboard totalAmount - ${error}`);
    return res.status(500).json({ message: error });
  }
};

exports.totalVolume = async (req, res, next) => {
  try {
    const body = {};
    const config = {
      headers: {
        Accept: "application/json",
      },
    };

    const { data } = await axios.post(
      "https://api.quantfi.io:9443/api/selectServiceTrading",
      body,
      config
    );

    return res.json(data.data);
  } catch (error) {
    console.error(`[controller] dashboard totalVolume - ${error}`);
    return res.status(500).json({ message: error });
  }
};
