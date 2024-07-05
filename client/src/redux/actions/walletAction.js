import {
  CONNECT_WALLET_REQUEST,
  CONNECT_WALLET_SUCCESS,
  CONNECT_WALLET_FAILURE,
  DISCONNECT_WALLET,
  ACCOUNTS_CHANGED,
} from "../constants/walletConstant";

// 클레이튼 - 카이카스
export const connectKaikasAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: CONNECT_WALLET_REQUEST });

    if (typeof window.klaytn === "undefined") {
      dispatch({
        type: CONNECT_WALLET_FAILURE,
        payload: "Please install kaikas wallet.",
      });

      return alert("Please install kaikas wallet.");
    }

    const klaytn = window.klaytn;

    const accounts = await klaytn.enable();

    dispatch({
      type: CONNECT_WALLET_SUCCESS,
      payload: { network: "klaytn", address: accounts[0] },
    });

    localStorage.setItem("q__wi", JSON.stringify(getState().wallet));
  } catch (error) {
    console.error(`[connect wallet]: ${error}`);
    dispatch({
      type: CONNECT_WALLET_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// 이더리움 - 메타마스크
export const connectMetamaskAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: CONNECT_WALLET_REQUEST });

    if (typeof window.ethereum === "undefined") {
      dispatch({
        type: CONNECT_WALLET_FAILURE,
        payload: "Please install metamask wallet.",
      });

      return alert("Please install metamask wallet.");
    }

    const ethereum = window.ethereum;

    const accounts = await ethereum.request({ method: "eth_requestAccounts" });

    dispatch({
      type: CONNECT_WALLET_SUCCESS,
      payload: { network: "ethereum", address: accounts[0] },
    });

    localStorage.setItem("q__wi", JSON.stringify(getState().wallet));
  } catch (error) {
    console.error(`[connect wallet]: ${error}`);
    dispatch({
      type: CONNECT_WALLET_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const disconnectWalletAction = () => (dispatch) => {
  dispatch({ type: DISCONNECT_WALLET });
  localStorage.removeItem("q__wi");
};

export const accountsChangedAction = (newAddress) => (dispatch) => {
  const wallet = JSON.parse(localStorage.getItem("q__wi"));
  wallet.address = newAddress;

  localStorage.setItem("q__wi", JSON.stringify(wallet));

  dispatch({ type: ACCOUNTS_CHANGED, payload: newAddress });
};
