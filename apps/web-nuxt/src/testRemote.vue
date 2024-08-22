<template>
  hi
  <RemoteButton />
</template>

<script setup>
import { defineAsyncComponent } from 'vue'

const RemoteButton = defineAsyncComponent(() =>
  import('docGenerationRemote/Button'),
)
</script>
