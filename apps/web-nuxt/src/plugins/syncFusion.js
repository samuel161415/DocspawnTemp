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

import { registerLicense } from '@syncfusion/ej2-base';
console.log("registerLicense",registerLicense)
export default defineNuxtPlugin(() => {
    registerLicense('ORg4AjUWIQA/Gnt2UlhhQlVMfV5DQmFIYVF2R2dJfFRxcV9HZkwxOX1dQl9nSH5RdERlWHhbdXdVQmk=');
});
