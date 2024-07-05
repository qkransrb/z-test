// 소수점 지정자리 까지 남기고, 나머지 버림 (원하는 자릿 수 limit 파라미터로 전달 할 것.)
exports.replaceDecimal = (number, limit) => {
  const str = String(number);
  return str.includes(".")
    ? Number(
        str.split(".")[0] +
          "." +
          str.split(".")[1].substring(0, parseInt(limit))
      )
    : Number(str).toFixed(limit);
};
