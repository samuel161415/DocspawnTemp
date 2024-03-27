<template>
      <div class="w-3 h-3">

        <Tag  value="Business" :style="{height: '17px', fontWeight:'500',   boxShadow: '5px'}"> 
            <template #value>
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
})
</script>