<!-- commit to trigger sami.listOption deployment 4 -->
 <!-- commit to trigger sami.listOption deployment 5 -->
  <!-- commit to trigger sami.listOption deployment 6 -->
<!-- <template>
  <div v-if="!isAuthenticated" class="flex flex-col justify-center items-center w-full h-[100vh] gap-4">
    <InputText v-model="email" placeholder="Enter your email" />
    <p v-if="error" class="text-red-600">
      {{ error }}
    </p>
    <RecaptchaV2
      @widget-id="handleWidgetId"
      @error-callback="handleErrorCalback"
      @expired-callback="handleExpiredCallback"
      @load-callback="handleLoadCallback"
    />
    <Button label="Submit" @click="submitEmail" />
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
import { RecaptchaV2 } from 'vue3-recaptcha-v2'
import SideBar from './components/layout/Sidebar.vue'
import 'primeicons/primeicons.css'
import MenuBar from './components/settings/MenuBar.vue'
import { useAuth } from '@/composables/useAuth'

function handleWidgetId(widgetId: number) {
  console.log('Widget ID: ', widgetId)
}
function handleErrorCalback() {
  console.log('Error callback')
}
function handleExpiredCallback() {
  console.log('Expired callback')
}
function handleLoadCallback(response: unknown) {
  console.log('Load callback', response)
}

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
  if (verified.value) {
    alert('Form submitted successfully')
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
  else {
    alert('Please complete the CAPTCHA')
  }
}
</script> -->
<template>
  <div v-if="!isAuthenticated" class="flex flex-col justify-center items-center w-full h-[100vh] gap-4">
    <InputText v-model="email" placeholder="Enter your email" />
    <p v-if="error" class="text-red-600">
      {{ error }}
    </p>
    <!-- <RecaptchaV2
      @widget-id="handleWidgetId"
      @error-callback="handleErrorCallback"
      @expired-callback="handleExpiredCallback"
      @load-callback="handleLoadCallback"
      @verify-callback="handleVerifyCallback"
    /> -->
    <Button label="Submit" @click="submitEmail" />
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

// import { RecaptchaV2 } from 'vue3-recaptcha-v2'
import SideBar from './components/layout/Sidebar.vue'
import 'primeicons/primeicons.css'
import MenuBar from './components/settings/MenuBar.vue'
import { useAuth } from '@/composables/useAuth'

const { token, setToken, user, setUser } = useAuth()
const isAuthenticated = ref(false)
const email = ref('')
const error = ref('')
// const verified = ref(false) // Track if recaptcha is verified
// const recaptchaResponse = ref('') // Store the recaptcha response token

// function handleWidgetId(widgetId: number) {
//   console.log('Widget ID: ', widgetId)
// }
// function handleErrorCallback() {
//   console.log('Error callback')
// }
// function handleExpiredCallback() {
//   console.log('Expired callback')
//   verified.value = false // Reset verification status if expired
// }
// function handleLoadCallback(response: unknown) {
//   console.log('Load callback', response)
//   if (response) {
//     // recaptchaResponse.value = response // Save the response token
//     verified.value = true // Mark CAPTCHA as successfully completed
//   }
// }
// function handleVerifyCallback(response: string) {
//   console.log('Verify callback', response)
//   recaptchaResponse.value = response // Save the response token
//   verified.value = true // Mark CAPTCHA as successfully completed
// }

function isSettingsRoute(path: string) {
  return path.split('/').includes('settings')
}
watch(user, (val) => {
  if (!val)
    isAuthenticated.value = false
})
onMounted(async () => {
  if (user.value && token.value)
    return
})

function submitEmail() {
  // if (verified.value) {
  //   alert('Form submitted successfully')
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
  // }
  // else {
  //   alert('Please complete the CAPTCHA')
  // }
}
</script>
