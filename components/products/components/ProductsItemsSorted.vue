<template>
  <div class="grid grid-cols-2 sm:grid-cols-4">
    <OneProduct v-for="product in products" :key="product.id" :item="product" />
  </div>
  <!-- <div></div> -->
</template>

<script setup>
import { useProductStore } from "../stores/product";
// const storeProducts = useProductStore();
import OneProduct from "./OneProduct.vue";
import { useQueryBase } from "@/hooks/query/useQueryBase";
const { usePaginationQueryBaseApi: paginationProductsAPi } = useQueryBase(
  "get",
  "/product",
  {},
  {
    version: "0.1",
    // returnData:
    pagination: { limit: 10 },
  }
);

const { data: products } = await useAsyncData(
  "products",
  async () => await paginationProductsAPi.changePage()
);
</script>

<style lang="scss" scoped></style>
