import axios from "axios";
import {
  FETCH_RESERVE_REQUEST,
  FETCH_RESERVE_SUCCESS,
  FETCH_RESERVE_FAILURE,
  FETCH_ORIGINAL_RESERVE_REQUEST,
  FETCH_ORIGINAL_RESERVE_SUCCESS,
  FETCH_ORIGINAL_RESERVE_FAILURE,
} from "../constants/reserveConstant";

export const fetchReserveAction = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_RESERVE_REQUEST });

    const { data } = await axios.get("http://localhost:5000/api/reserves");

    dispatch({ type: FETCH_RESERVE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_RESERVE_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const fetchOriginalReserveAction = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_ORIGINAL_RESERVE_REQUEST });

    const { data } = await axios.get(
      "http://3.36.96.113:5000/api/reserves/original"
    );

    dispatch({ type: FETCH_ORIGINAL_RESERVE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_ORIGINAL_RESERVE_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
