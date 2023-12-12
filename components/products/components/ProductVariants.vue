<template>
  <div class="product-info-and-add">
    <div class="product-info-and-add__options font-bold">
      <div
        class="product-info-and-add__option"
        v-for="product_option in storeProduct.dataOneProduct.product_options"
        :class="{ active: product_option.selected }"
        :key="product_option.id"
      >
        <div class="product-info-and-add__option-title">
          {{ product_option.name }}
        </div>
        <div class="product-info-and-add__variants">
          <div
            v-ripple
            class="product-info-and-add__variant"
            v-for="item in product_option.product_variants"
            :key="item.id"
            @click="() => handleSelect(item, product_option.product_variants)"
            :class="{ active: item.selected }"
          >
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  item: Object,
});
import { useProductStore } from "@/components/products/stores/product";

const storeProduct = useProductStore();

const isProductOptions = computed(() => props.item.product_options.length > 0);
const handleSelect = (item, product_variants) => {
  console.log(item, product_variants);
  product_variants.forEach((element) => (element.selected = false));
  item.selected = true;
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/layout/_variables.scss";
@import "@/assets/scss/layout/_mixins.scss";
.product-info-and-add {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  &__price {
    @include adaptiv-font(18, 16);
    font-weight: bold;
    color: var(--surface-900);
  }

  &__options {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    flex-direction: column;
  }
  &__option {
    display: flex;

    flex-direction: column;
  }
  &__option-title {
    font-weight: bold;

    @include adaptiv-font(17, 15);
  }
  &__variants {
    display: flex;
    gap: 10px;
  }
  &__variant {
    cursor: pointer;
    border: 1px solid var(--surface-border);
    border-radius: $borderRadius;
    padding: 1.1rem;
    &:hover {
      border: 1px solid var(--primary-color);
    }
    &.active {
      border: 1px solid var(--primary-color);
    }
  }
}
</style>
