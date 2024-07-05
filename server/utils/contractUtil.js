const BigNumber = require("bignumber.js");
const { replaceDecimal } = require("./numberUtil");
const config = require("../config");

const { Web3 } = require("web3");
const web3 = new Web3(config.NETWORK);

// router contract
const routerContract = () => {
  return new web3.eth.Contract(
    require("../abis/ZynoroRouter.json"),
    config.ROUTER
  );
};

// get zyno single reserves
exports.getZynoSingleReserves = async () => {
  try {
    const router = routerContract();

    const reserves = await router.methods
      .getStakingReserve(config.ZYNO, Math.floor(Date.now() / 1000) + 60)
      .call();

    return replaceDecimal(
      parseFloat(new BigNumber(reserves).div(new BigNumber("1e18"))),
      6
    );
  } catch (error) {
    console.error("> [util] getZynoSingleReserves: ", error.message);
  }
};

// get zyno-busdt pair reserves
exports.getZynoBusdtPairReserves = async () => {
  try {
    const router = routerContract();

    const reserves = await router.methods
      .getReserves(config.ZYNO, config.BUSDT)
      .call();

    const zynoReserves = parseFloat(
      new BigNumber(reserves[0]).div(new BigNumber("1e18"))
    );

    const busdtReserves = parseFloat(
      new BigNumber(reserves[1]).div(new BigNumber("1e6"))
    );

    return {
      zyno: replaceDecimal(zynoReserves, 6),
      busdt: replaceDecimal(busdtReserves, 6),
    };
  } catch (error) {
    console.error("> [util] getZynoBusdtPairReserves: ", error.message);
  }
};

// get zyno price
exports.getZynoPrice = async () => {
  try {
    const zynoBusdtPairReserves = await this.getZynoBusdtPairReserves();
    return zynoBusdtPairReserves.busdt / zynoBusdtPairReserves.zyno;
  } catch (error) {
    console.error("> [util] getZynoPrice: ", error.message);
  }
};

// get zyno single tvl
exports.getZynoSingleTVL = async () => {
  try {
    const zynoSingleReserves = await this.getZynoSingleReserves();
    const zynoPrice = await this.getZynoPrice();

    return zynoSingleReserves * zynoPrice;
  } catch (error) {
    console.error("> [util] getZynoSingleTVL: ", error.message);
  }
};

// get zyno-busdt pair tvl
exports.getZynoBusdtPairTVL = async () => {
  try {
    const zynoBusdtPairReserves = await this.getZynoBusdtPairReserves();
    const zynoPrice = await this.getZynoPrice();

    return zynoBusdtPairReserves.zyno * zynoPrice + zynoBusdtPairReserves.busdt;
  } catch (error) {
    console.error("> [util] getZynoBusdtPairTVL: ", error.message);
  }
};

// get tvl total
exports.getTVL = async () => {
  try {
    const zyno = await this.getZynoSingleTVL();
    const zyno_busdt = await this.getZynoBusdtPairTVL();
    return {
      total: replaceDecimal(zyno + zyno_busdt, 6),
      zyno: replaceDecimal(zyno, 2),
      zyno_busdt: replaceDecimal(zyno_busdt, 2),
    };
  } catch (error) {
    console.error("> [util] getTVL: ", error.message);
  }
};

// get zyno single apr
exports.getZynoSingleAPR = async () => {
  try {
    const dailyRewards = 1000.0;

    const zynoSingleReserves = await this.getZynoSingleReserves();

    const zynoPrice = await this.getZynoPrice();

    return (
      ((dailyRewards * 365 * zynoPrice) / (zynoSingleReserves * zynoPrice)) *
      100
    );
  } catch (error) {
    console.error("> [util] getZynoSingleAPR: ", error.message);
  }
};

// get zyno-busdt pair apr
exports.getZynoBusdtPairAPR = async () => {
  try {
    const dailyRewards = 1000.0;

    const zynoBusdtPairReserves = await this.getZynoBusdtPairReserves();

    const zynoPrice = await this.getZynoPrice();

    return (
      ((dailyRewards * 365 * zynoPrice) /
        (zynoBusdtPairReserves.zyno * qtbkPrice +
          zynoBusdtPairReserves.busdt)) *
      100
    );
  } catch (error) {
    console.error("> [util] getZynoBusdtPairAPR: ", error.message);
  }
};

