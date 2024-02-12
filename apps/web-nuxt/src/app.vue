<template>
  <NuxtLayout>
    <div class="flex flex-col w-full">
      <Header v-if="$route.path !== '/signin'" />
      <div class="flex h-[calc(100vh-86px)] w-screen">
        <SidebarMenu v-if="$route.path !== '/signin' && $route.path !== '/signup'" />
        <NuxtPage />
      </div>
    </div>
    <!-- <NuxtLoadingIndicator color="repeating-linear-gradient(to right,#cf59e6 0%,#6bc5f8 100%)" /> -->
  </NuxtLayout>
</template>

<style>
/* style */
</style>

<script lang="ts" setup>
import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
</script>
