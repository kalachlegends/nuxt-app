<script setup>
import { FilterMatchMode } from "primevue/api";
import { ref, onMounted, onBeforeMount } from "vue";

import { useToast } from "primevue/usetoast";
import { useCurrencyStore } from "./stores/currency";
const toast = useToast();

const data = ref({});
const selectedCurrency = ref(null);
const dt = ref(null);
const filters = ref({});
const store = useCurrencyStore();
const dataDialog = ref(false);
onBeforeMount(() => {
  initFilters();
});
onMounted(async () => {
  await store.fetchCurrency();
});
const mode = ref("create");
const openNew = () => {
  mode.value = "create";
  dataDialog.value = true;
};

const editProduct = (editProduct) => {
  mode.value = "edit";
  data.value = { ...editProduct };

  dataDialog.value = true;
};

const initFilters = () => {
  filters.value = {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  };
};
import { useConfirm } from "@/hooks/useConfirm";
const confirm = useConfirm();
const confirmDeleteProduct = async () => {
  const result = await confirm();
  console.log(result);
};
import FormCurrency from "./components/FormCurrency.vue";
</script>

<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <Toast />
        <Toolbar class="mb-4">
          <template v-slot:start>
            <div class="my-2">
              <Button
                label="Создать"
                icon="pi pi-plus"
                class="p-button-success mr-2"
                @click="openNew"
              />
            </div>
          </template>
        </Toolbar>
        <Dialog
          v-model:visible="dataDialog"
          :style="{ width: '450px' }"
          :header="mode == 'edit' ? 'Редактирование' : 'Создание'"
          :modal="true"
        >
          <form-currency
            :mode="mode"
            :formState="data"
            :cancel="() => (dataDialog = false)"
          />
        </Dialog>

        <ProgressBar
          v-if="store.isLoadCurrency"
          mode="indeterminate"
          style="height: 6px"
        ></ProgressBar>
        <DataTable
          ref="dt"
          :value="store.currency"
          v-model:selection="selectedProducts"
          dataKey="id"
          :paginator="true"
          :rows="10"
          :filters="filters"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          :rowsPerPageOptions="[5, 10, 25]"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
          responsiveLayout="scroll"
        >
          <template #header>
            <div
              class="flex flex-column md:flex-row md:justify-content-between md:align-items-center"
            >
              <h5 class="m-0">Manage Currency</h5>
              <span class="block mt-2 md:mt-0 p-input-icon-left">
                <i class="pi pi-search" />
                <InputText
                  v-model="filters['global'].value"
                  placeholder="Search..."
                />
              </span>
            </div>
          </template>
          <Column
            header="ID"
            field="country_id"
            style="max-"
            :sortable="true"
            h
          >
            <template #body="slotProps">
              <router-link
                :to="'/currency/' + slotProps.data.id"
                class="cusror-pointer"
                ><Tag severity="Primary">{{ slotProps.data.id }}</Tag>
              </router-link>
            </template>
          </Column>

          <Column field="code" header="КОД - $,₸" :sortable="true" h>
            <template #body="slotProps">
              <span class="p-column-title">КОД - $,₸</span>
              {{ slotProps.data.code }}
            </template>
          </Column>

          <Column field="country_id" header="Страна" :sortable="true" h>
            <template #body="slotProps">
              <span class="p-column-title">Страна</span>
              {{ slotProps.data.country_id }}
            </template>
          </Column>

          <Column field="name" header="Название валюты" :sortable="true" h>
            <template #body="slotProps">
              <span class="p-column-title">Название валюты</span>
              {{ slotProps.data.name }}
            </template>
          </Column>

          <Column
            header="Время создания,обновления, удаления"
            headerStyle="min-width:2rem;"
          >
            <template #body="slotProps">
              <Tag severity="Primary">{{ slotProps.data.inserted_at }}</Tag>
              <Tag severity="Primary">{{ slotProps.data.updated_at }}</Tag>
              <Tag severity="Danger" v-if="slotProps.data.deleted_at">{{
                slotProps.data.deleted_at
              }}</Tag>
            </template>
          </Column>

          <Column header="Управление" headerStyle="min-width:10rem;">
            <template #body="slotProps">
              <Button
                icon="pi pi-pencil"
                class="p-button-rounded p-button-success mr-2"
                @click="editProduct(slotProps.data)"
              />
              <Button
                icon="pi pi-trash"
                class="p-button-rounded p-button-warning mt-2"
                @click="store.deleteData(slotProps.data)"
              />
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
