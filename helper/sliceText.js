export const sliceText = (str, length = 10) => {
  if (str) {
    if (str.length >= 10) {
      return str.slice(0, length) + "....";
    }
  }
  return "";
};
