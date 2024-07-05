import {
  FETCH_MY_DEPOSIT_REQUEST,
  FETCH_MY_DEPOSIT_SUCCESS,
  FETCH_MY_DEPOSIT_FAILURE,
} from "../constants/myDepositConstant";

const myDepositInitialState = {
  loading: false,
  error: false,
  message: "",
  success: false,
  myDeposit: {
    zyno: 0,
    zyno_busdt: 0,
  },
};

const myDepositReducer = (state = myDepositInitialState, action) => {
  switch (action.type) {
    case FETCH_MY_DEPOSIT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_MY_DEPOSIT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        message: "",
        success: true,
        myDeposit: {
          zyno: action.payload.zyno,
          zyno_busdt: action.payload.zyno_busdt,
        },
      };
    case FETCH_MY_DEPOSIT_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        message: action.payload,
        success: false,
      };
    default:
      return state;
  }
};

export default myDepositReducer;
