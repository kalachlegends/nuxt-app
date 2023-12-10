export const toLocaleStringNumberRu = (number) => {
  if (number) {
    number = number
      .toLocaleString("ru", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      })
      .replace(",", ".");

    if (!/\.\d+/.test(number)) {
      number = number + ".00";
    }
    return number;
  }

  return "0.00";
};
