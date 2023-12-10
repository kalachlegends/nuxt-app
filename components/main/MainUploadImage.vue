<template>
    <FileUpload name="file[]" :url="`${baseURL}/upload_img${paramsStringToUpload}`" @before-send="beforeUploadFileInput" :onUpload="onUpload" class=" " :multiple="true" accept=".png,.jpg, .gif" :maxFileSize="1000000">
        <template #header="{ chooseCallback, uploadCallback, clearCallback, files }">
            <div class="flex flex-wrap justify-content-between align-items-center flex-1 gap-2">
                <div class="flex gap-2">
                    <Button style="width: 3rem" @click="chooseCallback()" icon="pi pi-images" rounded outlined></Button>
                    <Button style="width: 3rem" @click="uploadCallback()" class="p-button p-1" icon="pi pi-cloud-upload" rounded outlined severity="success" :disabled="!files || files.length === 0"></Button>
                    <Button style="width: 3rem" @click="clearCallback()" icon="pi pi-times" rounded outlined severity="danger" :disabled="!files || files.length === 0"></Button>
                    <Button label="Добавить из существующих" @click="visibleImage = true"></Button>
                </div>
                <!-- <ProgressBar :value="totalSizePercent" :showValue="false" :class="['md:w-20rem h-1rem w-full md:ml-auto', { 'exceeded-progress-bar': totalSizePercent > 100 }]"
                    ><span class="white-space-nowrap">{{ totalSize }}B / 1Mb</span></ProgressBar
                > -->
            </div>
        </template>
        <template #content="{ files, removeFileCallback }">
            <h5>Файлы на загрузку</h5>
            <div class="flex gap-2">
                <div class="relative flex items-center justify-center" v-for="(file, index) in files" :key="file?.objectURL">
                    <div class="flex-column flex gap-2">
                        <Image preview width="100" height="100" :src="file.objectURL" />
                        <div class="flex flex-column gap-2">
                            <label> Номер сортировки </label>
                            <InputNumber :modelValue="index" class="w-fit h-fit" :min="0" :max="files.length" @input="(e) => arraymove(files, index, e.value)" />
                        </div>
                        <Button icon="pi pi-times" outlined rounded severity="danger" @click="removeFileCallback(index)" class="cursor-pointer" />
                    </div>
                </div>
            </div>
            <div>
                <h5>Загруженные файлы</h5>
                <div class="relative flex items-center justify-center">
                    <div class="flex-column flex gap-2" v-for="(file, index) in images" :key="file.id">
                        <Image preview width="100" height="100" :src="file.image_url" />
                        <div class="flex flex-column gap-2">
                            <label> Номер сортировки </label>
                            <InputNumber :modelValue="index" class="w-fit h-fit" :min="0" :max="files.length" @input="(e) => imageMove(index, e.value)" />
                        </div>
                        <Button style="width: 3rem" icon="pi pi-times" outlined rounded severity="danger" class="cursor-pointer" @click="() => images.splice(index, 1)" />
                    </div>
                </div>
            </div>
        </template>
    </FileUpload>

    <Dialog v-model:visible="visibleImage" modal header="Все картинки" :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
        <div class="grid gap-2 align-content-center justify-content-center">
            <div class="relative tw-select-none tw-cursor-pointer" v-for="image in storeImage.paginationImagesApi.data" :key="image">
                <Button v-if="image.select" rounded icon="pi pi-check " class="absolute top-3 tw-z-20" />
                <Image @click="() => (image.select = !image.select)" width="150" height="150" :src="image.image_url" />
            </div>
        </div>
        <Button label="Импортировать" @click="importToPage"> </Button>
        <Paginator
            @page="(e) => storeImage.paginationImagesApi.changePage(e.page + 1)"
            v-model:first="storeImage.paginationImagesApi.page"
            :rows="storeImage.paginationImagesApi.pagination.limit"
            :totalRecords="storeImage.paginationImagesApi.pagination.count"
        ></Paginator>
    </Dialog>
</template>

<script setup>
import { baseURL } from '@/axios';
import { deepFind } from '@/helper/deepFind';
import { beforeUploadFileInput } from '@/helper/file/index';
import Editor from 'primevue/editor';
import { computed, onMounted, ref, watch } from 'vue';
import { arraymove } from '@/helper/other/arrayMove';
import { useToast } from 'primevue/usetoast';
import { useImageStore } from '@/components/image/stores/image';
const toast = useToast();
const props = defineProps({ images: Array, paramsStringToUpload: { default: '', type: String } });
// const generate
const files = ref([]);
const images = ref([]);
const visibleImage = ref(false);
const emit = defineEmits();
onMounted(async () => {
    await storeImage.paginationImagesApi.changePage();
});
const importToPage = () => {
    images.value = [...images.value, ...storeImage.paginationImagesApi.data.filter((e) => e.select)];
};
const imageMove = (fromIndex, toIndex) => {
    images.value = arraymove(images.value, fromIndex, toIndex);
};
const storeImage = useImageStore();
onMounted(() => {
    images.value = props.images || [];
});
watch(
    images,
    () => {
        emit('update:images', images.value);
    },
    { deep: true }
);
const onUpload = (e) => {
    images.value = [...JSON.parse(e.xhr.response).image, ...images.value];
    files.value = e.files;
    toast.add({ severity: 'info', summary: 'Success', detail: 'Files Uploaded', life: 3000 });
};
</script>

<style lang="scss" scoped></style>
