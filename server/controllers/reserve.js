const config = require("../config");

const { Web3 } = require("web3");
const web3 = new Web3(config.NETWORK);

const {
  getZynoSingleReserves,
  getZynoBusdtPairReserves,
} = require("../utils/contractUtil");

// reserves
exports.reserves = async (req, res, next) => {
  try {
    return res.json({
      zyno: await getZynoSingleReserves(),
      zyno_busdt: await getZynoBusdtPairReserves(),
    });
  } catch (error) {
    console.error("> [controller] reserves: ", error.message);
    next(error);
  }
};

exports.pairReserves = async (req, res, next) => {
  try {
    const router = new web3.eth.Contract(
      require("../abis/ZynoroRouter.json"),
      config.ROUTER
    );

    const zyno_busdt_reserves = await router.methods
      .getReserves(config.ZYNO, config.BUSDT)
      .call();

    return res.json({
      zyno_busdt: {
        zyno: zyno_busdt_reserves[0],
        busdt: zyno_busdt_reserves[1],
      },
    });
  } catch (error) {
    console.error("> [controller] pairReserves: ", error.message);
    next(error);
  }
};

// zyno reserves
exports.zynoReserves = async (req, res, next) => {
  try {
    return res.json({
      zyno: await getZynoSingleReserves(),
    });
  } catch (error) {
    console.error("> [controller] zynoReserves: ", error.message);
    next(error);
  }
};

// zyno-busdt reserves
exports.zynoBusdtReserves = async (req, res, next) => {
  try {
    return res.json({
      zyno_busdt: await getZynoBusdtPairReserves(),
    });
  } catch (error) {
    console.error("> [controller] zynoBusdtReserves: ", error.message);
    next(error);
  }
};
