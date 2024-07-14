<template>
  <Dialog
    v-model:visible="showPreview" modal :draggable="false"
    :style="mobile ? { width: '25rem' } : { maxWidth: '90vw', width: 'max-content' }"
    :pt="{
      header: {
        class: ['flex items-center justify-between',
                'shrink-0', 'p-6', `pb-${mobile ? '0' : ''}`, 'border-t-0', 'rounded-tl-lg', 'rounded-tr-lg', 'bg-surface-0 dark:bg-surface-800',
                'text-surface-700 dark:text-surface-0/80'],
      },
    }"
  >
    <template #header>
      <div :class="`${mobile ? '' : 'pl-4'}`" class="flex flex-row gap-3 w-full">
        <p v-if="props?.isGeneratable" :class="` place-self-${mobile ? 'center' : 'start'} text-surface-600 capitalize text-[21px] text-[rgb(75,85,99)] font-semibold font-poppins form-title-preview`">
          {{ formTitle ? formTitle : templateData?.name }}
        </p>
        <div v-if="!props?.isGeneratable" class="flex flex-col">
          <i class="pi pi-mobile"></i>
          <RadioButton v-model="mobile" class="pl-0.5" input-id="mobile1" name="pizza" :value="true" />
        </div>
        <div v-if="!props?.isGeneratable" class="flex flex-col">
          <i class="pi pi-desktop"></i>
          <RadioButton v-model="mobile" class="pl-0.5" input-id="desktop1" name="pizza" :value="false" />
        </div>
        <div v-if="!props?.isGeneratable" class="mx-auto place-self-center flex flex-row">
          <img src="../../../assets/icons/LogoMark.svg" class="w-12 h-auto " />
          <img v-if="!isCollapsed" src="../../../assets/icons/logotext.svg" class="w-36 ml-1 h-auto" />
        </div>
      </div>
    </template>
    <template #default>
      <div class="flex">
        <div :class="`flex flex-col gap-4 w-96 ${mobile ? '' : 'pl-4'}`">
          <!-- <p :class="` place-self-${mobile ? 'center' : 'start'} text-surface-600 capitalize text-[21px] text-[rgb(75,85,99)] font-semibold font-poppins form-title-preview`">
            {{ templateData.name }}
          </p> -->
          <div class="w-80 place-self-center text-justify mb-4">
            {{ formDescription }}
          </div>

          <div class="w-full place-self-start flex flex-col gap-5">
            <div v-for="(formField, index) in fields" :key="formField.id">
              <div v-if="formField.fieldType === 'Form text'" class="flex flex-col gap-2">
                <label :for="`${formField.name}-${index}`">
                  <div class="flex flex-row gap-2">
                    <div class="font-poppins font-normal text-[rgb(75,85,99)] text-[16px] leading-[25px] capitalize">{{ formField.name }}</div>
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

              <div v-else-if="formField.fieldType === 'Form long text'" class="flex flex-col gap-2">
                <label :for="`${formField.name}-${index}`">
                  <div class="flex flex-row gap-2">
                    <div class="font-poppins font-normal text-[rgb(75,85,99)] text-[16px] leading-[25px] capitalize">{{ formField.name }}</div>
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

              <div v-else-if="formField.fieldType === 'Form date'" class="flex flex-col gap-2">
                <label :for="`${formField.name}-${index}`">
                  <div class="flex flex-row gap-2">
                    <div class="font-poppins font-normal text-[rgb(75,85,99)] text-[16px] leading-[25px] capitalize">{{ formField.name }}</div>
                    <div v-if="formField.mandatory" class="text-red-500">*</div>
                  </div>
                </label>
                <Calendar
                  v-model="formField.state" show-icon icon-display="input"
                  :input-id="`${formField.name}-${index}`"
                />
              </div>

              <div v-else-if="formField.fieldType === 'Form time'" class="flex flex-col gap-2">
                <label :for="`${formField.name}-${index}`">
                  <div class="flex flex-row gap-2">
                    <div class="font-poppins font-normal text-[rgb(75,85,99)] text-[16px] leading-[25px] capitalize">{{ formField.name }}</div>
                    <div v-if="formField.mandatory" class="text-red-500">*</div>
                  </div>
                </label>
                <Calendar
                  :id="`${formField.name}-${index}`" v-model="formField.state" time-only hour-format="12" show-icon
                  icon-display="input" icon="pi pi-clock"
                />
              </div>

              <div v-else-if="formField.fieldType === 'Form image'" class="flex flex-col gap-2">
                <label :for="`${formField.name}-${index}`">
                  <div class="flex flex-row gap-2">
                    <div class="font-poppins font-normal text-[rgb(75,85,99)] text-[16px] leading-[25px] capitalize">{{ formField.name }}</div>
                    <div v-if="formField.mandatory" class="text-red-500">*</div>
                  </div>
                </label>
                <FileUpload
                  :id="`${formField.name}-${index}`" v-model="formField.state" mode="basic" name="demo[]"
                  accept="image/*" @input="(e) => onImageUpload(e, formField)"
                />
              </div>

              <div v-else-if="formField.fieldType === 'Form list'" class="flex flex-col gap-2">
                <label :for="`${formField.name}-${index}`">
                  <div class="flex flex-row gap-2">
                    <div class="font-poppins font-normal text-[rgb(75,85,99)] text-[16px] leading-[25px] capitalize">{{ formField.name }}</div>
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

              <div v-else-if="formField.fieldType === 'Form checkbox group' " class="flex flex-col gap-2">
                <label :for="`${formField.name}-${index}`">
                  <div class="flex flex-row gap-2">
                    <div class="font-poppins font-normal text-[rgb(75,85,99)] text-[16px] leading-[25px] capitalize">{{ formField.name }}</div>
                    <div v-if="formField.mandatory" class="text-red-500">*</div>
                  </div>
                </label>
                <div v-for="(checkbox, i) in formField?.checkboxes" :key="i" class="flex items-center gap-2">
                  <div class="w-12 h-12  flex items-center">
                    <Checkbox v-model="checkbox.state" :binary="true" class="scale-150 m-2" />
                  </div>
                  <p class="font-poppins font-normal text-[rgb(107,114,128)] text-[16px] leading-[25px] ">
                    {{ checkbox?.text }}
                  </p>
                </div>
                <!-- <InputText
                  :id="`${formField.name}-${index}`"
                  v-model="formField.state" :class="`${formField.mandatory && formField.state.trim().length === 0 ? 'border-red-700' : ''}`" class="border-red-500"
                /> -->
                <small v-if="formField.mandatory && formField.state.trim().length === 0" class="text-red-600">This
                  Field is required</small>
              </div>

              <div v-else-if="formField.fieldType === 'signature'" class="flex flex-col gap-2">
                <label :for="`${formField.name}-${index}`">
                  <div class="flex flex-row gap-2">
                    <div class="font-poppins font-normal text-[rgb(75,85,99)] text-[16px] leading-[25px] capitalize">{{ formField.name }}</div>
                    <div v-if="formField.mandatory" class="text-red-500">*</div>
                  </div>
                </label>
                <InputText :id="`${formField.name}-${index}`" v-model="formField.state" class="border-red-500" />
              </div>
            </div>
            <div :class="`w-full flex ${mobile ? 'justify-center' : 'justify-start pl-16'} mt-5`">
              <Button
                class="font-poppins"
                severity="success"
                :disabled="!props?.isGeneratable"
                label="Spawn document"
                autofocus
                @click="generateDocument"
              />
            </div>
          </div>
        </div>
        <div v-if="!mobile" class=" min-h-full  bg-primary-50 flex-1 ml-12   flex justify-center items-center" :class="{ 'w-max md:w-max': props.isGeneratable, 'w-[50vw] md:w-[50vw]': !props.isGeneratable }">
          <div v-if="props.isGeneratable" :class="{ 'w-max md:w-max': props.isGeneratable, 'w-[50vw] md:w-[50vw]': !props.isGeneratable }">
            <CanvasPreview :template="props.templateData" :form-values="fields" :selected-rows="fields" :refresh="refresherNumber" />
          </div>
          <p v-else class="font-poppins text-lg">
            Template Live preview
          </p>
        </div>
      </div>
    </template>
    <template #footer>
      <!-- <div :class="`w-full flex ${mobile ? 'justify-center' : 'justify-start pl-16'} mt-5`">
        <Button
          :disabled="!props?.isGeneratable"
          label="Generate Document"
          autofocus
          @click="generateDocument"
        />
      </div> -->
      <Dialog v-model:visible="showGeneratedDocsModal" modal header="Generating docs" :style="{ width: '25rem' }">
        <div v-if="isGeneratingDoc" class="w-300 flex py-6 justify-center items-center">
          <p>currently generating</p>
          <ProgressSpinner />
        </div>
        <div v-else>
          <p>Generated:</p>
          <div v-for="(doc, i) in allGeneratedDocs" :key="i" class="flex gap-6 items-center py-2">
            <p>{{ i }}</p>
            <Button class="w-max px-3">
              <a :href="doc" target="_blank">Download</a>
            </Button>
            <!-- <p>{{ doc }}</p> -->
          </div>
        </div>
      </Dialog>
      <Toast position="top-right" group="bc" @close="onClose">
        <template #message="slotProps">
          <div class="flex flex-col items-start flex-auto">
            <div class="flex items-center gap-2">
              <font-awesome-icon icon="fa-bold fa-check" size="lg" />
              <span class="font-bold">Operation complete</span>
            </div>
            <!-- <div class="font-medium text-lg my-4">
              {{ slotProps.message.summary }}
            </div> -->
            <div class="flex gap-2 mt-4">
              <Button size="small" label="Download All" severity="success" @click="downlaodAllDocuments()" />
              <Button outlined size="small" label="Open Doument library" severity="success" @click="navigateDocumentLibrary()" />
            </div>
          </div>
        </template>
      </Toast>
      <Toast position="top-right" group="ac" @close="onClose">
        <template #message="slotProps">
          <div class="flex flex-col items-start flex-auto">
            <div class="flex items-center gap-2">
              <font-awesome-icon icon="fa-bold fa-clock-rotate-left" size="lg" class="rotate-180" />
              <div>
                <p class="font-bold">
                  {{ slotProps?.message?.summary }}
                </p>
                <p class="font-normal">
                  {{ slotProps?.message?.detail }}
                </p>
              </div>
            </div>
          </div>
        </template>
      </Toast>
    </template>
  </Dialog>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { useToast } from 'primevue/usetoast'
