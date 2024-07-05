import {
  DEFAULT_INFORMATION_REQUEST,
  DEFAULT_INFORMATION_SUCCESS,
  DEFAULT_INFORMATION_FAILURE,
} from "../constants/defaultConstant";

const initialState = {
  loading: false,
  error: false,
  message: "",
  success: false,
  reserve: {
    zyno: 0,
    zyno_busdt: {
      zyno: 0,
      busdt: 0,
    },
  },
  original: {
    zyno: "",
    zyno_busdt: {
      zyno: "",
      busdt: "",
    },
  },
  price: {
    zyno: 0,
    kusdt: 0,
  },
  tvl: {
    total: 0,
    zyno: 0,
    zayno_busdt: 0,
  },
  apr: {
    zyno: 0,
    zyno_busdt: 0,
  },
};

const defaultReducer = (state = initialState, action) => {
  switch (action.type) {
    case DEFAULT_INFORMATION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DEFAULT_INFORMATION_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        message: "",
        success: true,
        reserve: {
          zyno: action.payload.reserve.zyno,
          zyno_busdt: {
            zyno: action.payload.reserve.zyno_busdt.zyno,
            busdt: action.payload.reserve.zyno_busdt.busdt,
          },
        },
        original: {
          zyno: action.payload.original.zyno,
          zyno_busdt: {
            zyno: action.payload.original.zyno_busdt.zyno,
            busdt: action.payload.original.zyno_busdt.busdt,
          },
        },
        price: {
          zyno: action.payload.price.zyno,
          busdt: action.payload.price.busdt,
        },
        tvl: {
          total: action.payload.tvl.total,
          zyno: action.payload.tvl.zyno,
          zyno_busdt: action.payload.tvl.zyno_busdt,
        },
        apr: {
          zyno: action.payload.apr.zyno,
          zyno_busdt: action.payload.apr.zyno_busdt,
        },
      };
    case DEFAULT_INFORMATION_FAILURE:
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

export default defaultReducer;
