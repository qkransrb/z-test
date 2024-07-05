import axios from "axios";
import {
  FETCH_APR_REQUEST,
  FETCH_APR_SUCCESS,
  FETCH_APR_FAILURE,
} from "../constants/aprConstant";

export const fetchAprAction = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_APR_REQUEST });

    const { data } = await axios.get("http://localhost:5000/api/apr");

    dispatch({ type: FETCH_APR_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_APR_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
