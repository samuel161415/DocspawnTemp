<template>
  <div v-if="!verifiedUser" class="flex items-center h-[100vh] justify-center">
    <div class="flex flex-col justify-center w-300 md:w-1/4 gap-4 ">
      <p class="font-poppins">
        Select account
      </p>
      <div class="flex flex-wrap gap-8 mb-4">
        <div class="flex items-center">
          <RadioButton v-model="accountType" input-id="accountType1" name="pizza" value="Demo" />
          <label for="accountType1" class="ml-2 font-poppins text-lg">Final Demo</label>
        </div>
        <div class="flex items-center">
          <RadioButton v-model="accountType" input-id="accountType2" name="pizza" value="Adam" />
          <label for="accountType2" class="ml-2 font-poppins text-lg">Adam </label>
        </div>
        <div class="flex items-center">
          <RadioButton v-model="accountType" input-id="accountType3" name="pizza" value="Hanan" />
          <label for="accountType3" class="ml-2 font-poppins text-lg">Hanan</label>
        </div>
      </div>
      <p class="font-poppins">
        Write password
      </p>
      <InputText
        v-model="password" type="password"
      />
      <Button class="w-full" :disabled="!accountType" @keyup.enter="checkPassword" @click="checkPassword">
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
import { accountData } from '@/composables/useAccountData'

const runtimeConfig = useRuntimeConfig()

const accountType = ref('')
watch(accountType, (val) => {
  accountData.accountType = val
})

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
