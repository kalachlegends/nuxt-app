<template>
  <MainMConfirmProvider>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </MainMConfirmProvider>
</template>
<script setup>
import MainMConfirmProvider from "@/components/main/MConfirmProvider.vue";
// import { MainMConfirmProvider } from "#build/components"
</script>

<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
