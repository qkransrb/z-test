const { parseReserve } = require("../utils/contractUtil");
const config = require("../config");

const { Web3 } = require("web3");
const web3 = new Web3(config.NETWORK);

exports.information = async (req, res, next) => {
  try {
    const routerContract = new web3.eth.Contract(
      require("../abis/ZynoroRouter.json"),
      config.ROUTER
    );

    // reserve
    const zyno_single_reserve = await routerContract.methods
      .getStakingReserve(config.ZYNO, Math.floor(Date.now() / 1000) + 60)
      .call();

    const zyno_busdt_pair_reserve = await routerContract.methods
      .getReserves(config.ZYNO, config.BUSDT)
      .call();

    // price
    const zyno_price =
      parseReserve(zyno_busdt_pair_reserve[1], 6) /
      parseReserve(zyno_busdt_pair_reserve[0], 18);
    const busdt_price = 1;

    // tvl
    const zyno_single_tvl = parseReserve(zyno_single_reserve, 18) * zyno_price;
    const zyno_busdt_pair_tvl =
      parseReserve(zyno_busdt_pair_reserve[0], 18) * zyno_price +
      parseReserve(zyno_busdt_pair_reserve[1], 6) * busdt_price;

    // apr
    const single_daily_rewards = 54794.52;
    const pair_daily_rewards = 54794.52;
    const zyno_single_apr =
      ((single_daily_rewards * 365 * zyno_price) /
        (parseReserve(zyno_single_reserve, 18) * zyno_price)) *
      100;
    const zyno_busdt_pair_apr =
      ((pair_daily_rewards * 365 * zyno_price) /
        (parseReserve(zyno_busdt_pair_reserve[0], 18) * zyno_price +
          parseReserve(zyno_busdt_pair_reserve[1], 6) * busdt_price)) *
      100;

    return res.status(200).json({
      reserve: {
        zyno: parseReserve(zyno_single_reserve, 18),
        zyno_busdt: {
          zyno: parseReserve(zyno_busdt_pair_reserve[0], 18),
          busdt: parseReserve(zyno_busdt_pair_reserve[1], 6),
        },
      },
      original: {
        zyno: zyno_single_reserve.toString(),
        zyno_busdt: {
          zyno: zyno_busdt_pair_reserve[0].toString(),
          busdt: zyno_busdt_pair_reserve[1].toString(),
        },
      },
      price: {
        zyno: zyno_price,
        kusdt: 1,
      },
      tvl: {
        total: zyno_single_tvl + zyno_busdt_pair_tvl,
        zyno: zyno_single_tvl,
        zyno_busdt: zyno_busdt_pair_tvl,
      },
      apr: {
        zyno: zyno_single_apr,
        zyno_busdt: zyno_busdt_pair_apr,
      },
    });
  } catch (error) {
    console.error(`information - ${error}`);
    next(error);
  }
};
