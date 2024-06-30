<template>
  <TemplateCreation />
</template>

<script setup>
import TemplateCreation from './create'
import { activeTextStyles, templateEditorStore } from '@/composables/useTemplateEditorData'
import { templateDeliveryOptions, templateGeneralInformation } from '~/composables/useTemplateCreationData'
</script>
