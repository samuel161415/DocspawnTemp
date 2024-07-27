<template>
  <div v-show="!verifiedUser" class="flex items-center h-max justify-center bg-white w-[300px] p-8">
    <div class="flex flex-col justify-center w-300 md:w-full gap-4 ">
      <p class="font-poppins">
        Write auth token
      </p>
      <InputText v-model="password" type="password" />
      <Button class="w-full" @keyup.enter="checkPassword" @click="checkPassword">
        {{ $t('app.submit') }}
      </Button>
    </div>
  </div>
  <div v-show="verifiedUser" class="bg-white p-4">
    <div id="signup-embed"></div>
    <Button
      label="Go to login page" outlined class="w-full" @click="router.push('signin')"
    />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const runtimeConfig = useRuntimeConfig()

onMounted(() => {
  const script = document.createElement('script')
  script.src = 'https://cdn.outseta.com/outseta.min.js'
  script.setAttribute('data-options', 'o_signup_options')
  document.body.appendChild(script)

  const o_signup_options = {
    id: 'Outseta',
    domain: 'docspawn.outseta.com',
    load: 'auth',
    auth: {
      widgetMode: 'register',
      planFamilyUid: 'amRxVA9J',
      planPaymentTerm: 'month',
      skipPlanOptions: false,
      id: 'signup_embed',
      mode: 'embed',
      selector: '#signup-embed',
    },
  }

  window.o_signup_options = o_signup_options
})
const verifiedUser = ref(false)
const password = ref()
function checkPassword() {
  if (password.value === runtimeConfig.public.ADMIN_PASSWORD)
    verifiedUser.value = true
}
</script>

    <style scoped>
    /* Add any styles you need for the signup component here */
    </style>
