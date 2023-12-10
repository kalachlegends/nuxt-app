import { deepFind } from '@/helper/other/deepFind';
import { watch, ref } from 'vue';
import { translateApi } from './getErrorFromApiJson';
export const useValidateApi = (formState) => {
    const errors = ref([]);
    // watch(errors, (newValue) => {
    //   errors.value = newValue;
    // });
    const validateFunc = (keyValidate) => {
        let message = '';
        console.log(deepFind(errors.value, keyValidate), 'deepFind(errors.value, keyValidate)');

        return {
            $validator: (value) => {
                message = deepFind(errors.value, keyValidate);
                console.log(deepFind(errors.value, keyValidate), 'deepFind(errors.value, keyValidate)');
                if (deepFind(errors.value, keyValidate)) {
                    return false;
                }
                return true;
            },
            $message: () => translateApi(message)
        };
    };
    return [validateFunc, errors];
};

export const required = {
    $validator: (value) => !!value,
    $message: 'Обязательное поле'
};

export const maxLengthFunc = (min, max, attrs = {}) => {
    return {
        $validator: (value) => {
            // console.log(value.length, min);
            return value.length <= max && value.length >= min;
        },
        $message: attrs['message'] || `Не дожно быть меньше ${min} или больше ${max}`
    };
};
export const maxLengthFuncWithoutRequired = (min, max, attrs = {}) => {
    return {
        $validator: (value) => {
            if (value == null || value == '') {
                return true;
            }
            return value.length <= max && value.length >= min;
        },
        $message: attrs['message'] || `Не дожно быть меньше ${min} или больше ${max}`
    };
};

export const maxIntFunc = (min, max, attrs = {}) => {
    return {
        $validator: (value) => {
            if (typeof value == 'string') {
                value = Number(value.replace(/\s+/g, ''));
            }

            return value <= max && value >= min;
        },
        $message: attrs['message'] || `Не дожно быть меньше ${min} или больше ${max}`
    };
};

export const minLengthFunc = (min, attrs = {}) => {
    return {
        $validator: (value) => {
            return value.length >= min;
        },
        $message: attrs['message'] || `Не дожно быть меньше ${min}`
    };
};

export const checkMonth = {
    $validator: (value) => {
        return value >= 1 && value <= 12;
    },
    $message: `Можно указать месяц с 1 до 12`
};

export const checkEmail = {
    $validator: (value) => {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
    },
    $message: `Не верный формат E-mail`
};

export const checkIBAN = {
    $validator: (value) => {
        return /^KZ$/.test(value);
    },
    $message: `Не верный IBAN -><br> Пример: KZ123456789123456789`
};

export const checkEnglish = {
    $validator: (value) => {
        return /[a-zA-Z]/.test(value);
    },
    $message: `Можно указать только английские буквы`
};

export const checkRussian = {
    $validator: (value) => {
        return /[а-яА-Я]/.test(value);
    },
    $message: `Можно указать только русские буквы`
};

export const checkPhone = {
    $validator: (value) => {
        return /^8\d{10}$/.test(value);
    },
    $message: `Не верный формат телефона -><br> Пример: 87001112233`
};

export const passwordLength = {
    $validator: (value) => {
        return value.length >= 4;
    },
    $message: `Придумайте пароль из не менее 4 символов`
};

export const checkPhoneMask = {
    $validator: (value) => {
        return /^8\s\d{3}\s\d{3}\s\d{2}\s\d{2}$/.test(value) || /^8\d{10}$/.test(value);
    },
    $message: `Не верный формат телефона <br> Пример: 8 700 111 22 33`
};

export const checkPasswordFunction = (formState, firstPassword, secondPassword) => {
    return {
        $validator: (value) => {
            return deepFind(formState.value, firstPassword) == deepFind(formState.value, secondPassword);
        },
        $message: `Введенные пароли не совпадают`
    };
};

export const checkDate = {
    $validator: (value) => {
        return /^\d{4}-\d{2}-\d{2}$/.test(value);
    },
    $message: `Не верный формат даты -> Пример: 2023-01-01`
};
