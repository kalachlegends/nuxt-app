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
export const useBuketStore = defineStore("buket", () => {
  const buketList = useLocalStorage("buketList", []);
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
    // console.log(item)
    if (!item.is_check_quantity) {
      item.quantity++;
      return;
    }
    if (
      item.quantity <= item.product_quantity.quantity_available &&
      item.is_check_quantity
    ) {
      item.quantity++;
    }
  };
  const isCheckQuantity = (item) => {
    return (
      item.quantity <= item.product_quantity.quantity_available &&
      item.is_check_quantity
    );
  };
  const handleAdd = (product) => {
    const { title, id, product_options } = product;
    let virutalId = product.id;

    const selectedVariants = product_options
      .reduce((acc, e) => {
        console.log(e, "e");
        return [...e.product_variants, ...acc];
      }, [])
      .filter((e) => e.selected);
    virutalId = virutalId + selectedVariants.map((e) => e.id).join();

    toast.add({
      severity: "success",
      summary: "success",
      detail: `Вы товар добавлен в корзину '${title}'`,
      life: 4000,
    });
    if (isBuketHave(virutalId)) {
      handleAddQuantity(buketList.value.find((e) => e.virutalId == virutalId));
      return;
    }

    buketList.value.push({
      ...product,
      quantity: 1,
      virutalId,
      product_variants_ids: selectedVariants.map((e) => e.id),
      selectedVariants,
    });
  };
  const {
    fetchData: createOrder,
    $v: $vFormContact,
    isLoad: isLoadOrderCreate,
  } = useQueryBase("post", "/order", formContact, {
    isValidate: true,
    isMessageError: true,
    isSetData: false,
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
            quantity: e.quantity,
            product_id: e.id,
            product_variants_ids: e.product_variants_ids,
            total_sum: (e.price - e.discount) * e.quantity,
            variants_selected: e.selectedVariants.map((e) => e.name).join(),
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
    handleAddQuantity,
    handleOrderCreate,
    isLoadOrderCreate,
    handleAdd,
    $vFormContact,
  };
});
