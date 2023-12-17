import { axios } from "@/axios";
// import { useValidateApi } from "@/hooks/validation/useValidateApi";
import { getErrorFromApiJson, getError } from "@/helper/getErrorFromApiJson";
import { deepFind } from "@/helper/deepFind";
import { getErrorFromApiJsonOnlyObject } from "@/helper/getErrorFromApiJson";
import { useVuelidate } from "@vuelidate/core";
/**
 * С помощью replaceRouteComp: { id: "123" } роут за репласиться если передать в параметр route /route/:id/
 * на выходе получиться /route/123/
 *
 *
 * isMessageError: true выдаст уведомление справа
 */
import { useValidateApi } from "@/helper/defaultRules";
import { required, maxLengthFunc, checkEmail } from "@/helper/defaultRules";
import { ref, computed } from "vue";
import { useToast } from "primevue/usetoast";
import { usePaginationQueryBase } from "./usePagination";
// import { Toast } from "@/helper/defaultAlert";
export const useQueryBase = (
  method,
  route,
  defaultval = [],
  attrs = {
    version: "0",
    keyReturn: null,
    replaceRouteComp: { value: {} },
    formStateOrParamsComp: { value: null },
    isLoadGetComp: undefined,
    isError: true,
    returnData: false,
    onMounted: false,
    sortedFunc: null,
    onSuccsess: () => "",
    onFailed: () => "",
    filterFunc: null,
    isMessageSucsess: false,
    isMessageError: false,
    isMessageValidateError: false,
    isValidateApi: false,
    isSetData: true,
    isValidate: false,
    pagination: {},
  }
) => {
  const isLoad = ref(false);
  const toast = useToast();
  const isLoadComptuded = computed(() => {
    // console.log(attrs["isLoadGetComp"]);
    if (attrs["isLoadGetComp"] == undefined) {
      return isLoad.value;
    }
    return attrs["isLoadGetComp"]?.value;
  });
  let data = ref(defaultval);
  if (defaultval.value) {
    data = defaultval;
  }

  let validateApi = [];
  let $v = null;
  if (attrs["isValidateApi"] || attrs["isValidate"]) {
    validateApi = useValidateApi();
  }
  if (attrs["isValidate"]) {
    if (typeof attrs["rulesComp"] != "object") {
      console.error("rulesComp is not object error");
      return;
    }
    let rules = replaceCompRules(
      attrs["rulesComp"].value || attrs["rulesComp"],
      validateApi
    );

    $v = useVuelidate(rules, data);
  }

  const onFetchFunctionThen = async (resp) => {
    isLoad.value = false;
    let onSuccsess = attrs["onSuccsess"] || (() => "");
    // console.log(resp);
    if (attrs["isMessageSucsess"]) {
      toast.add({
        severity: "success",
        summary: "success",
        detail: "Успешная операция",
        life: 3000,
      });
    }
    const keyReturn = attrs["keyReturn"] || "data.data";
    if (attrs["isValidateApi"] || attrs["isValidate"]) {
      validateApi[1].value = getErrorFromApiJsonOnlyObject(resp);
    }
    const setData = attrs["isSetData"] == undefined ? true : attrs["isSetData"];

    if (Object.keys(attrs.pagination || {}).length == 0 && setData) {
      data.value = deepFind(resp, keyReturn, defaultval);
    }

    onSuccsess(resp, attrs);
    if (attrs["returnData"]) {
      // console.log(data.value);
      return data.value;
    }
    return resp;
  };
  const onFetchFunctionCatch = (resp) => {
    isLoad.value = false;
    let onFailed = attrs["onFailed"] || (() => "");
    if (attrs["isValidateApi"] || attrs["isValidate"]) {
      validateApi[1].value = getErrorFromApiJsonOnlyObject(resp);
    }

    onFailed(resp);
    if (attrs["isMessageError"]) {
      toast.add({
        severity: "error",
        summary: "error",
        detail: getError(resp),
        life: 20_000,
      });
    }
    if (attrs["isError"]) {
      throw new Error(resp);
    }
    console.error(resp);
    return resp;
  };
  const fetchData = async (replaceRouteByObjectFull, formstate) => {
    isLoad.value = true;
    let newRoute = route;

    newRoute = replaceRouteByObject(newRoute, {
      ...replaceRouteByObjectFull,
      ...attrs.replaceRouteComp?.value,
    });
    if (method != "get") {
      data.value = formstate;
    }
    if (attrs["isValidateApi"] || attrs["isValidate"]) {
      validateApi[1].value = {};
      // console.log(data.value);
      const result = await $v.value.$validate();
      console.log($v);
      // console.log(validateApi[1].value, $v.value);
      if (!result) {
        if (attrs["isMessageValidateError"]) {
          toast.add({
            severity: "error",
            summary: "error",
            detail: "Есть ошибки в форме!",
            life: 3000,
          });
        }
        isLoad.value = false;
        return;
      }
      // result
    }
    if (method == "get") {
      return await axios
        .get(newRoute, {
          params: { ...formstate, ...attrs.formStateOrParamsComp?.value },
        })
        .then(onFetchFunctionThen)
        .catch(onFetchFunctionCatch);
    }
    if (method == "post") {
      return await axios
        .post(newRoute, { ...formstate, ...attrs.formStateOrParamsComp?.value })
        .then(onFetchFunctionThen)
        .catch(onFetchFunctionCatch);
    }
    if (method == "patch") {
      return await axios
        .patch(newRoute, {
          ...formstate,
          ...attrs.formStateOrParamsComp?.value,
        })
        .then(onFetchFunctionThen)
        .catch(onFetchFunctionCatch);
    }
    if (method == "delete") {
      return await axios
        .delete(newRoute, {
          ...formstate,
          ...attrs.formStateOrParamsComp?.value,
        })
        .then(onFetchFunctionThen)
        .catch(onFetchFunctionCatch);
    }
  };
  let usePaginationQueryBaseApi = null;
  if (Object.keys(attrs.pagination || {}).length > 0) {
    usePaginationQueryBaseApi = usePaginationQueryBase(
      fetchData,
      data,
      attrs.pagination
    );
  }
  const sortedDataAndFilter = computed(() => {
    let dataNew = data.value;
    // console.log(dataNew);
    if (attrs["sortedFunc"] && typeof dataNew == "array") {
      dataNew = dataNew.sort(attrs["sortedFunc"]);
    }
    if (attrs["filterFunc"] && typeof dataNew == "array") {
      dataNew = dataNew.filter(attrs["filterFunc"]);
    }
    return dataNew;
  });
  if (attrs?.version == "0.1") {
    return { fetchData, data, isLoadComptuded, $v, usePaginationQueryBaseApi };
  }

  return [fetchData, data, isLoadComptuded, $v, { usePaginationQueryBaseApi }];
};
const replaceRouteByObject = (str, obj) => {
  Object.entries(obj).forEach(([key, val]) => {
    const regex = new RegExp(`:${key}`);
    str = str.replace(regex, val);
    // console.log(str);
  });
  return str;
};
const replaceCompRules = (rules, validateApi) => {
  Object.entries(rules).forEach(([key, value]) => {
    if (isRef(value)) {
      value = value?.value;
    }
    if (isRef(rules[key])) {
      return;
    }
    if (key == "required") {
      rules[key] = required;
      return;
    }
    if (key == "maxLengthFunc") {
      if (Array.isArray(value)) {
        console.error(
          "maxLengthFunc rules is Array value from Querybase example {maxLengthFunc: [10,20]}"
        );
        return;
      }
      rules[key] = maxLengthFunc(value[0], value[1]);
      return;
    }
    if (key == "checkEmail") {
      rules[key] = checkEmail;
    }

    if (key == "validateApi" && typeof value == "string") {
      console.log(value);
      rules[key] = validateApi[0](value);
      return;
    }

    if (typeof value == "object") {
      rules[key] = replaceCompRules(value, validateApi);
    }
  });
  return rules;
};
