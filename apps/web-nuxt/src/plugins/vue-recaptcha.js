// plugins/vue-recaptcha.js

import { install } from 'vue3-recaptcha-v2'

// import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(install, {
    sitekey: '6Ldg6VAqAAAAAIiXYIRWdlqGd_JVzrHV_9n3hi5a',
    cnDomains: false,
  })
})
