import axios from "axios";
import {
  FETCH_TVL_REQUEST,
  FETCH_TVL_SUCCESS,
  FETCH_TVL_FAILURE,
} from "../constants/tvlConstant";

export const fetchTvlAction = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_TVL_REQUEST });

    const { data } = await axios.get("http://localhost:5000/api/tvl");

    dispatch({ type: FETCH_TVL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_TVL_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
