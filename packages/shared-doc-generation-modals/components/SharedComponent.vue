<template>
  <div>
    <p>{{ props?.message ? $t(props.message) : 'My message' }}</p>
    <Button label="Click Me" icon="pi pi-check" />
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

// Import the Button component if not globally registered

// Define props using the Composition API
const props = defineProps(['message'])
</script>
