import axios from "axios";
import {
  FETCH_BUYBACK_ASSET_REQUEST,
  FETCH_BUYBACK_ASSET_SUCCESS,
  FETCH_BUYBACK_ASSET_FAILURE,
} from "../constants/buybackConstant";

export const fetchBuybackAssetAction = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_BUYBACK_ASSET_REQUEST });

    const { data } = await axios.get("http://localhost:5000/api/buyback/asset");

    dispatch({ type: FETCH_BUYBACK_ASSET_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_BUYBACK_ASSET_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
