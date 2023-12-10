import { ref, computed, onMounted, watch } from "vue";
import { axios } from "@/axios";
import { defineStore } from "pinia";
import { useRoute, useRouter } from "vue-router";

import { useStorage } from "@vueuse/core";
import { useQueryBase } from "@/hooks/query/useQueryBase";
import { useConfirm } from "@/hooks/useConfirm";
export const useCurrencyStore = defineStore("currency", () => {
  const [fetchCurrency, currency, isLoadCurrency] = useQueryBase(
    "get",
    "/currency",
    [],
    {
      onFailed: () => {
        currency.value = [];
      },
    }
  );
  const confirm = useConfirm();
  const [deleteCurrency] = useQueryBase(
    "delete",
    "/currency/:id",
    {},
    {
      onSuccsess: async ({ data }) => {
        // console.log(res);
        currency.value = currency.value.filter((e) => e.id !== data.data.id);
      },
      isMessageSucsess: true,
      isMessageError: true,
    }
  );
  const deleteData = async ({ id }) => {
    const result = await confirm();
    if (result) {
      await deleteCurrency({ id });
    }
  };
  // bind object
  const [fetchCurrencyOne, dataOneCurrency, isLoadCurrencyOne] = useQueryBase(
    "get",
    "/currency/:id",
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
    currency,
    deleteData,
    fetchCurrency,
    isLoadCurrency,
    fetchCurrencyOne,
    dataOneCurrency,
    isLoadCurrencyOne,
  };
});
