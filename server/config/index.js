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
        ZYNO: "0xB144F37AeA5BE84C1af4F224Eb0C3f77536111c8",
        BUSDT: "0x21B9A470B91A28c7D42874674768aEaf8CC2999A",
        FACTORY: "0x34d0EFCd7B35Aa433E4C83750e1483818efCe726",
        ROUTER: "0xf5fBD3677c2a5929E6534d8E6dC0C2E48fF1500B",
      };
