import {
  FETCH_MY_DEPOSIT_AMOUNT_REQUEST,
  FETCH_MY_DEPOSIT_AMOUNT_SUCCESS,
  FETCH_MY_DEPOSIT_AMOUNT_FAILURE,
} from "../constants/myDepositConstant";

const myDepositAmountInitialState = {
  loading: false,
  error: false,
  message: "",
  success: false,
  amount: {
    zyno: 0,
    zyno_busdt: {
      zyno: 0,
      busdt: 0,
    },
  },
};

const myDepositAmountReducer = (
  state = myDepositAmountInitialState,
  action
) => {
  switch (action.type) {
    case FETCH_MY_DEPOSIT_AMOUNT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_MY_DEPOSIT_AMOUNT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        message: "",
        success: true,
        amount: {
          zyno: action.payload.zyno,
          zyno_busdt: {
            zyno: action.payload.zyno_busdt.zyno,
            busdt: action.payload.zyno_busdt.busdt,
          },
        },
      };
    case FETCH_MY_DEPOSIT_AMOUNT_FAILURE:
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

export default myDepositAmountReducer;
