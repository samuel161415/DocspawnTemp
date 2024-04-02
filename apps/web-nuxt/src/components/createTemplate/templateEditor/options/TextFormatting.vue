<template>
  <div class="mt-8 bg-white p-2 ">
    <div class="flex flex-wrap items-center gap-1">
      <!-- <select v-model="selectedFont" class="w-6 md:w-3rem" placeholder="select font">
        <option v-for="(font, index) in fonts" :key="index" :value="font.value" :style="{ fontFamily: font.value }">
          {{ font.label }}
        </option>
      </select> -->
      <!-- <Dropdown v-model="selectedFont" :options="fonts" option-label="label" option-value="value" placeholder="Select font" class="w-12 md:w-44 m-1" />
      <Dropdown v-model="selectedFontSize" :options="fontSizes" option-label="label" option-value="value" placeholder="Select font" class="w-12 md:w-32 m-1" /> -->
      <!-- <ColorPicker v-model="selectedColor" />
      <Button text icon="pi pi-align-center" class="h-8 w-8 text-lg" />
      <Button text icon="pi pi-align-left" class="h-8 w-8 text-lg" />
      <Button text icon="pi pi-align-right" class="h-8 w-8 text-lg" /> -->
      <Button text class="h-8 w-8 text-2xl ">
        <img :src="fontIcon" class="h-5" />
      </Button>
      <Button text class="h-8 w-8 text-2xl">
        <img :src="fontSizeIcon" class="h-5" />
      </Button>
      <Button text class="h-8 w-8 text-2xl">
        <img :src="underlineIcon" class="h-5" />
      </Button>
      <Button text :icon="boldIcon" class="h-8 w-8 text-2xl ">
        <img :src="boldIcon" class="h-5" />
      </Button>
      <Button text :icon="italicIcon" class="h-8 w-8 text-2xl">
        <img :src="italicIcon" class="h-5" />
      </Button>
      <Button text class="h-8 w-8 text-2xl">
        <img :src="alignLeftIcon" class="h-5" />
      </Button>
      <Button text class="h-8 w-8 text-2xl">
        <img :src="alignCenterIcon" class="h-5" />
      </Button>
      <Button text class="h-8 w-8 text-2xl">
        <img :src="alignRightIcon" class="h-5" />
      </Button>

      <input type="color" defaultValue="#009ee2" class="ml-1" />
    </div>
  </div>
</template>

<script setup>
import alignCenterIcon from '@/assets/icons/text-formatting/text-format-align-center-icon.svg'
import alignLeftIcon from '@/assets/icons/text-formatting/text-format-align-left-icon.svg'
import alignRightIcon from '@/assets/icons/text-formatting/text-format-align-right-icon.svg'
import underlineIcon from '@/assets/icons/text-formatting/text-format-underline-icon.svg'
import fontIcon from '@/assets/icons/text-formatting/text-format-font-icon.svg'
import fontSizeIcon from '@/assets/icons/text-formatting/text-format-font-size-icon.svg'
import boldIcon from '@/assets/icons/text-formatting/text-format-bold-icon.svg'
import italicIcon from '@/assets/icons/text-formatting/text-format-italic-icon.svg'

const selectedFont = ref()
const fonts = ref([
  { label: 'Arial', value: 'Arial' },
  { label: 'Verdana', value: 'verdana' },
  { label: 'Times New Roman', value: 'Times New Roman' },
  { label: 'Helvetica', value: 'Helvetica' },
  { label: 'Courier New', value: 'Courier New' },
  { label: 'Georgia', value: 'Georgia' },
  { label: 'Comic Sans MS', value: 'Comic Sans MS' },

])

const selectedFontSize = ref()
const fontSizes = ref([
  { label: '8', value: '8' },
  { label: '12', value: '12' },
  { label: '16', value: '16' },
  { label: '20', value: '20' },
  { label: '24', value: '24' },
  { label: '28', value: '28' },
  { label: '32', value: '32' },

])

const selectedColor = ref()
</script>
