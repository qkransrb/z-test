import axios from "axios";
import {
  FETCH_MY_DEPOSIT_REQUEST,
  FETCH_MY_DEPOSIT_SUCCESS,
  FETCH_MY_DEPOSIT_FAILURE,
  FETCH_MY_DEPOSIT_AMOUNT_REQUEST,
  FETCH_MY_DEPOSIT_AMOUNT_SUCCESS,
  FETCH_MY_DEPOSIT_AMOUNT_FAILURE,
} from "../constants/myDepositConstant";

export const fetchMyDepositAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: FETCH_MY_DEPOSIT_REQUEST });

    const { data } = await axios.get(
      `/api/deposit/${getState().wallet.address}`
    );

    dispatch({ type: FETCH_MY_DEPOSIT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_MY_DEPOSIT_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const fetchMyDepositAmountAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: FETCH_MY_DEPOSIT_AMOUNT_REQUEST });

    const { data } = await axios.get(
      `/api/deposit/amount/${getState().wallet.address}`
    );

    dispatch({ type: FETCH_MY_DEPOSIT_AMOUNT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_MY_DEPOSIT_AMOUNT_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
