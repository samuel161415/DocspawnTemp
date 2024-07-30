<template>
  <div class="mt-4">
    <div class="mb-4">
      <p class="font-poppins text-md text-surface-600">
        {{ $t('Cp_templateEditor_templateOptions.template_name') }}
      </p>
      <InputText v-model="templateName" class="w-full md:w-full mt-2" />
    </div>
    <div class="flex items-center gap-2 cursor-pointer text-surface-600 mt-6" @click="showWatermarkOptions = !showWatermarkOptions">
      <p class="font-poppins text-md">
        {{ $t('Cp_templateEditor_templateOptions.watermark') }}
      </p>
      <font-awesome-icon icon="fa-solid fa-caret-right transition-all duration-300 text-surface-600" size="lg" :class="{ 'rotate-90': showWatermarkOptions }" />
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
    <Button label="Save template" :disabled="!templateName" class="mt-8 w-full md:w-full" @click="emit('saveTemplate')" />
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { templateEditorStore } from '@/composables/useTemplateEditorData'
import { templateGeneralInformation } from '@/composables/useTemplateCreationData'
import canvasService from '@/composables/useTemplateCanvas'

const emit = defineEmits(['saveTemplate'])
const { t } = useI18n()
const tooltipText = computed(() => t('Cp_templateEditor_templateOptions.tooltip_paid_users'))

const showWatermarkOptions = ref(false)
const templateName = ref('')
const disableWatermark = ref(false)
watch(disableWatermark, (val) => {
  console.log('disable watermark', val)
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
