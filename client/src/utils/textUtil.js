export const withComma = (target) => {
  const str = String(target);

  if (str.split(".").length === 2) {
    return (
      str.split(".")[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
      "." +
      str.split(".")[1]
    );
  } else {
    return str.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
};

export const shortenAddress = (target) => {
  return `${target.substring(0, 5)}...${target.substring(target.length - 5)}`;
};
