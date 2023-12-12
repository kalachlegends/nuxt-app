<script setup>
// import axios from "axios";
import { ref, computed, onMounted, onBeforeUnmount } from "vue";

import { useRouter } from "vue-router";
import { useCategoryStore } from "~/components/category/stores/category";
const category = useCategoryStore();
const outsideClickListener = ref(null);
const topbarMenuActive = ref(false);
import { useBuketStore } from "~/components/buket/stores/buket";
import { useFavoriteStore } from "~/components/favorites/stores/favorite";
const buket = useBuketStore();
const favorite = useFavoriteStore();
const router = useRouter();
const { data: categories } = await useAsyncData("categories", () =>
  category.fetchCategory()
);

onMounted(async () => {
  // const result = await category.fetchCategory();
  // console.log(result);
  bindOutsideClickListener();
});

onBeforeUnmount(() => {
  unbindOutsideClickListener();
});

const onTopBarMenuButton = () => {
  topbarMenuActive.value = !topbarMenuActive.value;
};
// const onSettingsClick = () => {
//     topbarMenuActive.value = false;
//     router.push('/documentation');
// };

const topbarMenuClasses = computed(() => {
  return {
    "layout-topbar-menu-mobile-active": topbarMenuActive.value,
  };
});

const bindOutsideClickListener = () => {
  if (!outsideClickListener.value) {
    outsideClickListener.value = (event) => {
      if (isOutsideClicked(event)) {
        topbarMenuActive.value = false;
      }
    };
    document.addEventListener("click", outsideClickListener.value);
  }
};
const unbindOutsideClickListener = () => {
  if (outsideClickListener.value) {
    document.removeEventListener("click", outsideClickListener);
    outsideClickListener.value = null;
  }
};
const isOutsideClicked = (event) => {
  if (!topbarMenuActive.value) return;

  const sidebarEl = document.querySelector(".layout-topbar-menu");
  const topbarEl = document.querySelector(".layout-topbar-menu-button");

  return !(
    sidebarEl.isSameNode(event.target) ||
    sidebarEl.contains(event.target) ||
    topbarEl.isSameNode(event.target) ||
    topbarEl.contains(event.target)
  );
};
</script>

<template>
  <div>
    <div class="layout-topbar">
      <router-link to="/" class="layout-topbar-logo">
        <span>Shoes shop</span>
      </router-link>
      <!-- 
    <button
      class="p-link layout-menu-button layout-topbar-button"
      @click="onMenuToggle()"
    >
      <i class="pi pi-bars"></i>
    </button> -->
      <div>
        <button
          v-for="category in categories"
          :key="category.id"
          class="p-link layout-menu-button"
        >
          {{ category.title }}
        </button>
      </div>

      <!-- <button class="p-link layout-topbar-menu-button layout-topbar-button">
      <i class="pi pi-ellipsis-v"></i>
    </button> -->
      {{ buket.countbuket }}
      <div class="layout-topbar-menu">
        <nuxt-link to="/cart" v-badge="buket.countbuket">
          <button class="p-link layout-topbar-button">
            <i class="pi pi-shopping-cart"></i>
            <span>Calendar</span>
          </button>
        </nuxt-link>
        <div v-badge="favorite.countFavorites">
          <button class="p-link layout-topbar-button">
            <i class="pi pi-heart"></i>
            <span>Calendar</span>
          </button>
        </div>
        <!-- <button
          @click="storeAuth.handleLogout"
          class="p-link layout-topbar-button"
        >
          <i class="pi pi-sign-out"></i>
          <span>logout</span>
        </button> -->
      </div>
    </div>
    <Toast />
    <div class="layout-main-container">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
