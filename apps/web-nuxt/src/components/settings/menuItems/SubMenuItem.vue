<template>
    <li class="menu-item">
      <!-- Menu item content here -->
      <SubMenuItem v-for="subItem in item.subitems" :key="subItem.title" :sub-item="subItem" />
    </li>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  import SubMenuItem from './SubMenuItem.vue';
  
  const props = defineProps({
    item: Object
  });
  
  </script>