import { useRouter } from 'vue-router'
import CanvasPreview from '@/components/template/DocGenerationModals/FormToDocCanvasPreview'
import uploadFileToBackend from '~/services/uploadFileToBackend'

const props = defineProps(['showPreview', 'mobile', 'allFormFields', 'formTitle', 'formDescription', 'isGeneratable', 'templateData'])
const emit = defineEmits(['changePreview'])
const toast = useToast()
const router = useRouter()
const fields = ref([])
const showPreview = ref(false)
const mobile = ref(false)
const isGeneratingDoc = ref(false)
const showGeneratedDocsModal = ref(false)
const allGeneratedDocs = ref([])
const runtimeConfig = useRuntimeConfig()
const refresherNumber = ref(0)
function generateRandom() {
  const random = Math.floor(Math.random() * 1000) + 1
  refresherNumber.value = random
}
onMounted(() => {
  showPreview.value = props.showPreview
  mobile.value = props.mobile
  fields.value = props?.allFormFields
})

watch(() => props?.showPreview, (newVal, oldVal) => {
  if (newVal === oldVal)
    return
  showPreview.value = newVal
})

watch(() => props?.allFormFields, (newVal, oldVal) => {
  if (newVal === oldVal)
    return
  fields.value = newVal
})

watch(showPreview, (newVal) => {
  emit('changePreview', newVal)
})

