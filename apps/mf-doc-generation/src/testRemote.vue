<template>
  hi
  <!-- <RemoteButton :remote-text-as-props="text" /> -->
</template>

<script setup>
import { defineAsyncComponent } from 'vue'

const text = ref('I am a remote text')
// const RemoteButton = defineAsyncComponent(() =>
//   import('docGenerationRemote/Button'),
// )
</script>