exports.getMyDepositAmount = async (address) => {
  try {
    const router = routerContract();

    const zyno_single = parseFloat(
      new BigNumber(
        await router.methods
          .balanceOf(config.ZYNO, new Date().getTime() + 10000000)
          .call({
            from: address,
          })
      ).div(new BigNumber("1e18"))
    );

    const zynoBusdtPairDeposit = await router.methods
      .getReserves(address, config.ZYNO, config.BUSDT)
      .call();

    const zyno_busdt_pair_zyno = parseFloat(
      new BigNumber(zynoBusdtPairDeposit[0]).div(new BigNumber("1e18"))
    );

    const zyno_busdt_pair_busdt = parseFloat(
      new BigNumber(zynoBusdtPairDeposit[1]).div(new BigNumber("1e6"))
    );

    return {
      zyno: replaceDecimal(zyno_single, 6),
      zyno_busdt: {
        zyno: replaceDecimal(zyno_busdt_pair_zyno, 6),
        busdt: replaceDecimal(zyno_busdt_pair_busdt, 6),
      },
    };
  } catch (error) {
    console.error("> [util] getMyDepositAmount: ", error.message);
  }
};

// get zyno single deposit by address
exports.getZynoSingleDepositByAddress = async (address) => {
  try {
    const router = routerContract();

    const zynoSingleDeposit = parseFloat(
      new BigNumber(
        await router.methods
          .balanceOf(config.ZYNO, new Date().getTime() + 10000000)
          .call({
            from: address,
          })
      ).div(new BigNumber("1e18"))
    );

    const zynoPrice = await this.getZynoPrice();

    return zynoSingleDeposit * zynoPrice;
  } catch (error) {
    console.error("> [util] getZynoSingleDepositByAddress: ", error.message);
  }
};

// get zyno-busdt pair deposit by address
exports.getZynoBusdtPairDepositByAddress = async (address) => {
  try {
    const router = routerContract();

    const zynoBusdtPairDeposit = await router.methods
      .getReserves(address, config.ZYNO, config.BUSDT)
      .call();

    const zynoDeposit = parseFloat(
      new BigNumber(zynoBusdtPairDeposit[0]).div(new BigNumber("1e18"))
    );

    const busdtDeposit = parseFloat(
      new BigNumber(zynoBusdtPairDeposit[1]).div(new BigNumber("1e6"))
    );

    const zynoPrice = await this.getZynoPrice();

    return zynoDeposit * zynoPrice + busdtDeposit;
  } catch (error) {
    console.error("> [util] getZynoBusdtPairDepositByAddress: ", error.message);
  }
};

exports.zynoShareOfMyPool = async (address) => {
  try {
    const router = routerContract();

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
            from: address,
          })
      ).div(new BigNumber("1e18"))
    );

    const shareOfMyPool = zynoMyDeposit / zynoReserves;

    return String(shareOfMyPool).includes(".")
      ? Number(String(shareOfMyPool).substring(0, 4)) * 100
      : shareOfMyPool * 100;
  } catch (error) {
    console.error("> [util] zynoShareOfMyPool: ", error.message);
  }
};

exports.zynoBusdtShareOfMyPool = async (address) => {
  try {
    const router = routerContract();

    const zynoBusdtPairDeposit = await router.methods
      .getReserves(address, config.ZYNO, config.BUSDT)
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

    const bigNumber = new BigNumber(shareOfMyPool).toString(10);

    return String(bigNumber).includes(".")
      ? Number(String(bigNumber).substring(0, 4)) * 100
      : bigNumber * 100;
  } catch (error) {
    console.error("> [util] zynoBusdtShareOfMyPool: ", error.message);
  }
};

exports.getTokenAddress = (symbol) => {
  switch (symbol.toLowerCase()) {
    case "zyno":
      return config.ZYNO;

    case "busdt":
      return config.BUSDT;

    default:
      throw new Error(`${symbol} contract does not exist`);
  }
};

exports.parseReserve = (reserve, decimal) => {
  return parseFloat(new BigNumber(reserve).div(new BigNumber(`1e${decimal}`)));
};
