import { deepFind } from './deepFind';
// import { useI18n } from "vue-i18n";

export const getMessageForError = (v$, key) => {
    let validateVal = deepFind(v$, key);

    // console.log(v$);
    if (validateVal) {
        if (validateVal.$errors) {
            if (validateVal.$errors[0]) return validateVal.$errors[0].$message;
        }
    }
    return '';
};
