<template>
  <div class="w-3 h-3 ml-2">
    <Tag :style="{ height: '20px', fontWeight: '500', boxShadow: '5px' }">
      <template #default>
        <span class="font-normal text-base font-poppins">{{ props.value }}</span>
      </template>
    </Tag>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Tag from 'primevue/tag';

const props = defineProps({
  value: {
    type: String,
    required: true,
  },
});

</script>