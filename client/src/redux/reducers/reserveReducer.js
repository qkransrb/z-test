import {
  FETCH_RESERVE_REQUEST,
  FETCH_RESERVE_SUCCESS,
  FETCH_RESERVE_FAILURE,
  FETCH_ORIGINAL_RESERVE_REQUEST,
  FETCH_ORIGINAL_RESERVE_SUCCESS,
  FETCH_ORIGINAL_RESERVE_FAILURE,
} from "../constants/reserveConstant";

const fetchReserveInitialState = {
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
    zyno_busdt: {
      zyno: "",
      busdt: "",
    },
  },
};

const reserveReducer = (state = fetchReserveInitialState, action) => {
  switch (action.type) {
    case FETCH_RESERVE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_RESERVE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        message: "",
        success: true,
        reserve: {
          zyno: action.payload.zyno,
          zyno_busdt: {
            zyno: action.payload.zyno_busdt.zyno,
            busdt: action.payload.zyno_busdt.busdt,
          },
        },
      };
    case FETCH_RESERVE_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        message: action.payload,
        success: false,
      };
    case FETCH_ORIGINAL_RESERVE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_ORIGINAL_RESERVE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        message: "",
        success: true,
        original: {
          zyno_busdt: {
            zyno: action.payload.zyno_busdt.zyno,
            busdt: action.payload.zyno_busdt.busdt,
          },
        },
      };
    case FETCH_ORIGINAL_RESERVE_FAILURE:
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

export default reserveReducer;
