import axios from "axios";

export const getBlockNumber = async () => {
  try {
    const { data } = await axios.get("/api/blockNumber");
    return data;
  } catch (error) {
    console.error(`[getBlockNumber] - ${error}`);
  }
};
