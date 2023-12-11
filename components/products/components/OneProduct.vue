<template>
  <div class="product flex gap-2 flex-col">
    <BaseImgFluid :src="item.image.thumb_image_url" paddingBottom="30%" />
    <a class="product__title">{{ item.title }}</a>
    <!-- <Image /> -->
    <!-- <Image preview /> -->
    <!-- <div></div> -->

    <div
      class="heart"
      v-ripple
      @click="storeFavite.handleAdd(item)"
      :class="{ active: storeFavite.isFavoriteHave(item.id) }"
    >
      <i class="pi pi-heart"></i>
    </div>

    <div class="product__price">
      {{ item.price.toLocaleString("ru") }} {{ item.currency.code }}
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

    color: var(--surface-900);
    @include adaptiv-font(16, 14);
    font-size: 1.5rem;
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
