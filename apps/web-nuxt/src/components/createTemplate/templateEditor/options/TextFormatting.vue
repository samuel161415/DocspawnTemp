<!-- <template>
  <p class="mt-8 font-poppins text-surface-500 ">
    Formatting options
  </p>
  <div class="mt-2 bg-white p-2 ">
    <div class="flex flex-wrap items-center gap-1">
      <div v-if="templateEditorStore.selectedAddedField?.fieldType === 'Data field' || templateEditorStore.selectedAddedField?.fieldType === 'Dataset date' || templateEditorStore.selectedAddedField?.fieldType === 'Static text' || templateEditorStore.selectedAddedField?.fieldType === 'Form text' || templateEditorStore.selectedAddedField?.fieldType === 'Form date' || templateEditorStore.selectedAddedField?.fieldType === 'Form time' || templateEditorStore.selectedAddedField?.fieldType === 'Static date' || templateEditorStore.selectedAddedField?.fieldType === 'Static time' || templateEditorStore.selectedAddedField?.fieldType === 'Form long text' || templateEditorStore.selectedAddedField?.fieldType === 'Form list'" v-tooltip.top="'select font'" class="h-8 w-8 text-2xl flex items-center justify-center rounded-md cursor-pointer p-2 " @click="showFontOptions = true;showFontSizesOptions = false">
        <font-awesome-icon icon="fa-light fa-font" size="xs" />
      </div>
      <div v-if="templateEditorStore.selectedAddedField?.fieldType === 'Data field' || templateEditorStore.selectedAddedField?.fieldType === 'Dataset date' || templateEditorStore.selectedAddedField?.fieldType === 'Static text' || templateEditorStore.selectedAddedField?.fieldType === 'Form text' || templateEditorStore.selectedAddedField?.fieldType === 'Form date' || templateEditorStore.selectedAddedField?.fieldType === 'Form time' || templateEditorStore.selectedAddedField?.fieldType === 'Static date' || templateEditorStore.selectedAddedField?.fieldType === 'Static time' || templateEditorStore.selectedAddedField?.fieldType === 'Form long text' || templateEditorStore.selectedAddedField?.fieldType === 'Form list'" v-tooltip.top="'font size'" class="h-8 w-8 text-2xl flex items-center justify-center rounded-md cursor-pointer p-2" @click="showFontSizesOptions = true;showFontOptions = false">
        <font-awesome-icon icon="fa-light fa-text-size" size="xs" />
      </div>
      <div
        v-if="templateEditorStore.selectedAddedField?.fieldType === 'Data field' || templateEditorStore.selectedAddedField?.fieldType === 'Dataset date' || templateEditorStore.selectedAddedField?.fieldType === 'Static text' || templateEditorStore.selectedAddedField?.fieldType === 'Form text' || templateEditorStore.selectedAddedField?.fieldType === 'Form date' || templateEditorStore.selectedAddedField?.fieldType === 'Form time' || templateEditorStore.selectedAddedField?.fieldType === 'Static date' || templateEditorStore.selectedAddedField?.fieldType === 'Static time' || templateEditorStore.selectedAddedField?.fieldType === 'Form long text' || templateEditorStore.selectedAddedField?.fieldType === 'Form list'"
        v-tooltip.top="'underline'" class="h-8 w-8 text-2xl flex items-center justify-center rounded-md cursor-pointer p-2" :class="{ 'bg-blue-300': activeTextStyles.underline }" @click="activeTextStyles.underline = activeTextStyles.underline ? false : true"
      >
        <font-awesome-icon icon="fa-light fa-underline" size="xs" />
      </div>
      <div v-if="templateEditorStore.selectedAddedField?.fieldType === 'Data field' || templateEditorStore.selectedAddedField?.fieldType === 'Dataset date' || templateEditorStore.selectedAddedField?.fieldType === 'Static text' || templateEditorStore.selectedAddedField?.fieldType === 'Form text' || templateEditorStore.selectedAddedField?.fieldType === 'Form date' || templateEditorStore.selectedAddedField?.fieldType === 'Form time' || templateEditorStore.selectedAddedField?.fieldType === 'Static date' || templateEditorStore.selectedAddedField?.fieldType === 'Static time' || templateEditorStore.selectedAddedField?.fieldType === 'Form long text' || templateEditorStore.selectedAddedField?.fieldType === 'Form list'" v-tooltip.top="'bold'" class="h-8 w-8 text-2xl flex items-center justify-center rounded-md cursor-pointer p-2" :class="{ 'bg-blue-300 ': activeTextStyles.fontWeight === 700 }" @click="activeTextStyles.fontWeight = activeTextStyles.fontWeight === 700 ? 300 : 700">
        <font-awesome-icon icon="fa-solid fa-bold" size="xs" />
      </div>
      <div v-if="templateEditorStore.selectedAddedField?.fieldType === 'Data field' || templateEditorStore.selectedAddedField?.fieldType === 'Dataset date' || templateEditorStore.selectedAddedField?.fieldType === 'Static text' || templateEditorStore.selectedAddedField?.fieldType === 'Form text' || templateEditorStore.selectedAddedField?.fieldType === 'Form date' || templateEditorStore.selectedAddedField?.fieldType === 'Form time' || templateEditorStore.selectedAddedField?.fieldType === 'Static date' || templateEditorStore.selectedAddedField?.fieldType === 'Static time' || templateEditorStore.selectedAddedField?.fieldType === 'Form long text' || templateEditorStore.selectedAddedField?.fieldType === 'Form list'" v-tooltip.top="'italic'" class="h-8 w-8 text-2xl  flex items-center justify-center rounded-md cursor-pointer p-2" :class="{ 'bg-blue-300': activeTextStyles.fontStyle === 'italic' }" @click="activeTextStyles.fontStyle = activeTextStyles.fontStyle === 'italic' ? 'normal' : 'italic'">
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
      <div v-if="templateEditorStore.selectedAddedField?.fieldType === 'Data field' || templateEditorStore.selectedAddedField?.fieldType === 'Dataset date' || templateEditorStore.selectedAddedField?.fieldType === 'Static text' || templateEditorStore.selectedAddedField?.fieldType === 'Form text' || templateEditorStore.selectedAddedField?.fieldType === 'Form date' || templateEditorStore.selectedAddedField?.fieldType === 'Form time' || templateEditorStore.selectedAddedField?.fieldType === 'Static date' || templateEditorStore.selectedAddedField?.fieldType === 'Static time' || templateEditorStore.selectedAddedField?.fieldType === 'Form list'" v-tooltip.top="'reduce character spacing'" class="h-8 w-8 text-2xl flex items-center justify-center rounded-md cursor-pointer p-2 rotate-90" @click="reduceCharacterSpacing">
        <font-awesome-icon icon="fa-light fa-arrows-to-line" size="sm" />
      </div>
      <div v-if="templateEditorStore.selectedAddedField?.fieldType === 'Data field' || templateEditorStore.selectedAddedField?.fieldType === 'Dataset date' || templateEditorStore.selectedAddedField?.fieldType === 'Static text' || templateEditorStore.selectedAddedField?.fieldType === 'Form text' || templateEditorStore.selectedAddedField?.fieldType === 'Form date' || templateEditorStore.selectedAddedField?.fieldType === 'Form time' || templateEditorStore.selectedAddedField?.fieldType === 'Static date' || templateEditorStore.selectedAddedField?.fieldType === 'Static time' || templateEditorStore.selectedAddedField?.fieldType === 'Form list'" v-tooltip.top="'increase character spacing'" class="h-8 w-8 text-2xl flex items-center justify-center rounded-md cursor-pointer p-2 rotate-90" @click="increaseCharacterSpacing">
        <font-awesome-icon icon="fa-light fa-arrows-from-line" size="sm" />
      </div>
      <ElementRotation v-if="templateEditorStore.selectedAddedField?.fieldType !== 'Form long text'" />

      <Dropdown v-if="showFontOptions" v-model="selectedFont" :options="fonts" option-label="label" option-value="value" placeholder="Select font " class="w-12 md:w-44  mt-3" @change="changeFont" />
      <Dropdown v-if="showFontSizesOptions" v-model="selectedFontSize" :options="fontSizes" option-label="label" option-value="value" placeholder="Select font size" class="w-12 md:w-32  mt-3" @change="changeSize" />
      <input
        v-if="templateEditorStore.selectedAddedField?.fieldType === 'Data field' || templateEditorStore.selectedAddedField?.fieldType === 'Dataset date' || templateEditorStore.selectedAddedField?.fieldType === 'Static text' || templateEditorStore.selectedAddedField?.fieldType === 'Form text' || templateEditorStore.selectedAddedField?.fieldType === 'Form date' || templateEditorStore.selectedAddedField?.fieldType === 'Form time' || templateEditorStore.selectedAddedField?.fieldType === 'Static date' || templateEditorStore.selectedAddedField?.fieldType === 'Static time' || templateEditorStore.selectedAddedField?.fieldType === 'Form long text' || templateEditorStore.selectedAddedField?.fieldType === 'Form list'"
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
</script> -->
<template>
  <!-- <p class="mt-8 font-poppins text-surface-500">
    Formatting options
  </p> -->
  <div class="mt-2 bg-white p-2">
    <div class="flex flex-wrap items-center gap-3">
      <!-- Select Font Button -->
      <Button
        v-if="isEditableFieldType"
        v-tooltip="'Select Font'"
        outlined
        class="w-max px-2"
        @click="toggleFontOptions"
      >
        <font-awesome-icon icon="fa-solid fa-font" size="lg" />
      </Button>

      <!-- Font Size Button -->
      <Button
        v-if="isEditableFieldType"
        v-tooltip="'Font Size'"
        outlined
        class="w-max px-2"
        @click="toggleFontSizeOptions"
      >
        <font-awesome-icon icon="fa-light fa-text-size" size="lg" />
      </Button>

      <!-- Underline Button -->
      <Button
        v-if="isEditableFieldType"
        v-tooltip="'Underline'"
        outlined
        class="w-max px-2"
        :class="{ 'is-active': activeTextStyles.underline }"
        @click="toggleUnderline"
      >
        <font-awesome-icon icon="fa-solid fa-underline" size="lg" />
      </Button>

      <!-- Bold Button -->
      <Button
        v-if="isEditableFieldType"
        v-tooltip="'Bold'"
        outlined
        class="w-max px-2"
        :class="{ 'is-active': activeTextStyles.fontWeight === 700 }"
        @click="toggleBold"
      >
        <font-awesome-icon icon="fa-solid fa-bold" size="lg" />
      </Button>

      <!-- Italic Button -->
      <Button
        v-if="isEditableFieldType"
        v-tooltip="'Italic'"
        outlined
        class="w-max px-2"
        :class="{ 'is-active': activeTextStyles.fontStyle === 'italic' }"
        @click="toggleItalic"
      >
        <font-awesome-icon icon="fa-solid fa-italic" size="lg" />
      </Button>

      <!-- Text Align Buttons -->
      <Button
        v-if="templateEditorStore.selectedAddedField?.fieldType === 'Form long text'"
        v-tooltip="'Align Left'"
        outlined
        class="w-max px-2"
        :class="{ 'is-active': activeTextStyles.textAlign === 'left' }"
        @click="setTextAlign('left')"
      >
        <font-awesome-icon icon="fa-solid fa-align-left" size="lg" />
      </Button>
      <Button
        v-if="templateEditorStore.selectedAddedField?.fieldType === 'Form long text'"
        v-tooltip="'Align Center'"
        outlined
        class="w-max px-2"
        :class="{ 'is-active': activeTextStyles.textAlign === 'center' }"
        @click="setTextAlign('center')"
      >
        <font-awesome-icon icon="fa-solid fa-align-center" size="lg" />
      </Button>
      <Button
        v-if="templateEditorStore.selectedAddedField?.fieldType === 'Form long text'"
        v-tooltip="'Align Right'"
        outlined
        class="w-max px-2"
        :class="{ 'is-active': activeTextStyles.textAlign === 'right' }"
        @click="setTextAlign('right')"
      >
        <font-awesome-icon icon="fa-solid fa-align-right" size="lg" />
      </Button>

      <!-- Character Spacing Buttons -->
      <Button
        v-if="isEditableFieldType"
        v-tooltip="'Reduce Character Spacing'"
        outlined
        class="w-max px-2 "
        @click="reduceCharacterSpacing"
      >
        <font-awesome-icon class="rotate-90" icon="fa-light fa-arrows-to-line" size="lg" />
      </Button>
      <Button
        v-if="isEditableFieldType"
        v-tooltip="'Increase Character Spacing'"
        outlined
        class="w-max px-2 "
        @click="increaseCharacterSpacing"
      >
        <font-awesome-icon class="rotate-90" icon="fa-light fa-arrows-from-line" size="lg" />
      </Button>

      <!-- Additional Elements -->
      <ElementRotation v-if="templateEditorStore.selectedAddedField?.fieldType !== 'Form long text'" />

      <!-- Font Selection Dropdown -->
      <Dropdown
        v-if="showFontOptions"
        v-model="selectedFont"
        :options="fonts"
        option-label="label"
        option-value="value"
        placeholder="Select font"
        class="w-12 md:w-44 mt-3"
        @change="changeFont"
      />
      <Dropdown
        v-if="showFontSizesOptions"
        v-model="selectedFontSize"
        :options="fontSizes"
        option-label="label"
        option-value="value"
        placeholder="Select font size"
        class="w-12 md:w-32 mt-3"
        @change="changeSize"
      />

      <!-- Color Picker -->
      <input
        v-if="isEditableFieldType"
        v-model="selectedColor"
        type="color"
        class="ml-1"
        @input="changeColor"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import ElementRotation from './ElementRotation.vue'
