<!-- This is the Form Editor compenent-->

<template>
  <div class="flex flex-row mr-10 ml-10 mt-2 items-center">
    <P class="font-semibold text-xl">Form Editor</P>
    <div class="grow"></div>
    <div class="flex flex-col items-center place-self-end">
      <i class="pi pi-eye justify-self-center text-2xl custom-icon" @click="handleClick"></i>
      <p class="text-justify text-lg">See preview</p>
    </div>
  </div>
  <div class="flex flex-col gap-2">
    <label for="username">Username</label>
    <InputText id="username" v-model="formTitleValue" aria-describedby="username-help" />
  </div>
  <P class="ml-10 mb-6 mt-8 font-semibold text-lg text-gray-500">Form fields</P>
  <div>
    <DataTable paginator striped-rows
      paginator-template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      current-page-report-template="Showing {first} to {last} of {totalRecords} entries" class="mx-3 px-6 flex flex-col"
      :value="products" editMode="cell" @cell-edit-complete="onCellEditComplete" :rows="6" :reorderableColumns="true"
      @columnReorder="onColReorder" @rowReorder="onRowReorder" tableStyle="min-width: 50rem">
      <Column class="pl-10" rowReorder :reorderableColumn="false"
        :headerStyle="{ 'background-color': 'rgba(0, 158, 226, 0.6)', 'color': '#fff' }" />
      <Column v-for="col of columns" :key="col.field" :field="col.field" :header="col.header" style="width: 20%"
        :headerStyle="{ 'background-color': 'rgba(0, 158, 226, 0.6)', 'color': '#fff' }">
        <template class="" body="{ data, field }">
          {{ field === 'price' ? formatCurrency(data[field]) : data[field] }}
        </template>
        <template #editor="{ data, field }">
          <template v-if="field !== 'price'">
            <InputText v-model="data[field]" autofocus />
          </template>
          <template v-else>
            <InputNumber v-model="data[field]" mode="currency" currency="USD" locale="en-US" autofocus />
          </template>
        </template>
      </Column>
      <Column class="grow self-end pr-14" header="Actions"
        :headerStyle="{ 'background-color': 'rgba(0, 158, 226, 0.6)', 'color': '#fff' }">
        <template #body>
          <div class="flex flex-row gap-x-5">
            <i class="pi pi-pencil text-primaryBlue  text-lg custom-icon" @click="handleClick"></i>
            <i class="pi pi-trash text-primaryBlue text-lg custom-icon" @click="handleClick"></i>
          </div>
        </template>
      </Column>
    </DataTable>
    <Toast />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useToast } from 'primevue/usetoast';
import { ProductService } from '../../../src/services/sampleData';

onMounted(() => {
    ProductService.getProductsMini().then(data => products.value = data);
});

const toast = useToast();
const columns = ref([
    {field: 'code', header: 'Code'},
    {field: 'name', header: 'Name'},
    {field: 'category', header: 'Category'},
    {field: 'quantity', header: 'Quantity'},
    {field: 'inventoryStatus', header: 'Inventory Status'},
]);
const products = ref();
const formTitleValue = ref(null);
const formDescriptionValue = ref(null);

const onColReorder = () => {
    toast.add({severity:'success', summary: 'Column Reordered', life: 3000});
};
const onRowReorder = (event) => {
    products.value = event.value;
    toast.add({severity:'success', summary: 'Rows Reordered', life: 3000});
};


const onCellEditComplete = (event) => {
  let { data, newValue, field } = event;

  switch (field) {
      case 'quantity':
      case 'price':
          if (isPositiveInteger(newValue)) data[field] = newValue;
          else event.preventDefault();
          break;

      default:
          if (newValue.trim().length > 0) data[field] = newValue;
          else event.preventDefault();
          break;
  }
};
const isPositiveInteger = (val) => {
  let str = String(val);

  str = str.trim();

  if (!str) {
      return false;
  }

  str = str.replace(/^0+/, '') || '0';
  var n = Math.floor(Number(str));

  return n !== Infinity && String(n) === str && n >= 0;
};
const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}

</script>

<style lang="scss" scoped>
.custom-icon {
  /* Add your custom styles here */
  cursor: pointer;
  /* Change cursor to pointer to indicate clickable */
}
</style>
