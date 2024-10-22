<template>
  <EjsDocumenteditorcontainer :service-url="serviceUrl" :enable-toolbar="true" :style="{ height: '100vh' }" />
</template>

<script setup>
import { provide, ref } from 'vue'
import { DocumentEditorContainerComponent as EjsDocumenteditorcontainer, Toolbar } from '@syncfusion/ej2-vue-documenteditor'

const serviceUrl = 'https://ej2services.syncfusion.com/production/web-services/api/documenteditor/'
const documentEditorContainer = ref(null)

provide('DocumentEditorContainer', [Toolbar])
</script>
