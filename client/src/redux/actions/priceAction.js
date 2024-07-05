import axios from "axios";
import {
  FETCH_PRICE_REQUEST,
  FETCH_PRICE_SUCCESS,
  FETCH_PRICE_FAILURE,
} from "../constants/priceConstant";

export const fetchPriceAction = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_PRICE_REQUEST });

    const { data } = await axios.get("http://3.36.96.113:5000/api/price");

    dispatch({ type: FETCH_PRICE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_PRICE_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
