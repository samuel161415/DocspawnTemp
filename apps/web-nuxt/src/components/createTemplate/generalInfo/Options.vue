<template>
  <div
    :class="optionClass"
    class="p-5 rounded-lg shadow-sm w-80 border font-poppins text-surface-500 cursor-pointer transition-transform duration-300 hover:scale-105"
    @mouseenter="setIsHovered(true)"
    @mouseleave="setIsHovered(false)"
    @click="handleSelect"
  >
    <p class="font-poppins text-surface-600 text-lg">
      {{ label }}
    </p>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  label: String,
  isSelected: Boolean,
  isCurrent: Boolean,
})

const emit = defineEmits(['select', 'hover'])

function setIsHovered(hovered) {
  emit('hover', props.label, hovered)
}

function handleSelect() {
  emit('select', props.label)
}

const optionClass = computed(() => ({
  'border-primaryBlue bg-primary-50': props.isCurrent || props.isSelected,
  'border-surface-100 bg-surface-50': !(props.isCurrent || props.isSelected),
}))
</script>
