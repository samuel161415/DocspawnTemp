<template>
  <div class="bg-white p-4">
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
</script>

    <style scoped>
    /* Add any styles you need for the signup component here */
    </style>
