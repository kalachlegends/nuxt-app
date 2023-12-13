import { ref, computed, onMounted, watch } from "vue";
import { axios } from "@/axios";
import { defineStore } from "pinia";
import { useRoute, useRouter } from "vue-router";

import { useStorage } from "@vueuse/core";
import { useQueryBase } from "@/hooks/query/useQueryBase";
import { useConfirm } from "@/hooks/useConfirm";
export const useCityStore = defineStore("city", () => {
  const [fetchCity, city, isLoadCity] = useQueryBase("get", "city", [], {
    onFailed: () => {
      city.value = [];
    },
  });
  const confirm = useConfirm();
  const [deleteCity] = useQueryBase(
    "delete",
    "city/:id",
    {},
    {
      onSuccsess: async ({ data }) => {
        // console.log(res);
        city.value = city.value.filter((e) => e.id !== data.data.id);
      },
      isMessageSucsess: true,
      isMessageError: true,
    }
  );
  const deleteData = async ({ id }) => {
    const result = await confirm();
    if (result) {
      await deleteCity({ id });
    }
  };
  // bind object
  const [fetchCityOne, dataOneCity, isLoadCityOne] = useQueryBase(
    "get",
    "city/:id",
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
    city,
    deleteData,
    fetchCity,
    isLoadCity,
    fetchCityOne,
    dataOneCity,
    isLoadCityOne,
  };
});
