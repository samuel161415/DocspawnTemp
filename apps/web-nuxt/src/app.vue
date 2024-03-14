w<template>
  <NuxtLayout>
    <div class="flex flex-col w-full ">
      <!-- <Header v-if="$route.path !== '/signin'" /> -->
      <div class="flex h-screen w-screen overflow-hidden fixed">
       
        <SideBar v-if="$route.path !== '/signin' && $route.path !== '/signup'" />
        <div class="flex flex-col w-full">
          <TopHeader v-if="$route.path !== '/signin'" />
          <div class="flex  h-full">
            
            <MenuBar v-if="isSettingsRoute($route.path)" />
            <NuxtPage />
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import SideBar from './components/Sidebar.vue';
import 'primeicons/primeicons.css'
import TopHeader from './components/shared/TopHeader.vue';
import MenuBar from './components/settings/MenuBar.vue';

const isSettingsRoute = (path: string) => {

  return path.split('/').includes('settings')
  };
</script>

<style>
/* style */
</style>
