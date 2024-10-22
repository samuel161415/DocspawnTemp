<!-- <template>
  <EjsDocumenteditorcontainer :service-url="serviceUrl" :enable-toolbar="true" :style="{ height: '1000px' }" />
</template>

<script setup>
import { provide, ref } from 'vue'
import { DocumentEditorContainerComponent as EjsDocumenteditorcontainer, Toolbar } from '@syncfusion/ej2-vue-documenteditor'

const serviceUrl = 'https://ej2services.syncfusion.com/production/web-services/api/documenteditor/'
const documentEditorContainer = ref(null)

provide('DocumentEditorContainer', [Toolbar])
</script> -->
<template>
  <EjsDocumenteditorcontainer
    :service-url="serviceUrl"
    :enable-toolbar="true"
    :style="{ height: '1000px' }"
  />
</template>

<script setup>
import { provide, ref } from 'vue'
import * as Syncfusion from '@syncfusion/ej2-vue-documenteditor'

const EjsDocumenteditorcontainer = Syncfusion.DocumentEditorContainerComponent
const Toolbar = Syncfusion.Toolbar

const serviceUrl = 'https://ej2services.syncfusion.com/production/web-services/api/documenteditor/'
const documentEditorContainer = ref(null)

// Provide the Toolbar to the component
provide('DocumentEditorContainer', [Toolbar])
</script>
