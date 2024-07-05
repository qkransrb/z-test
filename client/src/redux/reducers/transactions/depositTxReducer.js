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

const singleDepositInitialState = {
  loading: false,
  error: false,
  message: "",
  success: false,
  receipt: null,
};

export const singleDepositReducer = (
  state = singleDepositInitialState,
  action
) => {
  switch (action.type) {
    case SINGLE_DEPOSIT_TRANSACTION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SINGLE_DEPOSIT_TRANSACTION_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        message: "",
        success: true,
        receipt: action.payload,
      };
    case SINGLE_DEPOSIT_TRANSACTION_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        message: action.payload,
        success: false,
        receipt: null,
      };
    case SINGLE_DEPOSIT_TRANSACTION_CLEANUP:
      return {
        ...singleDepositInitialState,
      };
    default:
      return state;
  }
};

const pairApproveInitialState = {
  approve1_loading: false,
  approve1_error: false,
  approve1_message: "",
  approve1_success: false,
  approve1_reciept: null,

  approve2_loading: false,
  approve2_error: false,
  approve2_message: "",
  approve2_success: false,
  approve2_reciept: null,
};

export const pairApproveReducer = (state = pairApproveInitialState, action) => {
  switch (action.type) {
    // APPROVE 1
    case PAIR_DEPOSIT_APPROVE1_REQUEST:
      return {
        ...state,
        approve1_loading: true,
      };
    case PAIR_DEPOSIT_APPROVE1_SUCCESS:
      return {
        ...state,
        approve1_loading: false,
        approve1_error: false,
        approve1_message: "",
        approve1_success: true,
        approve1_reciept: action.payload,
      };
    case PAIR_DEPOSIT_APPROVE1_FAILURE:
      return {
        ...state,
        approve1_loading: false,
        approve1_error: true,
        approve1_message: action.payload,
        approve1_success: false,
        approve1_reciept: null,
      };

    // APPROVE 2
    case PAIR_DEPOSIT_APPROVE2_REQUEST:
      return {
        ...state,
        approve2_loading: true,
      };
    case PAIR_DEPOSIT_APPROVE2_SUCCESS:
      return {
        ...state,
        approve2_loading: false,
        approve2_error: false,
        approve2_message: "",
        approve2_success: true,
        approve2_reciept: action.payload,
      };
    case PAIR_DEPOSIT_APPROVE2_FAILURE:
      return {
        ...state,
        approve2_loading: false,
        approve2_error: true,
        approve2_message: action.payload,
        approve2_success: false,
        approve2_reciept: null,
      };
    case PAIR_DEPOSIT_APPROVE_CLEANUP:
      return {
        ...pairApproveInitialState,
      };
    default:
      return state;
  }
};

const pairDepositInitialState = {
  loading: false,
  error: false,
  message: "",
  success: false,
  receipt: null,
};

export const pairDepositReducer = (state = pairDepositInitialState, action) => {
  switch (action.type) {
    case PAIR_DEPOSIT_TRANSACTION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PAIR_DEPOSIT_TRANSACTION_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        message: "",
        success: true,
        receipt: action.payload,
      };
    case PAIR_DEPOSIT_TRANSACTION_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        message: action.payload,
        success: false,
        receipt: null,
      };
    case PAIR_DEPOSIT_TRANSACTION_CLEANUP:
      return {
        ...pairDepositInitialState,
      };
    default:
      return state;
  }
};
