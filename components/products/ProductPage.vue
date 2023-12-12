<template>
  <div>{{ product }}</div>
</template>

<script setup>
import { useProductStore } from "./stores/product";
const storeProduct = useProductStore();
const route = useRoute();
const { data: product } = await useAsyncData(
  "product",
  async () => await storeProduct.fetchProductOne(route.params.route)
);
</script>

<style lang="scss" scoped></style>
