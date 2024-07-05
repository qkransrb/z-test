import axios from "axios";
import {
  FETCH_LIQUIDITY_REQUEST,
  FETCH_LIQUIDITY_SUCCESS,
  FETCH_LIQUIDITY_FAILURE,
} from "../constants/liquidityConstant";

export const fetchLiquidityAction =
  (pairA, pairB) => async (dispatch, getState) => {
    try {
      dispatch({ type: FETCH_LIQUIDITY_REQUEST });

      const { data } = await axios.get(
        `/api/liquidity/${pairA}/${pairB}/${getState().wallet.address}`
      );

      dispatch({ type: FETCH_LIQUIDITY_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: FETCH_LIQUIDITY_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
