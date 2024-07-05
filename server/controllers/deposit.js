const {
  getMyDepositAmount,
  getZynoSingleDepositByAddress,
  getZynoBusdtPairDepositByAddress,
} = require("../utils/contractUtil");
const { replaceDecimal } = require("../utils/numberUtil");

exports.myDeposit = async (req, res, next) => {
  try {
    return res.json({
      zyno: replaceDecimal(
        await getZynoSingleDepositByAddress(req.params.address),
        2
      ),
      zyno_busdt: replaceDecimal(
        await getZynoBusdtPairDepositByAddress(req.params.address),
        2
      ),
    });
  } catch (error) {
    console.error("> [controller] myDeposit: ", error.message);
    next(error);
  }
};

exports.zynoMyDeposit = async (req, res, next) => {
  try {
    return res.json({
      zyno: await getZynoSingleDepositByAddress(req.params.address),
    });
  } catch (error) {
    console.error("> [controller] zynoMyDeposit: ", error.message);
    next(error);
  }
};

exports.zynoBusdtMyDeposit = async (req, res, next) => {
  try {
    return res.json({
      zyno_busdt: await getZynoBusdtPairDepositByAddress(req.params.address),
    });
  } catch (error) {
    console.error("> [controller] zynoBusdtMyDeposit: ", error.message);
    next(error);
  }
};

exports.myDepositAmount = async (req, res, next) => {
  try {
    return res.json(await getMyDepositAmount(req.params.address));
  } catch (error) {
    console.error("> myDepositAmount: ", error.message);
    next(error);
  }
};
