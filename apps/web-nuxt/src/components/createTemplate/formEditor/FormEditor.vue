<template>
  <div>
    <p class="font-semibold text-surface-600 text-2xl mb-5 flex text-center justify-center">
      {{ $t('Cp_createTemplate_formEditor.form_editor') }}
    </p>
    <div class="flex flex-row my-2 items-center">
      <div class="flex flex-row items-center">
        <div class="flex flex-col gap-2">
          <label for="username" class="font-medium text-surface-600 text-lg font-poppins">{{ $t('Cp_createTemplate_formEditor.template_name') }} <span class="text-red-500">*</span></label>
          <InputText id="formTitle" v-model="templateTitle" class="w-80 font-poppins text-surface-600 text-lg pl-5" aria-describedby="FormTitle-help" />
        </div>
        <div class="ml-14 flex flex-col gap-2">
          <label for="username" class="text-surface-600 font-poppins font-medium text-lg">{{ $t('Cp_createTemplate_formEditor.template_description') }}</label>
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
          {{ $t('Cp_createTemplate_formEditor.see_preview') }}
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
              {{ $t('Cp_createTemplate_formEditor.form_fields') }}
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

        <Column field="name" header="{{ $t('Cp_createTemplate_formEditor.name') }}" style="width: 10%" :header-style="{ height: '4.5rem' }">
          <template #editor="{ data, field }">
            <InputText v-model="data[field]" />
          </template>
        </Column>

        <Column field="fieldType" header="{{ $t('Cp_createTemplate_formEditor.type') }}" style="width: 9%">
          <template #editor="{ data, field }">
            <Dropdown
              v-model="data[field]" class="max-w-44" :options="fieldTypes" option-label="label" option-value="value"
              placeholder="{{ $t('Cp_createTemplate_formEditor.select_format') }}"
            >
              <template #option="slotProps">
                <p>{{ slotProps.option.label }}</p>
              </template>
            </Dropdown>
          </template>
        </Column>

        <Column field="isRequired" header="{{ $t('Cp_createTemplate_formEditor.mandatory') }}" style="width: 1%">
          <template #editor="{ data, field }">
            <Dropdown
              v-model="data[field]" class="max-w-28" :options="requiredOptions" option-label="label"
              option-value="value" placeholder="{{ $t('Cp_createTemplate_formEditor.select_format') }}"
            >
              <template #option="slotProps">
                <p>{{ slotProps.option.label }}</p>
              </template>
            </Dropdown>
          </template>
          <template #body="slotProps">
            <p>{{ slotProps.data.isRequired ? $t('Cp_createTemplate_formEditor.yes') : $t('Cp_createTemplate_formEditor.no') }}</p>
          </template>
        </Column>

        <Column field="fieldFormat" header="{{ $t('Cp_createTemplate_formEditor.field_format') }}" class="min-w-40 " style="width: 7%">
          <template #editor="{ data, field }">
            <Dropdown
              v-if="data.fieldType === 'Form date' || data.type === 'Form time'" v-model="data[field]" class="max-w-48"
              :options="data.type === 'date' ? dateFormats : timeFormats" option-label="label" option-value="value"
              placehlder="{{ $t('Cp_createTemplate_formEditor.select_format') }}"
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

        <Column field="fieldDescription" header="{{ $t('Cp_createTemplate_formEditor.description') }}" style="width: 30%">
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
        <Column header="{{ $t('Cp_createTemplate_formEditor.delete') }}" style="width: 4%;" body-style="text-align:center" header-style="text-center">
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

        <FinalPreview :show-preview="showPreview" :mobile="mobile" :form-title="templateTitle" :form-description="templateDescription" :all-form-fields="allFormFields" @change-preview="(val) => { showPreview = val }" />
      </DataTable>
      <!-- <div class="w-full flex justify-center mt-5">
        <Button label="Save & Continue" autofocus @click="" />
      </div> -->
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
import { templateGeneralInformation } from '@/composables/useTemplateCreationData'

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

watch(() => templateEditorStore.addedFields, () => {
  if (templateEditorStore.addedFields?.length > 0)
    allFormFields.value = templateEditorStore.addedFields?.filter(f => f?.isFormField)
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
  if (templateEditorStore.addedFields?.length > 0)
    allFormFields.value = templateEditorStore.addedFields?.filter(f => f?.isFormField)
  if (templateGeneralInformation?.name)
    templateTitle.value = templateGeneralInformation?.name
  // formFieldservice.getformFieldsMini().then((data) => (formFields.value = data));
  // formFields.value = FormFieldsData
  // for (let i = 0; i < formFields.value.length; i++)
  //   isDraggedOver.value[i] = false

  // formFields.value.forEach((field) => {
  //   if (field.type === 'text')
  //     field.state = ref('')
  //   else if (field.type === 'multiline-text')
  //     field.state = ref('')
  //   else if (field.type === 'number')
  //     field.state = ref(0)
  //   else if (field.type === 'date')
  //     field.state = ref(new Date())
  //   else if (field.type === 'time')
  //     field.state = ref(new Date())
  //   else if (field.type === 'email')
  //     field.state = ref('')
  //   else if (field.type === 'image')
  //     field.state = ref('')
  //   else if (field.type === 'list')
  //     field.state = ref('')
  //   else if (field.type === 'checkbox')
  //     field.state = ref('')
  //   else if (field.type === 'signature')
  //     field.state = ref('')
  // })
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
