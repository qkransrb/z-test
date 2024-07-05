import {
  FETCH_LIQUIDITY_REQUEST,
  FETCH_LIQUIDITY_SUCCESS,
  FETCH_LIQUIDITY_FAILURE,
} from "../constants/liquidityConstant";

const liquidityInitialState = {
  loading: false,
  error: false,
  message: "",
  success: false,
  liquidity: {
    total: 0,
    my: 0,
  },
  original: {
    total: 0,
    my: 0,
  },
};

const liquidityReducer = (state = liquidityInitialState, action) => {
  switch (action.type) {
    case FETCH_LIQUIDITY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_LIQUIDITY_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        message: "",
        success: true,
        liquidity: {
          total: action.payload.liquidity.total,
          my: action.payload.liquidity.my,
        },
        original: {
          total: action.payload.original.total,
          my: action.payload.original.my,
        },
      };
    case FETCH_LIQUIDITY_FAILURE:
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

export default liquidityReducer;
