import {
  FETCH_SHARE_OF_MY_POOL_REQUEST,
  FETCH_SHARE_OF_MY_POOL_SUCCESS,
  FETCH_SHARE_OF_MY_POOL_FAILURE,
} from "../constants/shareConstant";

const shareOfMyPoolInitialState = {
  loading: false,
  error: false,
  message: "",
  success: false,
  shareOfMyPool: {
    zyno: 0,
    zyno_busdt: 0,
  },
};

const shareOfMyPoolReducer = (state = shareOfMyPoolInitialState, action) => {
  switch (action.type) {
    case FETCH_SHARE_OF_MY_POOL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_SHARE_OF_MY_POOL_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        message: "",
        success: true,
        shareOfMyPool: {
          zyno: action.payload.zyno,
          zyno_busdt: action.payload.zyno_busdt,
        },
      };
    case FETCH_SHARE_OF_MY_POOL_FAILURE:
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

export default shareOfMyPoolReducer;
