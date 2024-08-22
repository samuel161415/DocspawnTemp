<!-- local version -->
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
// import Button from 'docGenerationRemote/Button'
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
const isAuthenticated = ref(false)
const email = ref('')
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

<!-- //server version -->
<!-- <template>
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
const { token, setToken, fetchUserDetails, user, setUser } = useAuth()

onMounted(async () => {
  if (user.value && token.value)
    return

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

  // Add Outseta configuration and custom event listener
  const scriptOptions = document.createElement('script')
  scriptOptions.innerHTML = `
    var o_options = {
      domain: 'docspawn.outseta.com',
    };
  `
  document.head.appendChild(scriptOptions)

  const scriptOutseta = document.createElement('script')
  scriptOutseta.src = 'https://cdn.outseta.com/outseta.min.js'
  scriptOutseta.setAttribute('data-options', 'o_options')
  document.head.appendChild(scriptOutseta)

  scriptOutseta.onload = () => {
    Outseta.on('accessToken.set', (decodedToken) => {
      setUser(decodedToken)
    })
  }
})
</script> -->
