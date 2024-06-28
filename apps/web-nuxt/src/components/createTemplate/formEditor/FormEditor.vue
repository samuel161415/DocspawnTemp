<!-- This is the Form Editor compenent -->

<template>
  <div>
    <p class="font-semibold text-surface-600 text-2xl mb-5 flex text-center justify-center">
      Form editor
    </p>
    <div class="flex flex-row  my-2 items-center">
      <div class="flex flex-row items-center">
        <div class="flex flex-col gap-2">
          <label for="username" class="font-medium text-surface-600 text-lg font-poppins">Template name <span class="text-red-500">*</span></label>
          <InputText id="formTitle" v-model="templateTitle" class="w-80 font-poppins text-surface-600 text-lg pl-5" aria-describedby="FormTitle-help" />
        </div>
        <div class="ml-14 flex flex-col gap-2">
          <label for="username" class="text-surface-600 font-poppins font-medium text-lg">Template description</label>
          <Textarea v-model="templateDescription" class="w-96 h-[47px] font-poppins text-surface-600 text-lg pl-5" cols="30" />
        </div>
      </div>
      <div class="grow"></div>
      <div class="flex flex-col items-center place-self-end">
        <i
          class="pi pi-eye justify-self-center text-2xl custom-icon" :disabled="templateTitle.trim().length === 0"
          @click="handlePreview()"
        ></i>
        <p class="text-justify text-lg">
          See preview
        </p>
      </div>
    </div>

    <div class="box overflow-hidden py-5 table-container">
      <DataTable
        v-model:filters="filters" v-model:editingRows="editingRows" striped-rows celll-edit-complete="onCellEditComplete"
        :reorderable-columns="false" show-gridlines :global-filter-fields="['type', 'name', 'description']"
        :value="allFormFields" edit-mode="row" data-key="id" class="mb-8" style="width: 100%"
        :pt="{
          table: { style: 'min-width: 50rem' },
        }" @row-reorder="onRowReorder" @row-edit-init="onRowEditInit"
        @row-edit-cancel="onRowEditCancel" @row-edit-save="onRowEditSave"
      >
        <template #header>
          <div class="flex flex-row">
            <p class="font-semibold text-lg self-center">
              Form fields
            </p>
            <div class="ms-auto">
              <SearchField v-model:filters="filters" />
            </div>
          </div>
        </template>
        <Column :body-style="{ margin: '0rem', padding: '0rem' }" row-reorder :reorderable-column="false" style="width: 3%">
          <template #rowreordericon>
            <i
              class="pi pi-align-justify cursor-move p-8" data-pc-section="rowreordericon" @dragover="handleDragOver(id)"
              @drop="handleDragLeave(id)" @dragend="handleDragLeave(id)" @dragleave="handleDragLeave(id)"
            ></i>
          </template>
        </Column>

        <Column field="name" header="Name" style="width: 10%" :header-style="{ height: '4.5rem' }">
          <template #editor="{ data, field }">
            <InputText v-model="data[field]" />
          </template>
        </Column>

        <Column field="fieldType" header="Type" style="width: 9%">
          <template #editor="{ data, field }">
            <Dropdown
              v-model="data[field]" class="max-w-44" :options="fieldTypes" option-label="label" option-value="value"
              placeholder="Select data type"
            >
              <template #option="slotProps">
                <p>{{ slotProps.option.label }}</p>
              </template>
            </Dropdown>
          </template>
          <!-- <template #body="slotProps">
            <p>{{ slotProps.data.type }}</p>
          </template> -->
        </Column>

        <Column field="isRequired" header="Mandatory?" style="width: 1%">
          <template #editor="{ data, field }">
            <Dropdown
              v-model="data[field]" class="max-w-28" :options="requiredOptions" option-label="label"
              option-value="value" placeholder="Select necessity"
            >
              <template #option="slotProps">
                <p>{{ slotProps.option.label }}</p>
              </template>
            </Dropdown>
          </template>
          <template #body="slotProps">
            <p>{{ slotProps.data.isRequired ? 'Yes' : 'No' }}</p>
          </template>
        </Column>

        <Column field="fieldFormat" header="Field format" class="min-w-40 " style="width: 7%">
          <template #editor="{ data, field }">
            <Dropdown
              v-if="data.fieldType === 'Form date' || data.type === 'Form time'" v-model="data[field]" class="max-w-48"
              :options="data.type === 'date' ? dateFormats : timeFormats" option-label="label" option-value="value"
              placehlder="Select Format"
            >
              <template #option="slotProps">
                <p>{{ slotProps.option.value }}</p>
              </template>
            </Dropdown>
            <p v-else>
              N/A
            </p>
          </template>

          <template #body="slotProps">
            <p v-if="slotProps.data.fieldType === 'Form date' || slotProps.data.fieldType === 'Form time'">
              <!-- {{ slotProps.data.fieldFormat }} -->
              {{ slotProps.data.fieldType === 'Form date' ? slotProps.data.dateFormat?.name : slotProps.data.timeFormat?.name }}
            </p>
            <p v-else>
              N/A
            </p>
          </template>
        </Column>

        <Column field="fieldDescription" header="Description" style="width: 30%">
          <template #editor="{ data, field }">
            <InputText v-model="data[field]" class="w-96" />
          </template>
        </Column>

        <!-- <Column
          field="id" :row-editor="true" style="width: 5%; min-width: 6rem" body-style="text-align:center" header="Edit"
          :pt="{
            rowEditorInitButton: ({ state }) => ({
              id: true,
            }),
          }"
        >
          <template #roweditoriniticon>
            <i disabled class="pi pi-pencil" style="color: rgb(0 158 226);"></i>
          </template>
        </Column> -->
        <Column header="Delete" style="width: 4%;" body-style="text-align:center" header-style="text-center">
          <template #body="{ data }">
            <i class="pi pi-trash text-red-700 text-lg custom-icon" @click="handleDelete($event, data)"></i>
          </template>
        </Column>

        <Toast />
        <ConfirmDialog
          :draggable="false" :pt="{
            root: { class: 'w-auto' },
          }"
        />

        <!-- <Dialog
          v-model:visible="showPreview" modal :draggable="false"
          :style="mobile ? { width: '25rem' } : { width: '100rem' }" :pt="{
            header: {
              class: ['flex items-center justify-between',
                      'shrink-0', 'p-6', `pb-${mobile ? '0' : ''}`, 'border-t-0', 'rounded-tl-lg', 'rounded-tr-lg', 'bg-surface-0 dark:bg-surface-800',
                      'text-surface-700 dark:text-surface-0/80'],
            },
          }"
        >
          <template #header>
            <div :class="`${mobile ? '' : 'pl-16'}`" class="flex flex-row gap-3 w-full">
              <div class="flex flex-col">
                <i class="pi pi-mobile"></i>
                <RadioButton v-model="mobile" class="pl-0.5" input-id="mobile1" name="pizza" :value="true" />
              </div>
              <div class="flex flex-col">
                <i class="pi pi-desktop"></i>
                <RadioButton v-model="mobile" class="pl-0.5" input-id="desktop1" name="pizza" :value="false" />
              </div>
              <div class="mx-auto place-self-center flex flex-row">
                <img src="../../../assets/icons/LogoMark.svg" class="w-12 h-auto " />
                <img v-if="!isCollapsed" src="../../../assets/icons/logotext.svg" class="w-36 ml-1 h-auto" />
              </div>
            </div>
          </template>
          <template #default>
            <div :class="`flex flex-col gap-4 ${mobile ? '' : 'pl-16'}`">
              <p :class="` place-self-${mobile ? 'center' : 'start'} text-xl font-semibold form-title-preview`">
                {{
                  formTitle }}
              </p>
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
                      :id="`${formField.name}-${index}`"
                      v-model="formField.state" :class="`${formField.mandatory && formField.state.trim().length === 0 ? 'border-red-700' : ''}`"
                    />
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
                      :id="`${formField.name}-${index}`"
                      v-model="formField.state" :class="`${formField.mandatory && formField.state.trim().length === 0 ? 'border-red-700' : ''}`" rows="4" cols="30"
                    />
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

                    <InputNumber
                      v-model="formField.state" increment-button-class="bg-none"
                      :input-id="`${formField.name}-${index}`" mode="decimal" show-buttons
                    />
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
                    <Calendar
                      v-model="formField.state" show-icon icon-display="input"
                      :input-id="`${formField.name}-${index}`"
                    />
                  </div>

                  <div v-else-if="formField.type === 'time'" class="flex flex-col gap-2">
                    <label :for="`${formField.name}-${index}`">
                      <div class="flex flex-row gap-2">
                        <div>{{ formField.name }}</div>
                        <div v-if="formField.mandatory" class="text-red-500">*</div>
                      </div>
                    </label>
                    <Calendar
                      :id="`${formField.name}-${index}`" v-model="formField.state" time-only hour-format="12" show-icon
                      icon-display="input" icon="pi pi-clock"
                    />
                  </div>

                  <div v-else-if="formField.type === 'email'" class="flex flex-col gap-2">
                    <label :for="`${formField.name}-${index}`">
                      <div class="flex flex-row gap-2">
                        <div>{{ formField.name }}</div>
                        <div v-if="formField.mandatory" class="text-red-500">*</div>
                      </div>
                    </label>
                    <InputText
                      :id="`${formField.name}-${index}`"
                      v-model="formField.state" :class="`${formField.mandatory && formField.state.trim().length === 0 ? 'border-red-700' : ''}`" class="border-red-500"
                    />
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
                    <FileUpload
                      :id="`${formField.name}-${index}`" v-model="formField.state" mode="basic" name="demo[]"
                      accept="image/*" @upload="onUpload"
                    />
                  </div>

                  <div v-else-if="formField.type === 'list'" class="flex flex-col gap-2">
                    <label :for="`${formField.name}-${index}`">
                      <div class="flex flex-row gap-2">
                        <div>{{ formField.name }}</div>
                        <div v-if="formField.mandatory" class="text-red-500">*</div>
                      </div>
                    </label>
                    <InputText
                      :id="`${formField.name}-${index}`"
                      v-model="formField.state" :class="`${formField.mandatory && formField.state.trim().length === 0 ? 'border-red-700' : ''}`" class="border-red-500"
                    />
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
                      :id="`${formField.name}-${index}`"
                      v-model="formField.state" :class="`${formField.mandatory && formField.state.trim().length === 0 ? 'border-red-700' : ''}`" class="border-red-500"
                    />
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
                    <InputText :id="`${formField.name}-${index}`" v-model="formField.state" class="border-red-500" />
                  </div>
                </div>
              </div>
            </div>
          </template>
          <template #footer>
            <div :class="`w-full flex ${mobile ? 'justify-center' : 'justify-start pl-16'} mt-5`">
              <Button
                label="Save"
                autofocus @click=""
              />
            </div>
          </template>
        </Dialog> -->
        <FinalPreview :show-preview="showPreview" :mobile="mobile" :all-form-fields="allFormFields" @change-preview="(val) => { showPreview = val }" />
      </DataTable>
      <div class="w-full flex justify-center mt-5">
        <Button label="Save & Continue" autofocus @click="" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { FilterMatchMode } from 'primevue/api'
