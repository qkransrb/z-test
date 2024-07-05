exports.withComma = (target) => {
  return String(target).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
