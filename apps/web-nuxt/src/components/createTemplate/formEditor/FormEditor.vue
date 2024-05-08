<!-- This is the Form Editor compenent-->

<template>
  <div class="flex flex-row mr-10 ml-14 my-2 items-center">
   
    <div class="flex flex-row font-semibold items-center">
      <div class="flex flex-col gap-2">
        <label for="username">Form Title <span class="text-red-500">*</span></label>
        <InputText class="w-80" id="formTitle" v-model="formTitle" aria-describedby="FormTitle-help" />
      </div>
      <div class="ml-14 flex flex-col gap-2">
        <label for="username">Form Description</label>
        <InputText class="w-96" id="formTitle" v-model="formDescription" aria-describedby="FormTitle-help" />
      </div>
    </div>
    <div class="grow"></div>
    <div class="flex flex-col items-center place-self-end">
      <i class="pi pi-eye justify-self-center text-2xl custom-icon" :disabled="formTitle.trim().length === 0"
        @click="handlePreview()"></i>
      <p class="text-justify text-lg">See preview</p>
    </div>
  </div>
 
  <div class="box overflow-hidden p-5 table-container">
    <DataTable striped-rows celll-edit-complete="onCellEditComplete" :reorderableColumns="false" show-gridlines
      v-model:filters="filters" :global-filter-fields="['type', 'name', 'description']" @rowReorder="onRowReorder"
      v-model:editingRows="editingRows" :value="formFields" editMode="row" dataKey="id" class="mx-3 px-6 mb-8"
      style="width: 100%" @row-edit-init="onRowEditInit" @row-edit-cancel="onRowEditCancel"
      @row-edit-save="onRowEditSave" :pt="{
          table: { style: 'min-width: 50rem' }
        }">
      <template #header>
        <div class="flex flex-row">
          <p class="font-semibold text-lg self-center">
            Form Fields
          </p>
          <div class="ms-auto">
            <SearchField v-model:filters="filters" />
          </div>
        </div>
      </template>
      <Column :body-style="{ margin: '0rem', padding: '0rem' }" rowReorder :reorderableColumn="false" style="width: 3%"
       >
        <template #rowreordericon>
          <i class="pi pi-align-justify cursor-move p-8" data-pc-section="rowreordericon" @dragover="handleDragOver(id)"
            @drop="handleDragLeave(id)" @dragend="handleDragLeave(id)" @dragleave="handleDragLeave(id)"></i>
        </template>
      </Column>

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

      <Column field="fieldFormat" header="Field Format" class="min-w-40 w-" style="width: 7%">
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



      <Column field="id" rowEditor="true" style="width: 5%; min-width: 6rem" bodyStyle="text-align:center" header="Edit"
        :pt="{
          rowEditorInitButton: ({ state }) => ({
            id: true
          })
        }">
        <template #roweditoriniticon>
          <i disabled class="pi pi-pencil" style="color: rgb(0 158 226);"></i>
        </template>
      </Column>
      <Column header="Delete" style="width: 4%;" bodyStyle="text-align:center" header-style="text-center">
        <template #body="{ data }">
          <i class="pi pi-trash text-red-700 text-lg custom-icon" @click="handleDelete($event, data)"></i>
        </template>
      </Column>



      <Toast />
      <ConfirmDialog :draggable="false" :pt="{
          root: { class: 'w-auto' },
        }"></ConfirmDialog>


      <Dialog v-model:visible="showPreview" modal :draggable="false"
        :style="mobile ? { width: '25rem' } : { width: '100rem' }" :pt="{
          header: {
            class: ['flex items-center justify-between',
              'shrink-0', 'p-6', `pb-${mobile ? '0' : ''}`, 'border-t-0', 'rounded-tl-lg', 'rounded-tr-lg', 'bg-surface-0 dark:bg-surface-800',
              'text-surface-700 dark:text-surface-0/80']
          }
        }">
        <template #header>
          <div :class="`${mobile ? '' : 'pl-16'}`" class="flex flex-row gap-3 w-full">
            <div class="flex flex-col">
              <i class="pi pi-mobile"></i>
              <RadioButton class="pl-0.5" v-model="mobile" inputId="mobile1" name="pizza" :value="true" />
            </div>
            <div class="flex flex-col">
              <i class="pi pi-desktop"></i>
              <RadioButton class="pl-0.5" v-model="mobile" inputId="desktop1" name="pizza" :value="false" />
            </div>
            <div class="mx-auto place-self-center flex flex-row">
              <img  src="../../../assets/icons/LogoMark.svg" class="w-12 h-auto " />
              <img v-if="!isCollapsed" src="../../../assets/icons/logotext.svg" class="w-36 ml-1 h-auto" />
            </div>
          </div>
        </template>
        <template #default>
          <div :class="`flex flex-col gap-4 ${mobile ? '' : 'pl-16'}`">
            <p :class="` place-self-${mobile ? 'center' : 'start'} text-xl font-semibold form-title-preview`">{{
          formTitle }}</p>
            <div class="w-80 place-self-center text-justify mb-4">
              {{ formDescription }}
            </div>

            <div :class="`${mobile ? 'w-80' : 'w-full pr-96'} place-self-start flex flex-col gap-5`">
              <div v-for="(formField, index) in formFields" :key="formField.id">


                <div v-if="formField.type === 'text'" class="flex flex-col gap-2">
                  <label :for="`${formField.name}-${index}`">
                    <div class="flex flex-row gap-2">
                      <div>{{ formField.name }}</div>
                      <div v-if="formField.mandatory" class="text-red-500">*</div>
                    </div>
                  </label>
                  <InputText
                    :class="`${formField.mandatory && formField.state.trim().length === 0 ? 'border-red-700' : ''}`"
                    v-model="formField.state" :id="`${formField.name}-${index}`" />
                  <small v-if="formField.mandatory && formField.state.trim().length === 0" class="text-red-600">This
                    Field is required</small>
                </div>

                <div v-else-if="formField.type === 'multiline-text'" class="flex flex-col gap-2">
                  <label :for="`${formField.name}-${index}`">
                    <div class="flex flex-row gap-2">
                      <div>{{ formField.name }}</div>
                      <div v-if="formField.mandatory" class="text-red-500">*</div>
                    </div>
                  </label>
                  <Textarea
                    :class="`${formField.mandatory && formField.state.trim().length === 0 ? 'border-red-700' : ''}`"
                    :id="`${formField.name}-${index}`" v-model="formField.state" rows="4" cols="30" />
                  <small v-if="formField.mandatory && formField.state.trim().length === 0" class="text-red-600">This
                    Field is required</small>
                </div>

                <div v-else-if="formField.type === 'number'" class="flex flex-col gap-2">
                  <label :for="`${formField.name}-${index}`">
                    <div class="flex flex-row gap-2">
                      <div>{{ formField.name }}</div>
                      <div v-if="formField.mandatory" class="text-red-500">*</div>
                    </div>
                  </label>
                  <!-- :class="`${formField.mandatory && formField.state === 0 ? 'border-red-700' : ''}`" -->
                  <InputNumber incrementButtonClass="bg-none" v-model="formField.state"
                    :input-id="`${formField.name}-${index}`" mode="decimal" showButtons />
                  <small v-if="formField.mandatory && formField.state === 0" class="text-red-600">This Field is
                    required</small>
                </div>

                <div v-else-if="formField.type === 'date'" class="flex flex-col gap-2">

                  <label :for="`${formField.name}-${index}`">
                    <div class="flex flex-row gap-2">
                      <div>{{ formField.name }}</div>
                      <div v-if="formField.mandatory" class="text-red-500">*</div>
                    </div>
                  </label>
                  <Calendar v-model="formField.state" showIcon iconDisplay="input"
                    :inputId="`${formField.name}-${index}`" />
                </div>

                <div v-else-if="formField.type === 'time'" class="flex flex-col gap-2">
                  <label :for="`${formField.name}-${index}`">
                    <div class="flex flex-row gap-2">
                      <div>{{ formField.name }}</div>
                      <div v-if="formField.mandatory" class="text-red-500">*</div>
                    </div>
                  </label>
                  <Calendar :id="`${formField.name}-${index}`" timeOnly hourFormat="12" showIcon iconDisplay="input"
                    v-model="formField.state" icon="pi pi-clock" />
                </div>

                <div v-else-if="formField.type === 'email'" class="flex flex-col gap-2">
                  <label :for="`${formField.name}-${index}`">
                    <div class="flex flex-row gap-2">
                      <div>{{ formField.name }}</div>
                      <div v-if="formField.mandatory" class="text-red-500">*</div>
                    </div>
                  </label>
                  <InputText
                    :class="`${formField.mandatory && formField.state.trim().length === 0 ? 'border-red-700' : ''}`"
                    v-model="formField.state" :id="`${formField.name}-${index}`" class="border-red-500" />
                  <small v-if="formField.mandatory && formField.state.trim().length === 0" class="text-red-600">This
                    Field is required</small>
                </div>

                <div v-else-if="formField.type === 'image'" class="flex flex-col gap-2">
                  <label :for="`${formField.name}-${index}`">
                    <div class="flex flex-row gap-2">
                      <div>{{ formField.name }}</div>
                      <div v-if="formField.mandatory" class="text-red-500">*</div>
                    </div>
                  </label>
                  <FileUpload mode="basic" name="demo[]" accept="image/*" @upload="onUpload"
                    :id="`${formField.name}-${index}`" v-model="formField.state" />
                </div>


                <div v-else-if="formField.type === 'list'" class="flex flex-col gap-2">
                  <label :for="`${formField.name}-${index}`">
                    <div class="flex flex-row gap-2">
                      <div>{{ formField.name }}</div>
                      <div v-if="formField.mandatory" class="text-red-500">*</div>
                    </div>
                  </label>
                  <InputText
                    :class="`${formField.mandatory && formField.state.trim().length === 0 ? 'border-red-700' : ''}`"
                    :id="`${formField.name}-${index}`" class="border-red-500" v-model="formField.state" />
                  <small v-if="formField.mandatory && formField.state.trim().length === 0" class="text-red-600">This
                    Field is required</small>
                </div>

                <div v-else-if="formField.type === 'checkbox'" class="flex flex-col gap-2">
                  <label :for="`${formField.name}-${index}`">
                    <div class="flex flex-row gap-2">
                      <div>{{ formField.name }}</div>
                      <div v-if="formField.mandatory" class="text-red-500">*</div>
                    </div>
                  </label>
                  <InputText
                    :class="`${formField.mandatory && formField.state.trim().length === 0 ? 'border-red-700' : ''}`"
                    :id="`${formField.name}-${index}`" class="border-red-500" v-model="formField.state" />
                  <small v-if="formField.mandatory && formField.state.trim().length === 0" class="text-red-600">This
                    Field is required</small>
                </div>

                <div v-else-if="formField.type === 'signature'" class="flex flex-col gap-2">
                  <label :for="`${formField.name}-${index}`">
                    <div class="flex flex-row gap-2">
                      <div>{{ formField.name }}</div>
                      <div v-if="formField.mandatory" class="text-red-500">*</div>
                    </div>
                  </label>
                  <InputText :id="`${formField.name}-${index}`" class="border-red-500" v-model="formField.state" />
                </div>


              </div>
            </div>

          </div>
        </template>
        <template #footer>
          <div :class="`w-full flex ${mobile ? 'justify-center' : 'justify-start pl-16'} mt-5`"><Button label="Save"
              @click="" autofocus /></div>
        </template>
      </Dialog>
     
    </DataTable>
    <div class="w-full flex justify-center mt-5"><Button label="Save & Continue" @click="" autofocus /></div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { FilterMatchMode } from 'primevue/api';
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import MobilePreviewDialog from "./MobilePreviewDialog.vue";
import { FormFieldsData } from "../../../services/sampleData";
import SearchField from "../../shared/searchField.vue";

