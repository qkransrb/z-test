import axios from "axios";
import {
  FETCH_SHARE_OF_MY_POOL_REQUEST,
  FETCH_SHARE_OF_MY_POOL_SUCCESS,
  FETCH_SHARE_OF_MY_POOL_FAILURE,
} from "../constants/shareConstant";

export const fetchShareOfMyPoolAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: FETCH_SHARE_OF_MY_POOL_REQUEST });

    const { data } = await axios.get(
      `http://3.36.96.113:5000/api/share/${getState().wallet.address}`
    );

    dispatch({ type: FETCH_SHARE_OF_MY_POOL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_SHARE_OF_MY_POOL_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
