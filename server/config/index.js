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
        FACTORY: "0x93eae484f35599882D6620D93eca1416465da3ea",
        ROUTER: "0xC88c196e67D982985E259E5ed9fe1C71d03D9A9E",
      };
