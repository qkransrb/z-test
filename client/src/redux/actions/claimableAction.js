import axios from "axios";
import {
  FETCH_CLAIMABLE_REQUEST,
  FETCH_CLAIMABLE_SUCCESS,
  FETCH_CLAIMABLE_FAILURE,
} from "../constants/claimableConstant";

export const fetchClaimableAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: FETCH_CLAIMABLE_REQUEST });

    const { data } = await axios.get(
      `http://3.36.96.113:5000/api/claim/${getState().wallet.address}`
    );

    dispatch({ type: FETCH_CLAIMABLE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_CLAIMABLE_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
