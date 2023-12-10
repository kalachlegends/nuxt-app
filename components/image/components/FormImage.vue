<template>
  <form @onSubmit="onFinish">
    <div class="field">
      <label for="image_url">Название</label>
      <InputText
        id="image_url"
        v-model.trim="formStateComp.image_url"
        required="true"
        autofocus
        :class="{ 'p-invalid': getMessageForError($vComp, 'image_url') }"
      />
      <small class="p-invalid" v-if="getMessageForError($vComp, 'image_url')">{{
        getMessageForError($vComp, "image_url")
      }}</small>
    </div>

    <div class="field">
      <label for="name">Категории</label>
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

    <div class="field">
      <label for="parent_id">Айди родителя</label>
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
      <label for="sort_order">Номер сортировки</label>
      <InputText
        id="sort_order"
        v-model.trim="formStateComp.sort_order"
        required="true"
        autofocus
        :class="{ 'p-invalid': getMessageForError($vComp, 'sort_order') }"
      />
      <small
        class="p-invalid"
        v-if="getMessageForError($vComp, 'sort_order')"
        >{{ getMessageForError($vComp, "sort_order") }}</small
      >
    </div>

    <div class="field">
      <label for="type_img">тип картинок</label>
      <InputText
        id="type_img"
        v-model.trim="formStateComp.type_img"
        required="true"
        autofocus
        :class="{ 'p-invalid': getMessageForError($vComp, 'type_img') }"
      />
      <small class="p-invalid" v-if="getMessageForError($vComp, 'type_img')">{{
        getMessageForError($vComp, "type_img")
      }}</small>
    </div>

    <div class="field">
      <label for="user_id">Юзер айди</label>
      <InputText
        id="user_id"
        v-model.trim="formStateComp.user_id"
        required="true"
        autofocus
        :class="{ 'p-invalid': getMessageForError($vComp, 'user_id') }"
      />
      <small class="p-invalid" v-if="getMessageForError($vComp, 'user_id')">{{
        getMessageForError($vComp, "user_id")
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
import { useImageStore } from "../stores/image";
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
  image_url: "Название",
  name: "Категории",
  parent_id: "Айди родителя",
  sort_order: "Номер сортировки",
  type_img: "тип картинок",
  user_id: "Юзер айди",
});
const formStateComp = computed(() => {
  if (props.mode == "edit") {
    return props.formState;
  }
  return formState.value;
});
const openNotificationWithIcon = (type) => {};
const store = useImageStore();
const rules = {};
const [createImage, data, isLoad, $v] = useQueryBase(
  "post",
  "/image",
  {},
  {
    onSuccsess: async ({ data }) => {
      // console.log(res);
      formStateComp.value = {};
      emit("create");
      store.image.push(data.data);
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

const [updateImage, dataUpdate, isLoadUpate, $vUpdate] = useQueryBase(
  "patch",
  "/image/:id",
  {},
  {
    isLoadGetComp: isLoad,
    rulesComp: computed(() => rules),
    isValidate: true,
    isMessageSucsess: true,
    onSuccsess: async ({ data }) => {
      // console.log(res);

      emit("create");
      let image = store.image.find((e) => e.id == data.data.id);
      Object.keys(image).forEach((key) => {
        image[key] = data.data[key];
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
    await updateImage(
      {
        id: formStateComp.value.id,
      },
      formStateComp.value
    );
    return;
  }
  await createImage({}, formStateComp.value);
};
</script>