import { activeTextStyles } from '@/composables/useTemplateEditorData'
import { useTextFormattingOptions } from '@/composables/useTextFormattingOptions'

const { fonts, fontSizes } = useTextFormattingOptions()
const showFontOptions = ref(false)
const showFontSizesOptions = ref(false)
const selectedFont = ref('')
const selectedFontSize = ref('')
const selectedColor = ref('')
const selectedCharSpacing = ref()

// Computed property to check editable field types
const isEditableFieldType = computed(() => {
  const fieldType = templateEditorStore.selectedAddedField?.fieldType
  return ['Data field', 'Dataset date', 'Static text', 'Form text', 'Form date', 'Form time', 'Static date', 'Static time', 'Form long text', 'Form list'].includes(fieldType)
})

// Handlers for font, size, and color changes
function changeColor(e) {
  activeTextStyles.fill = e.target.value
}

function changeFont(e) {
  activeTextStyles.fontFamily = e.value
}

function changeSize(e) {
  activeTextStyles.fontSize = e.value
}

// Text style toggles
function toggleUnderline() {
  activeTextStyles.underline = !activeTextStyles.underline
}

function toggleBold() {
  activeTextStyles.fontWeight = activeTextStyles.fontWeight === 700 ? 300 : 700
}

function toggleItalic() {
  activeTextStyles.fontStyle = activeTextStyles.fontStyle === 'italic' ? 'normal' : 'italic'
}

// Align Text
function setTextAlign(alignment) {
  activeTextStyles.textAlign = alignment
}

// Character spacing handlers
function reduceCharacterSpacing() {
  activeTextStyles.charSpacing = activeTextStyles.charSpacing ? activeTextStyles.charSpacing - 50 : -50
}

function increaseCharacterSpacing() {
  activeTextStyles.charSpacing = activeTextStyles.charSpacing ? activeTextStyles.charSpacing + 50 : 50
}

// Dropdown visibility handlers
function toggleFontOptions() {
  showFontOptions.value = true
  showFontSizesOptions.value = false
}

function toggleFontSizeOptions() {
  showFontSizesOptions.value = true
  showFontOptions.value = false
}

// Sync activeTextStyles with dropdowns
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

<style scoped>
.is-active {
  background-color: #009ee2;
  color: #fff;
}
.not-active{
  color: #009ee2;
  color: #fff;
}
.is-active:hover {
  background-color: var(--purple-contrast);
  color: #000;
}
</style>
