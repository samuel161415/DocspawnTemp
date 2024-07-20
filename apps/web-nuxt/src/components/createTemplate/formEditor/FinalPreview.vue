<template>
  <Dialog
    v-model:visible="showPreview"
    modal
    :draggable="false"
    :style="mobile ? { width: '28rem' } : { maxWidth: '90vw', width: 'max-content' }"
    :pt="{
      header: {
        class: [
          'flex items-center justify-between',
          'shrink-0',
          'p-6',
          `pb-${mobile ? '0' : ''}`,
          'border-t-0',
          'rounded-tl-lg',
          'rounded-tr-lg',
          'bg-surface-0 dark:bg-surface-800',
          'text-surface-700 dark:text-surface-0/80',
        ],
      },
    }"
  >
    <template #header>
      <div :class="`${mobile ? '' : 'pl-4'}`" class="flex flex-row gap-3 w-full">
        <!-- <p v-if="props?.isGeneratable" :class="` place-self-${mobile ? 'center' : 'start'} text-surface-600  text-[21px] text-[rgb(75,85,99)] font-semibold font-poppins form-title-preview`">

        </p> -->
        <div v-if="isGeneratable" class="inline-flex align-items-center justify-content-center gap-2">
          <span class="text-lg text-primary-600 font-poppins font-normal">Form To Doc generation</span>
        </div>
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
        <div :class="`flex flex-col gap-4 ${props?.isGeneratable && 'min-w-[400px]'} rounded-md w-96 ${mobile ? '' : 'pl-4'}`">
          <div class="mb-0 h-[58px] w-200  flex items-center justify-between px-3  mb-0 rounded-md bg-primary-50   " :class="{ 'mt-4': !props?.isGeneratable }">
            <p class="text-surface-600 capitalize text-[18px] text-[rgb(75,85,99)] font-semibold font-poppins form-title-preview text-center w-full  ">
              {{ formTitle ? formTitle : templateData?.name }}
            </p>
          </div>

          <div v-if="formDescription" class="w-80 place-self-center text-justify my-1">
            {{ formDescription }}
          </div>

          <div class="w-full place-self-start flex flex-col gap-5 bg-surface-50 p-4  ">
            <!-- h-[70vh] overflow-y-auto -->
            <div v-for="(formField, index) in fields" :key="formField.id" class="">
              <div v-if="formField.fieldType === 'Form text'" class="flex flex-col gap-2">
                <label :for="`${formField.name}-${index}`">
                  <div class="flex flex-row gap-2">
                    <div class="font-poppins font-normal text-[rgb(75,85,99)] text-[16px] leading-[25px] ">{{ formField.name }}</div>
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
                    <div class="font-poppins font-normal text-[rgb(75,85,99)] text-[16px] leading-[25px] ">{{ formField.name }}</div>
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
                    <div class="font-poppins font-normal text-[rgb(75,85,99)] text-[16px] leading-[25px] ">{{ formField.name }}</div>
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
                    <div class="font-poppins font-normal text-[rgb(75,85,99)] text-[16px] leading-[25px] ">{{ formField.name }}</div>
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
                    <div class="font-poppins font-normal text-[rgb(75,85,99)] text-[16px] leading-[25px] ">{{ formField.name }}</div>
                    <div v-if="formField.mandatory" class="text-red-500">*</div>
                  </div>
                </label>
                <!-- <FileUpload
                  :id="`${formField.name}-${index}`" mode="basic" name="demo[]"
                  accept="image/*" @input="(e) => onImageUpload(e, formField)"
                /> -->
                <Input type="file" accept="image/*" class="font-poppins p-2" @input="(e) => onImageUpload(e, formField)" />
              </div>

              <div v-else-if="formField.fieldType === 'Form list'" class="flex flex-col gap-2">
                <label :for="`${formField.name}-${index}`">
                  <div class="flex flex-row gap-2">
                    <div class="font-poppins font-normal text-[rgb(75,85,99)] text-[16px] leading-[25px] ">{{ formField.name }}</div>
                    <div v-if="formField.mandatory" class="text-red-500">*</div>
                  </div>
                </label>
                <!-- <InputText
                  :id="`${formField.name}-${index}`"
                  v-model="formField.state" :class="`${formField.mandatory && formField.state.trim().length === 0 ? 'border-red-700' : ''}`" class="border-red-500"
                /> -->
                <Dropdown
                  :id="`${formField.name}-${index}`"
                  v-model="formField.state"
                  :options="formField?.selectedList?.sublists?.map(f => f?.title)"

                  :class="`${formField.mandatory && formField.state === null ? 'border-red-700' : ''}`"
                  class="border-red-500 w-full md:w-full py-1"
                  placeholder="Select "
                />
                <!-- option-label="title" -->
                <small v-if="formField.mandatory && formField.state.trim().length === 0" class="text-red-600">This
                  Field is required</small>
              </div>

              <div v-else-if="formField.fieldType === 'Form checkbox group' " class="flex flex-col gap-2">
                <label :for="`${formField.name}-${index}`">
                  <div class="flex flex-row gap-2">
                    <div class="font-poppins font-normal text-[rgb(75,85,99)] text-[16px] leading-[25px] ">{{ formField.name }}</div>
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
                    <div class="font-poppins font-normal text-[rgb(75,85,99)] text-[16px] leading-[25px] ">{{ formField.name }}</div>
                    <div v-if="formField.mandatory" class="text-red-500">*</div>
                  </div>
                </label>
                <InputText :id="`${formField.name}-${index}`" v-model="formField.state" class="border-red-500" />
              </div>
            </div>
            <div :class="`w-full flex ${mobile ? 'justify-center' : 'justify-center'} mt-5`">
              <Button
                class=" font-poppins font-normal  text-[16px] leading-[25px]"
                severity="success"
                :disabled="!props?.isGeneratable || isGeneratingDoc"
                label="Spawn document"
                autofocus
                @click="generateDocument"
              />
            </div>
          </div>
        </div>
        <!-- <div v-if="!mobile" class=" min-h-full  flex-1 ml-12   flex justify-center items-center" :class="{ 'w-max md:w-max': props.isGeneratable, 'w-[50vw] md:w-[50vw]': !props.isGeneratable }">
          <div v-if="props.isGeneratable" :class="{ 'w-max md:w-max': props.isGeneratable, 'w-[50vw] md:w-[50vw]': !props.isGeneratable }"> -->
        <CanvasPreview v-if="props.isGeneratable" :template="props.templateData" :form-values="fields" :selected-rows="fields" :refresh="refresherNumber" />
        <!-- </div> -->
        <p v-else-if="!mobile" class="font-poppins text-lg w-[40vw] flex justify-center items-center">
          Template Live preview
        </p>
        <!-- </div> -->
      </div>
    </template>
    <template #footer>
    </template>
  </Dialog>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { useToast } from 'primevue/usetoast'
