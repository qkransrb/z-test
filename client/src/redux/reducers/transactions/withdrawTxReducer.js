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

const singleWithdrawInitialState = {
  loading: false,
  error: false,
  message: "",
  success: false,
  receipt: null,
};

export const singleWithdrawReducer = (
  state = singleWithdrawInitialState,
  action
) => {
  switch (action.type) {
    case SINGLE_WITHDRAW_TRANSACTION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SINGLE_WITHDRAW_TRANSACTION_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        message: "",
        success: true,
        receipt: action.payload,
      };
    case SINGLE_WITHDRAW_TRANSACTION_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        message: action.payload,
        success: false,
        receipt: null,
      };
    case SINGLE_WITHDRAW_TRANSACTION_CLEANUP:
      return {
        ...singleWithdrawInitialState,
      };
    default:
      return state;
  }
};

const pairWithdrawApproveInitialState = {
  approve_loading: false,
  approve_error: false,
  approve_message: "",
  approve_success: false,
  approve_receipt: null,
};

export const pairWithdrawApproveReducer = (
  state = pairWithdrawApproveInitialState,
  action
) => {
  switch (action.type) {
    case PAIR_WITHDRAW_APPROVE_REQUEST:
      return {
        ...state,
        approve_loading: true,
      };
    case PAIR_WITHDRAW_APPROVE_SUCCESS:
      return {
        ...state,
        approve_loading: false,
        approve_error: false,
        approve_message: "",
        approve_success: true,
        approve_receipt: action.payload,
      };
    case PAIR_WITHDRAW_APPROVE_FAILURE:
      return {
        ...state,
        approve_loading: false,
        approve_error: true,
        approve_message: action.payload,
        approve_success: false,
        approve_receipt: null,
      };
    case PAIR_WITHDRAW_APPROVE_CLEANUP:
      return {
        ...pairWithdrawApproveInitialState,
      };
    default:
      return state;
  }
};

const pairWithdrawInitialState = {
  loading: true,
  error: false,
  message: "",
  success: false,
  receipt: null,
};

export const pairWithdrawReducer = (
  state = pairWithdrawInitialState,
  action
) => {
  switch (action.type) {
    case PAIR_WITHDRAW_TRANSACTION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PAIR_WITHDRAW_TRANSACTION_SUCCESS:
      return {
        ...state,
        loading: true,
        error: false,
        message: "",
        success: true,
        receipt: action.payload,
      };
    case PAIR_WITHDRAW_TRANSACTION_FAILURE:
      return {
        ...state,
        loading: true,
        error: true,
        message: action.payload,
        success: false,
        receipt: null,
      };
    case PAIR_WITHDRAW_TRANSACTION_CLEANUP:
      return {
        ...pairWithdrawInitialState,
      };
    default:
      return state;
  }
};
