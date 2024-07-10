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
        FACTORY: "0xdcda90a8A228F67f93C3b3523daa61371a6DeC0A",
        ROUTER: "0xd8387BC173D565DA0c47856517B1F5F7ce6B48fe",
      };
