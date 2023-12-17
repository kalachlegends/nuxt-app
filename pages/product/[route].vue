<template>
  <div class="product-page">
    <h1>{{ product.title }}</h1>
    <div class="flex card gap-3 flex-col md:flex-row">
      <div class="flex-[1_1_40%] h-1/2">
        <Galleria
          :value="product.product_images"
          :showItemNavigators="true"
          :responsiveOptions="responsiveOptions"
          :numVisible="5"
        >
          <template #item="slotProps">
            <BaseImgFluid
              :src="slotProps.item.image.original_image_url"
              :alt="slotProps.item.image.name"
              padBottom="60%"
            />
          </template>
          <template #thumbnail="slotProps">
            <img
              height="100"
              width="100"
              :src="slotProps.item.image.thumb_image_url"
              :alt="slotProps.item.image.name"
            />
          </template>
        </Galleria>

        <h2>Описание</h2>
        <div v-html="product.description"></div>
      </div>
      <div
        class="flex-[1_1_60%] flex justify-between px-0 md:px-10 md:flex-row flex-col"
      >
        <div>
          <ProductVariants :item="product" />
          <!-- <div>{{ product.price }} {{ product.currency.code }}</div> -->
        </div>
        <div>
          <ProductCardAdd />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// import Image from "nuxt-primevue/Image";
import ProductCardAdd from "~/components/products/components/ProductCardAdd.vue";
import ProductVariants from "~/components/products/components/ProductVariants.vue";
import { useProductStore } from "@/components/products/stores/product";
const storeProduct = useProductStore();
const route = useRoute();

const { data: product } = await useAsyncData("product", () =>
  storeProduct.fetchProductOne({ id: route.params.route })
);
onMounted(() => {
  product.value.product_images = [
    { image: product.value.image },
    ...product.value.product_images,
  ];
});
</script>

<style lang="scss">
@import "@/assets/scss/layout/_variables.scss";
@import "@/assets/scss/layout/_mixins.scss";
.product-page {
  border-radius: $borderRadius;
}
</style>
