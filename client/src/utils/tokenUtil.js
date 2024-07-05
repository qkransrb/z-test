import BigNumber from "bignumber.js";

export function toPeb(klayAmount, symbol) {
  const decimals = getDecimals(symbol);
  return new BigNumber(klayAmount).multipliedBy(`1e${decimals}`).toFixed();
}

export function toWei(amount, symbol) {
  const decimals = getDecimals(symbol);
  return new BigNumber(amount).multipliedBy(`1e${decimals}`).toFixed();
}

export function fromPeb(v, symbol, options) {
  if (!v) {
    return 0;
  }

  const decimals = getDecimals(symbol);
  return Number(
    new BigNumber(v).dividedBy(`1e${decimals}`).toString(10)
  ).toLocaleString(undefined, {
    useGrouping: false,
    ...options,
  });
}

export function getDecimals(symbol) {
  if (!symbol) {
    return 18;
  }

  switch (symbol.toLowerCase()) {
    case "zyno":
    case "zynoro":
      return 18;
    case "busdt":
      return 6;
    default:
      throw new Error("getDecimals: Not exist symbol");
  }
}

export function printReserve(num, decimals) {
  if (!decimals) {
    decimals = 6;
  }

  if (isNaN(num)) {
    return 0;
  }

  return Number(num).toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}
