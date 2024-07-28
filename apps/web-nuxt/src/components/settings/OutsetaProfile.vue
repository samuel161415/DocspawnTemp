<template>
  <div>
    <div id="profile-embed"></div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
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

  const script = document.createElement('script')
  script.src = 'https://cdn.outseta.com/outseta.min.js'
  script.dataset.options = JSON.stringify(o_profile_options)
  document.body.appendChild(script)
})
</script>
