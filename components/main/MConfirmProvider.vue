<template>
    <Dialog @hide="handleConfirm(false)" modal :header="title || 'Потвердить операцию'" v-model:visible="isModal">
        <div class="flex gap-2 w-full justify-between">
            <Button label="Ok" @click="handleConfirm(true)" size="large" />
            <Button label="Cancel" severity="danger" @click="handleConfirm(false)" size="large" />
            <!-- <btn-default @click="handleConfirm(false)" class="tw-mt-4" type="grey-fill" size="large">  </btn-default> -->
        </div>
    </Dialog>
    <slot />
</template>

<script setup>
import { ref, provide, watch } from 'vue';
const isModal = ref(false);
const title = ref('');
const checked = ref(null);
const inputString = ref(null);
const handleResolve = ref(null);
const handleCancel = ref(null);
// watch()
const handleConfirm = (bool) => {
    isModal.value = false;
    if (typeof inputString.value == 'string') {
        handleResolve.value({
            isConfirm: bool,
            value: inputString.value,
            checkedValue: checked.value
        });
    } else {
        handleResolve.value(bool);
    }
};
const show = (attrs = {}) => {
    title.value = attrs['title'];
    inputString.value = attrs['input'];
    isModal.value = true;
    return new Promise((resolve, reject) => {
        handleResolve.value = resolve;
        handleCancel.value = reject;
    });
};
provide('showConfirm', show);
</script>

<style lang="scss" scoped></style>
