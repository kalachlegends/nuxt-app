export const onlyKeysByObject = (formState, newObj) => {
  if (!newObj) {
    return formState;
  }
  const temObj = {};
  Object.entries(formState).forEach((item) => {
    const [key, value] = item;
    temObj[key] = newObj[key] != undefined ? newObj[key] : value;
  });
  return temObj;
};
