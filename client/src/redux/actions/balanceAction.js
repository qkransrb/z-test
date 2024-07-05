import axios from "axios";
import {
  FETCH_BALANCE_REQUEST,
  FETCH_BALANCE_SUCCESS,
  FETCH_BALANCE_FAILURE,
} from "../constants/balanceConstant";

export const fetchBalanceAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: FETCH_BALANCE_REQUEST });

    const { data } = await axios.get(
      `http://localhost:5000/api/balance/${getState().wallet.address}`
    );

    dispatch({ type: FETCH_BALANCE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_BALANCE_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
