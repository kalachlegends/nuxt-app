<template>
  <form @onSubmit="onFinish">
    <div class="field">
      <label for="code">Код $</label>
      <InputText
        id="code"
        v-model.trim="formStateComp.code"
        required="true"
        autofocus
        :class="{ 'p-invalid': getMessageForError($vComp, 'code') }"
      />
      <small class="p-invalid" v-if="getMessageForError($vComp, 'code')">{{
        getMessageForError($vComp, "code")
      }}</small>
    </div>

    <div class="field">
      <label for="country_id">Страна</label>
      <Dropdown
        v-model="formStateComp.country_id"
        optionLabel="name"
        optionValue="id"
        :options="storeCountry.country"
        placeholder="Выберите"
        class="w-full"
        :class="{ 'p-invalid': getMessageForError($vComp, 'country_id') }"
      />

      <small
        class="p-invalid"
        v-if="getMessageForError($vComp, 'country_id')"
        >{{ getMessageForError($vComp, "country_id") }}</small
      >
    </div>

    <div class="field">
      <label for="name">Название валюты</label>
      <InputText
        id="name"
        v-model.trim="formStateComp.name"
        required="true"
        autofocus
        :class="{ 'p-invalid': getMessageForError($vComp, 'name') }"
      />
      <small class="p-invalid" v-if="getMessageForError($vComp, 'name')">{{
        getMessageForError($vComp, "name")
      }}</small>
    </div>

    <div class="flex">
      <Button
        @click="cancel"
        label="Закрыть"
        icon="pi pi-times"
        class="p-button-text"
      />
      <Button
        type="submit"
        :loading="props.mode == 'edit' ? isLoadUpate : isLoad"
        label="Сохранить"
        icon="pi pi-check"
        class="p-button-text"
        @click="onFinish"
      />
    </div>
  </form>
</template>
<script setup>
import Dropdown from "primevue/dropdown";
import { computed, onMounted, ref } from "vue";

import { useQueryBase } from "@/hooks/query/useQueryBase";
import { useCurrencyStore } from "../stores/currency";
import { getMessageForError } from "@/helper/other/getMessageForError";
import { statusArhive } from "@/helper/status/defaultsStatus";
import { useCountryStore } from "@/components/country/stores/country";
const props = defineProps({
  formState: Object,
  cancel: Function,
  mode: {
    type: String,
    default: "create",
  },
});
const emit = defineEmits(["create"]);
const storeCountry = useCountryStore();
const formState = ref({ code: "", country_id: "", name: "" });
const formStateComp = computed(() => {
  if (props.mode == "edit") {
    return props.formState;
  }
  return formState.value;
});
onMounted(async () => {
  await storeCountry.fetchCountry();
});
const openNotificationWithIcon = (type) => {};
const store = useCurrencyStore();
const rules = {
  code: { required: true, validateApi: "code" },
  country_id: { required: true, validateApi: "country_id" },
  name: { required: true, validateApi: "name" },
};
const [createCurrency, data, isLoad, $v] = useQueryBase(
  "post",
  "/currency",
  {},
  {
    onSuccsess: async ({ data }) => {
      // console.log(res);
      formStateComp.value = {};
      emit("create");
      store.currency.push(data.data);
      Object.keys(formStateComp.value).forEach((key) => {
        formStateComp.value[key] = null;
      });
    },
    isValidate: true,
    isMessageSucsess: true,

    rulesComp: computed(() => rules),
    isMessageError: true,
  }
);

const [updateCurrency, dataUpdate, isLoadUpate, $vUpdate] = useQueryBase(
  "patch",
  "/currency/:id",
  {},
  {
    isLoadGetComp: isLoad,
    rulesComp: computed(() => rules),
    isValidate: true,
    isMessageSucsess: true,
    onSuccsess: async ({ data }) => {
      // console.log(res);

      emit("create");
      let currency = store.currency.find((e) => e.id == data.data.id);
      Object.keys(currency).forEach((key) => {
        currency[key] = data.data[key];
      });
    },
    isMessageError: true,
  }
);

const $vComp = computed(() => {
  if (props.mode == "edit") {
    return $vUpdate.value;
  }
  return $v.value;
});
const onFinish = async (e) => {
  console.log(formStateComp.value);
  if (props.mode == "edit") {
    await updateCurrency(
      {
        id: formStateComp.value.id,
      },
      formStateComp.value
    );
    return;
  }
  await createCurrency({}, formStateComp.value);
};
</script>
