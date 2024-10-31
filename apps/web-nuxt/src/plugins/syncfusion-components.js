import { TreeViewPlugin } from '@syncfusion/ej2-vue-navigations'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(TreeViewPlugin)
})
