<template>
  <div>
    <templateData />
  </div>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'

const templateData = defineAsyncComponent(() =>
  import('main-app/templateData'),
)
</script>
