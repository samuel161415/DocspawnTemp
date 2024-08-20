<template>
  <div class="bg-white p-4">
    <div id="login-embed"></div>
    <Button
      label="Go to signup page" outlined class="w-full" @click="router.push('signup')"
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
  script.setAttribute('data-options', 'o_login_options')
  document.body.appendChild(script)

  const o_login_options = {
    id: 'Outseta',
    domain: 'docspawn.outseta.com',
    load: 'auth',
    auth: {
      widgetMode: 'login',
      id: 'login_embed',
      mode: 'embed',
      selector: '#login-embed',
    },
  }

  window.o_login_options = o_login_options
})
</script>

  <style scoped>
  /* Add any styles you need for the login component here */
  </style>
