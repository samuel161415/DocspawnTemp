<template>
  <div v-if="!verifiedUser" class="flex items-center h-[100vh] justify-center">
    <div class="flex flex-col justify-center w-300 md:w-1/4 gap-4 ">
      <p class="font-poppins">
        Write admin password
      </p>
      <InputText
        v-model="password" type="password"
      />
      <Button class="w-full" @keyup.enter="checkPassword" @click="checkPassword">
        Submit
      </Button>
    </div>
  </div>
  <NuxtLayout v-else>
    <div class="flex flex-col w-full">
      <div class="flex fixed h-screen w-screen">
        <SideBar v-if="$route.path !== '/signin' && $route.path !== '/signup'" />
        <div class="flex flex-col w-full">
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
import { useToast } from 'primevue/usetoast'
import SideBar from './components/layout/Sidebar.vue'
import 'primeicons/primeicons.css'
import MenuBar from './components/settings/MenuBar.vue'

const runtimeConfig = useRuntimeConfig()

const verifiedUser = ref(false)
const password = ref()
function checkPassword() {
  if (password.value === runtimeConfig.public.ADMIN_PASSWORD)
    verifiedUser.value = true
}
function isSettingsRoute(path: string) {
  return path.split('/').includes('settings')
}
</script>
