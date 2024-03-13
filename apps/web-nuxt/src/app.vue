w<template>
  <NuxtLayout>
    <div class="flex flex-col w-full">

      <div class="flex h-screen w-screen">
       
        <SideBar v-if="$route.path !== '/signin' && $route.path !== '/signup'" />
        <div class="flex flex-col w-full">
          <TopHeader v-if="$route.path !== '/signin'" />
          <NuxtPage />
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import SideBar from './components/Sidebar.vue';
import 'primeicons/primeicons.css'
import TopHeader from './components/shared/TopHeader.vue';
</script>

<style>
/* style */
</style>
