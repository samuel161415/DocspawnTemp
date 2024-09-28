<template>
  <div class="mt-4">
    <div class="mb-4">
      <p class="font-poppins text-md text-surface-600">
        {{ $t('Cp_templateEditor_templateOptions.template_name') }}<span :class="{ 'text-red-500': templateNameError }"> *</span>
      </p>
      <InputText v-model="templateName" :invalid="templateNameError && !templateName" :class="{ 'p-invalid template-name-error': templateNameError && !templateName }" class="w-full md:w-full mt-2" />
    </div>
    <div class="flex items-center gap-2 cursor-pointer text-surface-600 mt-6" @click="showWatermarkOptions = !showWatermarkOptions">
      <p class="font-poppins text-md">
        {{ $t('Cp_templateEditor_templateOptions.watermark') }}
      </p>
      <font-awesome-icon icon="fa-light fa-caret-right transition-all duration-300 text-surface-600" size="lg" :class="{ 'rotate-90': showWatermarkOptions }" />
    </div>
    <div v-if="showWatermarkOptions" class="mt-4">
      <p class="font-poppins text-sm text-surface-400">
        {{ $t('Cp_templateEditor_templateOptions.watermark_description') }}
      </p>
      <div class="flex gap-2 my-6">
        <Checkbox v-model="disableWatermark" :binary="true" />
        <p class="font-poppins text-surface-500">
          {{ $t('Cp_templateEditor_templateOptions.disable_watermark') }}
        </p>
        <div v-tooltip.top="tooltipText">
          <font-awesome-icon icon="fa-duotone fa-square-question transition-all duration-300 text-surface-600" size="lg" :class="{ 'rotate-90': showAdvancedOptions }" />
        </div>
      </div>
      <p class="font-poppins italic text-surface-400 text-sm mb-4">
        {{ $t('Cp_templateEditor_templateOptions.tip') }}
      </p>
      <p class="font-poppins text-md text-surface-600">
        {{ $t('Cp_templateEditor_templateOptions.select_watermark_design') }}
      </p>
      <div v-for="image in watermarkImages" :key="image.id" class="flex items-center mt-4">
        <RadioButton v-model="templateEditorStore.watermarkImage" :input-id="image.id" name="dynamic" :value="image" />
        <label :for="image.id" class="ml-2">
          <div class="w-full h-max">
            <img id="output" accept="image/*" class="object-cover h-auto" :class="{ 'w-9/12': image.id === 2, 'w-5/12': image.id === 1 }" :src="image.src" />
          </div>
        </label>
      </div>
    </div>
    <div class="flex items-center gap-2 cursor-pointer text-surface-600 mt-6" @click="showFileNamingoptions = !showFileNamingoptions">
      <p class="font-poppins text-md">
        {{ $t('Cp_templateEditor_templateOptions.file_naming') }}
      </p>
      <font-awesome-icon icon="fa-light fa-caret-right transition-all duration-300 text-surface-600" size="lg" :class="{ 'rotate-90': showFileNamingoptions }" />
    </div>
    <div v-if="showFileNamingoptions" class="mt-4">
      <p class="font-poppins text-sm text-surface-400">
        {{ $t('Cp_templateEditor_templateOptions.file_naming_description_one') }}
      </p>
      <div class="flex gap-2 my-6">
        <Checkbox v-model="enableCustomFileNaming" :binary="true" />
        <p class="font-poppins text-surface-500">
          {{ $t('Cp_templateEditor_templateOptions.file_naming_checkbox_label') }}
        </p>
        <div v-tooltip.top="tooltipText">
          <font-awesome-icon icon="fa-duotone fa-square-question transition-all duration-300 text-surface-600" size="lg" :class="{ 'rotate-90': showAdvancedOptions }" />
        </div>
      </div>
      <p class="font-poppins italic text-surface-400 text-sm mb-4">
        {{ $t('Cp_templateEditor_templateOptions.file_naming_description_two') }}
      </p>

      <FileNamingOptions v-if="enableCustomFileNaming" />
    </div>
    <Button
      :label="$t('Cp_templateEditor_templateOptions.save_template')" class="mt-8 w-full md:w-full" @click="() => {
        if (templateName){

          templateEditorStore.editor_fields_data = {
            editorContainers: JSON.parse(JSON.stringify(templateEditorStore?.editorContainers)),
            editorContainersRefs: JSON.parse(JSON.stringify(templateEditorStore?.editorContainerRefs)),
            fabricObjectRefs: JSON.parse(JSON.stringify(templateEditorStore?.fabricObjectRefs)),
          }
          // console.log('added fields', templateEditorStore?.addedFields)
          emit('saveTemplate')
        }
        else {
          templateNameError = true
        }
      }"
    />
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import FileNamingOptions from './TemplateOptions/FileNaming.vue'
import { templateEditorStore } from '@/composables/useTemplateEditorData'
import { templateGeneralInformation } from '@/composables/useTemplateCreationData'
import canvasService from '@/composables/useTemplateCanvas'

