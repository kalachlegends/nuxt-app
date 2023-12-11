import { ref, computed, onMounted, watch } from "vue";
import { axios } from "@/axios";
import { defineStore } from "pinia";
import { useRoute, useRouter } from "vue-router";

import { useStorage } from "@vueuse/core";
import { useQueryBase } from "@/hooks/query/useQueryBase";
import { useConfirm } from "@/hooks/useConfirm";
import { useToast } from "primevue/usetoast";
export const useFavoriteStore = defineStore("favorite", () => {
  const favoritesList = useStorage("favoriteList", []);
  const toast = useToast();
  const isFavoriteHave = (id) => {
    const findItem = favoritesList.value.find((e) => e.id == id);
    return findItem == undefined ? false : true;
  };
  const countFavorites = computed(() => favoritesList.length);
  const handleAdd = (product) => {
    const { title, id } = product;
    if (isFavoriteHave(id)) {
      toast.add({
        severity: "success",
        summary: "success",
        detail: `Вы удалили товар избранное ${title}`,
        life: 4000,
      });
      favoritesList.value = favoritesList.value.filter((e) => e.id != id);
      return;
    }
    toast.add({
      severity: "success",
      summary: "success",
      detail: `Вы добавили товар избранное ${title}`,
      life: 4000,
    });
    favoritesList.value.push(product);
  };
  return {
    favoritesList,
    countFavorites,
    isFavoriteHave,
    handleAdd,
    countFavorites,
  };
});
