<template>
  <div class="mt-20">
    <p class="text-surface-600 font-poppins text-xl font-medium mb-1">
      Checkbox formats
    </p>
    <div class="">
      <div class="flex justify-between items-center mb-8">
        <p class="text-surface-500 font-poppins text-lg mb-2">
          Customize the format and design of elements within DocSpawn.
        </p>
        <Button
          icon="pi pi-plus"
          label="Add checkbox option"
          severity="success"
          outlined
          class="rounded-lg text-success border-success hover:bg-green-50"
          @click="handleAdd"
        />
      </div>
      <DataTable
        striped-rows
        show-gridlines
        :value="checkboxData"
        :rows="10"
        table-style="min-width: 50rem; border-radius:20%;"
        class="rounded-md p-datatable-header p-datatable-wrapper"
      >
        <!-- DataTable content -->
        <template #empty>
          <p class="flex text-center">
            No data
          </p>
        </template>

        <Column
          field="design"
          header="Design"
          :header-style="{ height: '4.5rem' }"
        >
          <template #body="{ data, field }">
            <div class="flex items-center space-x-4">
              <img :src="data[field]" alt="" class="w-[32px] h-[32px]" />
              <p v-if="data?.empty" class="font-poppins">
                (empty)
              </p>
              <p v-if="data?.default" class="font-poppins text-primary-500">
                (default)
              </p>
            </div>
          </template>
        </Column>
        <Column field="type" header="Type" :header-style="{ height: '4.5rem' }">
          <template #body="{ data, field }">
            <div class="flex items-center space-x-4">
              <p class="font-poppins">
                {{ data[field] }}
              </p>
            </div>
          </template>
        </Column>

        <Column
          field="active"
          header="Active"
          :header-style="{ height: '4.5rem' }"
        >
          <template #body="{ data, field }">
            <div class="flex items-center space-x-4">
              <!-- <p class="font-poppins">
                {{ data[field] }}
              </p> -->
              <!-- <ToggleButton v-model="checked" on-label="On" off-label="Off" /> -->

              <ToggleSwitch
                :disabled="data.account_type === 'by_default'"
                :curr-val="activeCheckboxIds.includes(data.id)"
                @update-curr-val="(e) => changeActiveStatus(e, data)"
              />
              <!-- {{ activeCheckboxIds.includes(data.id) }} -->
            </div>
          </template>
        </Column>

        <Column
          field="action"
          header="Action"
          header-style="text-center"
          style="width: 5%"
        >
          <template #body="{ data }">
            <!-- setting it conditional because default is for all -->
            <div v-if="data.account_type !== 'by_default'" class="flex pl-3">
              <!-- v-if="data.account_type !== 'by_default'" -->
              <i
                class="pi pi-pencil text-success text-lg custom-icon cursor-pointer"
                @click="handleEdit(data)"
              ></i>
            </div>
          </template>
        </Column>
      </DataTable>

      <!-- Add -->
      <Dialog v-model:visible="openAddModal" modal :style="{ width: '40rem' }">
        <template #header>
          <p class="text-surface-700 font-poppins text-xl font-medium">
            Add checkboxes options
          </p>
        </template>
        <p class="text-surface-600 font-poppins text-lg font-normal">
          Type:
        </p>

        <div class="flex space-x-24 mt-4">
          <div class="flex items-center">
            <RadioButton
              v-model="selection"
              input-id="checked"
              name="status"
              value="checked"
            />
            <label for="checked" class="text-lg font-poppins text-surface-600">Checked</label>
          </div>

          <div class="flex items-center">
            <RadioButton
              v-model="selection"
              input-id="unchecked"
              name="status"
              value="unchecked"
            />
            <label for="unchecked" class="text-lg font-poppins text-surface-600">Unchecked</label>
          </div>
        </div>
        <div class="flex mt-6 gap-2 items-center">
          <Checkbox v-model="isDefaultChoice" disabled :binary="true" />
          <p class="text-lg text-surface-600">
            Set as default choice
          </p>
        </div>
        <div class="mt-7">
          <p class="text-surface-600 font-poppins text-lg font-normal mb-2">
            Select option image to upload
          </p>
          <p class="text-surface-600 font-poppins text-lg font-normal mb-6">
            Accepted image formats: transparent PNG files, 64x64px
          </p>
          <!-- <FileUpload ref="fileupload" mode="basic" name="demo[]" url="/api/upload" accept="image/png" :max-file-size="1000000" @upload="onUpload" /> -->
          <!-- <input
            class="border border-gray-300 p-1 mt-2 w-full text-sm"
            type="file"
            @change="getFile"
          /> -->
          <ImageInput :aspect-ratio="1" :is-checkbox="true" @handle-save-cropped-image="(url) => fileUrl = url" />

          <img
            v-if="fileUrl"
            id="output"
            accept="image/*"
            class="mt-5 object-cover h-auto w-[64px]"
            :src="fileUrl"
          />
          <!-- <div
            class="flex justify-center items-center mt-5"
            @dragover.prevent="handleDragOver()"
            @dragenter.prevent=" handleDragEnter()"
            @dragleave.prevent="handleDragLeave()"
            @drop.prevent="handleFileDrop($event)"
          >
            <div class="flex justify-center items-center border-dashed border-2 w-96 mb-6 border-gray-400 flex-col h-[300px] md:h-[155px] sm:items-center px-4 py-2 gap-2 rounded-lg bg-surface-50">
              <font-awesome-icon :icon="fad.faUpload" size="2xl" style="--fa-primary-color: #009ee2; --fa-secondary-color: #009ee2; width: 40px; height: 30px;" />
              <p class="text-primaryBlue font-bold font-poppins text-lg text-center mt-2">
                Drop your data here
              </p>
            </div>
          </div> -->
        </div>
        <div class="flex justify-center mt-10">
          <Button
            :disabled="!selection || !fileUrl"
            type="button"
            :label="checkboxToEdit?.id ? 'Update' : 'Upload'"
            severity="success"
            class="w-32"
            @click="() => checkboxToEdit?.id ? updateCheckbox() : submitCheckbox()"
          />
        </div>
      </Dialog>
      <!-- <Toast /> -->
      <Toast position="top-right">
        <template #message="slotProps">
          <div class="flex items-start space-x-2">
            <div class="mt-1">
              <font-awesome-icon
                :icon="fal.faFileCircleXmark"
                size="lg"
                style="color: #c8432f"
              />
            </div>
            <div class="">
              <div class="font-bold text-lg font-poppins text-error">
                {{ slotProps.message.summary }}
              </div>
              <div class="font-normal text-base font-poppins text-error">
                {{ slotProps.message.detail }}
              </div>
            </div>
          </div>
        </template>
      </Toast>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useToast } from 'primevue/usetoast'
