// // plugins/syncfusion.js
// import Vue from 'vue'
// import {
//   BookmarkDialog,
//   BordersAndShadingDialog,
//   BulletsAndNumberingDialog,
//   CellOptionsDialog,
//   ContextMenu,
//   DocumentEditorPlugin,
//   Editor,
//   EditorHistory,
//   FontDialog,
//   HyperlinkDialog,
//   ImageResizer,
//   ListDialog,
//   OptionsPane,
//   PageSetupDialog,
//   ParagraphDialog,
//   Print,
//   Search,
//   Selection,
//   SfdtExport,
//   StyleDialog,
//   StylesDialog,
//   TableDialog,
//   TableOfContentsDialog,
//   TableOptionsDialog,
//   TablePropertiesDialog,
//   TextExport,
//   WordExport,
// } from '@syncfusion/ej2-vue-documenteditor'

import * as SyncfusionBase from '@syncfusion/ej2-base';
const { registerLicense } = SyncfusionBase;
import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin(() => {
  registerLicense('ORg4AjUWIQA/Gnt2UlhhQlVMfV5DQmFIYVF2R2dJfFRxcV9HZkwxOX1dQl9nSH5RdERlWHhbdXdVQmk=');
});
