import { ref, computed, onMounted, watch } from "vue";
// categoriesPro;
import { axios } from "@/axios";
import { defineStore } from "pinia";
import { useRoute, useRouter } from "vue-router";

import { useStorage } from "@vueuse/core";
import { useQueryBase } from "@/hooks/query/useQueryBase";
export const useProductStore = defineStore("Product", () => {
  const [fetchProduct, products, isLoadProduct] = useQueryBase(
    "get",
    "/product",
    [],
    {
      onFailed: () => {
        products.value = [];
      },
    }
  );

  // bind object
  const [fetchProductOne, dataOneProduct, isLoadProductOne] = useQueryBase(
    "get",
    "/product/:id",
    {},
    {
      onSuccsess: async ({ data }) => {
        // console.log(res);
      },
      isMessageSucsess: true,
      isMessageError: true,
    }
  );
  const { usePaginationQueryBaseApi: paginationProductsAPi } = useQueryBase(
    "get",
    "/products",
    {},
    {
      version: "0.1",
      pagination: { limit: 10 },
    }
  );

  return {
    products,
    fetchProduct,
    isLoadProduct,
    fetchProductOne,
    dataOneProduct,
    isLoadProductOne,
    paginationProductsAPi,
  };
});
