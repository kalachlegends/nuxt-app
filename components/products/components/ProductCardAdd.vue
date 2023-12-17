<template>
  <div class="product-card-add">
    <!-- {{ storeProduct.dataOrVariantOrProduct }} -->
    <!-- {{ storeProduct.dataOrVariantOrProduct }} -->
    <div
      class="text-green-500 text-xl"
      v-if="
        storeProduct.dataOrVariantOrProduct.quantity_available >= 1 ||
        !storeProduct.dataOrVariantOrProduct.is_check_quantity
      "
    >
      Есть в наличии
    </div>
    <div class="text-red-500" v-else>Нету в наличии</div>
    <div
      class="product-card-add__price"
      v-if="storeProduct.dataOneProduct.discount <= 0"
    >
      {{ storeProduct.dataOrVariantOrProduct.price.toLocaleString("ru") }}
      {{ storeProduct.dataOneProduct.currency.code }}
    </div>

    <div else class="product-card-add__price" v-else>
      {{
        (
          storeProduct.dataOrVariantOrProduct.price -
          storeProduct.dataOneProduct.discount
        ).toLocaleString("ru")
      }}
      {{ storeProduct.dataOneProduct.currency.code }}
      <div class="old">
        {{ storeProduct.dataOrVariantOrProduct.price }}
        {{ storeProduct.dataOneProduct.currency.code }}
      </div>
    </div>
    <div
      class="mb-2"
      v-if="
        storeProduct.dataOrVariantOrProduct.quantity_available >= 1 &&
        storeProduct.dataOrVariantOrProduct.is_check_quantity
      "
    >
      Оставшейся количество:
      {{ storeProduct.dataOrVariantOrProduct.quantity_available }}
    </div>

    <Button
      @click="buket.handleAdd(storeProduct.dataOrVariantOrProduct)"
      label="Добавить в корзину"
      raised
      :disabled="
        storeProduct.dataOrVariantOrProduct.quantity_available <= 0 &&
        storeProduct.dataOrVariantOrProduct.is_check_quantity
      "
      icon="pi pi-cart-plus"
    />
  </div>
</template>

<script setup>
import { useProductStore } from "@/components/products/stores/product";
const storeProduct = useProductStore();
import { useBuketStore } from "~/components/buket/stores/buket";
const buket = useBuketStore();
</script>

<style lang="scss">
@import "@/assets/scss/layout/_variables.scss";
@import "@/assets/scss/layout/_mixins.scss";
.product-card-add {
  border-radius: $borderRadius;
  padding: 2rem;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
  &__price {
    display: flex;
    gap: 10px;
    align-items: center;
    .old {
      text-decoration: line-through;
      @include adaptiv-font(16, 14);
    }
    font-weight: bold;
    color: var(--primary-color);
    color: var(--surface-900);
    @include adaptiv-font(18, 14);
  }
}
</style>
