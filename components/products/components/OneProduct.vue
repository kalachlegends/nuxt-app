<template>
  <!-- <div class="border-1 surface-border border-round m-2 text-center py-5 px-3">
    <div class="mb-3">
      <img
        :src="
          'https://primefaces.org/cdn/primevue/images/product/' +
          data.image
        "
        :alt="slotProps.data.name"
        class="w-6 shadow-2"
      />
    </div>
    <div>
      <h4 class="mb-1">{{ slotProps.data.name }}</h4>
      <h6 class="mt-0 mb-3">${{ slotProps.data.price }}</h6>
      <Tag
        :value="slotProps.data.inventoryStatus"
        :severity="getSeverity(slotProps.data.inventoryStatus)"
      />
      <div class="mt-5 flex align-items-center justify-content-center gap-2">
        <Button icon="pi pi-search" rounded />
        <Button icon="pi pi-star-fill" rounded severity="secondary" />
      </div>
    </div>
  </div> -->
  <div class="product flex gap-2 flex-col">
    <NuxtLink :to="`/product/${item.product_meta.route}`">
      <BaseImgFluid :src="item.image.original_image_url" paddingBottom="30%" />
    </NuxtLink>
    <NuxtLink
      :to="`/product/${item.product_meta.route}`"
      class="product__title"
      >{{ item.title }}</NuxtLink
    >
    <!-- <Image /> -->
    <!-- {{ item }} -->
    <!-- <Image preview /> -->
    <!-- <div></div> -->

    <div
      class="heart"
      v-ripple
      @click.stop="storeFavite.handleAdd(item)"
      :class="{ active: storeFavite.isFavoriteHave(item.id) }"
    >
      <i class="pi pi-heart"></i>
    </div>

    <div class="product__price" v-if="item.discount <= 0">
      {{ item.price.toLocaleString("ru") }}
      <!-- {{ item.currency.code }} -->
    </div>

    <div else class="product__price" v-else>
      {{ (item.price - item.discount).toLocaleString("ru") }}
      <!-- {{ item.currency.code }} -->
      <div class="old">
        {{ item.price }}
        <!-- {{ item.currency.code }} -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { useFavoriteStore } from "~/components/favorites/stores/favorite";

const props = defineProps({
  item: Object,
});
const storeFavite = useFavoriteStore();
</script>

<style lang="scss">
@import "@/assets/scss/layout/_variables.scss";
@import "@/assets/scss/layout/_mixins.scss";
.product {
  background: white;
  padding: 2.4rem 2rem;
  position: relative;
  cursor: pointer;
  display: block;
  border-radius: $borderRadius;
  .heart {
    position: absolute;
    right: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
    border: 1px solid var(--surface-border);
    border-radius: $borderRadius;
    &.active {
      color: var(--primary-color);
    }
    .pi-heart {
      font-size: 16px;
    }
    top: 10px;
    &:hover {
      color: var(--primary-color);
    }
    padding: 10px;
  }

  img {
    border-radius: $borderRadius;
  }
  &__price {
    font-weight: bold;
    display: flex;
    align-items: center;
    //justify-content: center;
    gap: 10px;
    color: var(--surface-900);
    @include adaptiv-font(16, 14);
    font-size: 1.5rem;
    .old {
      @include adaptiv-font(14, 12);
      text-decoration: line-through;
    }
    margin-top: 1rem;
  }
  &:hover {
  }
  &__title {
    transition: all 0.3s;
    font-weight: 500;
    color: var(--surface-900);

    @include adaptiv-font(20, 16);
  }
}
</style>
