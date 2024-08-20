<template>
  <Checkbox :key="checkbox + props?.keyS" v-model="check" :binary="true" />
</template>

<script setup>
const props = defineProps(['val', 'columnName', 'keyS'])
const emit = defineEmits(['changeDS'])

const check = ref(props?.val)

watch(check, () => {
  emit('changeDS')
})
</script>
