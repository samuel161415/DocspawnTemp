<template>
  <p class="mt-8 font-poppins text-surface-500 ">
    Formatting options
  </p>
  <div class="mt-2 bg-white p-2 ">
    <div class="flex flex-wrap items-center gap-1">
      <div v-if="templateEditorStore.selectedAddedField?.fieldType === 'Data field' || templateEditorStore.selectedAddedField?.fieldType === 'Static text' || templateEditorStore.selectedAddedField?.fieldType === 'Form text' || templateEditorStore.selectedAddedField?.fieldType === 'Form date' || templateEditorStore.selectedAddedField?.fieldType === 'Form time' || templateEditorStore.selectedAddedField?.fieldType === 'Static date' || templateEditorStore.selectedAddedField?.fieldType === 'Static time' || templateEditorStore.selectedAddedField?.fieldType === 'Form long text' || templateEditorStore.selectedAddedField?.fieldType === 'Form list'" v-tooltip.top="'select font'" class="h-8 w-8 text-2xl flex items-center justify-center rounded-md cursor-pointer p-2 " @click="showFontOptions = true;showFontSizesOptions = false">
        <font-awesome-icon icon="fa-light fa-font" size="xs" />
      </div>
      <div v-if="templateEditorStore.selectedAddedField?.fieldType === 'Data field' || templateEditorStore.selectedAddedField?.fieldType === 'Static text' || templateEditorStore.selectedAddedField?.fieldType === 'Form text' || templateEditorStore.selectedAddedField?.fieldType === 'Form date' || templateEditorStore.selectedAddedField?.fieldType === 'Form time' || templateEditorStore.selectedAddedField?.fieldType === 'Static date' || templateEditorStore.selectedAddedField?.fieldType === 'Static time' || templateEditorStore.selectedAddedField?.fieldType === 'Form long text' || templateEditorStore.selectedAddedField?.fieldType === 'Form list'" v-tooltip.top="'font size'" class="h-8 w-8 text-2xl flex items-center justify-center rounded-md cursor-pointer p-2" @click="showFontSizesOptions = true;showFontOptions = false">
        <font-awesome-icon icon="fa-light fa-text-size" size="xs" />
      </div>
      <div
        v-if="templateEditorStore.selectedAddedField?.fieldType === 'Data field' || templateEditorStore.selectedAddedField?.fieldType === 'Static text' || templateEditorStore.selectedAddedField?.fieldType === 'Form text' || templateEditorStore.selectedAddedField?.fieldType === 'Form date' || templateEditorStore.selectedAddedField?.fieldType === 'Form time' || templateEditorStore.selectedAddedField?.fieldType === 'Static date' || templateEditorStore.selectedAddedField?.fieldType === 'Static time' || templateEditorStore.selectedAddedField?.fieldType === 'Form long text' || templateEditorStore.selectedAddedField?.fieldType === 'Form list'"
        v-tooltip.top="'underline'" class="h-8 w-8 text-2xl flex items-center justify-center rounded-md cursor-pointer p-2" :class="{ 'bg-blue-300': activeTextStyles.underline }" @click="activeTextStyles.underline = activeTextStyles.underline ? false : true"
      >
        <font-awesome-icon icon="fa-light fa-underline" size="xs" />
      </div>
      <div v-if="templateEditorStore.selectedAddedField?.fieldType === 'Data field' || templateEditorStore.selectedAddedField?.fieldType === 'Static text' || templateEditorStore.selectedAddedField?.fieldType === 'Form text' || templateEditorStore.selectedAddedField?.fieldType === 'Form date' || templateEditorStore.selectedAddedField?.fieldType === 'Form time' || templateEditorStore.selectedAddedField?.fieldType === 'Static date' || templateEditorStore.selectedAddedField?.fieldType === 'Static time' || templateEditorStore.selectedAddedField?.fieldType === 'Form long text' || templateEditorStore.selectedAddedField?.fieldType === 'Form list'" v-tooltip.top="'bold'" class="h-8 w-8 text-2xl flex items-center justify-center rounded-md cursor-pointer p-2" :class="{ 'bg-blue-300 ': activeTextStyles.fontWeight === 700 }" @click="activeTextStyles.fontWeight = activeTextStyles.fontWeight === 700 ? 300 : 700">
        <font-awesome-icon icon="fa-solid fa-bold" size="xs" />
      </div>
      <div v-if="templateEditorStore.selectedAddedField?.fieldType === 'Data field' || templateEditorStore.selectedAddedField?.fieldType === 'Static text' || templateEditorStore.selectedAddedField?.fieldType === 'Form text' || templateEditorStore.selectedAddedField?.fieldType === 'Form date' || templateEditorStore.selectedAddedField?.fieldType === 'Form time' || templateEditorStore.selectedAddedField?.fieldType === 'Static date' || templateEditorStore.selectedAddedField?.fieldType === 'Static time' || templateEditorStore.selectedAddedField?.fieldType === 'Form long text' || templateEditorStore.selectedAddedField?.fieldType === 'Form list'" v-tooltip.top="'italic'" class="h-8 w-8 text-2xl  flex items-center justify-center rounded-md cursor-pointer p-2" :class="{ 'bg-blue-300': activeTextStyles.fontStyle === 'italic' }" @click="activeTextStyles.fontStyle = activeTextStyles.fontStyle === 'italic' ? 'normal' : 'italic'">
        <font-awesome-icon icon="fa-light fa-italic" size="xs" />
      </div>
      <div v-if="templateEditorStore.selectedAddedField?.fieldType === 'Form long text'" tooltip.top="'align-left'" class="h-8 w-8 text-2xl flex items-center justify-center rounded-md cursor-pointer p-2" :class="{ 'bg-blue-300': activeTextStyles.textAlign === 'left' }" @click=" activeTextStyles.textAlign = 'left'">
        <font-awesome-icon icon="fa-light fa-align-left" size="xs" />
      </div>
      <div v-if="templateEditorStore.selectedAddedField?.fieldType === 'Form long text'" v-tooltip.top="'align-center'" class="h-8 w-8 text-2xl flex items-center justify-center rounded-md cursor-pointer p-2" :class="{ 'bg-blue-300': activeTextStyles.textAlign === 'center' }" @click=" activeTextStyles.textAlign = 'center'">
        <font-awesome-icon icon="fa-light fa-align-center" size="xs" />
      </div>
      <div v-if="templateEditorStore.selectedAddedField?.fieldType === 'Form long text'" v-tooltip.top="'align-right'" class="h-8 w-8 text-2xl flex items-center justify-center rounded-md cursor-pointer p-2" :class="{ 'bg-blue-300': activeTextStyles.textAlign === 'right' }" @click=" activeTextStyles.textAlign = 'right'">
        <font-awesome-icon icon="fa-light fa-align-right" size="xs" />
      </div>
      <div v-if="templateEditorStore.selectedAddedField?.fieldType === 'Data field' || templateEditorStore.selectedAddedField?.fieldType === 'Static text' || templateEditorStore.selectedAddedField?.fieldType === 'Form text' || templateEditorStore.selectedAddedField?.fieldType === 'Form date' || templateEditorStore.selectedAddedField?.fieldType === 'Form time' || templateEditorStore.selectedAddedField?.fieldType === 'Static date' || templateEditorStore.selectedAddedField?.fieldType === 'Static time' || templateEditorStore.selectedAddedField?.fieldType === 'Form list'" v-tooltip.top="'reduce character spacing'" class="h-8 w-8 text-2xl flex items-center justify-center rounded-md cursor-pointer p-2 rotate-90" @click="reduceCharacterSpacing">
        <font-awesome-icon icon="fa-light fa-arrows-to-line" size="sm" />
      </div>
      <div v-if="templateEditorStore.selectedAddedField?.fieldType === 'Data field' || templateEditorStore.selectedAddedField?.fieldType === 'Static text' || templateEditorStore.selectedAddedField?.fieldType === 'Form text' || templateEditorStore.selectedAddedField?.fieldType === 'Form date' || templateEditorStore.selectedAddedField?.fieldType === 'Form time' || templateEditorStore.selectedAddedField?.fieldType === 'Static date' || templateEditorStore.selectedAddedField?.fieldType === 'Static time' || templateEditorStore.selectedAddedField?.fieldType === 'Form list'" v-tooltip.top="'increase character spacing'" class="h-8 w-8 text-2xl flex items-center justify-center rounded-md cursor-pointer p-2 rotate-90" @click="increaseCharacterSpacing">
        <font-awesome-icon icon="fa-light fa-arrows-from-line" size="sm" />
      </div>
      <!-- <ColorPicker v-if="templateEditorStore.selectedAddedField?.fieldType === 'Data field' || templateEditorStore.selectedAddedField?.fieldType === 'Static text' || templateEditorStore.selectedAddedField?.fieldType === 'Form text' || templateEditorStore.selectedAddedField?.fieldType === 'Form date' || templateEditorStore.selectedAddedField?.fieldType === 'Form time' || templateEditorStore.selectedAddedField?.fieldType === 'Static date' || templateEditorStore.selectedAddedField?.fieldType === 'Static time' || templateEditorStore.selectedAddedField?.fieldType === 'Form long text'" v-model="selectedColor" ml-1 @change="changeColor" /> -->
      <ElementRotation v-if="templateEditorStore.selectedAddedField?.fieldType !== 'Form long text'" />

      <Dropdown v-if="showFontOptions" v-model="selectedFont" :options="fonts" option-label="label" option-value="value" placeholder="Select font " class="w-12 md:w-44  mt-3" @change="changeFont" />
      <Dropdown v-if="showFontSizesOptions" v-model="selectedFontSize" :options="fontSizes" option-label="label" option-value="value" placeholder="Select font size" class="w-12 md:w-32  mt-3" @change="changeSize" />
      <input
        v-if="templateEditorStore.selectedAddedField?.fieldType === 'Data field' || templateEditorStore.selectedAddedField?.fieldType === 'Static text' || templateEditorStore.selectedAddedField?.fieldType === 'Form text' || templateEditorStore.selectedAddedField?.fieldType === 'Form date' || templateEditorStore.selectedAddedField?.fieldType === 'Form time' || templateEditorStore.selectedAddedField?.fieldType === 'Static date' || templateEditorStore.selectedAddedField?.fieldType === 'Static time' || templateEditorStore.selectedAddedField?.fieldType === 'Form long text' || templateEditorStore.selectedAddedField?.fieldType === 'Form list'"
        v-model="selectedColor"
        type="color" ml-1 @input="changeColor"
      />
    </div>
  </div>