import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'
import { FormFieldsData } from '../../../services/sampleData'
import SearchField from '../../shared/searchField.vue'
import MobilePreviewDialog from './MobilePreviewDialog.vue'
import FinalPreview from './FinalPreview'
import { templateEditorStore } from '@/composables/useTemplateEditorData'

const emit = defineEmits()

const confirm = useConfirm()
const mobile = ref(true)
const toast = useToast()
const showPreview = ref(false)
const formFields = ref()
const editingRows = ref([])
const currentRow = ref(null)
const isDraggedOver = ref({})
const id_for_row = ref(0)
const requiredOptions = ref([
  { label: 'Yes', value: true },
  { label: 'No', value: false },
])

const templateTitle = ref('')
const templateDescription = ref('')
const allFormFields = ref([])

watch(() => templateEditorStore.addedFields, (newVal) => {
  console.log('added fields', templateEditorStore.addedFields)
  if (templateEditorStore.addedFields?.length > 0)
    allFormFields.value = templateEditorStore.addedFields?.filter(f => f?.isFormField)
})
watch(allFormFields, (newVal) => {
  console.log('form fields in form editor', allFormFields.value)
})

watch([templateTitle, templateDescription], () => {
  const isValid = templateTitle.value !== ''
  emit('updateData', { isValid, step: 3 })
})

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
})

