<template>
<ProgressBar v-if="store.isLoadCurrencyOne" mode="indeterminate" style="height: 6px"></ProgressBar>
<pre>
    {{ store.dataOneCurrency }}
</pre>
</template>

<script setup>
import { useCurrencyStore } from '../currency/stores/currency';
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const store = useCurrencyStore();
const router = useRouter();
const route = useRoute();
onMounted(async () => {
await store.fetchCurrencyOne({ id: route.params.id }, { id: route.params.id });
});
</script>

<style lang="scss" scoped></style>


