import {
  FETCH_PRICE_REQUEST,
  FETCH_PRICE_SUCCESS,
  FETCH_PRICE_FAILURE,
} from "../constants/priceConstant";

const priceInitialState = {
  loading: false,
  error: false,
  message: "",
  success: false,
  price: {
    zyno: 0,
  },
};

const priceReducer = (state = priceInitialState, action) => {
  switch (action.type) {
    case FETCH_PRICE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_PRICE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        message: "",
        success: true,
        price: {
          zyno: action.payload.zyno,
        },
      };
    case FETCH_PRICE_FAILURE:
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

export default priceReducer;
