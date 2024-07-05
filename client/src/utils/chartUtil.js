export const calculateTotalDepositAmount = (deposits, qtbkPrice, qtbgPrice) => {
  const data = [];

  for (let i = 0; i < deposits.length; i++) {
    data.push({
      y: Number(
        (
          deposits[i].qtbk_quantity * qtbkPrice +
          deposits[i].qtbg_quantity * qtbgPrice +
          deposits[i].kusdt_quantity
        ).toFixed(2)
      ),
      x: deposits[i].date,
    });
  }

  const result = [
    {
      id: "norway",
      color: "hsl(58, 70%, 50%)",
      data,
    },
  ];

  return result;
};

export const calculateTotalServiceVolume = (swaps, qtbkPrice, qtbgPrice) => {
  const data = [];

  for (let i = 0; i < swaps.length; i++) {
    data.push({
      y: Number(
        (
          swaps[i].swap_qtbk_quantity * qtbkPrice +
          swaps[i].swap_qtbg_quantity * qtbgPrice +
          swaps[i].swap_kusdt_quantity
        ).toFixed(2)
      ),
      x: swaps[i].date,
    });
  }

  const result = [
    {
      id: "norway",
      color: "hsl(58, 70%, 50%)",
      data,
    },
  ];

  return result;
};
