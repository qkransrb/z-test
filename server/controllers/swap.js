const { getTokenAddress } = require("../utils/contractUtil");
const config = require("../config");

const { Web3 } = require("web3");
const web3 = new Web3(config.NETWORK);

exports.getEstimatedBalance = async (req, res, next) => {
  try {
    const { amount, tokens } = req.body;

    const abi = require("../abis/ZynoroRouter.json");
    const contract = new web3.eth.Contract(abi, config.ROUTER);

    const paths = tokens.map(getTokenAddress);

    const response = await contract.methods.getAmountsOut(amount, paths).call();

    return res.json(response[response.length - 1]);
  } catch (error) {
    console.error(`[getEstimatedBalance] - ${error}`);
    next(error);
  }
};