async function onImageUpload(e, formField) {
  const file = e.target.files[0]
  const url = await uploadFileToBackend(file)
  formField.state = url
  // fileUrl.value = url
}
// Function to collect all form data
async function generateDocument() {
  // isGeneratingDoc.value = true
  // showGeneratedDocsModal.value = true
  toast.add({ severity: 'success', summary: 'Generating documents', detail: 'Your request is being processed', life: 10000, group: 'ac' })
  const formData = fields.value.map(field => ({
    ...field,
    // value: field.state,
  }
  ))
  console.log('Form Data:', formData)
  // Add additional logic to handle form data if necessary
  const objToSend = {
    finalData: formData,
  }
  try {
    const response = await fetch(`${runtimeConfig.public.BASE_URL}/generate-documents/formToDoc/${props.templateData?.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Specify content type as JSON
      },
      body: JSON.stringify(objToSend), // Serialize the object to JSON string
    })
    if (!response.ok)
      throw new Error(`Network response was not ok ${response.statusText}`)

    const data = await response.json()
    isGeneratingDoc.value = false
    allGeneratedDocs.value = data?.generatedDocs
    showGeneratedDocToast()
    // toast.add({ severity: 'success', summary: 'Operation complete', detail: 'Docs Generated successfully', life: 4000 })
  }
  catch (error) {
    // console.error('Error:', error)
    isGeneratingDoc.value = false
    toast.add({ severity: 'error', summary: 'Operation failed', detail: 'Unable to generate the docs', life: 5000 })
  }
}

const visible = ref(false)

function showGeneratedDocToast() {
  if (!visible.value) {
    toast.add({ severity: 'success', summary: 'Can you send me the report?', group: 'bc' })
    visible.value = true
  }
}

function onReply() {
  toast.removeGroup('bc')
  visible.value = false
}

function onClose() {
  visible.value = false
}

function downlaodAllDocuments() {
  // console.log('all generated docs', allGeneratedDocs.value)
  allGeneratedDocs.value?.forEach((url, index) => {
    fetch(url)
      .then(response => response.blob())
      .then((blob) => {
        const a = document.createElement('a')
        const objectUrl = URL.createObjectURL(blob)
        a.href = objectUrl
        a.download = `file_${index + 1}.pdf` // Adjust the file name as needed
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(objectUrl)
      })
      .catch((error) => {
        console.error(`Error downloading file ${index + 1}:`, error)
      })
  })
}
function navigateDocumentLibrary() {
  router.push('document-library')
}
</script>

<!-- <template>
  <Dialog
    v-model:visible="showPreview" modal :draggable="false"
    :style="mobile ? { width: '25rem' } : { maxWidth: '90vw', width: 'max-content' }" :pt="{
      header: {
        class: ['flex items-center justify-between',
                'shrink-0', 'p-6', `pb-${mobile ? '0' : ''}`, 'border-t-0', 'rounded-tl-lg', 'rounded-tr-lg', 'bg-surface-0 dark:bg-surface-800',
                'text-surface-700 dark:text-surface-0/80'],
      },
    }"
  >
    <template #header>
      <div :class="`${mobile ? '' : 'pl-4'}`" class="flex flex-row gap-3 w-full">
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
      <div class="flex">
        <div :class="`flex flex-col gap-4 w-96 ${mobile ? '' : 'pl-4'}`">
          <p :class="` place-self-${mobile ? 'center' : 'start'} text-xl font-semibold form-title-preview`">
            {{
              formTitle }}
          </p>
          <div class="w-80 place-self-center text-justify mb-4">
            {{ formDescription }}
          </div>

          <div class="w-full place-self-start flex flex-col gap-5">
            <div v-for="(formField, index) in fields" :key="formField.id">
              <div v-if="formField.fieldType === 'Form text'" class="flex flex-col gap-2">
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

              <div v-else-if="formField.fieldType === 'Form long text'" class="flex flex-col gap-2">
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

              <div v-else-if="formField.fieldType === 'Form date'" class="flex flex-col gap-2">
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

              <div v-else-if="formField.fieldType === 'Form time'" class="flex flex-col gap-2">
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

              <div v-else-if="formField.fieldType === 'Form image'" class="flex flex-col gap-2">
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

              <div v-else-if="formField.fieldType === 'Form list'" class="flex flex-col gap-2">
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

              <div v-else-if="formField.fieldType === 'Form checkbox group' " class="flex flex-col gap-2">
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

              <div v-else-if="formField.fieldType === 'signature'" class="flex flex-col gap-2">
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
        <div v-if="!mobile" class="w-max md:w-max min-h-full  bg-primary-50 flex-1 ml-12 border  flex justify-center items-center">
          <div v-if="props.isGeneratable" class="w-max md:w-max">
            <CanvasPreview :template="props.templateData" :selected-rows="[]" />
          </div>
          <p v-else class="font-poppins text-lg">
            Template Live preview
          </p>
        </div>
      </div>
    </template>
    <template #footer>
      <div :class="`w-full flex ${mobile ? 'justify-center' : 'justify-start pl-16'} mt-5`">
        <Button
          label="Generate Document"
          autofocus
        />
      </div>
    </template>
  </Dialog>
</template>

<script setup>
import CanvasPreview from '@/components/template/DocGenerationModals/FormToDocCanvasPreview'

const props = defineProps(['showPreview', 'mobile', 'allFormFields', 'formTitle', 'formDescription', 'isGeneratable', 'templateData'])
const emit = defineEmits(['changePreview'])
const fields = ref()
const showPreview = ref()

const mobile = ref()
onMounted(() => {
  console.log('props ', props, props.isGeneratable, props.templateData)
  showPreview.value = props.showPreview
  mobile.value = props.mobile
  fields.value = props?.allFormFields
})
watch(mobile, (newVal) => {
  console.log(' mobile', newVal)
})
watch(() => props?.showPreview, (newVal, oldVal) => {
  if (newVal === oldVal)
    return
  showPreview.value = newVal
})
watch(() => props?.allFormFields, (newVal, oldVal) => {
  if (newVal === oldVal)
    return
  fields.value = newVal
})
watch(showPreview, (newVal) => {
  emit('changePreview', newVal)
})
</script> -->