const emit = defineEmits(['saveTemplate'])
const { t } = useI18n()
const tooltipText = computed(() => t('Cp_templateEditor_templateOptions.tooltip_paid_users'))
const templateNameError = ref(false)
const showWatermarkOptions = ref(false)
const templateName = ref('')
const disableWatermark = ref(false)
const enableCustomFileNaming = ref(false)
const showFileNamingoptions = ref(false)
watch(enableCustomFileNaming, () => {
  templateEditorStore.enableCustomFileNaming = enableCustomFileNaming.value
})
watch(disableWatermark, (val) => {
  templateEditorStore.watermarkDisabled = val
  const canvas = canvasService.getCanvas()
  if (canvas) {
    canvas.getObjects()?.forEach((obj) => {
      if (obj?.id === 'watermark-docspawn') {
        if (val === true)
          obj.set({ visible: false, opacity: 0 })
        else obj.set({ visible: true, opacity: 1 })
      }
    })
    canvas.renderAll()
  }
})
const watermarkImages = ref([
  { id: 2, src: 'https://docspawn-bucket-1.s3.eu-central-1.amazonaws.com/docspawn-bucket-1/84c85464-5815-4414-bd71-b70695ed0af3_DS watermark 2 (1).png.png' },
  { id: 1, src: 'https://docspawn-bucket-1.s3.eu-central-1.amazonaws.com/docspawn-bucket-1/494a88a1-edeb-4652-b190-c0ad775b9c80_DS watermark 1 (1).png.png' },
])
onMounted(() => {
  if (!templateEditorStore?.watermarkImage?.src)
    templateEditorStore.watermarkImage = watermarkImages.value[1]
  if (templateGeneralInformation?.name)
    templateName.value = templateGeneralInformation?.name
  if (templateEditorStore?.templateToEdit)
    enableCustomFileNaming.value = templateEditorStore?.templateToEdit?.template_options?.enableCustomFileNaming
  disableWatermark.value = templateEditorStore?.watermarkDisabled
})
watch(templateName, (newVal) => {
  templateGeneralInformation.name = newVal
})
watch(() => templateEditorStore.watermarkImage, (newVal) => {
  const canvas = canvasService.getCanvas()
  if (canvas) {
    if (newVal.src) {
      const objs = canvas._objects

      canvas.objects = objs?.map((obj) => {
        if (obj._element && obj.id === 'watermark-docspawn') {
        // const originalHeight = obj.height * obj.scaleY
          const originalWidth = obj.width * obj.scaleX

          obj.setSrc(newVal.src, () => {
            obj.scaleToWidth(originalWidth)
            //   obj.scaleToHeight(originalHeight)
            canvas.renderAll()
            if (obj.left <= 0)
              obj.set({ left: 0 })
            if (obj.top <= 0)
              obj.set({ top: 0 })
            if (obj.left + (obj.width * obj.scaleX) >= canvas.width)
              obj.set({ left: canvas.width - (obj.width * obj.scaleX) })
            if (obj.top + (obj.height * obj.scaleY) >= canvas.height)
              obj.set({ top: canvas.height - (obj.height * obj.scaleY) })
            canvas.renderAll()
          })
        }
        return obj
      })
      canvas.renderAll()
    }
  }
})
</script>

<style scoped>
::v-deep .template-name-error {

  box-shadow: none!important;
}

::v-deep .template-name-error:focus {

  box-shadow: none !important;
}
</style>
