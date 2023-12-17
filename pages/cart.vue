<template>
  <div>
    <div class="card">
      <h1>Корзина</h1>
      <div class="flex gap-4 justify-between flex-col md:flex-row">
        <div class="flex gap-2 card-shadow flex-col flex-[1_1_70%]">
          <h4>Товары</h4>
          <h5 v-if="storeBuket.buketList.length == 0">
            Ваша корзина пуста начните покупки!
          </h5>
          <div
            v-for="(item, index) in storeBuket.buketList"
            :key="item.virutalId"
            class="flex justify-between gap-4"
          >
            <div
              class="flex-[1_1_40%] font-16-to-14 font-bold flex gap-3 w-full md:flex-row flex-col"
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
              <router-link
                :to="'/product/' + item.product_meta.route"
                class="flex-[1_1_40%]"
              >
                {{ item.title }}
              </router-link>
              <div
                class="flex-[1_1_20%] font-14-to-10 text-gray-400 flex items-center"
              >
                {{ item.variants_selected.map((e) => e).join(" / ") }}
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
            <div class="font-14-to-10 font-bold">
              {{ (item.price - item.discount) * item.quantity }}
              {{ item.currency.code }}
            </div>
            <div
              @click="storeBuket.buketList.splice(index, 1)"
              class="font-16-to-14 font-bold cursor-pointer"
            >
              <i class="pi pi-trash font-16-to-14"></i>
            </div>
          </div>
        </div>
        <div class="flex-[1_1_30%] gap-3 flex flex-col disabled">
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
              :disabled="storeBuket.buketList.length < 0"
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
      <div></div>
    </div>
  </div>
  <Dialog
    header="Ваш заказ успешно оформлен"
    v-model:visible="storeBuket.isModalShow"
    modal
  >
    <div>
      Айди заказа:
      <div class="font-bold">{{ storeBuket.dataOrder.id }}</div>
    </div>
  </Dialog>
</template>

<script setup>
import { useBuketStore } from "~/components/buket/stores/buket";
import FormContact from "~/components/buket/components/FormContact.vue";
import FormAdress from "~/components/buket/components/FormAdress.vue";
const storeBuket = useBuketStore();
</script>

<style lang="scss"></style>
