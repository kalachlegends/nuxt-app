<template>
<ProgressBar v-if="store.isLoadCountryOne" mode="indeterminate" style="height: 6px"></ProgressBar>
<pre>
    {{ store.dataOneCountry }}
</pre>
</template>

<script setup>
import { useCountryStore } from '../country/stores/country';
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const store = useCountryStore();
const router = useRouter();
const route = useRoute();
onMounted(async () => {
await store.fetchCountryOne({ id: route.params.id }, { id: route.params.id });
});
</script>

<style lang="scss" scoped></style>


