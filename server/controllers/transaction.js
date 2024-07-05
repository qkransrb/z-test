const axios = require("axios");

// Save - Single Deposit Transaction Results
exports.saveSingleDepositTransaction = async (req, res, next) => {
  try {
    const { from, to, hash, amount, tvl, price } = req.body;

    const body = {};
    const config = {
      Headers: {
        Accept: "application/json",
      },
    };

    await axios.post(
      `${process.env.API_URL}/api/insertTQfSingleHistory?tqs_type=DEPOSIT&tqs_from_address=${from}&tqs_to_address=${to}&tqs_hash=${hash}&tqs_token=qtbk&tqs_quantity=${amount}&tqs_tvl=${tvl}&tqs_token_price=${price}&tqs_result_state=S`,
      body,
      config
    );

    return res.json({});
  } catch (error) {
    console.error(`[controller|saveSingleDepositTransaction] - ${error}`);
    return res.status(500).json({ message: error.message });
  }
};

// Save - Single Withdraw Transaction Results
exports.saveSingleWithdrawTransaction = async (req, res, next) => {
  try {
    const { from, to, hash, amount, tvl, price } = req.body;

    const body = {};
    const config = {
      Headers: {
        Accept: "application/json",
      },
    };

    await axios.post(
      `${process.env.API_URL}/api/insertTQfSingleHistory?tqs_type=WITHDRAW&tqs_from_address=${from}&tqs_to_address=${to}&tqs_hash=${hash}&tqs_token=qtbk&tqs_quantity=${amount}&tqs_tvl=${tvl}&tqs_token_price=${price}&tqs_result_state=S`,
      body,
      config
    );

    return res.json({});
  } catch (error) {
    console.error(`[controller|saveSingleWithdrawTransaction] - ${error}`);
    return res.status(500).json({ message: error.message });
  }
};

// Save - Claim Rewards Transaction Results
exports.saveClaimRewardsTransaction = async (req, res, next) => {
  try {
    const { amount, from, to, hash } = req.body;

    const body = {};
    const config = {
      Headers: {
        Accept: "application/json",
      },
    };

    await axios.post(
      `${process.env.API_URL}/api/insertTQfPairReward?tqp_type=CLAIM REWARD&tqp_token=QTBG&tqp_token_quantity=${amount}&tqp_from_address=${from}&tqp_to_address=${to}&tqp_hash=${hash}&tqp_result_state=S`,
      body,
      config
    );

    return res.json({});
  } catch (error) {
    console.error(`[controller|saveSingleWithdrawTransaction] - ${error}`);
    return res.status(500).json({ message: error.message });
  }
};

// Save - Pair Deposit Approve Transaction Results
exports.savePairDepositApproveTransaction = async (req, res, next) => {
  try {
    const { token, from, to, hash } = req.body;

    const body = {};
    const config = {
      Headers: {
        Accept: "application/json",
      },
    };

    await axios.post(
      `${
        process.env.API_URL
      }/api/insertTQfPairDeposit?tqp_type=APPROVE&tqp_token=${token.toUpperCase()}&tqp_from_address=${from}&tqp_to_address=${to}&tqp_hash=${hash}&tqp_result_state=S`,
      body,
      config
    );

    return res.json({});
  } catch (error) {
    console.error(`[controller|savePairDepositApproveTransaction] - ${error}`);
    return res.status(500).json({ message: error.message });
  }
};

// Save - Pair Deposit Transaction Results
exports.savePairDepositTransaction = async (req, res, next) => {
  try {
    const {
      pairA,
      pairB,
      pairAAmount,
      pairBAmount,
      ratio,
      from,
      to,
      hash,
      pairName,
      tvl,
      lpChangeRatio,
      totalAmount,
    } = req.body;

    const body = {};
    const config = {
      Headers: {
        Accept: "application/json",
      },
    };

    await axios.post(
      `${process.env.API_URL}/api/insertTQfPairHistory?tqp_type=DEPOSIT&tqp_token_a=${pairA}&tqp_token_a_quantity=${pairAAmount}&tqp_token_b=${pairB}&tqp_token_b_quantity=${pairBAmount}&tqp_ratio=${ratio}&tqp_from_address=${from}&tqp_to_address=${to}&tqp_hash=${hash}&tqp_pair_name=${pairName}&tqp_tvl=${tvl}&tqp_lp_change_ratio=${lpChangeRatio}&tqp_quantity=${totalAmount}&tqp_result_state=S`,
      body,
      config
    );

    return res.json({});
  } catch (error) {
    console.error(`[controller|savePairDepositTransaction] - ${error}`);
    return res.status(500).json({ message: error.message });
  }
};

// Save - Pair Withdraw Approve Transaction Results
exports.savePairWithdrawApproveTransaction = async (req, res, next) => {
  try {
    const { pairName, from, to, hash } = req.body;

    const body = {};
    const config = {
      Headers: {
        Accept: "application/json",
      },
    };

    await axios.post(
      `${process.env.API_URL}/api/insertTQfPairDeposit?tqp_type=DISAPPROVE&tqp_token=${pairName}&tqp_from_address=${from}&tqp_to_address=${to}&tqp_hash=${hash}&tqp_result_state=S`,
      body,
      config
    );

    return res.json({});
  } catch (error) {
    console.error(`[controller|savePairWithdrawApproveTransaction] - ${error}`);
    return res.status(500).json({ message: error.message });
  }
};

// Save - Pair Withdraw Transaction Results
exports.savePairWithdrawTransaction = async (req, res, next) => {
  try {
    const {
      pairA,
      pairB,
      pairAAmount,
      pairBAmount,
      ratio,
      from,
      to,
      hash,
      pairName,
      tvl,
      lpChangeRatio,
      totalAmount,
    } = req.body;

    const body = {};
    const config = {
      Headers: {
        Accept: "application/json",
      },
    };

    await axios.post(
      `${process.env.API_URL}/api/insertTQfPairHistory?tqp_type=WITHDRAW&tqp_token_a=${pairA}&tqp_token_a_quantity=${pairAAmount}&tqp_token_b=${pairB}&tqp_token_b_quantity=${pairBAmount}&tqp_ratio=${ratio}&tqp_from_address=${from}&tqp_to_address=${to}&tqp_hash=${hash}&tqp_pair_name=${pairName}&tqp_tvl=${tvl}&tqp_lp_change_ratio=${lpChangeRatio}&tqp_quantity=${totalAmount}&tqp_result_state=S`,
      body,
      config
    );

    return res.json({});
  } catch (error) {
    console.error(`[controller|savePairWithdrawTransaction] - ${error}`);
    return res.status(500).json({ message: error.message });
  }
};
