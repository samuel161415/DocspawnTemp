<template>
  <div class="w-full h-full items-center mx-8">
    <p class="font-semibold text-surface-600 text-2xl flex text-center justify-center">General information</p>
   
    <div class="flex mx-8 mt-4">
      <div class="flex-auto flex py-2">
        <div class="w-full space-y-4">
          <p class="font-medium text-surface-600 text-lg font-poppins">Template name <span class="text-error">*</span></p>
          <InputText type="text" v-model="templateName" class="w-80 font-poppins text-surface-600 text-lg pl-5 rounded-lg" placeholder="Template name"/>
        </div>
      </div>
    </div>

    <p class="font-medium text-surface-600 text-lg font-poppins mx-8 mt-4">Select your use case</p>
    <div class="flex mx-8 mt-3">
      <div class="flex flex-col gap-4">
        <TemplateOption
          v-for="option in options"
          :key="option.label"
          :label="option.label"
          :is-current="currentData === option.label"
          :is-selected="selectedTemplate === option.label"
          @select="handleSelectTemplate"
          @hover="setIsHovered"
        />
      </div>

      <div class="border surface-border rounded-lg flex-auto flex p-6 ml-4">
        <p class="font-poppins text-surface-600 text-lg font-medium">
          {{ currentData !== ''? currentData: selectedTemplate }}
        </p>
      </div>
    </div>

    <!-- uploads -->
    <div :class="selectedTemplate === '' ? 'h-[187px]' : 'rounded-lg flex mx-8 space-x-6'" class="mt-8">
      <UploadSection v-if="selectedTemplate !== ''" title="Upload your template"  @upload="handleTemplateUpload"/>
      <UploadSection v-if="selectedTemplate !== '' && isTableToDoc" title="Upload your data source" />
    </div>
  
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

import TemplateOption from './Options.vue';
import UploadSection from './UploadSection.vue';

const currentData = ref("Content I");
const selectedTemplate = ref('');
const templateName = ref('');
const useCase = ref('');
const templateFile= ref();
const dataSourceFile = ref();

const emit = defineEmits();

const options = ref([
  { label: 'Data to doc' },
  { label: 'Form to doc' },
  { label: 'Table to doc' }
]);

const setIsHovered = (label, hovered) => {
  currentData.value = hovered ? label : '';
};

const handleSelectTemplate = (label) => {
  if (label === selectedTemplate.value) {
    selectedTemplate.value = ''; 
  } else {
    selectedTemplate.value = label;
  }
};

const handleTemplateUpload = (event) => {
  templateFile.value = event;
};

// Watch for changes in variables and emit data
watch([templateName, selectedTemplate], () => {
  const isValid = templateName.value !== '' && selectedTemplate.value !== '';

  emit('updateData', {isValid, step: 1});
});


const isTableToDoc = computed(() => selectedTemplate.value === 'Table to doc');
</script>
