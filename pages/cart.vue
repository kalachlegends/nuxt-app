<template>
  <div>
    <div class="card">
      <h1>Корзина</h1>
      <div class="flex gap-4 justify-between">
        <div class="flex gap-2 card-shadow flex-col flex-[1_1_70%]">
          <h4>Товары</h4>
          <div
            v-for="item in storeBuket.buketList"
            :key="item.virutalId"
            class="flex justify-between gap-4"
          >
            <div
              class="flex-[1_1_40%] font-16-to-14 font-bold flex gap-3 w-full"
            >
              <router-link
                :to="'/product/' + item.product_meta.route"
                class="flex-[1_1_20%]"
              >
                <BaseImgFluid
                  class="border-radius-img"
                  :src="item.image.original_image_url"
                />
              </router-link>
              <div class="flex-[1_1_40%]">
                {{ item.title }}
              </div>
              <div
                class="flex-[1_1_20%] font-14-to-10 color-gray-500 flex items-center"
              >
                {{ item.selectedVariants.map((e) => e.name).join(" / ") }}
              </div>
            </div>
            <div class="flex-[1_1_60%] flex gap-2 items-center">
              <Button
                icon="pi pi-minus"
                text
                @click="storeBuket.handleMinusQuantity(item)"
                raised
                rounded
                aria-label="Filter"
              />
              <div class="font-14-to-10">
                {{ item.quantity }}
              </div>
              <Button
                @click="storeBuket.handleAddQuantity(item)"
                icon="pi pi-plus"
                text
                raised
                rounded
                aria-label="Filter"
              />
            </div>
          </div>
        </div>
        <div class="flex-[1_1_30%] gap-3 flex flex-col">
          <div class="flex gap-2 card-shadow flex-col w-full">
            <h4>Итоговая сумма</h4>
            <div class="font-14-to-10 font-bold flex justify-between">
              <span>Общее количесто товаров</span>
              {{ storeBuket.totalQuantityBuket.toLocaleString("ru") }}
            </div>
            <div class="font-14-to-10 font-bold flex justify-between">
              <span>Итого</span>
              {{ storeBuket.totalSumBuket.toLocaleString("ru") }} ₸
            </div>
            <Button
              label="Заказать"
              size="large"
              @click="storeBuket.handleOrderCreate"
            />
          </div>
          <div class="flex gap-2 card-shadow flex-col w-full">
            <h4>Контактная информация</h4>
            <FormContact />
          </div>
          <div class="flex gap-2 card-shadow flex-col w-full">
            <h4>Адрес</h4>
            <FormAdress />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useBuketStore } from "~/components/buket/stores/buket";
import FormContact from "~/components/buket/components/FormContact.vue";
import FormAdress from "~/components/buket/components/FormAdress.vue";
const storeBuket = useBuketStore();
</script>

<style lang="scss"></style>
