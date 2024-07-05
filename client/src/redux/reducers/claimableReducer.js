import {
  FETCH_CLAIMABLE_REQUEST,
  FETCH_CLAIMABLE_SUCCESS,
  FETCH_CLAIMABLE_FAILURE,
} from "../constants/claimableConstant";

const claimableInitialState = {
  loading: false,
  error: false,
  message: "",
  success: false,
  claimable: {
    zyno: 0,
    zyno_busdt: 0,
  },
};

const claimableReducer = (state = claimableInitialState, action) => {
  switch (action.type) {
    case FETCH_CLAIMABLE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_CLAIMABLE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        message: "",
        success: true,
        claimable: {
          zyno: action.payload.zyno,
          zyno_busdt: action.payload.zyno_busdt,
        },
      };
    case FETCH_CLAIMABLE_FAILURE:
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

export default claimableReducer;
