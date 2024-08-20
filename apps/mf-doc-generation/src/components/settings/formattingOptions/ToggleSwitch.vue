<template>
  <InputSwitch
    v-model="isChecked"
    @click="(e) => emit('updateCurrVal', e)"
  />
</template>

<script setup>
const props = defineProps(['currVal'])
const emit = defineEmits(['updateCurrVal'])
const isChecked = ref(true)
onMounted(() => {
  isChecked.value = props.currVal
})
watch(() => props.currVal, (val) => {
  isChecked.value = val
})
</script>
