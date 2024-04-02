<template>
  <div class="flex h-full min-h-screen w-full  space-x-6 relative mb-12">
    <TemplateFields />
    <EditorCanvas />
    <Options />
  </div>
</template>

<script setup>
import TemplateFields from './templateEditor/templateFields/TemplateFields.vue'
import Options from './templateEditor/options/Options.vue'
import EditorCanvas from './templateEditor/editorCanvas/EditorCanvas.vue'
</script>

<style lang="scss" scoped></style>
