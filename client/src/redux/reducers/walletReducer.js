import {
  CONNECT_WALLET_REQUEST,
  CONNECT_WALLET_SUCCESS,
  CONNECT_WALLET_FAILURE,
  DISCONNECT_WALLET,
  ACCOUNTS_CHANGED,
} from "../constants/walletConstant";

export const connectWalletInitialState = {
  loading: false,
  error: false,
  message: "",
  connected: false,
  network: "",
  address: "",
};

export const connectWalletReducer = (
  state = connectWalletInitialState,
  action
) => {
  switch (action.type) {
    case CONNECT_WALLET_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CONNECT_WALLET_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        message: `${action.payload.network} connected`,
        connected: true,
        network: action.payload.network,
        address: action.payload.address,
      };
    case CONNECT_WALLET_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        message: action.payload,
        connected: false,
        network: "",
        address: "",
      };
    case DISCONNECT_WALLET:
      return {
        ...connectWalletInitialState,
      };
    case ACCOUNTS_CHANGED:
      return {
        ...state,
        address: action.payload,
      };
    default:
      return state;
  }
};
