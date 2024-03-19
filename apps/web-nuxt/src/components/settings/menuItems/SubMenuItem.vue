<template>
    <div class="border-l ml-8">
        <div class="py-2 space-y-2 pl-2 hover:bg-surface-100 hover:border-l hover:border-surface-400" @click="toggleVisible">
            <p class="text-base font-normal ml-2 text-gray-500">
            {{ subItem.title }}
            </p>
        </div>
        <ul v-if="subItem.nestedMenuVisible">
            <li v-if="subItem.nestedMenuVisible">
                <div  
                    v-for="subSubItem in subItem.subitems"
                    :key="subSubItem.title"
                    class="ml-6 py-2 pl-2 hover:bg-surface-100"
                    @click="handleSubSubItemClick(subSubItem)"  >
                    <p class="text-base font-normal ml-2 text-gray-500">
                        {{ subSubItem?.title }}
                    </p>
                </div>
            </li> 
        </ul>
    </div>
    
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const props = defineProps({
    subItem: {
        type: Object,
        required: false
    }
  });
  
  const toggleVisible = () => {
    props.subItem.nestedMenuVisible = !props.subItem.nestedMenuVisible;
  };
  </script>