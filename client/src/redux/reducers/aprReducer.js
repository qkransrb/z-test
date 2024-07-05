import {
  FETCH_APR_REQUEST,
  FETCH_APR_SUCCESS,
  FETCH_APR_FAILURE,
} from "../constants/aprConstant";

const aprInitialState = {
  loading: false,
  error: false,
  message: "",
  success: false,
  apr: {
    zyno: 0,
    zyno_busdt: 0,
  },
};

const aprReducer = (state = aprInitialState, action) => {
  switch (action.type) {
    case FETCH_APR_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_APR_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        message: "",
        success: true,
        apr: {
          zyno: action.payload.zyno,
          zyno_busdt: action.payload.zyno_busdt,
        },
      };
    case FETCH_APR_FAILURE:
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

export default aprReducer;