const dateFormats = ref([
  { label: 'MM/DD/YY', value: 'MM/DD/YY' },
  { label: 'DD/MM/YY', value: 'DD/MM/YY' },
  { label: 'YY/MM/DD', value: 'YY/MM/DD' },
])

const timeFormats = ref([
  { label: 'HH:MM:SS', value: 'HH:MM:SS' },
  { label: 'HH:MM:SS XM', value: 'HH:MM:SS XM' },
  { label: 'HH:MM', value: 'HH:MM' },
])

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
  { label: 'Checkbox', value: 'checkbox' },
]

function onUpload() {
  toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 })
}

function handlePreview() {
  showPreview.value = true
}

function handleDelete(event, data) {
  confirm.require({
    message: `Do you want to delete the form field "${data.name}"?`,
    header: 'Delete Confirmation',
    acceptLabel: 'Delete',
    rejectLabel: 'Cancel',
    icon: 'pi pi-exclamation-triangle text-red-500 w-8',
    rejectClass: 'p-button-text p-button-danger text-slate-400 bg-slate-400 hover:bg-slate-400',
    acceptClass: 'p-button-danger p-button-text bg-red-500 hover:bg-red-500',
    accept: () => {
      formFields.value = formFields.value.filter(item => item.id !== data.id)
      toast.add({ severity: 'info', summary: 'Confirmed', detail: `Form field "${data.name}" deleted`, life: 3000 })
    },
    reject: () => {
      toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 })
    },
  })
}

