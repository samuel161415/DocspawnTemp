import * as SyncfusionNavigations from '@syncfusion/ej2-vue-navigations';
const { TreeViewPlugin } = SyncfusionNavigations;
import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(TreeViewPlugin);
});