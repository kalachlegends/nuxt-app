import { deepFind } from '@/helper/deepFind';
export const translateApi = (message) => {
    const objectTranslate = {};
    return objectTranslate[message] || message;
};

export const getErrorFromApiJson = (e, customMessage = 'Неизвестный тип ошибки') => {
    if (typeof e == 'string') {
        return e;
    }
    const error = deepFind(e, 'response.data.error');
    if (typeof error == 'object') {
        if (error.errors) return translateApi(Object.values(error.errors)[0]);
        if (!error.message) return translateApi(Object.values(error)[0]);
        return translateApi(error.message);
    }
    if (typeof error == 'array') {
        return translateApi(error[0]);
    }
    if (typeof error == 'string') {
        return translateApi(error);
    }

    return customMessage;
};
export const getError = (e, customMessage = 'Неизвестный тип ошибки') => {
    if (typeof e == 'string') {
        return e;
    }
    const error = deepFind(e, 'response.data');
    if (error?.error?.message) {
        return error?.error?.message;
    }
    console.log(error.error);
    if (typeof error.error == 'object') {
        return Object.entries(error.error)
            .map(([key, val]) => {
                return `${translateApi(key)}: ${translateApi(val)}`;
            })
            .join('\n');
    }

    if (error.errors) return translateApi(Object.values(error.errors)[0]);
    if (!error.message) return translateApi(Object.values(error)[0]);
    if (typeof error == 'object') {
        return translateApi(error.message);
    }
    if (typeof error?.error == 'array') {
        return error.join();
    }
    if (typeof error?.error == 'string') {
        return translateApi(error);
    }

    return customMessage;
};

export const getErrorFromApiJsonOnlyObject = (e) => {
    const error = deepFind(e, 'response.data.error');
    if (typeof error == 'object') {
        return error;
    }
    if (typeof error == 'array') {
        return error;
    }

    return {};
};
