export const compareZindex = (a, b) => {
  if (typeof a == "object") {
    if (a.style && b.style) {
      return a.style.zIndex - b.style.zIndex;
    }
  }
  return a;
};
export const compareZIndexArray = (array) => array.sort(compareZindex);
