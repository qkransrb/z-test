import {
  FETCH_BUYBACK_ASSET_REQUEST,
  FETCH_BUYBACK_ASSET_SUCCESS,
  FETCH_BUYBACK_ASSET_FAILURE,
} from "../constants/buybackConstant";

const buybackinitialState = {
  loading: false,
  error: false,
  message: "",
  success: false,
  buyback: {
    asset: 0,
  },
};

const buybackReducer = (state = buybackinitialState, action) => {
  switch (action.type) {
    case FETCH_BUYBACK_ASSET_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_BUYBACK_ASSET_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        message: "",
        success: true,
        buyback: {
          asset: action.payload,
        },
      };
    case FETCH_BUYBACK_ASSET_FAILURE:
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

export default buybackReducer;
