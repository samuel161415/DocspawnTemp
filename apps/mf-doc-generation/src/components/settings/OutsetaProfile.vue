<template>
  <div class="bg-white p-4">
    <div id="profile-embed"></div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  const script = document.createElement('script')
  script.src = 'https://cdn.outseta.com/outseta.min.js'
  script.setAttribute('data-options', 'o_profile_options')
  document.body.appendChild(script)

  const o_profile_options = {
    id: 'Outseta',
    domain: 'docspawn.outseta.com',
    load: 'profile',
    profile: {
      id: 'profile_embed',
      mode: 'embed',
      selector: '#profile-embed',
    },
  }

  window.o_profile_options = o_profile_options
})
</script>

<style scoped>
/* Add any styles you need for the profile component here */
</style>
