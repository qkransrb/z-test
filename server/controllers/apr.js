const {
  getZynoSingleAPR,
  getZynoBusdtPairAPR,
} = require("../utils/contractUtil");
const { replaceDecimal } = require("../utils/numberUtil");

exports.APR = async (req, res, next) => {
  try {
    return res.json({
      zyno: replaceDecimal(await getZynoSingleAPR(), 2),
      zyno_busdt: replaceDecimal(await getZynoBusdtPairAPR(), 2),
    });
  } catch (error) {
    console.error("> [controller] APR: ", error.message);
    next(error);
  }
};

exports.zynoAPR = async (req, res, next) => {
  try {
    return res.json({
      zyno: await getZynoSingleAPR(),
    });
  } catch (error) {
    console.error("> [controller] zynoAPR: ", error.message);
    next(error);
  }
};

exports.zynoBusdtAPR = async (req, res, next) => {
  try {
    return res.json({
      zyno_busdt: await getZynoBusdtPairAPR(),
    });
  } catch (error) {
    console.error("> [controller] zynoBusdtAPR: ", error.message);
    next(error);
  }
};
