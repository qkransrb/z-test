require("dotenv").config();

module.exports =
  process.env.NODE_ENV === "production"
    ? {
        NODE_ENV: "production",
        NETWORK: "",
        ZYNO: "",
        BUSDT: "",
        FACTORY: "",
        ROUTER: "",
      }
    : {
        NODE_ENV: "development",
        NETWORK: "https://data-seed-prebsc-1-s1.binance.org:8545",
        ZYNO: "0xaaf69103d3dA5402cb7762F31f55CA6Fa11BD64f",
        BUSDT: "0x21B9A470B91A28c7D42874674768aEaf8CC2999A",
        FACTORY: "0x5dc72C10563AdcacD7A10282339F76277BA7370c",
        ROUTER: "0x80bF7fEc1e13b400DdEE277aAeB79F98372bfEC2",
      };
