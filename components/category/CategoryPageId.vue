<template>
    <ProgressBar v-if="store.isLoadCategoryOne" mode="indeterminate" style="height: 6px"></ProgressBar>
    <pre>
    {{ store.dataOneCategory }}
</pre
    >
</template>

<script setup>
import { useCategoryStore } from '../category/stores/category';
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const store = useCategoryStore();
const router = useRouter();
const route = useRoute();
onMounted(async () => {
    await store.fetchCategoryOne({ id: route.params.id }, { id: route.params.id });
});
</script>

<style lang="scss" scoped></style>
