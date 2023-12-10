import { ref, computed, onMounted, watch } from "vue";
import { axios } from "@/axios";
import { defineStore } from "pinia";
import { useRoute, useRouter } from "vue-router";

import { useStorage } from "@vueuse/core";
import { useQueryBase } from "@/hooks/query/useQueryBase";
import { useConfirm } from "@/hooks/useConfirm";
export const useImageStore = defineStore("image", () => {
  const [fetchImage, image, isLoadImage] = useQueryBase("get", "/image", [], {
    onFailed: () => {
      image.value = [];
    },
  });
  const confirm = useConfirm();
  const [deleteImage] = useQueryBase(
    "delete",
    "/image/:id",
    {},
    {
      onSuccsess: async ({ data }) => {
        // console.log(res);
        image.value = image.value.filter((e) => e.id !== data.data.id);
      },
      isMessageSucsess: true,
      isMessageError: true,
    }
  );

  const deleteData = async ({ id }) => {
    const result = await confirm();
    if (result) {
      await deleteImage({ id });
    }
  };
  // bind object
  const [fetchImageOne, dataOneImage, isLoadImageOne] = useQueryBase(
    "get",
    "/image/:id",
    {},
    {
      onSuccsess: async ({ data }) => {
        // console.log(res);
      },
      pagination: { limit: 10 },
      isMessageSucsess: true,
      isMessageError: true,
    }
  );
  const { usePaginationQueryBaseApi: paginationImagesApi } = useQueryBase(
    "get",
    "/image",
    {},
    {
      version: "0.1",
      pagination: { limit: 10 },
    }
  );

  return {
    image,
    deleteData,
    fetchImage,
    isLoadImage,
    fetchImageOne,
    paginationImagesApi,
    dataOneImage,
    isLoadImageOne,
  };
});
