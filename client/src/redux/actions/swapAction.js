import axios from "axios";
import {
  FETCH_SWAP_ESTIMATED_BALANCE_REQUEST,
  FETCH_SWAP_ESTIMATED_BALANCE_SUCCESS,
  FETCH_SWAP_ESTIMATED_BALANCE_FAILURE,
  FETCH_SWAP_ESTIMATED_BALANCE_CLEANUP,
} from "../constants/swapConstant";

export const fetchSwapEstimatedBalanceAction =
  (amount, tokens) => async (dispatch) => {
    try {
      dispatch({ type: FETCH_SWAP_ESTIMATED_BALANCE_REQUEST });

      const { data } = await axios.post(
        "http://localhost:5000/api/swap/estimated",
        {
          amount,
          tokens,
        }
      );

      dispatch({ type: FETCH_SWAP_ESTIMATED_BALANCE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: FETCH_SWAP_ESTIMATED_BALANCE_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const swapEstimatedBalanceCleanUp = () => (dispatch) => {
  dispatch({ type: FETCH_SWAP_ESTIMATED_BALANCE_CLEANUP });
};
