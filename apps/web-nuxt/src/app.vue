<template>
  <div v-if="!isAuthenticated" class="flex flex-col justify-center items-center w-full h-[100vh] gap-4">
    <InputText v-model="email" placeholder="Enter your email" />
    <p v-if="error" class="text-red-600">
      {{ error }}
    </p>
    <Button label="Submit " @click="submitEmail" />
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
import { useRoute, useRouter } from 'vue-router'

import SideBar from './components/layout/Sidebar.vue'
import 'primeicons/primeicons.css'
import MenuBar from './components/settings/MenuBar.vue'
import { useAuth } from '@/composables/useAuth'

function isSettingsRoute(path: string) {
  return path.split('/').includes('settings')
}

const { token, setToken, user, setUser } = useAuth()
const isAuthenticated = ref(false)
const email = ref('')
const error = ref('')
watch(user, (val) => {
  if (!val)
    isAuthenticated.value = false
})
onMounted(async () => {
  if (user.value && token.value)
    return

  // setUser({ name: 'Hanan', email: 'hanan@gmail.com' })
  // setToken('.....')
})

function submitEmail() {
  error.value = ''
  if (email.value === 'hanan@tec.tech') {
    setUser({ name: 'Hanan', email: 'hanan@tec.tech' })
    setToken('.....')
    isAuthenticated.value = true
  }
  else if (email.value === 'adam@tec.tech') {
    setUser({ name: 'Adam Duchemann', email: 'adam@tec.tech' })
    setToken('.....')
    isAuthenticated.value = true
  }
  else if (email.value === 'test@docspawn.com') {
    setUser({ name: 'Test account', email: 'test@docspawn.com' })
    setToken('.....')
    isAuthenticated.value = true
  }
  else {
    error.value = 'Not valid email'
  }
}
</script>
