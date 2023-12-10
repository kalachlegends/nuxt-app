export const onlyNumbers = (value) => {
  return !value || /^\d+\.?(\d+)?$/.test(value);
};
export const onlyLength = (length) => {
  return (value) => {
    if (value.length > length) return false;
    return true;
  };
};
export const onlyNumbersWithLength = (length) => {
  return (value) => {
    if (value.length > length) return false;
    return !value || /^\d+$/.test(value);
  };
};

export const onlyNumbersWithLengthAndCheckIntLength = (
  length,
  numberLength
) => {
  return (value) => {
    if (value.length > length) {
      return false;
    }
    if (!value || /^\d+$/.test(value)) {
      value = parseFloat(value);
      if (value >= numberLength) {
        return true;
      }
    }
  };
};

export const validatePhone = (value) => {
  if (!/^8\d{10}$/.test(value)) {
    return new Error(`Не верный формат телефона -> Пример: 87001112233`);
  }
  return true;
};
