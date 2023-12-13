<template>
<form @onSubmit="onFinish">

    
<div class="field">
  <label for="country_id"></label>
  <InputText id="country_id" v-model.trim="formStateComp.country_id" required="true" autofocus :class="{ 'p-invalid': getMessageForError($vComp, 'country_id') }" />
  <small class="p-invalid" v-if="getMessageForError($vComp, 'country_id')">{{ getMessageForError($vComp, 'country_id') }}</small>
</div>


<div class="field">
  <label for="description"></label>
  <InputText id="description" v-model.trim="formStateComp.description" required="true" autofocus :class="{ 'p-invalid': getMessageForError($vComp, 'description') }" />
  <small class="p-invalid" v-if="getMessageForError($vComp, 'description')">{{ getMessageForError($vComp, 'description') }}</small>
</div>


<div class="field">
  <label for="name"></label>
  <InputText id="name" v-model.trim="formStateComp.name" required="true" autofocus :class="{ 'p-invalid': getMessageForError($vComp, 'name') }" />
  <small class="p-invalid" v-if="getMessageForError($vComp, 'name')">{{ getMessageForError($vComp, 'name') }}</small>
</div>



  <div class="flex">
  <Button @click="cancel" label="Закрыть" icon="pi pi-times" class="p-button-text" />
  <Button type="submit" :loading="props.mode == 'edit' ? isLoadUpate : isLoad " label="Сохранить" icon="pi pi-check" class="p-button-text" @click="onFinish" />
</div>
  </form>
</template>
<script setup>
import Dropdown from 'primevue/dropdown';
import { computed, ref } from 'vue';

import { useQueryBase } from '@/hooks/query/useQueryBase';
import { useCityStore } from '../stores/city';
import { getMessageForError } from '@/helper/other/getMessageForError';
import { statusArhive } from '@/helper/status/defaultsStatus';
const props = defineProps({
  formState: Object,
  cancel: Function,
  mode: {
      type: String,
      default: 'create'
  }
});
const emit = defineEmits(['create']);
const formState = ref({"country_id":"страна","description":"Описание","name":"Имя"});
const formStateComp = computed(() => {
if (props.mode == 'edit') {
    return props.formState;
}
return formState.value;
});
const openNotificationWithIcon = (type) => {};
const store = useCityStore();
const rules = {

};
const [createCity, data, isLoad, $v] = useQueryBase(
'post',
'/admin/city',
{},
{
    onSuccsess: async ({ data }) => {
        // console.log(res);
        formStateComp.value = {};
        emit('create');
        store.city.push(data.data);
        Object.keys(formStateComp.value).forEach((key) => {
          formStateComp.value[key] = null;
        });

    },
    isValidate: true,
    isMessageSucsess: true,

    rulesComp: computed(() => rules),
    isMessageError: true
}
);

const [updateCity, dataUpdate, isLoadUpate, $vUpdate] = useQueryBase(
'patch',
'/admin/city/:id',
{},
{
    isLoadGetComp: isLoad,
    rulesComp: computed(() => rules),
    isValidate: true,
    isMessageSucsess: true,
    onSuccsess: async ({ data }) => {
        // console.log(res);

        emit('create');
        let city = store.city.find((e) => e.id == data.data.id);
        Object.keys(city).forEach((key) => {
          city[key] = data.data[key];
        });
    },
    isMessageError: true
}
);

const $vComp = computed(() => {
if (props.mode == 'edit') {
    return $vUpdate.value;
}
return $v.value;
});
const onFinish = async (e) => {
console.log(formStateComp.value);
if (props.mode == 'edit') {
    await updateCity(
        {
            id: formStateComp.value.id
        },
        formStateComp.value
    );
    return;
}
await createCity({}, formStateComp.value);
};
</script>

