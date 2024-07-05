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

const singleClaimRewardsInitialState = {
  loading: false,
  error: false,
  message: "",
  success: false,
  receipt: null,
};

export const singleClaimRewardsReducer = (
  state = singleClaimRewardsInitialState,
  action
) => {
  switch (action.type) {
    case SINGLE_REWARDS_TRANSACTION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SINGLE_REWARDS_TRANSACTION_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        message: "",
        success: true,
        receipt: action.payload,
      };
    case SINGLE_REWARDS_TRANSACTION_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        message: action.payload,
        success: false,
        receipt: null,
      };
    case SINGLE_REWARDS_TRANSACTION_CLEANUP:
      return {
        ...singleClaimRewardsInitialState,
      };
    default:
      return state;
  }
};

const pairClaimRewardsInitialState = {
  loading: false,
  error: false,
  message: "",
  success: false,
  receipt: null,
};

export const pairClaimRewardsReducer = (
  state = pairClaimRewardsInitialState,
  action
) => {
  switch (action.type) {
    case PAIR_REWARDS_TRANSACTION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PAIR_REWARDS_TRANSACTION_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        message: "",
        success: true,
        receipt: action.payload,
      };
    case PAIR_REWARDS_TRANSACTION_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        message: action.payload,
        success: false,
        receipt: null,
      };
    case PAIR_REWARDS_TRANSACTION_CLEANUP:
      return {
        ...pairClaimRewardsInitialState,
      };
    default:
      return state;
  }
};
