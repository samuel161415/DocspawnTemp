<template>
  <ExpertEditor :is-snippet-library="true" :is-editing="props?.isEditing" :current-snippet="props?.currentSnippet" />
</template>

<script setup>
import ExpertEditor from '../../components/createTemplate/ExpertEditor'

const props = defineProps(['isEditing', 'currentSnippet'])
</script>