function getRowId(notSame) {
  if (notSame) {
    id_for_row.value += 1
    return id_for_row.value - 1
  }
  return id_for_row.value
}

function handleDragOver(id) {
  // Do something when element is dragged over
  isDraggedOver.value[id] = true
}

function handleDragLeave(id) {
  isDraggedOver.value[id] = false
}

onMounted(() => {
  // formFieldservice.getformFieldsMini().then((data) => (formFields.value = data));
  formFields.value = FormFieldsData
  for (let i = 0; i < formFields.value.length; i++)
    isDraggedOver.value[i] = false

  formFields.value.forEach((field) => {
    if (field.type === 'text')
      field.state = ref('')
    else if (field.type === 'multiline-text')
      field.state = ref('')
    else if (field.type === 'number')
      field.state = ref(0)
    else if (field.type === 'date')
      field.state = ref(new Date())
    else if (field.type === 'time')
      field.state = ref(new Date())
    else if (field.type === 'email')
      field.state = ref('')
    else if (field.type === 'image')
      field.state = ref('')
    else if (field.type === 'list')
      field.state = ref('')
    else if (field.type === 'checkbox')
      field.state = ref('')
    else if (field.type === 'signature')
      field.state = ref('')
  })
})

function onRowEditSave(event) {
  const { newData, index } = event
  formFields.value[index] = newData
  currentRow.value = null
}

function onRowEditCancel() {
  currentRow.value = null
}

function onRowEditInit(event) {
  // Disable row editing for other rows if another row is already being edited
  if (currentRow.value !== null && currentRow.value !== event.index)
    toast.add({ severity: 'warn', summary: 'Edit in Progress', detail: 'Please save or cancel the current edit before editing another row.', life: 3000 })

  else
    currentRow.value = event.index
}

function onRowReorder(event) {
  formFields.value = event.value
  toast.add({ severity: 'success', summary: 'Rows Reordered', life: 3000 })
}
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
