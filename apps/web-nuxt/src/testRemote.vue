<template>
  hi
  <RemoteDataView />
</template>

<script setup>
import Dropdown from 'primevue/dropdown'
import { defineAsyncComponent } from 'vue'

const text = ref('I am a remote text')
// const RemoteButton = defineAsyncComponent(() =>
//   import('docGenerationRemote/Button'),
// )
const RemoteDataView = defineAsyncComponent(() =>
  import('docGenerationRemote/TemplateDataViewRemote'),
)
</script>
