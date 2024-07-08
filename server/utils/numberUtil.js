// 소수점 지정자리 까지 남기고, 나머지 버림 (원하는 자릿 수 limit 파라미터로 전달 할 것.)
const BigNumber = require("bignumber.js");

exports.replaceDecimal = (number, limit) => {
  const str = String(number);
  return str.includes(".")
    ? Number(
        str.split(".")[0] +
          "." +
          str.split(".")[1].substring(0, parseInt(limit))
      )
    : Number(str).toFixed(Number(limit));
};

exports.getDecimals = (symbol) => {
  if (!symbol) {
    return 18;
  }

  switch (symbol.toLowerCase()) {
    case "zyno":
    case "busdt":
      return 6;

    default:
      throw new Error("getDecimals: Not exist symbol");
  }
};

exports.toWei = (klayAmount, symbol) => {
  const decimals = this.getDecimals(symbol);
  return new BigNumber(klayAmount).multipliedBy(`1e${decimals}`).toFixed();
};
