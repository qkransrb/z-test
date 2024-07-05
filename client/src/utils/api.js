import axios from "axios";

// 단일 풀, QTBK 예치 수량의 총합 (Provider 계정 제외)
export const fetchSingleDepositQuantity = async () => {
  try {
    const { data } = await axios.get("/api/circulation/singleDposit");
    return data;
  } catch (error) {
    console.error(`[api] fetchSingleDepositQuantity - ${error}`);
    throw error;
  }
};

// 단일 풀, QTBK 출금 수량의 총합 (Provider 계정 제외)
export const fetchSingleWithdrawQuantity = async () => {
  try {
    const { data } = await axios.get("/api/circulation/singleWithdraw");
    return data;
  } catch (error) {
    console.error(`[api] fetchSingleWithdrawQuantity - ${error}`);
    throw error;
  }
};

// 페어 풀, QTBK 예치 수량의 총합 (Provider 계정 제외)
export const fetchPairDepositQuantity = async () => {
  try {
    const { data } = await axios.get("/api/circulation/pairDeposit");
    return data;
  } catch (error) {
    console.error(`[api] fetchPairDepositQuantity - ${error}`);
    throw error;
  }
};

// 페어 풀, QTBK 출금 수량의 총합 (Provider 계정 제외)
export const fetchPairWithdrawQuantity = async () => {
  try {
    const { data } = await axios.get("/api/circulation/pairWithdraw");
    return data;
  } catch (error) {
    console.error(`[api] fetchPairWithdrawQuantity - ${error}`);
    throw error;
  }
};

// 보상 수령, Claim Rewards 수량의 총합 (Provider 계정 제외)
export const fetchQtbgClaimRewardsQuantity = async () => {
  try {
    const { data } = await axios.get("/api/circulation/qtbgRewards");
    return data;
  } catch (error) {
    console.error(`[api] fetchQtbgClaimRewardsQuantity - ${error}`);
    throw error;
  }
};

// 페어 풀, QTBG 예치 수량의 총합 (Provider 계정 제외)
export const fetchPairQtbgDepositQuantity = async () => {
  try {
    const { data } = await axios.get("/api/circulation/qtbgDeposit");
    return data;
  } catch (error) {
    console.error(`[api] fetchPairQtbgDepositQuantity - ${error}`);
    throw error;
  }
};

// 페어 풀, QTBG 출금 수량의 총합 (Provider 계정 제외)
export const fetchPairQtbgWithdrawQuantity = async () => {
  try {
    const { data } = await axios.get("/api/circulation/qtbgWithdraw");
    return data;
  } catch (error) {
    console.error(`[api] fetchPairQtbgWithdrawQuantity - ${error}`);
    throw error;
  }
};

////////////////////////// 트랜잭션 결과 저장 API 호출 //////////////////////////

export const saveSingleDepositTransaction = async (
  from,
  to,
  hash,
  tvl,
  price,
  amount
) => {
  try {
    await axios.post("/api/transaction/single/deposit", {
      from,
      to,
      hash,
      amount,
      tvl,
      price,
    });
  } catch (error) {
    console.error(`[api|saveSingleDepositTransaction] - ${error}`);
    throw error;
  }
};

export const saveSingleWithdrawTransaction = async (
  from,
  to,
  hash,
  tvl,
  price,
  amount
) => {
  try {
    await axios.post("/api/transaction/single/withdraw", {
      from,
      to,
      hash,
      amount,
      tvl,
      price,
    });
  } catch (error) {
    console.error(`[api|saveSingleWithdrawTransaction] - ${error}`);
    throw error;
  }
};

export const saveClaimRewardsTransaction = async (amount, from, to, hash) => {
  try {
    await axios.post("/api/transaction/claim", {
      amount,
      from,
      to,
      hash,
    });
  } catch (error) {
    console.error(`[api|saveClaimRewardsTransaction] - ${error}`);
    throw error;
  }
};

export const savePairDepositApproveTransaction = async (
  token,
  from,
  to,
  hash
) => {
  try {
    await axios.post("/api/transaction/pair/deposit/approve", {
      token,
      from,
      to,
      hash,
    });
  } catch (error) {
    console.error(`[api|savePairDepositApproveTransaction] - ${error}`);
    throw error;
  }
};

export const savePairDepositTransaction = async (
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
  totalAmount
) => {
  try {
    await axios.post("/api/transaction/pair/deposit", {
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
    });
  } catch (error) {
    console.error(`[api|savePairDepositTransaction] - ${error}`);
    throw error;
  }
};

export const savePairWithdrawApproveTransaction = async (
  pairName,
  from,
  to,
  hash
) => {
  try {
    await axios.post("/api/transaction/pair/withdraw/approve", {
      pairName,
      from,
      to,
      hash,
    });
  } catch (error) {
    console.error(`[api|savePairWithdrawApproveTransaction] - ${error}`);
    throw error;
  }
};

export const savePairWithdrawTransaction = async (
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
  totalAmount
) => {
  try {
    await axios.post("/api/transaction/pair/withdraw", {
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
    });
  } catch (error) {
    console.error(`[api|savePairWithdrawTransaction] - ${error}`);
    throw error;
  }
};
