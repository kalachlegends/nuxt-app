<template>
  <form @onSubmit="onFinish">
    <div class="field">
      <label for="address.city_id">Город</label>
      <Dropdown
        :options="storeCity.city"
        id="address.city_id"
        optionLabel="name"
        optionValue="id"
        v-model.trim="storeBuket.formContact.address.city_id"
        required="true"
        autofocus
        :class="{
          'p-invalid': getMessageForError(
            storeBuket.$vFormContact,
            'address.city_id'
          ),
        }"
      />
      <small
        class="p-invalid"
        v-if="getMessageForError(storeBuket.$vFormContact, 'address.city_id')"
        >{{
          getMessageForError(storeBuket.$vFormContact, "address.city_id")
        }}</small
      >
    </div>
    <div class="flex gap-2">
      <div class="field">
        <label for="address.home">Дом</label>
        <InputText
          id="address.home"
          v-model.trim="storeBuket.formContact.address.home"
          required="true"
          autofocus
          :class="{
            'p-invalid': getMessageForError(
              storeBuket.$vFormContact,
              'address.home'
            ),
          }"
        />
        <small
          class="p-invalid"
          v-if="getMessageForError(storeBuket.$vFormContact, 'address.home')"
          >{{
            getMessageForError(storeBuket.$vFormContact, "address.home")
          }}</small
        >
      </div>
      <div class="field">
        <label for="address.city_id">Квартира</label>
        <InputText
          id="address.flat"
          v-model.trim="storeBuket.formContact.address.flat"
          required="true"
          autofocus
          :class="{
            'p-invalid': getMessageForError(
              storeBuket.$vFormContact,
              'address.flat'
            ),
          }"
        />
        <small
          class="p-invalid"
          v-if="getMessageForError(storeBuket.$vFormContact, 'address.flat')"
          >{{
            getMessageForError(storeBuket.$vFormContact, "address.flat")
          }}</small
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
