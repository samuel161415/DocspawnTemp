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
      <i class="pi pi-eye justify-self-center text-2xl custom-icon" @click="showPreview = true"></i>
      <p class="text-justify text-lg">Mobile preview</p>
    </div>
  </div>
  <!-- <P class="ml-10 mb-6 mt-8 font-semibold text-lg">Form fields</P> -->

  <div class="box overflow-hidden p-5 table-container">
    <DataTable striped-rows celll-edit-complete="onCellEditComplete" :reorderableColumns="true"
      @columnReorder="onColReorder" show-gridlines @rowReorder="onRowReorder" v-model:editingRows="editingRows"
      :value="products" editMode="row" dataKey="id" class="mx-3 px-6 mb-8" style="width: 100%"
      @row-edit-init="onRowEditInit" @row-edit-cancel="onRowEditCancel" @row-edit-save="onRowEditSave" :pt="{
          table: { style: 'min-width: 50rem' }
        }">
      <template #header>
        <div class="flex flex-row">
          <p class="font-semibold text-lg">
            Form Fields
          </p>
          <div class="ms-auto">
            <!-- <SearchField /> -->
          </div>
        </div>
      </template>
      <Column :body-style="{ margin: '0rem', padding: '0rem' }" rowReorder :reorderableColumn="false"
        style="width: 3%" :pt="{
          bodyCell: ({context}) => ({
            // id: () => {console.log(context.id)},
            // class: { 'bg-black': isDraggedOver[data.id] },
          })
        }">
        <template #rowreordericon>
          <i class="pi pi-align-justify cursor-move p-8" data-pc-section="rowreordericon"
            @dragover="handleDragOver(id)" @drop="handleDragLeave(id)" @dragend="handleDragLeave(id)" @dragleave="handleDragLeave(id)"></i>
        </template>
      </Column>
      <!-- :body-style="{ height: '5.5rem', } -->
      <Column field="name" header="Name" style="width: 10%" :headerStyle="{ height: '4.5rem' }">
        <template #editor="{ data, field }">
          <InputText v-model="data[field]" />
        </template>
      </Column>

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



      <Column field="id" rowEditor="true" style="width: 5%; min-width: 6rem" bodyStyle="text-align:center"
        header="Edit" :pt="{
          rowEditorInitButton: ({state}) => ({
            id: true
          })
        }">
        <template #roweditoriniticon>
          <i disabled class="pi pi-pencil" style="color: rgb(0 158 226);"></i>
        </template>
      </Column>
      <Column header="Delete" style="width: 4%;" bodyStyle="text-align:center" header-style="text-center">
        <template #body>
          <i class="pi pi-trash text-red-700 text-lg custom-icon" @click="handleDelete()"></i>
        </template>
      </Column>



      <Toast />
      <ConfirmDialog></ConfirmDialog>
      <Dialog v-model:visible="showPreview" modal header="Header" :style="{ width: '25rem' }">
        <template #header>
          <div class="inline-flex items-center justify-center gap-2">
            <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle" />
            <span class="font-bold whitespace-nowrap	">Amy Elsner</span>
          </div>
        </template>
        <p class="m-0">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna
          aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat.
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          Excepteur
          sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <template #footer>
          <Button label="Ok" icon="pi pi-check" @click="showPreview = false" autofocus />
        </template>
      </Dialog>
    </DataTable>
    
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import { FormFieldsData } from "../../../services/sampleData";
import SearchField from "../../shared/searchField.vue";

const confirm = useConfirm();
const toast = useToast();
const showPreview = ref(false);
const products = ref();
const editingRows = ref([]);
const currentRow = ref(null);
const isDraggedOver = ref({});
const id_for_row = ref(0);
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


const handleDelete = () => {
    confirm.require({
        message: 'Do you want to delete this record?',
        header: 'Delete Confirmation',
        rejectClass: 'p-button-text p-button-text',
        acceptClass: 'p-button-danger p-button-text',
        accept: () => {
            toast.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted', life: 3000 });
        },
        reject: () => {
            toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
    });
};


const getRowId = (notSame) => {
  if (notSame) {
    id_for_row.value += 1
    return id_for_row.value - 1
  }
  return id_for_row.value
}

const handleDragOver = (id) => {
      // Do something when element is dragged over
    console.log('Element dragged over!');
    isDraggedOver.value[id] = true;
    console.log("dragged over" + isDraggedOver.value[id] + "itemId:" + id)
};

const handleDragLeave = (id) => {
  isDraggedOver.value[id] = false;
  console.log("left" + isDraggedOver.value[id] + "itemId:" + id)

}

onMounted(() => {
    // ProductService.getProductsMini().then((data) => (products.value = data));
  products.value = FormFieldsData;
  for (let i = 0; i < products.value.length; i++) {
  isDraggedOver[i] = false
  console.log(isDraggedOver)
}
});

const onRowEditSave = (event) => {
    let { newData, index } = event;
    products.value[index] = newData;
    currentRow.value = null;
};

const onRowEditCancel = () => {
  currentRow.value = null;
}

const onRowEditInit = (event) => {
  // Disable row editing for other rows if another row is already being edited
  if (currentRow.value !== null && currentRow.value !== event.index) {
    toast.add({ severity: 'warn', summary: 'Edit in Progress', detail: 'Please save or cancel the current edit before editing another row.', life: 3000 });
    console.log(event.index)
  } else {
    currentRow.value = event.index;
  }
}

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





// Track the currently edited row
 // Store the index of the currently edited row as a reactive ref



</script>

<style lang="scss" scoped>
.custom-icon {
  /* Add your custom styles here */
  cursor: pointer;
  /* Change cursor to pointer to indicate clickable */
}

.dragged-over {
  background-color: #080808;
}
</style>
