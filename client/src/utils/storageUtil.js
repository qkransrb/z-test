import { connectWalletInitialState } from "../redux/reducers/walletReducer";

export const connectWalletOnStorage = () => {
  return localStorage.getItem("q__wi")
    ? JSON.parse(localStorage.getItem("q__wi"))
    : connectWalletInitialState;
};
