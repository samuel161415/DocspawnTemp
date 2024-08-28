<template>
  <!-- <Dialog
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
        <div v-if="isGeneratable" class="inline-flex align-items-center justify-content-center gap-2">
          <span class="text-lg text-primary-600 font-poppins font-normal">{{ $t('Cp_formEditor_finalPreview.form_to_doc_generation') }}</span>
        </div>
        <div v-if="!props?.isGeneratable" class="flex flex-col">
          <i class="pi pi-mobile"></i>
          <RadioButton v-model="mobile" class="pl-0.5" input-id="mobile1" name="pizza" :value="true" />
        </div>
        <div v-if="!props?.isGeneratable" class="flex flex-col">
          <i class="pi pi-desktop"></i>
          <RadioButton v-model="mobile" class="pl-0.5" input-id="desktop1" name="pizza" :value="false" />
        </div>
      </div>
    </template> -->
  <!-- <template #default> -->
  <div class="flex">
    <div :class="`flex flex-col  ${props?.isGeneratable && 'min-w-[400px]'} rounded-md w-96 ${mobile ? '' : 'pl-4'}`" :style="{ marginRight: '12px' }">
      <div class="mb-0  w-200 flex items-center justify-between px-3 mb-0 rounded-md bg-primary-50" :class="{ 'mt-4': !props?.isGeneratable }" :style="{ height: '58px', marginBottom: '8px' }">
        <p class="text-surface-600 capitalize text-[18px] text-[rgb(75,85,99)] font-semibold font-poppins form-title-preview text-center w-full">
          {{ formTitle ? formTitle : templateData?.name }}
        </p>
      </div>

      <div v-if="formDescription" class="w-80 place-self-center text-justify my-1">
        {{ formDescription }}
      </div>

      <div v-if="fields" class="w-full place-self-start flex flex-col  bg-surface-50 p-4" :style="{ gap: '12px' }">
        <!-- h-[70vh] overflow-y-auto -->
        <div v-for="(formField, index) in fields" :key="formField.id" class="">
          <div v-if="formField.fieldType === 'Form text'" class="flex flex-col gap-2">
            <label :for="`${formField.name}-${index}`">
              <div class="flex flex-row gap-2">
                <div class="font-poppins font-normal text-[rgb(75,85,99)] text-[16px] leading-[25px] ">{{ formField?.fieldDescription ? formField?.fieldDescription : formField.name }} <span class="text-xl" :class="{ 'text-red-500': formField?.error }">{{ formField?.isRequired ? '*' : "" }}</span></div>
                <div v-if="formField.mandatory" class="text-red-500">*</div>
              </div>
            </label>

            <InputText
              v-if="formField?.characterAcception === 'Numbers'"
              :id="`${formField.name}-${index}`"
              v-model="formField.state"

              :maxlength="formField.maxCharAllowed"
              @keypress="(e) => handleKeyPressForNumbers(e, formField)"
              @input="() => validateMinChars(formField, formField?.minCharAllowed)"
            />
            <!-- :maxlength="formField.maxCharAllowed"
                @input="() => validateMinChars(formField, formField?.minCharAllowed)" -->
            <InputText
              v-else-if="formField?.characterAcception === 'Text'"
              :id="`${formField.name}-${index}`"
              v-model="formField.state"

              :maxlength="formField.maxCharAllowed"
              @keypress="handleKeyPressForText"
              @input="() => validateMinChars(formField, formField?.minCharAllowed)"
            />
            <InputText
              v-else
              :id="`${formField.name}-${index}`"
              v-model="formField.state"
              :maxlength="formField.maxCharAllowed"
              @keypress="handleKeyPressForAlphanumeric"
              @input="() => validateMinChars(formField, formField?.minCharAllowed)"
            />
            <p v-if="formField?.errorText" class="text-md text-red-500 my-1 ">
              {{ formField?.errorText }}
            </p>
            <small v-if="formField.mandatory && formField.state.trim().length === 0" class="text-red-600">{{ $t('Cp_formEditor_finalPreview.this_field_is_required') }}</small>
          </div>

          <div v-else-if="formField.fieldType === 'Form long text'" class="flex flex-col gap-2">
            <label :for="`${formField.name}-${index}`">
              <div class="flex flex-row gap-2">
                <div class="font-poppins font-normal text-[rgb(75,85,99)] text-[16px] leading-[25px] ">{{ formField?.fieldDescription ? formField?.fieldDescription : formField.name }} <span class="text-2xl" :class="{ 'text-red-500': formField?.error }">{{ formField?.isRequired ? '*' : "" }}</span></div>
                <div v-if="formField.mandatory" class="text-red-500">*</div>
              </div>
            </label>
            <Textarea
              :id="`${formField.name}-${index}`"
              v-model="formField.state"
              rows="4" cols="30"
            />
            <small v-if="formField.mandatory && formField.state.trim().length === 0" class="text-red-600">{{ $t('Cp_formEditor_finalPreview.this_field_is_required') }}</small>
          </div>

          <div v-else-if="formField.fieldType === 'Form date'" class="flex flex-col gap-2">
            <label :for="`${formField.name}-${index}`">
              <div class="flex flex-row gap-2">
                <div class="font-poppins font-normal text-[rgb(75,85,99)] text-[16px] leading-[25px] ">{{ formField?.fieldDescription ? formField?.fieldDescription : formField.name }} <span class="text-2xl" :class="{ 'text-red-500': formField?.error }">{{ formField?.isRequired ? '*' : "" }}</span></div>
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
                <div class="font-poppins font-normal text-[rgb(75,85,99)] text-[16px] leading-[25px] ">{{ formField?.fieldDescription ? formField?.fieldDescription : formField.name }} <span class="text-2xl" :class="{ 'text-red-500': formField?.error }">{{ formField?.isRequired ? '*' : "" }}</span></div>
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
                <div class="font-poppins font-normal text-[rgb(75,85,99)] text-[16px] leading-[25px] ">{{ formField?.fieldDescription ? formField?.fieldDescription : formField.name }} <span class="text-2xl" :class="{ 'text-red-500': formField?.error }">{{ formField?.isRequired ? '*' : "" }}</span></div>
                <div v-if="formField.mandatory" class="text-red-500">*</div>
              </div>
            </label>
            <!-- <FileUpload
                  :id="`${formField.name}-${index}`" mode="basic" name="demo[]"
                  accept="image/*" @input="(e) => onImageUpload(e, formField)"
                /> -->
            <ImageInput :aspect-ratio="getCanvasElementProportions(formField)" @handle-save-cropped-image="(url) => formField.state = url" />
            <!-- <Input type="file" accept="image/*" class="font-poppins p-2" @input="(e) => onImageUpload(e, formField)" /> -->
          </div>

          <div v-else-if="formField.fieldType === 'Form list'" class="flex flex-col gap-2">
            <label :for="`${formField.name}-${index}`">
              <div class="flex flex-row gap-2">
                <div class="font-poppins font-normal text-[rgb(75,85,99)] text-[16px] leading-[25px] ">{{ formField?.fieldDescription ? formField?.fieldDescription : formField.name }} <span class="text-2xl" :class="{ 'text-red-500': formField?.error }">{{ formField?.isRequired ? '*' : "" }}</span></div>
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

              class="border-red-500 w-full md:w-full py-1"
              placeholder="Select "
            />
            <!-- option-label="title" -->
            <small v-if="formField.mandatory && formField.state.trim().length === 0" class="text-red-600">{{ $t('Cp_formEditor_finalPreview.this_field_is_required') }}</small>
          </div>

          <div v-else-if="formField.fieldType === 'Form checkbox group' " class="flex flex-col gap-2">
            <label :for="`${formField.name}-${index}`">
              <div class="flex flex-row gap-2">
                <div class="font-poppins font-normal text-[rgb(75,85,99)] text-[16px] leading-[25px] ">{{ formField?.fieldDescription ? formField?.fieldDescription : formField.name }} </div>
              </div>
            </label>
            <div v-for="(checkbox, i) in formField?.checkboxes" :key="i" class="flex items-center gap-2">
              <div class="w-12 h-12 flex items-center">
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
            <small v-if="formField.mandatory && formField.state.trim().length === 0" class="text-red-600">{{ $t('Cp_formEditor_finalPreview.this_field_is_required') }}</small>
          </div>

          <div v-else-if="formField.fieldType === 'signature'" class="flex flex-col gap-2">
            <label :for="`${formField.name}-${index}`">
              <div class="flex flex-row gap-2">
                <div class="font-poppins font-normal text-[rgb(75,85,99)] text-[16px] leading-[25px] ">{{ formField?.fieldDescription ? formField?.fieldDescription : formField.name }} <span class="text-2xl" :class="{ 'text-red-500': formField?.error }">{{ formField?.isRequired ? '*' : "" }}</span></div>
                <div v-if="formField.mandatory" class="text-red-500">*</div>
              </div>
            </label>
            <InputText :id="`${formField.name}-${index}`" v-model="formField.state" class="border-red-500" />
          </div>
        </div>
        <div :class="`w-full flex ${mobile ? 'justify-center' : 'justify-center'} mt-4`" :style="{ marginTop: '12px' }">
          <Button
            class="font-poppins font-normal text-[16px] leading-[25px]"
            severity="success"
            :disabled="!props?.isGeneratable || isGeneratingDoc || !allFieldsFilledUp"
            :label="$t('Cp_formEditor_finalPreview.spawn_document')"
            autofocus
            @click="generateDocument"
          />
        </div>
      </div>
    </div>
    <!-- <div v-if="!mobile" class=" min-h-full flex-1 ml-12 flex justify-center items-center" :class="{ 'w-max md:w-max': props.isGeneratable, 'w-[50vw] md:w-[50vw]': !props.isGeneratable }">
          <div v-if="props.isGeneratable" :class="{ 'w-max md:w-max': props.isGeneratable, 'w-[50vw] md:w-[50vw]': !props.isGeneratable }"> -->
    <CanvasPreview v-if="props.isGeneratable && props?.templateData && fields" :template="props.templateData" :form-values="fields" :selected-rows="fields" :refresh="refresherNumber" use-case="formToDoc" />
    <!-- </div> -->
    <p v-else-if="!mobile" class="font-poppins text-lg w-[40vw] flex justify-center items-center">
      {{ $t('Cp_formEditor_finalPreview.template_live_preview') }}
    </p>
    <!-- </div> -->
  </div>
  <!-- </template> -->
  <!-- <template #footer>
    </template> -->
  <!-- </Dialog> -->
  <!-- </dialog> -->
  <!-- </dialog> -->
  <GenerationSuccessModal v-if="showGnerationSuccessMessage" />
  <Toast position="top-right" group="bc" :style="{ width: 'max-content' }" @close="onClose">
    <template #message="slotProps">
      <div class="flex flex-col items-start flex-auto w-max ">
        <div class="flex items-center gap-2">
          <font-awesome-icon icon="fa-bold fa-check" size="lg" />
          <span class="font-bold">{{ $t('Cp_dataToDoc_generation.operation_complete') }}</span>
        </div>
        <div class="font-normal text-lg mt-1 font-poppins text-md">
          {{ allGeneratedDocs?.length }} {{ allGeneratedDocs?.length > 1 ? 'Documents' : 'Document' }} {{ $t('Cp_dataToDoc_generation.documents_generated') }}
        </div>
        <div class="flex gap-2 mt-4">
          <Button size="small" :label="$t('Cp_dataToDoc_generation.download_all')" class="font-poppins whitespace-nowrap" severity="success" @click="downlaodAllDocuments()" />
          <Button outlined size="small" class="font-poppins whitespace-nowrap" :label="$t('Cp_dataToDoc_generation.open_document_library')" severity="success" @click="navigateDocumentLibrary()" />
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

