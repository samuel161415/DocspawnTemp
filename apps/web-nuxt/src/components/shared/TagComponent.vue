<template>
  <div class="w-3 h-3">
    <Tag :style="{ height: '17px', fontWeight: '500', boxShadow: '5px' }">
      <template #default>
        <span class="font-thin">{{ props.value }}</span>
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