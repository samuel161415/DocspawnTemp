<template>
    <Breadcrumb class="border-none rounded-none" :home="home" :model="items">
      <template #item="{ item, props }">
        <router-link
          v-if="item.route"
          v-slot="{ href, navigate }"
          :to="item.route"
          custom
        >
          <a :href="href" v-bind="props.action" @click="navigate">
            <font-awesome-icon :icon="item.icon" size="lg" style="--fa-primary-color: #009ee2; --fa-secondary-color: #009ee2; --fa-secondary-opacity: 0.6;" />
            <span
              class="text-lg text-primary-500 dark:text-primary-400 font-semibold"
            >{{ item.label }}</span>
          </a>
        </router-link>
        <a v-else :href="item.url" :target="item.target" v-bind="props.action">
          <span class="text-surface-700 dark:text-surface-0/80">{{ item.label }}</span>
        </a>
      </template>
    </Breadcrumb>
  </template>
  
  <script setup>
  import { defineProps } from 'vue'
  
  const props = defineProps({
    home: Object,
    items: Array,
  })
  </script>