<script setup>
import { computed, onMounted, ref, watch } from 'vue'

// import { useToast } from 'primevue/usetoast'
import { useRouter } from 'vue-router'
import { docGenerationData } from '../../../composables/useDocGenerationData'
import uploadFileToBackend from '../../../services/uploadFileToBackend'
import CanvasPreview from '../common/CanvasPreview'
import GenerationSuccessModal from '../common/GenerationSuccessModal.vue'
import ImageInput from './cropper/ImageInput'
import { useRuntimeConfig } from '#app'

const props = defineProps(['isExternal', 'showPreview', 'mobile', 'allFormFields', 'formTitle', 'formDescription', 'isGeneratable', 'templateData'])
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
const showGnerationSuccessMessage = ref(false)

onMounted(() => {
  showPreview.value = props.showPreview
  mobile.value = props.mobile
  if (props?.allFormFields?.length < 1)
    return
  fields.value = props?.allFormFields?.map((m) => {
    return { ...m, state: '' }
  })
})

watch(() => props?.allFormFields, (newVal) => {
  if (newVal?.length < 1)
    return
  fields.value = newVal?.map((m) => {
    return { ...m, state: '' }
  })
})

const allFieldsFilledUp = computed(() => {
  const requiredFields = fields?.value?.filter(f => f?.isRequired && f?.fieldType !== 'Form checkbox group')
  let areAllFilled = true
  requiredFields?.forEach((f) => {
    if (!f?.state || f?.errorText) {
      // console.log('f', f)
      areAllFilled = false
    }
  })
  // console.log('are all filled', areAllFilled)
  return !!areAllFilled
})

