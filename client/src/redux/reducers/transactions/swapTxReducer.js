import {
  SWAP_TRANSACTION_REQUEST,
  SWAP_TRANSACTION_SUCCESS,
  SWAP_TRANSACTION_FAILURE,
  SWAP_TRANSACTION_CLEANUP,
} from "../../constants/transactions/swapTxConstant";

const swapTransactionInitialState = {
  loading: false,
  error: false,
  message: "",
  success: false,
  receipt: null,
};

export const swapTransactionReducer = (
  state = swapTransactionInitialState,
  action
) => {
  switch (action.type) {
    case SWAP_TRANSACTION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SWAP_TRANSACTION_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        message: "",
        success: true,
        receipt: action.payload,
      };
    case SWAP_TRANSACTION_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        message: action.payload,
        success: false,
        receipt: null,
      };
    case SWAP_TRANSACTION_CLEANUP:
      return {
        ...swapTransactionInitialState,
      };
    default:
      return state;
  }
};
