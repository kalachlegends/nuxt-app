<template>
  <div>
    <div class="card">
      <h1>Корзина</h1>
      <div class="flex gap-2 card-shadow flex-col">
        <div
          v-for="item in storeBuket.buketList"
          :key="item.id"
          class="flex justify-between"
        >
          <div class="flex-[1_1_20%] font-16-to-14 font-bold flex gap-3 w-full">
            <div class="w-full">
              <BaseImgFluid
                class="border-radius-img"
                :src="item.image.original_image_url"
              />
            </div>
            {{ item.title }}
          </div>
          <div v class="flex-[1_1_70%]"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useBuketStore } from "~/components/buket/stores/buket";
const storeBuket = useBuketStore();
</script>

<style lang="scss"></style>
