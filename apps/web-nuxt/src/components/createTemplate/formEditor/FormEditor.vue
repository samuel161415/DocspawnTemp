<!-- This is the Form Editor compenent-->

<template>
  <div class="flex flex-row mr-10 ml-14 my-2 items-center">
    <!-- <P class="font-semibold text-xl">Form Editor</P> -->
    <div class="flex flex-row font-semibold items-center">
      <div class="flex flex-col gap-2">
        <label for="username">Form Title</label>
        <InputText class="w-80" id="formTitle" v-model="formTitleValue" aria-describedby="FormTitle-help" />
      </div>
      <div class="ml-14 flex flex-col gap-2">
        <label for="username">Form Description</label>
        <InputText class="w-96" id="formTitle" v-model="formTitleDescription" aria-describedby="FormTitle-help" />
      </div>
    </div>
    <div class="grow"></div>
    <div class="flex flex-col items-center place-self-end">
      <i class="pi pi-eye justify-self-center text-2xl custom-icon" @click="handleClick"></i>
      <p class="text-justify text-lg">See preview</p>
    </div>
  </div>
  <!-- <P class="ml-10 mb-6 mt-8 font-semibold text-lg">Form fields</P> -->

  <div class="box overflow-hidden p-5 table-container">
    <DataTable striped-rows celll-edit-complete="onCellEditComplete" :reorderableColumns="true"
      @columnReorder="onColReorder" show-gridlines @rowReorder="onRowReorder" v-model:editingRows="editingRows"
      :value="products" editMode="row" dataKey="id" class="mx-3 px-6 mb-8" style="width: 100%"
      @row-edit-save="onRowEditSave" :pt="{
          table: { style: 'min-width: 50rem' }
        }">
      <template #header>
        <div class="">
          <p class="font-semibold text-lg">
            Form Fields
          </p>
        </div>
      </template>
      <Column rowReorder :reorderableColumn="false" style="width: 3%" />
      <Column :body-style="{ height: '5.5rem', }" field="name" header="Name" style="width: 10%"
        :headerStyle="{ height: '4.5rem' }">
        <template #editor="{ data, field }">
          <InputText v-model="data[field]" />
        </template>
      </Column>
      <!-- 
      <Column field="type" header="Type" style="width: 7%">
        <template #editor="{ data, field }">
          <InputText class="max-w-32" v-model="data[field]" />
        </template>
      </Column> -->

      <Column field="type" header="Type" style="width: 9%">
        <template #editor="{ data, field }">
          <Dropdown class="max-w-44" v-model="data[field]" :options="fieldTypes" optionLabel="label" optionValue="value"
            placeholder="Select data type">
            <template #option="slotProps">
              <p>{{ slotProps.option.label }}</p>
              <!-- <Tag :value="slotProps.option.label" /> -->
            </template>
          </Dropdown>
        </template>
        <template #body="slotProps">
          <p>{{ slotProps.data.type }}</p>
        </template>
      </Column>


      <Column field="mandatory" header="Mandatory?" style="width: 1%">
        <template #editor="{ data, field }">
          <Dropdown class="max-w-28" v-model="data[field]" :options="requiredOptions" optionLabel="label"
            optionValue="value" placeholder='Select necessity'>
            <template #option="slotProps">
              <p>{{ slotProps.option.label }}</p>
            </template>
          </Dropdown>
        </template>
        <template #body="slotProps">
          <p>{{ slotProps.data.mandatory ? 'Yes' : 'No' }}</p>
        </template>
      </Column>

      <Column field="fieldFormat" header="Field Format" class="min-w-40" style="width: 7%">
        <template #editor="{ data, field }">

          <Dropdown v-if="data.type === 'date' || data.type === 'time'" v-model="data[field]" class="max-w-48"
            :options="data['type'] === 'date' ? dateFormats : timeFormats" optionLabel="label" optionValue="value"
            placehlder="Select Format">
            <template #option="slotProps">
              <p>{{ slotProps.option.value }}</p>
            </template>
          </Dropdown>
          <p v-else>N/A</p>
        </template>

        <template #body="slotProps">
          <p v-if="slotProps.data.type === 'date' || slotProps.data.type === 'time'">{{ slotProps.data.fieldFormat }}
          </p>
          <p v-else>N/A</p>
        </template>

      </Column>

      <Column field="description" header="Description" style="width: 30%">
        <template #editor="{ data, field }">
          <InputText class="w-96" v-model="data[field]" />
        </template>
      </Column>



      <Column :rowEditor="true" style="width: 5%; min-width: 6rem" bodyStyle="text-align:center" header="Edit">
        <template #roweditoriniticon>
          <i class="pi pi-pencil" style="color: rgb(0 158 226);"></i>
        </template>
      </Column>
      <Column header="Delete" style="width: 4%;" bodyStyle="text-align:center" header-style="text-center">
        <template #body>
          <i class="pi pi-trash text-primaryBlue text-lg custom-icon" @click="handleClick"></i>
        </template>
      </Column>

    </DataTable>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { FormFieldsData } from "../../../services/sampleData";
// import { ProductService } from '../../../services/sampleData';
import toast from '~/presets/lara/toast';

const products = ref();
const editingRows = ref([]);
const requiredOptions = ref([
    { label: 'Yes', value: true },
    { label: 'No', value: false },
]);


const formTitleValue = ref('');
const formTitleDescription = ref('');

const dateFormats = ref([
    { label: 'MM/DD/YY', value: 'MM/DD/YY' },
    { label: 'DD/MM/YY', value: 'DD/MM/YY' },
    { label: 'YY/MM/DD', value: 'YY/MM/DD' },
]);

const timeFormats = ref([
    { label: 'HH:MM:SS', value: 'HH:MM:SS' },
    { label: 'HH:MM:SS XM', value: 'HH:MM:SS XM' },
    { label:  'HH:MM', value:  'HH:MM' },
]);


const fieldTypes = [
    { label: 'Text', value: 'text' },
    { label: 'Multiline Text', value: 'multiline-text' },
    { label: 'Number', value: 'number' },
    { label: 'Date', value: 'date' },
    { label: 'Time', value: 'time' },
    { label: 'Email', value: 'email' },
    { label: 'Image', value: 'image' },
    { label: 'List', value: 'list' },
    { label: 'Signature', value: 'signature' },
    { label: 'Checkbox', value: 'checkbox' }
];



onMounted(() => {
    // ProductService.getProductsMini().then((data) => (products.value = data));
  products.value = FormFieldsData;
});

const onRowEditSave = (event) => {
    let { newData, index } = event;

    products.value[index] = newData;
};

const onColReorder = () => {
  toast.add({severity: 'success', summary: 'Column Reordered', life: 3000});
};

const onRowReorder = (event) => {
    products.value = event.value;
    toast.add({severity:'success', summary: 'Rows Reordered', life: 3000});
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
