<template>
  <NuxtLayout>
    <div class="flex flex-col w-full">
      <div class="flex fixed h-screen w-screen">
        
        <SideBar v-if="$route.path !== '/signin' && $route.path !== '/signup'" />
        <div class="flex flex-col w-full">
          <TopHeader v-if="$route.path !== '/signin'" />
          <div class="flex flex-row h-full bg-secondary p-4">
            <MenuBar v-if="isSettingsRoute($route.path)" />
            <NuxtPage />
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import SideBar from './components/layout/Sidebar.vue';
import 'primeicons/primeicons.css'
import TopHeader from './components/layout/TopHeader.vue';
import MenuBar from './components/settings/MenuBar.vue';


const isSettingsRoute = (path: string) => {

  return path.split('/').includes('settings')
};

</script>

