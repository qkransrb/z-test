const { getZynoPrice } = require("../utils/contractUtil");
const { replaceDecimal } = require("../utils/numberUtil");

exports.price = async (req, res, next) => {
  try {
    return res.json({
      zyno: replaceDecimal(await getZynoPrice(), 6),
    });
  } catch (error) {
    console.error("> [controller] price: ", error.message);
    next(error);
  }
};

// zyno price
exports.zynoPrice = async (req, res, next) => {
  try {
    return res.json({
      zyno: await getZynoPrice(),
    });
  } catch (error) {
    console.error("> [controller] zynoPrice: ", error.message);
    next(error);
  }
};
