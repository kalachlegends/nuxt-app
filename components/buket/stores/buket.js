import { ref, computed, onMounted, watch } from "vue";
import { axios } from "@/axios";
import { defineStore, skipHydrate } from "pinia";
import { useRoute, useRouter } from "vue-router";

import { useLocalStorage, useStorage } from "@vueuse/core";
import { useQueryBase } from "@/hooks/query/useQueryBase";
import { useConfirm } from "@/hooks/useConfirm";
import { useToast } from "primevue/usetoast";
import { useHydration } from "nuxt/app";
export const useBuketStore = defineStore("buket", () => {
  const buketList = useLocalStorage("buketList", []);
  const toast = useToast();
  const isBuketHave = (id) => {
    const findItem = buketList.value.find((e) => e.id == id);
    return findItem == undefined ? false : true;
  };
  const countbuket = computed(() => buketList.value.length);
  const handleAdd = (product) => {
    const { title, id } = product;
    toast.add({
      severity: "success",
      summary: "success",
      detail: `Вы товар добавлен в корзину '${title}'`,
      life: 4000,
    });
    if (isBuketHave(id)) {
      buketList.value.find((e) => e.id == id).quantity++;
      return;
    }

    buketList.value.push({ ...product, quantity: 1 });
  };
  return {
    buketList: skipHydrate(buketList),
    countbuket,
    isBuketHave,
    handleAdd,
  };
});
