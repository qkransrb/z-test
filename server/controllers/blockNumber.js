// const config = require("../config");
// const Caver = require("caver-js");
// const option = {
//   headers: [
//     {
//       name: "Authorization",
//       value:
//         "Basic " +
//         Buffer.from(
//           config.ACCESS_KEY_ID + ":" + config.SECRET_ACCESS_KEY
//         ).toString("base64"),
//     },
//     { name: "x-chain-id", value: 8217 },
//   ],
// };
// const caver =
//   config.NODE_ENV === "production"
//     ? new Caver(new Caver.providers.HttpProvider(config.NETWORK, option))
//     : new Caver(config.NETWORK);

// exports.getBlockNumber = async (req, res, next) => {
//   try {
//     return res.json(await caver.klay.getBlockNumber());
//   } catch (error) {
//     console.error(`[getBlockNumber] - ${error}`);
//     next(error);
//   }
// };