import { fad } from '@fortawesome/pro-duotone-svg-icons'
import { fal } from '@fortawesome/pro-light-svg-icons'

// import ToggleButton from 'primevue/togglebutton'
// import InputSwitch @click="chnageActiveStatus" from "primevue/inputswitch";
import { ImageInput } from '@docspawn/shared-doc-generation-modals'
import ToggleSwitch from './ToggleSwitch.vue'

import uploadFileToBackend from '~/services/uploadFileToBackend'

import { useAuth } from '@/composables/useAuth'

const isChecked = ref(true)

const checked = ref()
const unchecked = ref()
const isDefaultChoice = ref(false)

const { user } = useAuth()

const runtimeConfig = useRuntimeConfig()

const openAddModal = ref(false)
const toast = useToast()
const fileupload = ref()
const fileTypeCheck = ref(false)
const fileUrl = ref()
const selection = ref()
const checkboxToEdit = ref()

async function getFile(e) {
  const file = e.target.files[0]
  const url = await uploadFileToBackend(file)
  fileUrl.value = url
}
async function submitCheckbox() {
  console.log('file url', fileUrl.value)
  console.log('selection', selection.value)
  const objToSend = {
    design: fileUrl.value,
    default: isDefaultChoice.value,
    type: selection.value === 'checked' ? 'checked' : 'unchecked',
    account_type: user?.value?.email,
  }
  console.log('obj to send', objToSend)
  try {
    const response = await fetch(
      `${runtimeConfig.public.BASE_URL}/checkboxOptions`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Specify content type as JSON
        },
        body: JSON.stringify(objToSend), // Serialize the object to JSON string
      },
    )
    if (!response.ok)
      throw new Error(`Network response was not ok ${response.statusText}`)

    // const data = await response.json()
    fetchCheckboxOptions()
    toast.add({
      severity: 'success',
      summary: 'Info',
      detail: 'Checkbox added successfully',
      life: 1000,
    })
    openAddModal.value = false
  }
  catch (error) {
    console.error('Error:', error)
    toast.add({
      severity: 'error',
      summary: 'Info',
      detail: 'Unable to add the checkbox',
      life: 5000,
    })
    openAddModal.value = false
  }
  //   openAddModal.value = false
}
async function updateCheckbox() {
  console.log('fileUrl', fileUrl.value)
  console.log('selection', selection.value)
  const objToSend = {
    ...checkboxToEdit.value,
    default: isDefaultChoice.value,
    design: fileUrl.value,
    type: selection.value === 'checked' ? 'checked' : 'unchecked',
  }
  console.log('obj to send', objToSend)
  try {
    const response = await fetch(
      `${runtimeConfig.public.BASE_URL}/checkboxOptions/${checkboxToEdit.value?.id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json', // Specify content type as JSON
        },
        body: JSON.stringify(objToSend), // Serialize the object to JSON string
      },
    )
    if (!response.ok)
      throw new Error(`Network response was not ok ${response.statusText}`)

    // const data = await response.json()
    fetchCheckboxOptions()
    toast.add({
      severity: 'success',
      summary: 'Info',
      detail: 'Checkbox updated successfully',
      life: 1000,
    })
    openAddModal.value = false
  }
  catch (error) {
    console.error('Error:', error)
    toast.add({
      severity: 'error',
      summary: 'Info',
      detail: 'Unable to update the checkbox',
      life: 5000,
    })
    openAddModal.value = false
  }
}
function upload() {
  onUpload()
  fileupload.value.upload()
}

function onUpload() {
  toast.add({
    severity: 'success',
    summary: 'Success',
    detail: 'File Uploaded',
    life: 3000,
  })
  openAddModal.value = false
}
const activeCheckboxIds = ref([])
const checkboxData = ref([
  //   { design: '', checked: 'no', unchecked: 'yes', active: 'yes' },
  //   { design: 'https://www.svgrepo.com/show/309415/checkbox-unchecked.svg', checked: 'no', unchecked: 'yes', active: 'no' },
  //   { design: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGkoye-JREbY97QiHfOgZXflotJi5numxwXA&s', checked: 'yes', unchecked: 'no', active: 'yes' },
])
watch(checkboxData, (val) => {
  console.log('checkbox data val', val)
  activeCheckboxIds.value = val
    ?.filter(v => v?.active === 'yes')
    ?.map(f => f?.id)
})
watch(activeCheckboxIds, (val) => {
  console.log('active checkbox id', val)
})
async function fetchCheckboxOptions() {
  if (!user?.value?.email)
    return
  try {
    // console.log('${runtimeConfig.public.BASE_URL}/templates', `${runtimeConfig.public.BASE_URL}/templates`)
    const response = await fetch(
      `${runtimeConfig.public.BASE_URL}/checkboxOptions/${user?.value?.email}`,
    )
    if (!response.ok)
      throw new Error(`Network response was not ok ${response.statusText}`)
    const data = await response.json()
    console.log('checkboxOptions', data)

    if (data?.length > 0) {
      checkboxData.value = data?.sort((a, b) => {
        return a.id - b.id
      })
    }

    // console.log('response of fetching templates', data)
  }
  catch (error) {
    console.error('Error fetching templates:', error)
  }
}
onMounted(() => {
  fetchCheckboxOptions()
})

function handleEdit(data) {
  console.log('handle edit', data)
  openAddModal.value = true
  checkboxToEdit.value = data
  selection.value = data?.type
  fileUrl.value = data?.design
  isDefaultChoice.value = data?.default
}

function handleAdd() {
  checkboxToEdit.value = {}
  selection.value = ''
  fileUrl.value = ''
  isDefaultChoice.value = false
  openAddModal.value = true
}

function showError() {
  toast.add({
    severity: 'error',
    summary: 'Invalid file format',
    detail: 'Please upload a .png file',
    life: 3000,
  })
}

function handleDragOver() {}

function handleDragEnter() {}

function handleDragLeave() {}

function handleFileDrop(event) {
  const files = event.dataTransfer.files

  if (!files[0]) {
    showError()
  }
  else {
    const fileName = files[0].name
    const fileType = fileName.split('.').pop()

    if (fileType === 'png') {
      fileTypeCheck.value = true
      handleFileUpload(files)
    }
    else {
      fileTypeCheck.value = false
      showError()
    }
  }
}

function handleFileUpload(files) {
  // Add your file upload logic here
  // This function is assumed to handle the actual file upload process
}
async function changeActiveStatus(e, data) {
  try {
    let isActive = false
    if (activeCheckboxIds.value?.includes(data?.id)) {
      activeCheckboxIds.value = activeCheckboxIds.value.filter(
        v => v !== data?.id,
      )
      isActive = false
    }
    else {
      isActive = true
      activeCheckboxIds.value = [...activeCheckboxIds.value, data?.id]
    }
    const response = await fetch(
      `${runtimeConfig.public.BASE_URL}/checkboxOptions/${data?.id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json', // Specify content type as JSON
        },
        body: JSON.stringify({ ...data, active: isActive ? 'yes' : 'no' }), // Serialize the object to JSON string
      },
    )
    if (!response.ok)
      throw new Error(`Network response was not ok ${response.statusText}`)

    // const data = await response.json()
    // fetchCheckboxOptions()

    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Active status changed successfully',
      life: 1000,
    })
  }
  catch (err) {
    console.log('error>>>', err)
    toast.add({
      severity: 'error',
      summary: 'Error ',
      detail: 'Unable to update active state',
      life: 3000,
    })
  }
}
</script>

<style scoped>
::v-deep .p-datatable-table > thead > tr:first-of-type > th:first-of-type {
  border-radius: 0.5rem 0 0 0 !important;
}

/* Top Right Would be: */
::v-deep .p-datatable-table > thead > tr:first-of-type > th:last-of-type {
  border-radius: 0 0.5rem 0 0 !important;
}

/* Bottom Left Would Be: */
::v-deep .p-datatable-table > tbody > tr:last-of-type > td:first-of-type {
  border-radius: 0 0 0 0.5rem !important;
}

/* Bottom Right Would Be: */
::v-deep .p-datatable-table > tbody > tr:last-of-type > td:last-of-type {
  border-radius: 0 0 0.5rem 0 !important;
}
::v-deep .p-inputswitch-input {
  opacity: 0 !important;
}
</style>
