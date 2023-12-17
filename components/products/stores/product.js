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
    "/product/:id?route=true",
    {},
    {
      onSuccsess: async ({ data }) => {
        // console.log(res);

        dataOneProduct.value.product_options.forEach((element) => {
          element = element.product_option_value[0];
          if (element) {
            element.selected = true;
          }
        });
      },
      returnData: true,

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
  const getSelectedOptionValues = computed(() => {
    return dataOneProduct.value?.product_options
      .reduce((acc, e) => {
        return [...e.product_option_value, ...acc];
      }, [])
      .filter((e) => e.selected);
  });
  const getVariantSelected = computed(() => {
    if (
      getSelectedOptionValues.value.length ==
      dataOneProduct.value?.product_options.length
    ) {
      console.log(getSelectedOptionValues.value.length);
      let idName = getSelectedOptionValues.value
        ?.reverse()
        .map((e) => e.name)
        .join();
      const findItem = dataOneProduct.value.product_variants.find(
        (e) => e.name == idName
      );
      return findItem;
    }
  });
  const dataOrVariantOrProduct = computed(() => {
    if (getVariantSelected.value) {
      console.log(dataOneProduct.value);
      return {
        ...getVariantSelected.value,
        title: dataOneProduct.value.title,
        is_check_quantity: dataOneProduct.value.is_check_quantity,
        product_id: dataOneProduct.value.id,

        type: "product_variant",
        ...dataOneProduct.value,
        id: getVariantSelected.value,
      };
    }
    return {
      ...dataOneProduct.value,
      product_id: dataOneProduct.value.id,
      ...dataOneProduct.value.product_quantity,
      type: "product",
    };
  });
  return {
    products,
    fetchProduct,
    getVariantSelected,
    getSelectedOptionValues,
    isLoadProduct,
    fetchProductOne,
    dataOneProduct,
    isLoadProductOne,
    dataOrVariantOrProduct,
    paginationProductsAPi,
  };
});
