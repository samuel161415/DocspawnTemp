w<template>
  <NuxtLayout>
    <div class="flex flex-col w-full">
      <!-- <Header v-if="$route.path !== '/signin'" /> -->
      <div class="flex h-screen w-screen">
       
        <SideBar v-if="$route.path !== '/signin' && $route.path !== '/signup'" />
        <div class="flex flex-col w-full">
          <TopHeader v-if="$route.path !== '/signin'" />
          <NuxtPage />
        </div>
      </div>
    </div>
    <!-- <NuxtLoadingIndicator color="repeating-linear-gradient(to right,#cf59e6 0%,#6bc5f8 100%)" /> -->
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