import { useRouter } from 'vue-router'
import CanvasPreview from '@/components/template/DocGenerationModals/FormToDocCanvasPreview'
import uploadFileToBackend from '~/services/uploadFileToBackend'
import { docGenerationData } from '@/composables/useDocGenerationData'

const props = defineProps(['showPreview', 'mobile', 'allFormFields', 'formTitle', 'formDescription', 'isGeneratable', 'templateData'])
const emit = defineEmits(['changePreview', 'cancel', 'updateGeneratedDocs'])
const toast = useToast()
const router = useRouter()
const fields = ref([])
const showPreview = ref(false)
const mobile = ref(false)
const isGeneratingDoc = ref(false)
const allGeneratedDocs = ref([])
const runtimeConfig = useRuntimeConfig()
const refresherNumber = ref(0)

onMounted(() => {
  showPreview.value = props.showPreview
  mobile.value = props.mobile
  if (props?.allFormFields?.length < 1)
    return
  fields.value = props?.allFormFields?.map((m) => {
    return { ...m, state: '' }
  })
})

watch(() => props?.showPreview, (newVal, oldVal) => {
  if (newVal === oldVal)
    return
  showPreview.value = newVal
})
console.log('all form fields', props?.allFormFields)
watch(() => props?.allFormFields, (newVal) => {
  console.log('all form fields', props?.allFormFields)
  if (newVal?.length < 1)
    return
  fields.value = newVal?.map((m) => {
    return { ...m, state: '' }
  })
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
  isGeneratingDoc.value = true

  // showGeneratedDocsModal.value = true
  toast.add({ severity: 'success', summary: 'Generating documents', detail: 'Your request is being processed', life: 4000, group: 'ac' })

  const formData = fields.value.map(field => ({
    ...field,
    // value: field.state,
  }
  ))
  setTimeout(() => {
    // emit('cancel')
    router.push('/')
  }, 2000)

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
    docGenerationData.generatedDocs = data?.generatedDocs
    fields.value = fields.value.map(field => ({
      ...field,
      state: null,
    }
    ))
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
  // if (!visible.value) {
  toast.add({ severity: 'success', summary: 'Can you send me the report?', group: 'bc' })
  visible.value = true
  // }
}

watch(allGeneratedDocs, (val) => {
  emit('updateGeneratedDocs', val)
})
</script>
