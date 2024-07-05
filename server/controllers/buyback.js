const BigNumber = require("bignumber.js");
const { getQtbkPrice, getQtbgPrice } = require("../utils/contractUtil");
const { replaceDecimal } = require("../utils/numberUtil");
const config = require("../config");
const Caver = require("caver-js");
const option = {
  headers: [
    {
      name: "Authorization",
      value:
        "Basic " +
        Buffer.from(
          config.ACCESS_KEY_ID + ":" + config.SECRET_ACCESS_KEY
        ).toString("base64"),
    },
    { name: "x-chain-id", value: 8217 },
  ],
};
const caver =
  config.NODE_ENV === "production"
    ? new Caver(new Caver.providers.HttpProvider(config.NETWORK, option))
    : new Caver(config.NETWORK);

exports.getBuybackFundAsset = async (req, res, next) => {
  try {
    const abi = require("../abis/IERC20.abi.json");

    const qtbk = new caver.klay.Contract(abi, process.env.QTBK);
    const qtbkBalance = new BigNumber(
      await qtbk.methods.balanceOf(process.env.BUY_BACK_FUND).call()
    ).div(new BigNumber("1e18"));

    const kusdt = new caver.klay.Contract(abi, process.env.KUSDT);
    const kusdtBalance = new BigNumber(
      await kusdt.methods.balanceOf(process.env.BUY_BACK_FUND).call()
    ).div(new BigNumber("1e6"));

    const qtbg = new caver.klay.Contract(abi, process.env.QTBG);
    const qtbgBalance = new BigNumber(
      await qtbg.methods.balanceOf(process.env.BUY_BACK_FUND).call()
    ).div(new BigNumber("1e18"));

    return res.json(
      replaceDecimal(
        parseFloat(
          qtbkBalance
            .multipliedBy(new BigNumber(await getQtbkPrice()))
            .plus(qtbgBalance.multipliedBy(new BigNumber(await getQtbgPrice())))
            .plus(kusdtBalance)
            .toString()
        ),
        6
      )
    );
  } catch (error) {
    console.error(`[getBuybackFundAsset] - ${error}`);
    next(error);
  }
};
