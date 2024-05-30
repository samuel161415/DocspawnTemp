<template>
  <div class="mt-8 bg-white p-2 ">
    <div class="flex flex-wrap items-center gap-1">
      <div v-tooltip.top="'font family'" class="h-8 w-8 text-2xl flex items-center justify-center rounded-md cursor-pointer p-2 " @click="showFontOptions = true;showFontSizesOptions = false">
        <font-awesome-icon icon="fa-light fa-font" size="xs" />
      </div>
      <div v-tooltip.top="'font size'" class="h-8 w-8 text-2xl flex items-center justify-center rounded-md cursor-pointer p-2" @click="showFontSizesOptions = true;showFontOptions = false">
        <font-awesome-icon icon="fa-light fa-text-size" size="xs" />
      </div>
      <div
        v-tooltip.top="'underline'" class="h-8 w-8 text-2xl flex items-center justify-center rounded-md cursor-pointer p-2" :class="{ 'bg-blue-300': activeTextStyles.underline }" @click="activeTextStyles.underline = activeTextStyles.underline ? false : true"
      >
        <font-awesome-icon icon="fa-light fa-underline" size="xs" />
      </div>
      <div v-tooltip.top="'font family'" class="h-8 w-8 text-2xl flex items-center justify-center rounded-md cursor-pointer p-2" :class="{ 'bg-blue-300 ': activeTextStyles.fontWeight === 700 }" @click="activeTextStyles.fontWeight = activeTextStyles.fontWeight === 700 ? 300 : 700">
        <font-awesome-icon icon="fa-light fa-bold" size="xs" />
      </div>
      <div v-tooltip.top="'italic'" class="h-8 w-8 text-2xl  flex items-center justify-center rounded-md cursor-pointer p-2" :class="{ 'bg-blue-300': activeTextStyles.fontStyle === 'italic' }" @click="activeTextStyles.fontStyle = activeTextStyles.fontStyle === 'italic' ? 'normal' : 'italic'">
        <font-awesome-icon icon="fa-light fa-italic" size="xs" />
      </div>
      <!-- <div v-tooltip.top="'align-left'" class="h-8 w-8 text-2xl flex items-center justify-center rounded-md cursor-pointer p-2" :class="{ 'bg-blue-300': activeTextStyles.textAlign === 'left' }" @click=" activeTextStyles.textAlign = 'left'">
        <font-awesome-icon icon="fa-light fa-align-left" size="xs" />
      </div>
      <div v-tooltip.top="'align-center'" class="h-8 w-8 text-2xl flex items-center justify-center rounded-md cursor-pointer p-2" :class="{ 'bg-blue-300': activeTextStyles.textAlign === 'center' }" @click=" activeTextStyles.textAlign = 'center'">
        <font-awesome-icon icon="fa-light fa-align-center" size="xs" />
      </div>
      <div v-tooltip.top="'align-right'" class="h-8 w-8 text-2xl flex items-center justify-center rounded-md cursor-pointer p-2" :class="{ 'bg-blue-300': activeTextStyles.textAlign === 'right' }" @click=" activeTextStyles.textAlign = 'right'">
        <font-awesome-icon icon="fa-light fa-align-right" size="xs" />
      </div> -->
      <ColorPicker v-model="selectedColor" ml-1 @change="changeColor" />

      <Dropdown v-if="showFontOptions" v-model="selectedFont" :options="fonts" option-label="label" option-value="value" placeholder="Select font " class="w-12 md:w-44  mt-3" @change="changeFont" />
      <Dropdown v-if="showFontSizesOptions" v-model="selectedFontSize" :options="fontSizes" option-label="label" option-value="value" placeholder="Select font size" class="w-12 md:w-32  mt-3" @change="changeSize" />
    </div>
  </div>
</template>

<script setup>
import { useTextFormattingOptions } from '../../../../composables/useTextFormattingOptions'
import { activeTextStyles } from '../store/activeTextStyles'

const { fonts, fontSizes } = useTextFormattingOptions()

const showFontOptions = ref()
const showFontSizesOptions = ref()

const selectedFont = ref()
const selectedFontSize = ref()
const selectedColor = ref()

function changeColor(e) {
  activeTextStyles.fill = `#${e.value}`
}

function changeFont(e) {
  activeTextStyles.fontFamily = e.value
}
function changeSize(e) {
  activeTextStyles.fontSize = e.value
}

watch(activeTextStyles, () => {
  selectedFont.value = activeTextStyles.fontFamily
  selectedFontSize.value = activeTextStyles.fontSize
  selectedColor.value = activeTextStyles.fill
})

onMounted(() => {
  selectedFont.value = activeTextStyles.fontFamily
  selectedFontSize.value = activeTextStyles.fontSize
  selectedColor.value = activeTextStyles.fill
})
</script>
