const BigNumber = require("bignumber.js");
const {
  zynoShareOfMyPool,
  zynoBusdtShareOfMyPool,
} = require("../utils/contractUtil");
const config = require("../config");

const { Web3 } = require("web3");
const web3 = new Web3(config.NETWORK);

exports.shareOfMyPool = async (req, res, next) => {
  try {
    return res.json({
      zyno: await zynoShareOfMyPool(req.params.address),
      zyno_busdt: await zynoBusdtShareOfMyPool(req.params.address),
    });
  } catch (error) {
    console.error("> shareOfMyPool: ", error.message);
    next(error);
  }
};

exports.shareOfMyPoolZyno = async (req, res, next) => {
  try {
    const router = new web3.eth.Contract(
      require("../abis/ZynoroRouter.json"),
      config.ROUTER
    );

    const current = Math.floor(Date.now() / 1000);

    const zynoReserves = parseFloat(
      new BigNumber(
        await router.methods.getStakingReserve(config.ZYNO, current + 60).call()
      ).div(new BigNumber("1e18"))
    );

    const zynoMyDeposit = parseFloat(
      new BigNumber(
        await router.methods
          .balanceOf(config.ZYNO, new Date().getTime() + 10000000)
          .call({
            from: req.params.address,
          })
      ).div(new BigNumber("1e18"))
    );

    const shareOfMyPool = zynoMyDeposit / zynoReserves;

    res.json({
      zyno: String(shareOfMyPool).includes(".")
        ? Number(String(shareOfMyPool).substring(0, 4)) * 100
        : shareOfMyPool * 100,
    });
  } catch (error) {
    console.error("> shareOfMyPoolZyno: ", error.message);
    next(error);
  }
};

exports.shareOfMyPoolZynoBusdt = async (req, res, next) => {
  try {
    const router = new web3.eth.Contract(
      require("../abis/ZynoroRouter.json"),
      config.ROUTER
    );

    const zynoBusdtPairDeposit = await router.methods
      .getReserves(req.params.address, config.ZYNO, config.BUSDT)
      .call();

    const zynoBusdtZynoDeposit = parseFloat(
      new BigNumber(zynoBusdtPairDeposit[0]).div(new BigNumber("1e18"))
    );

    const zynoBusdtBusdtDeposit = parseFloat(
      new BigNumber(zynoBusdtPairDeposit[1]).div(new BigNumber("1e6"))
    );

    const reserves = await router.methods
      .getReserves(config.ZYNO, config.BUSDT)
      .call();

    const zynoReserves = parseFloat(
      new BigNumber(reserves[0]).div(new BigNumber("1e18"))
    );

    const busdtReserves = parseFloat(
      new BigNumber(reserves[1]).div(new BigNumber("1e6"))
    );

    const zynoPrice = busdtReserves / zynoReserves;

    const myZynoBusdtDeposit =
      zynoBusdtZynoDeposit * zynoPrice + zynoBusdtBusdtDeposit;

    const zynoBusdtReserves = await router.methods
      .getReserves(config.ZYNO, config.BUSDT)
      .call();

    const zyno_busdt_zyno_reserves = parseFloat(
      new BigNumber(zynoBusdtReserves[0]).div(new BigNumber("1e18"))
    );

    const zyno_busdt_busdt_reserves = parseFloat(
      new BigNumber(zynoBusdtReserves[1]).div(new BigNumber("1e6"))
    );

    const zyno_busdt_reserves =
      zyno_busdt_zyno_reserves * zynoPrice + zyno_busdt_busdt_reserves;

    const shareOfMyPool = myZynoBusdtDeposit / zyno_busdt_reserves;

    return res.json({
      zyno_busdt: String(shareOfMyPool).includes(".")
        ? Number(String(shareOfMyPool).substring(0, 4)) * 100
        : shareOfMyPool * 100,
    });
  } catch (error) {
    console.error("> shareOfMyPoolZynoBusdt: ", error.message);
    next(error);
  }
};
