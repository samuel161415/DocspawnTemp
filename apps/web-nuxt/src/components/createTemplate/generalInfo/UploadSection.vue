<template>
    <div class="w-full space-y-4">
      <p class="font-medium text-surface-600 text-lg font-poppins">{{ title }}</p>
      <FileUpload name="demo[]" url="/api/upload" @upload="onAdvancedUpload" :multiple="true" accept=".pdf,.csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" :maxFileSize="1000000">
        <template #empty>
          <p class="flex justify-center text-center font-poppins text-surface-500">Drag and drop files here to upload.</p>
        </template>
      </FileUpload>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    title: String
  });
  
  const emit = defineEmits(['upload']);
  
  const onAdvancedUpload = (event) => {
    emit('upload', event);
  };
  </script>