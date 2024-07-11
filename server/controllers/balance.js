const { replaceDecimal } = require("../utils/numberUtil");
const config = require("../config");
const BigNumber = require("bignumber.js");

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

// exports.getMyBalance = async (req, res, next) => {
//   try {
//     const address = req.params.address;

//     const qtbk = new caver.kct.kip7(process.env.QTBK);
//     const qtbkBalance = (await qtbk.balanceOf(address)).div(
//       `1e${await qtbk.decimals()}`
//     );

//     const kusdt = new caver.kct.kip7(process.env.KUSDT);
//     const kusdtBalance = (await kusdt.balanceOf(address)).div(
//       `1e${await kusdt.decimals()}`
//     );

//     const qtbg = new caver.kct.kip7(process.env.QTBG);
//     const qtbgBalance = (await qtbg.balanceOf(address)).div(
//       `1e${await qtbg.decimals()}`
//     );

//     return res.json({
//       qtbk: replaceDecimal(parseFloat(qtbkBalance.toString()), 6),
//       kusdt: replaceDecimal(parseFloat(kusdtBalance.toString()), 6),
//       qtbg: replaceDecimal(parseFloat(qtbgBalance.toString()), 6),
//     });
//   } catch (error) {
//     console.error(`[getMyBalance] - ${error}`);
//     next(error);
//   }
// };

const { Web3 } = require("web3");
const web3 = new Web3(config.NETWORK);

const erc20ABI = [
  {
    constant: true,
    inputs: [{ name: "_owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "balance", type: "uint256" }],
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [{ name: "", type: "uint8" }],
    type: "function",
  },
];

exports.getMyBalance = async (req, res, next) => {
  try {
    const address = req.params.address;

    const zyno = new web3.eth.Contract(erc20ABI, config.ZYNO);
    const busdt = new web3.eth.Contract(erc20ABI, config.BUSDT);

    const zynoBalance = await zyno.methods.balanceOf(address).call();
    const busdtBalance = await busdt.methods.balanceOf(address).call();

    // const zynoDecimals = await zyno.methods.decimals().call();
    // const busdtDecimals = await busdt.methods.decimals().call();

    return res.json({
      zyno: replaceDecimal(
        parseFloat(web3.utils.fromWei(zynoBalance, "ether")),
        6
      ),
      busdt: replaceDecimal(
        Number(
          new BigNumber(busdtBalance).dividedBy(`1e6`).toString(10)
        ).toLocaleString(undefined, {
          useGrouping: false,
          maximumFractionDigits: 6,
        }),
        6
      ),
    });
  } catch (error) {
    console.error(`[getMyBalance] - ${error}`);
    next(error);
  }
};
