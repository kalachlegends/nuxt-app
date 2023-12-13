<template>
  <form @onSubmit="onFinish">
    <div class="field">
      <label for="first_name">Имя</label>
      <InputText
        id="first_name"
        v-model.trim="storeBuket.formContact.first_name"
        required="true"
        autofocus
        :class="{
          'p-invalid': getMessageForError(
            storeBuket.$vFormContact,
            'first_name'
          ),
        }"
      />
      <small
        class="p-invalid"
        v-if="getMessageForError(storeBuket.$vFormContact, 'first_name')"
        >{{ getMessageForError(storeBuket.$vFormContact, "first_name") }}</small
      >
    </div>
    <div class="field">
      <label for="last_name">Фамилия</label>
      <InputText
        id="last_name"
        v-model.trim="storeBuket.formContact.last_name"
        required="true"
        :class="{
          'p-invalid': getMessageForError(
            storeBuket.$vFormContact,
            'last_name'
          ),
        }"
      />
      <small
        class="p-invalid"
        v-if="getMessageForError(storeBuket.$vFormContact, 'last_name')"
        >{{ getMessageForError(storeBuket.$vFormContact, "last_name") }}</small
      >
    </div>
    <div class="field">
      <label for="phone_number">Телефон</label>
      <InputMask
        id="phone_number"
        v-model.trim="storeBuket.formContact.phone_number"
        mask="+7-(999)-99-9999"
        placeholder="+7-(999)-99-9999"
        required="true"
        :class="{
          'p-invalid': getMessageForError(
            storeBuket.$vFormContact,
            'phone_number'
          ),
        }"
      />
      <small
        class="p-invalid"
        v-if="getMessageForError(storeBuket.$vFormContact, 'phone_number')"
        >{{
          getMessageForError(storeBuket.$vFormContact, "phone_number")
        }}</small
      >
    </div>
    <div class="field">
      <label for="email">Почта</label>
      <InputText
        id="email"
        v-model.trim="storeBuket.formContact.email"
        required="true"
        :class="{
          'p-invalid': getMessageForError(storeBuket.$vFormContact, 'email'),
        }"
      />
      <small
        class="p-invalid"
        v-if="getMessageForError(storeBuket.$vFormContact, 'email')"
        >{{ getMessageForError(storeBuket.$vFormContact, "email") }}</small
      >
    </div>
    <div class="field">
      <label for="email">Комментарий</label>
      <Textarea
        id="email"
        v-model.trim="storeBuket.formContact.comment"
        required="true"
        :class="{
          'p-invalid': getMessageForError(storeBuket.$vFormContact, 'comment'),
        }"
      />
      <small
        class="p-invalid"
        v-if="getMessageForError(storeBuket.$vFormContact, 'comment')"
        >{{ getMessageForError(storeBuket.$vFormContact, "comment") }}</small
      >
    </div>
  </form>
</template>
<script setup>
import Dropdown from "primevue/dropdown";
import { computed, ref } from "vue";
import { useQueryBase } from "@/hooks/query/useQueryBase";

import { getMessageForError } from "@/helper/other/getMessageForError";
import { useBuketStore } from "~/components/buket/stores/buket.js";
const emit = defineEmits(["update:formState"]);
const storeBuket = useBuketStore();
</script>
