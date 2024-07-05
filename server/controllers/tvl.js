const {
  getTVL,
  getZynoSingleTVL,
  getZynoBusdtPairTVL,
} = require("../utils/contractUtil");

// tvl
exports.totalTVL = async (req, res, next) => {
  try {
    return res.json(await getTVL());
  } catch (error) {
    console.error("> [controller] tvl: ", error.message);
    next(error);
  }
};

// zyno tvl
exports.zynoTVL = async (req, res, next) => {
  try {
    return res.json({
      zyno: await getZynoSingleTVL(),
    });
  } catch (error) {
    console.error("> [controller] zynoTVL: ", error.message);
    next(error);
  }
};

// qtbk-kusdt tvl
exports.zynoBusdtTVL = async (req, res, next) => {
  try {
    return res.json({
      zyno_busdt: await getZynoBusdtPairTVL(),
    });
  } catch (error) {
    console.error("> [controller] zynoBusdtTVL: ", error.message);
    next(error);
  }
};