const confirm = useConfirm();
const mobile = ref(true);
const toast = useToast();
const showPreview = ref(false);
const formFields = ref();
const editingRows = ref([]);
const currentRow = ref(null);
const isDraggedOver = ref({});

const id_for_row = ref(0);
const requiredOptions = ref([
    { label: 'Yes', value: true },
    { label: 'No', value: false },
]);



const formTitle = ref('');
const formDescription = ref('');

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
},)

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


const onUpload = () => {
    toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
};



const handlePreview = () => {
    showPreview.value = true;
  
}


const handleDelete = (event, data) => {
    confirm.require({
        message: `Do you want to delete the form field "${data.name}"?`,
        header: 'Delete Confirmation',
        acceptLabel: 'Delete',
        rejectLabel: 'Cancel',
        icon: 'pi pi-exclamation-triangle text-red-500 w-8',
        rejectClass: 'p-button-text p-button-danger text-slate-400 bg-slate-400 hover:bg-slate-400',
        acceptClass: 'p-button-danger p-button-text bg-red-500 hover:bg-red-500',
        accept: () => {
          formFields.value = formFields.value.filter(item => item.id !== data.id);
            toast.add({ severity: 'info', summary: 'Confirmed', detail: `Form field "${data.name}" deleted`, life: 3000 });
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
    // formFieldservice.getformFieldsMini().then((data) => (formFields.value = data));
  formFields.value = FormFieldsData;
  for (let i = 0; i < formFields.value.length; i++) {
    isDraggedOver.value[i] = false
  }

  formFields.value.forEach(field => {
    if (field.type === 'text') {
     field.state = ref('')
    } else if (field.type === 'multiline-text') {
      field.state = ref('');
    } else if (field.type === 'number') {
      field.state = ref(0);
    } else if (field.type === 'date') {
      field.state = ref(new Date());
    } else if (field.type === 'time') {
      field.state = ref(new Date());
    } else if (field.type === 'email') {
      field.state = ref('');
    } else if (field.type === 'image') {
      field.state = ref('');
    } else if (field.type === 'list') {
      field.state = ref('');
    } else if (field.type === 'checkbox') {
      field.state = ref('');
    } else if (field.type === 'signature') {
      field.state = ref('');
    }
  });
});

const onRowEditSave = (event) => {
    let { newData, index } = event;
    formFields.value[index] = newData;
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

const onRowReorder = (event) => {
    formFields.value = event.value;
    toast.add({severity:'success', summary: 'Rows Reordered', life: 3000});
};



</script>



<style lang="scss" scoped>
.custom-icon {
  /* Add your custom styles here */
  cursor: pointer;
  /* Change cursor to pointer to indicate clickable */
}

.form-title-preview {
  position: sticky;
}

.dragged-over {
  background-color: #080808;
}
</style>
