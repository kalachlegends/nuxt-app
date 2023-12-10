<template>
  <form @onSubmit="onFinish">
    <div class="field">
      <label for="description">Описание</label>
      <InputText
        id="description"
        v-model.trim="formStateComp.description"
        required="true"
        autofocus
        :class="{ 'p-invalid': getMessageForError($vComp, 'description') }"
      />
      <small
        class="p-invalid"
        v-if="getMessageForError($vComp, 'description')"
        >{{ getMessageForError($vComp, "description") }}</small
      >
    </div>

    <div class="field">
      <label for="parent_id">Категории</label>
      <InputText
        id="parent_id"
        v-model.trim="formStateComp.parent_id"
        required="true"
        autofocus
        :class="{ 'p-invalid': getMessageForError($vComp, 'parent_id') }"
      />
      <small class="p-invalid" v-if="getMessageForError($vComp, 'parent_id')">{{
        getMessageForError($vComp, "parent_id")
      }}</small>
    </div>

    <div class="field">
      <label for="title">Название</label>
      <InputText
        id="title"
        v-model.trim="formStateComp.title"
        required="true"
        autofocus
        :class="{ 'p-invalid': getMessageForError($vComp, 'title') }"
      />
      <small class="p-invalid" v-if="getMessageForError($vComp, 'title')">{{
        getMessageForError($vComp, "title")
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
import { computed, ref } from "vue";

import { useQueryBase } from "@/hooks/query/useQueryBase";
import { useCategoryStore } from "../stores/category";
import { getMessageForError } from "@/helper/other/getMessageForError";
import { statusArhive } from "@/helper/status/defaultsStatus";
const props = defineProps({
  formState: Object,
  cancel: Function,
  mode: {
    type: String,
    default: "create",
  },
});
const emit = defineEmits(["create"]);
const formState = ref({
  description: "Описание",
  parent_id: "Категории",
  title: "Название",
});
const formStateComp = computed(() => {
  if (props.mode == "edit") {
    return props.formState;
  }
  return formState.value;
});
const openNotificationWithIcon = (type) => {};
const store = useCategoryStore();
const rules = {};
const [createCategory, data, isLoad, $v] = useQueryBase(
  "post",
  "/category",
  {},
  {
    onSuccsess: async ({ data }) => {
      // console.log(res);
      formStateComp.value = {};
      emit("create");
      store.category.push(data.data);
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

const [updateCategory, dataUpdate, isLoadUpate, $vUpdate] = useQueryBase(
  "patch",
  "/category/:id",
  {},
  {
    isLoadGetComp: isLoad,
    rulesComp: computed(() => rules),
    isValidate: true,
    isMessageSucsess: true,
    onSuccsess: async ({ data }) => {
      // console.log(res);

      emit("create");
      let category = store.category.find((e) => e.id == data.data.id);
      Object.keys(category).forEach((key) => {
        category[key] = data.data[key];
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
    await updateCategory(
      {
        id: formStateComp.value.id,
      },
      formStateComp.value
    );
    return;
  }
  await createCategory({}, formStateComp.value);
};
</script>
