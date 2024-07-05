import {
  FETCH_SWAP_ESTIMATED_BALANCE_REQUEST,
  FETCH_SWAP_ESTIMATED_BALANCE_SUCCESS,
  FETCH_SWAP_ESTIMATED_BALANCE_FAILURE,
  FETCH_SWAP_ESTIMATED_BALANCE_CLEANUP,
} from "../constants/swapConstant";

const estimatedBalanceInitialState = {
  loading: false,
  error: false,
  message: "",
  success: false,
  estimatedBalance: 0,
};

export const estimatedBalanceReducer = (
  state = estimatedBalanceInitialState,
  action
) => {
  switch (action.type) {
    case FETCH_SWAP_ESTIMATED_BALANCE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_SWAP_ESTIMATED_BALANCE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        message: "",
        success: true,
        estimatedBalance: action.payload,
      };
    case FETCH_SWAP_ESTIMATED_BALANCE_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        message: action.payload,
        success: false,
      };
    case FETCH_SWAP_ESTIMATED_BALANCE_CLEANUP:
      return {
        ...estimatedBalanceInitialState,
      };
    default:
      return state;
  }
};
