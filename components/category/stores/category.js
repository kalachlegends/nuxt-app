import { ref, computed, onMounted, watch } from "vue";
import { axios } from "@/axios";
import { defineStore } from "pinia";
import { useRoute, useRouter } from "vue-router";

import { useStorage } from "@vueuse/core";
import { useQueryBase } from "@/hooks/query/useQueryBase";
import { useConfirm } from "@/hooks/useConfirm";
export const useCategoryStore = defineStore("category", () => {
  const [fetchCategory, category, isLoadCategory] = useQueryBase(
    "get",
    "/category",
    [],
    {
      onFailed: () => {
        category.value = [];
      },
    }
  );
  const confirm = useConfirm();
  const [deleteCategory] = useQueryBase(
    "delete",
    "/category/:id",
    {},
    {
      onSuccsess: async ({ data }) => {
        // console.log(res);
        category.value = category.value.filter((e) => e.id !== data.data.id);
      },
      isMessageSucsess: true,
      isMessageError: true,
    }
  );
  const deleteData = async ({ id }) => {
    const result = await confirm();
    if (result) {
      await deleteCategory({ id });
    }
  };
  // bind object
  const [fetchCategoryOne, dataOneCategory, isLoadCategoryOne] = useQueryBase(
    "get",
    "/category/:id",
    {},
    {
      onSuccsess: async ({ data }) => {
        // console.log(res);
      },
      isMessageSucsess: true,
      isMessageError: true,
    }
  );
  return {
    category,
    deleteData,
    fetchCategory,
    isLoadCategory,
    fetchCategoryOne,
    dataOneCategory,
    isLoadCategoryOne,
  };
});
