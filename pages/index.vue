<template>
  <h1 class="text-3xl font-bold underline">Hello world!</h1>
</template>

<script setup>
import { axios, baseURL } from "@/axios/axios";
import { onMounted } from "vue";
onMounted(() => {
  console.log(baseURL, "onMounted", axios.get("api/v1"));
});
</script>

<style lang="scss" scoped></style>
