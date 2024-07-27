<template>
  <NuxtLayout>
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
import { useRoute, useRouter } from 'vue-router'
import SideBar from './components/layout/Sidebar.vue'
import 'primeicons/primeicons.css'
import MenuBar from './components/settings/MenuBar.vue'

import { useAuth } from '@/composables/useAuth'

function isSettingsRoute(path: string) {
  return path.split('/').includes('settings')
}

const router = useRouter()
const route = useRoute()
const { token, setToken, fetchUserDetails, user } = useAuth()

onMounted(async () => {
  const accessToken = route.query.access_token

  if (accessToken) {
    setToken(accessToken)
    await fetchUserDetails()
    if (user.value)
      router.push('/') // Redirect to home if user is authenticated
    else
      console.error('User details could not be fetched')
  }
  else if (route.path !== '/signin') {
    router.push('/signup') // Redirect to signup if no access token and not on sign-in page
  }
})
</script>