function getCanvasElementProportions(formField) {
  // console.log('template data', props?.templateData)
  const allObjs = props?.templateData?.canvas_data?.objects
  let spObj = {}
  allObjs.forEach((obj) => {
    if (obj?.hash === formField?.hash)
      spObj = obj
      // console.log('canvas object', obj)
  })

  const proportions = { height: spObj?.height, width: spObj?.width, scaleX: spObj?.scaleX, scaleY: spObj?.scaleY }
  // console.log('proportions', proportions)
  const aspectRatio = (proportions?.width * proportions?.scaleX) / (proportions?.height * proportions?.scaleY)
  return aspectRatio
}

watch(() => props?.showPreview, (newVal, oldVal) => {
  if (newVal === oldVal)
    return
  showPreview.value = newVal
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
function validateFormEntries() {
  let anyError = false
  const allFields = fields.value
  fields.value = allFields?.map((f) => {
    if (!f?.isRequired || f?.fieldType === 'Form checkbox group')
      return { ...f, error: false }
    if (!f?.state) {
      anyError = true
      return { ...f, error: true }
    }
    else { return { ...f, error: false } }
  })
  return !anyError
}
async function generateDocument() {
  if (!validateFormEntries())
    return
  isGeneratingDoc.value = true

  // showGeneratedDocsModal.value = true
  if (!props?.isExternal)
    toast.add({ severity: 'success', summary: 'Generating documents', detail: 'Your request is being processed. Download from Documenst library oce generated.', life: 4000, group: 'ac' })

  const formData = fields.value.map(field => ({
    ...field,
    // value: field.state,
  }
  ))
  setTimeout(() => {
    if (!props?.isExternal) {
      emit('cancel')
      router.push('/')
    }
    else { showGnerationSuccessMessage.value = true }
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
  }
  catch (error) {
    // console.error('Error:', error)
    isGeneratingDoc.value = false
    // toast.add({ severity: 'error', summary: 'Operation failed', detail: 'Unable to generate the docs', life: 5000 })
  }
}

const visible = ref(false)

function showGeneratedDocToast() {
  // if (!visible.value) {
  // toast.add({ severity: 'success', summary: 'Can you send me the report?', group: 'bc' })
  visible.value = true
  // }
}

watch(allGeneratedDocs, (val) => {
  emit('updateGeneratedDocs', val)
})

function handleKeyPressForText(event) {
  const charCode = event.charCode
  // Allow only letters (a-z, A-Z)
  if (
    !(charCode >= 65 && charCode <= 90) // A-Z
    && !(charCode >= 97 && charCode <= 122) // a-z
    && charCode !== 32 // space
  )
    event.preventDefault()

  // No need to handle 'Text + Numbers' because any character is allowed
}
function handleKeyPressForNumbers(event, formField) {
  const allowDecimals = !!formField?.allowDecimals
  const charCode = event.charCode
  const currentValue = formField.state.toString()

  // Allow only numbers (0-9) and one decimal point (.)
  if ((charCode < 48 || charCode > 57) && (!allowDecimals || charCode !== 46 || currentValue.includes('.')))
    event.preventDefault()
}
function handleKeyPressForAlphanumeric(event) {
  const charCode = event.charCode

  // Allow only letters (a-z, A-Z), numbers (0-9), and spaces
  if (
    !(charCode >= 65 && charCode <= 90) // A-Z
    && !(charCode >= 97 && charCode <= 122) // a-z
    && !(charCode >= 48 && charCode <= 57) // 0-9
    && charCode !== 32 // space
  )
    event.preventDefault()
}

function isNumber(value) {
  return !Number.isNaN(Number.parseFloat(value)) && Number.isFinite(value)
}
function validateMinChars(formField, leng) {
  let condition = false
  if (isNumber(formField?.state))
    condition = formField?.state?.toString().length < leng
  else
    condition = formField?.state?.length < leng

  if (condition)
    formField.errorText = `Minimum ${leng} characters required.`
  else
    formField.errorText = ''
}
</script>

<style scoped>
::v-deep .field-error {

  box-shadow: none!important;
}

::v-deep .field-error:focus {

  box-shadow: none !important;
}
</style>