</template>

<script setup>
import ElementRotation from './ElementRotation.vue'
import { activeTextStyles } from '@/composables/useTemplateEditorData'
import { useTextFormattingOptions } from '@/composables/useTextFormattingOptions'

const { fonts, fontSizes } = useTextFormattingOptions()
const showFontOptions = ref()
const showFontSizesOptions = ref()
const selectedFont = ref()
const selectedFontSize = ref()
const selectedColor = ref()
const selectedCharSpacing = ref()

function changeColor(e) {
  activeTextStyles.fill = `${e.target.value}`
}

function changeFont(e) {
  activeTextStyles.fontFamily = e.value
}
function changeSize(e) {
  activeTextStyles.fontSize = e.value
}
function reduceCharacterSpacing() {
  return activeTextStyles.charSpacing = activeTextStyles?.charSpacing ? activeTextStyles?.charSpacing - 50 : -50
}
function increaseCharacterSpacing() {
  return activeTextStyles.charSpacing = activeTextStyles?.charSpacing ? activeTextStyles?.charSpacing + 50 : 50
}

watch(activeTextStyles, () => {
  selectedFont.value = activeTextStyles.fontFamily
  selectedFontSize.value = activeTextStyles.fontSize
  selectedColor.value = activeTextStyles.fill
  selectedCharSpacing.value = activeTextStyles.charSpacing
})

onMounted(() => {
  selectedFont.value = activeTextStyles.fontFamily
  selectedFontSize.value = activeTextStyles.fontSize
  selectedColor.value = activeTextStyles.fill
  selectedCharSpacing.value = activeTextStyles.charSpacing
})
</script>
