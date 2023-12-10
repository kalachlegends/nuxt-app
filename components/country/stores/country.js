import { ref, computed, onMounted, watch } from "vue";
import { axios } from "@/axios";
import { defineStore } from "pinia";
import { useRoute, useRouter } from "vue-router";

import { useStorage } from "@vueuse/core";
import { useQueryBase } from "@/hooks/query/useQueryBase";
import { useConfirm } from "@/hooks/useConfirm";
export const useCountryStore = defineStore("country", () => {
  const [fetchCountry, country, isLoadCountry] = useQueryBase(
    "get",
    "/country",
    [],
    {
      onFailed: () => {
        country.value = [];
      },
    }
  );
  const confirm = useConfirm();
  const [deleteCountry] = useQueryBase(
    "delete",
    "/country/:id",
    {},
    {
      onSuccsess: async ({ data }) => {
        // console.log(res);
        country.value = country.value.filter((e) => e.id !== data.data.id);
      },
      isMessageSucsess: true,
      isMessageError: true,
    }
  );
  const deleteData = async ({ id }) => {
    const result = await confirm();
    if (result) {
      await deleteCountry({ id });
    }
  };
  // bind object
  const [fetchCountryOne, dataOneCountry, isLoadCountryOne] = useQueryBase(
    "get",
    "/country/:id",
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
    country,
    deleteData,
    fetchCountry,
    isLoadCountry,
    fetchCountryOne,
    dataOneCountry,
    isLoadCountryOne,
  };
});
