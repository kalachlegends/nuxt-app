<template>
<ProgressBar v-if="store.isLoadCityOne" mode="indeterminate" style="height: 6px"></ProgressBar>
<pre>
    {{ store.dataOneCity }}
</pre>
</template>

<script setup>
import { useCityStore } from '../city/stores/city';
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const store = useCityStore();
const router = useRouter();
const route = useRoute();
onMounted(async () => {
await store.fetchCityOne({ id: route.params.id }, { id: route.params.id });
});
</script>

<style lang="scss" scoped></style>


