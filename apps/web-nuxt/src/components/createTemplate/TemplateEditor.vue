<template>
  <p class="font-semibold text-surface-600 text-2xl flex text-center justify-center pb-5">
    {{ templateGeneralInformation?.useCase === 'Expert editor' ? 'Expert editor' : $t('Pg_template_create_templateEditor.template_editor') }}
  </p>
  <!-- w-[80vw]  ml-[50%] translate-x-[-50%]  -->
  <div v-if="templateGeneralInformation?.useCase === 'Expert editor'" class="flex gap-8 ">
    <SnippetLibraryIntegration />
    <div class="min-h-[800px]">
      <ExperEditor />
    </div>
    <Options :is-expert-editor="true" @save-template="emit('saveTemplate')" />
  </div>
  <div v-else class="flex w-full space-x-3 relative mb-12 h-[90vh] overflow-hidden ">
    <TemplateFields />
    <EditorCanvas />
    <Options @save-template="emit('saveTemplate')" />
  </div>
</template>

<script setup>
import TemplateFields from './templateEditor/templateFields/TemplateFields.vue'
import Options from './templateEditor/options/Options.vue'
import EditorCanvas from './templateEditor/editorCanvas/EditorCanvas.vue'
import ExperEditor from './ExpertEditor'
import SnippetLibraryIntegration from './ExpertEditor/SnippetLibraryIntegration'
import { templateGeneralInformation } from '@/composables/useTemplateCreationData'

const emit = defineEmits(['saveTemplate'])
onMounted(() => {
  console.log('template general infdormations', templateGeneralInformation)
})
</script>

<style lang="scss" scoped>
::-webkit-scrollbar {
    width: 10px;
    height: 10px;
}
::-webkit-scrollbar-track {
    background: #f1f1f1;
}
::-webkit-scrollbar-thumb {
    background: #009ee233;
    border-radius: 8px;
}
::-webkit-scrollbar-thumb:hover {
    background: #009ee288;
}
</style>
