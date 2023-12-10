<template>
    <ProgressBar v-if="store.isLoadImageOne" mode="indeterminate" style="height: 6px"></ProgressBar>
    <pre>
    {{ store.dataOneImage }}
</pre
    >
</template>

<script setup>
import { useImageStore } from '../image/stores/image';
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const store = useImageStore();
const router = useRouter();
const route = useRoute();
onMounted(async () => {
    await store.fetchImageOne({ id: route.params.id }, { id: route.params.id });
});
</script>

<style lang="scss" scoped></style>
