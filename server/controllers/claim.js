const BigNumber = require("bignumber.js");
const { replaceDecimal } = require("../utils/numberUtil");
const config = require("../config");

const { Web3 } = require("web3");
const web3 = new Web3(config.NETWORK);

exports.claimable = async (req, res, next) => {
  try {
    const router = new web3.eth.Contract(
      require("../abis/ZynoroRouter.json"),
      config.ROUTER
    );

    const zynoClaimableReward = parseFloat(
      new BigNumber(
        await router.methods
          .getClaimableReward(config.ZYNO, new Date().getTime() + 10000000)
          .call({
            from: req.params.address,
          })
      ).div(new BigNumber("1e18"))
    );

    const zynoBusdtClaimableReward = parseFloat(
      new BigNumber(
        await router.methods
          .getClaimablePairReward(
            config.ZYNO,
            config.BUSDT,
            new Date().getTime() + 10000000
          )
          .call({
            from: req.params.address,
          })
      ).div(new BigNumber("1e18"))
    );

    return res.json({
      zyno: replaceDecimal(zynoClaimableReward, 6),
      zyno_busdt: replaceDecimal(zynoBusdtClaimableReward, 6),
    });
  } catch (error) {
    console.error("> claimable: ", error.message);
    next(error);
  }
};

exports.zynoClaimable = async (req, res, next) => {
  try {
    const router = new web3.eth.Contract(
      require("../abis/ZynoroRouter.json"),
      config.ROUTER
    );

    const zynoClaimableReward = parseFloat(
      new BigNumber(
        await router.methods
          .getClaimableReward(config.ZYNO, new Date().getTime() + 10000000)
          .call({
            from: req.params.address,
          })
      ).div(new BigNumber("1e18"))
    );

    return res.json({
      zyno: zynoClaimableReward,
    });
  } catch (error) {
    console.error("> zynoClaimable: ", error.message);
    next(error);
  }
};

exports.zynoBusdtClaimable = async (req, res, next) => {
  try {
    const router = new web3.eth.Contract(
      require("../abis/ZynoroRouter.json"),
      config.ROUTER
    );

    const zynoBusdtClaimableReward = parseFloat(
      new BigNumber(
        await router.methods
          .getClaimablePairReward(
            config.ZYNO,
            config.BUSDT,
            new Date().getTime() + 10000000
          )
          .call({
            from: req.params.address,
          })
      ).div(new BigNumber("1e18"))
    );

    return res.json({
      zyno_busdt: zynoBusdtClaimableReward,
    });
  } catch (error) {
    console.error("> zynoBusdtClaimable: ", error.message);
    next(error);
  }
};
