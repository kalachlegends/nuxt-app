<template>
  <div>
    <h2 class="text-3xl font-bold">Последние поступления</h2>
    <ProductsItemsSorted />
    <!-- <Button /> -->
  </div>
  <!-- <h1 class="text-3xl font-bold underline">Hello worlasdasd!</h1> -->
</template>

<script setup>
import { axios, baseURL } from "~/axios";
import { onMounted } from "vue";
import ProductsItemsSorted from "~/components/products/components/ProductsItemsSorted.vue";
onMounted(() => {
  console.log(baseURL, "onMounted", axios.get("api/v1"));
});
</script>

<style lang="scss" scoped></style>
