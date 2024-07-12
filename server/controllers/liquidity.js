const { replaceDecimal, toWei } = require("../utils/numberUtil");
const config = require("../config");

const { Web3 } = require("web3");
const web3 = new Web3(config.NETWORK);

exports.getLiquidities = async (req, res, next) => {
  try {
    const router = new web3.eth.Contract(
      require("../abis/ZynoroRouter.json"),
      config.ROUTER
    );

    const factory = new web3.eth.Contract(
      require("../abis/ZynoroFactory.json"),
      config.FACTORY
    );

    const pairAddress = await factory.methods
      .getPair(
        process.env[req.params.pairA.toUpperCase()],
        process.env[req.params.pairB.toUpperCase()]
      )
      .call();

    const pair = new web3.eth.Contract(
      require("../abis/IERC20.json"),
      pairAddress
    );

    const t = await pair.methods.totalSupply().call();
    const m = await router.methods
      .getLiquidity(
        req.params.address,
        process.env[req.params.pairA.toUpperCase()],
        process.env[req.params.pairB.toUpperCase()]
      )
      .call();

    // return res.json({
    //   liquidity: {
    //     total: replaceDecimal(
    //       replaceDecimal(toWei(await pair.methods.totalSupply().call()), 6),
    //       6
    //     ),
    //     my: replaceDecimal(
    //       replaceDecimal(
    //         toWei(
    //           await router.methods
    //             .getLiquidity(
    //               req.params.address,
    //               process.env[req.params.pairA.toUpperCase()],
    //               process.env[req.params.pairB.toUpperCase()]
    //             )
    //             .call()
    //         ),
    //         6
    //       ),
    //       6
    //     ),
    //   },
    //   original: {
    //     total: (await pair.methods.totalSupply().call()).toString(),
    //     my: (
    //       await router.methods
    //         .getLiquidity(
    //           req.params.address,
    //           process.env[req.params.pairA.toUpperCase()],
    //           process.env[req.params.pairB.toUpperCase()]
    //         )
    //         .call()
    //     ).toString(),
    //   },
    // });

    return res.json({
      liquidity: {
        total: replaceDecimal(web3.utils.fromWei(t, "ether"), 6),
        my: replaceDecimal(web3.utils.fromWei(m, "ether"), 6),
      },
      original: {
        total: t.toString(),
        my: m.toString(),
      },
    });
  } catch (error) {
    console.error(`[getLiquidities] - ${error}`);
    next(error);
  }
};
