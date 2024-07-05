import {
  FETCH_TVL_REQUEST,
  FETCH_TVL_SUCCESS,
  FETCH_TVL_FAILURE,
} from "../constants/tvlConstant";

const tvlInitialState = {
  loading: false,
  error: false,
  message: "",
  success: false,
  tvl: {
    total: 0,
    zyno: 0,
    zyno_busdt: 0,
  },
};

const tvlReducer = (state = tvlInitialState, action) => {
  switch (action.type) {
    case FETCH_TVL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_TVL_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        message: "",
        success: true,
        tvl: {
          total: action.payload.total,
          zyno: action.payload.zyno,
          zyno_busdt: action.payload.zyno_busdt,
        },
      };
    case FETCH_TVL_FAILURE:
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

export default tvlReducer;
