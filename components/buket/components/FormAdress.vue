<template>
  <form @onSubmit="onFinish">
    <div class="flex gap-2">
      <div class="field w-full">
        <label for="city_id">Город</label>
        <Dropdown
          class="w-full"
          :options="storeCity.city"
          id="city_id"
          optionLabel="name"
          optionValue="id"
          v-model.trim="storeBuket.formContact.city_id"
          required="true"
          autofocus
          :class="{
            'p-invalid': getMessageForError(
              storeBuket.$vFormContact,
              'city_id'
            ),
          }"
        />
        <small
          class="p-invalid"
          v-if="getMessageForError(storeBuket.$vFormContact, 'city_id')"
          >{{ getMessageForError(storeBuket.$vFormContact, "city_id") }}</small
        >
      </div>
      <div class="field w-full">
        <label for="street">Улица</label>
        <InputText
          id="street"
          class="w-full"
          v-model.trim="storeBuket.formContact.street"
          required="true"
          autofocus
          :class="{
            'p-invalid': getMessageForError(storeBuket.$vFormContact, 'street'),
          }"
        />
        <small
          class="p-invalid"
          v-if="getMessageForError(storeBuket.$vFormContact, 'street')"
          >{{ getMessageForError(storeBuket.$vFormContact, "street") }}</small
        >
      </div>
    </div>
    <div class="flex gap-2">
      <div class="field">
        <label for="home">Дом</label>
        <InputText
          id="home"
          v-model.trim="storeBuket.formContact.home"
          required="true"
          autofocus
          :class="{
            'p-invalid': getMessageForError(storeBuket.$vFormContact, 'home'),
          }"
        />
        <small
          class="p-invalid"
          v-if="getMessageForError(storeBuket.$vFormContact, 'home')"
          >{{ getMessageForError(storeBuket.$vFormContact, "home") }}</small
        >
      </div>
      <div class="field">
        <label for="city_id">Квартира</label>
        <InputText
          id="flat"
          v-model.trim="storeBuket.formContact.flat"
          required="true"
          autofocus
          :class="{
            'p-invalid': getMessageForError(storeBuket.$vFormContact, 'flat'),
          }"
        />
        <small
          class="p-invalid"
          v-if="getMessageForError(storeBuket.$vFormContact, 'flat')"
          >{{ getMessageForError(storeBuket.$vFormContact, "flat") }}</small
        >
      </div>
    </div>
  </form>
</template>
<script setup>
import Dropdown from "primevue/dropdown";
import { computed, ref } from "vue";
import { useQueryBase } from "@/hooks/query/useQueryBase";
import { useCityStore } from "@/components/city/stores/city";
import { useCountryStore } from "~/components/country/stores/country";
import { getMessageForError } from "@/helper/other/getMessageForError";
import { useBuketStore } from "~/components/buket/stores/buket.js";
const emit = defineEmits(["update:formState"]);
const storeBuket = useBuketStore();
const storeCity = useCityStore();
// const storeCountry = useCountryStore();
onMounted(async () => {
  await storeCity.fetchCity();
});
</script>
