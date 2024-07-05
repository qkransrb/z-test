import axios from "axios";
import {
  DEFAULT_INFORMATION_REQUEST,
  DEFAULT_INFORMATION_SUCCESS,
  DEFAULT_INFORMATION_FAILURE,
} from "../constants/defaultConstant";

export const fetchDefaultAction = () => async (dispatch) => {
  try {
    dispatch({ type: DEFAULT_INFORMATION_REQUEST });

    const { data } = await axios.get("/api/default");

    dispatch({ type: DEFAULT_INFORMATION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DEFAULT_INFORMATION_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
