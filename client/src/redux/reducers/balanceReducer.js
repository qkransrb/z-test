import {
  FETCH_BALANCE_REQUEST,
  FETCH_BALANCE_SUCCESS,
  FETCH_BALANCE_FAILURE,
} from "../constants/balanceConstant";

const balanceInitialState = {
  loading: false,
  error: false,
  message: "",
  success: false,
  balance: {
    zyno: 0,
    busdt: 0,
  },
};

const balanceReducer = (state = balanceInitialState, action) => {
  switch (action.type) {
    case FETCH_BALANCE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_BALANCE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        message: "",
        success: true,
        balance: {
          zyno: action.payload.zyno,
          busdt: action.payload.busdt,
        },
      };
    case FETCH_BALANCE_FAILURE:
      return {
        ...state,
        oading: false,
        error: true,
        message: action.payload,
        success: false,
      };
    default:
      return state;
  }
};

export default balanceReducer;
