<template>
  <div class="mt-8 bg-white p-2 ">
    <div class="flex flex-wrap items-center gap-1">
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
      <ColorPicker v-model="selectedColor" ml-1 />

      <Dropdown v-model="selectedFont" :options="fonts" option-label="label" option-value="value" placeholder="Select font " class="w-12 md:w-44 m-1" />
      <Dropdown v-model="selectedFontSize" :options="fontSizes" option-label="label" option-value="value" placeholder="Select font size" class="w-12 md:w-32 m-1" />
    </div>
  </div>
</template>

<script setup>
import { useTextFormattingOptions } from '../../../../composables/useTextFormattingOptions'
import alignCenterIcon from '@/assets/icons/text-formatting/text-format-align-center-icon.svg'
import alignLeftIcon from '@/assets/icons/text-formatting/text-format-align-left-icon.svg'
import alignRightIcon from '@/assets/icons/text-formatting/text-format-align-right-icon.svg'
import underlineIcon from '@/assets/icons/text-formatting/text-format-underline-icon.svg'
import fontIcon from '@/assets/icons/text-formatting/text-format-font-icon.svg'
import fontSizeIcon from '@/assets/icons/text-formatting/text-format-font-size-icon.svg'
import boldIcon from '@/assets/icons/text-formatting/text-format-bold-icon.svg'
import italicIcon from '@/assets/icons/text-formatting/text-format-italic-icon.svg'

const { fonts, fontSizes } = useTextFormattingOptions()

const selectedFont = ref()
const selectedFontSize = ref()
const selectedColor = ref()
</script>
