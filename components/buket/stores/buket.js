import { ref, computed, onMounted, watch } from "vue";
import { axios } from "@/axios";
import { defineStore, skipHydrate } from "pinia";
import { useRoute, useRouter } from "vue-router";

import { useLocalStorage, useStorage } from "@vueuse/core";
import { useQueryBase } from "@/hooks/query/useQueryBase";
import { useConfirm } from "@/hooks/useConfirm";
import { useToast } from "primevue/usetoast";
import { useHydration } from "nuxt/app";
import { required, maxLengthFunc, checkEmail } from "@/helper/defaultRules";

import useVuelidate from "@vuelidate/core";
import { useCityStore } from "~/components/city/stores/city";
import { useProductStore } from "~/components/products/stores/product";
export const useBuketStore = defineStore("buket", () => {
  const buketList = useLocalStorage("buketList", []);
  const isModalShow = ref(false);
  const formContact = useLocalStorage("formContact", {
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    is_register: false,
    password: "",
    city_id: "",
    street: "",
    home: "",
    flat: "",
  });

  const toast = useToast();
  const storeProduct = useProductStore();
  const isBuketHave = (virutalId) => {
    const findItem = buketList.value.find((e) => e.virutalId == virutalId);
    return findItem == undefined ? false : true;
  };
  const countbuket = computed(() => buketList.value.length);
  const totalSumBuket = computed(() =>
    buketList.value.reduce((acc, e) => {
      console.log(e);
      return acc + (e.price - e.discount) * e.quantity;
    }, 0)
  );
  const totalQuantityBuket = computed(() =>
    buketList.value.reduce((acc, e) => {
      return acc + e.quantity;
    }, 0)
  );
  const handleMinusQuantity = (item) => {
    // console.log(item)

    item.quantity > 1 ? item.quantity-- : null;
  };
  const handleAddQuantity = (item) => {
    // // console.log(item)
    if (!item.is_check_quantity) {
      item.quantity++;
      return;
    }
    let quantity =
      item.type == "product"
        ? item.product_quantity.quantity_available
        : item.quantity_available;
    if (item.quantity < quantity && item.is_check_quantity) {
      item.quantity++;
    }
  };
  const isCheckQuantity = (item) => {
    let quantity =
      item.type == "product"
        ? item.product_quantity.quantity_available
        : item.quantity_available;
    return item.quantity <= quantity && item.is_check_quantity;
  };

  const handleAdd = () => {
    let virutalId =
      storeProduct.dataOrVariantOrProduct.type == "product"
        ? storeProduct.dataOrVariantOrProduct.id
        : storeProduct.dataOrVariantOrProduct.name_variants_selected;

    toast.add({
      severity: "success",
      summary: "success",
      detail: `Вы товар добавлен в корзину '${storeProduct.dataOrVariantOrProduct.title}'`,
      life: 4000,
    });
    if (isBuketHave(virutalId)) {
      let item = buketList.value.find((e) => e.virutalId == virutalId);
      Object.entries(key).forEach(([key, val]) => {
        item[key] = storeProduct.dataOrVariantOrProduct[key];
      });
      handleAddQuantity(buketList.value.find((e) => e.virutalId == virutalId));
      return;
    }

    buketList.value.push({
      ...storeProduct.dataOrVariantOrProduct,
      product_id: storeProduct.dataOrVariantOrProduct.product_id,
      quantity: 1,
      virutalId,
      variants_selected: storeProduct.dataOrVariantOrProduct.names_option || [],
      name_variants_selected: storeProduct.dataOrVariantOrProduct.name,
      parent_id: storeProduct.dataOrVariantOrProduct.id,
    });
  };
  const {
    fetchData: createOrder,
    $v: $vFormContact,
    isLoad: isLoadOrderCreate,
    data: dataOrder,
  } = useQueryBase("post", "/order", formContact, {
    isValidate: true,
    isMessageError: true,
    isSetData: false,
    onSuccsess: ({ data }) => {
      console.log(isModalShow);
      isModalShow.value = true;
      buketList.value = [];
      dataOrder.value.id = data.data.id;
    },
    rulesComp: {
      first_name: { required },
      phone_number: { required, validateApi: "phone_number" },
      email: { required, checkEmail, validateApi: "email" },
      password: {
        required: computed(() =>
          formContact.value.is_register ? required : {}
        ),
      },
    },

    version: "0.1",
  });
  const storeCity = useCityStore();
  const handleOrderCreate = async () => {
    const city_name = storeCity.city.find(
      (e) => e.id == formContact.value.city_id
    )?.name;
    await createOrder(
      {},
      {
        ...formContact.value,
        city_name,
        total_sum: totalSumBuket.value,
        address: `${city_name}, ${formContact.value.street}, ${formContact.value.home}, ${formContact.value.flat}`,
        order_products: buketList.value.map((e) => {
          return {
            ...e,
            quantity: e.quantity,

            parent_id: e.id,
            product_option_value_ids: e.product_option_value_ids,
            total_sum: (e.price - e.discount) * e.quantity,
          };
        }),
      }
    );
  };
  return {
    buketList: skipHydrate(buketList),
    formContact: skipHydrate(formContact),
    countbuket,
    totalSumBuket,
    isBuketHave,
    totalQuantityBuket,
    handleMinusQuantity,
    isCheckQuantity,
    isModalShow,
    handleAddQuantity,
    handleOrderCreate,
    isLoadOrderCreate,
    handleAdd,
    $vFormContact,
    dataOrder,
  };
});
