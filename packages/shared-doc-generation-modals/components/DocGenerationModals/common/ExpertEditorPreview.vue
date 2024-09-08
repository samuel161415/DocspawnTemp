<template>
  <div class="absolute left-0 z-50 w-full h-full">
    <TiptapEditorContent
      :editor="editor" class="editor-content" :style="{
        transform: `scale(${parseFloat(editorContentScaleX)?.toFixed(2)}, ${parseFloat(editorContentScaleY)?.toFixed(2)})`,
        transformOrigin: 'top left',
      }"
    />
  </div>
</template>

<script setup>
import { onBeforeUnmount, ref, unref, watch } from 'vue'
import { useEditor } from '@tiptap/vue-3'
import TiptapStarterKit from '@tiptap/starter-kit'
import TiptapTable from '@tiptap/extension-table'
import TiptapTableRow from '@tiptap/extension-table-row'
import TiptapTableCell from '@tiptap/extension-table-cell'
import TiptapTableHeader from '@tiptap/extension-table-header'
import { docGenerationData } from '../../../composables/useDocGenerationData'
import { templateEditorStore } from '@/composables/useTemplateEditorData'

const props = defineProps(['editorWidth', 'editorHeight', 'template'])

// Manage dynamic width and height
const editorWidth = ref('100%')
const editorHeight = ref('2000px')

// Reactive state to store multiple content states
const contentStates = ref({})

// Current selected content key (e.g., "Content 1")
const selectedContentKey = ref('Content 1')
const editor = useEditor({
  editable: false,
  // content: props?.template?.expert_container_html_content || '<p>I\'m running Tiptap with Vue.js. 🎉</p>',
  content: contentStates.value[selectedContentKey.value],
  // '<p>I\'m running Tiptap with Vue.js. 🎉</p>',
  extensions: [
    TiptapStarterKit,
    TiptapTable.configure({
      resizable: true,
    }),
    TiptapTableRow,
    TiptapTableCell,
    TiptapTableHeader,
  ],
})

onMounted(() => {
  let keysOfContent = {}
  props?.template?.page_sizes?.forEach((_, f) => {
    keysOfContent = { ...keysOfContent, [`Content ${f + 1}`]: `<p></p>` }
  })
  contentStates.value = docGenerationData?.templateToGenerateDocs?.expert_container_html_content || keysOfContent

  if (editor.value)
    editor.value.commands.setContent(contentStates.value['Content 1'])
  /** */
  editorHeight.value = `${(Number.parseInt(props?.template?.expert_editor_dimensions?.height))}px`
  editorWidth.value = `${Number.parseInt(props?.template?.expert_editor_dimensions?.width)}px`
})

watch(props?.editorHeight, () => {
  editorHeight.value = `${Number.parseInt(props?.template?.expert_editor_dimensions?.height)}px`
})
watch(props?.editorWidth, () => {
  editorWidth.value = `${Number.parseInt(props?.template?.expert_editor_dimensions?.width)}px`
})
const editorContentScaleX = ref(1)
const editorContentScaleY = ref(1)
watch([editorHeight, editorWidth], () => {
  const scaleX = Number.parseInt(props?.editorWidth) / props?.template?.expert_editor_dimensions?.width
  const scaleY = Number.parseInt(props?.editorHeight) / props?.template?.expert_editor_dimensions?.height

  editorContentScaleX.value = scaleX
  editorContentScaleY.value = scaleY
})
function switchContent(key) {
  selectedContentKey.value = key
  if (editor.value)
    editor.value.commands.setContent(contentStates.value[key]) // Load the selected content
}
watch(() => docGenerationData.activePageForCanvas, () => {
  switchContent(`Content ${docGenerationData?.activePageForCanvas}`)
})
onBeforeUnmount(() => {
  unref(editor).destroy()
})
</script>

  <style scoped>
  /* Wrapper styles */
  .editor-wrapper {
    padding: 10px;
    /* border: 1px solid #ccc; */
  }

  /* Toolbar styles */
  .toolbar button {
    margin-right: 5px;
  }

  .toolbar button.is-active {
    background-color: #007bff;
    color: white;
  }

  /* Content container styles */

  ::v-deep .ProseMirror {
    background-color: transparent;
    padding: 15px;
    min-height: 300px;
    /* border: 1px solid #ddd; */
    border-radius: 4px;
    color: #333;

    /* width: 100% !important;
    height:1000px !important; */
     /* Bind dynamic width and height with !important */
    width: v-bind('editorWidth') !important;
    height: v-bind('editorHeight') !important;
    overflow:hidden;

  }
  ::v-deep .ProseMirror:focus{
  border:none;
  outline:none;
  }

  ::v-deep .ProseMirror p {
    font-size: 18px;
  }
  /* Headings styles */
  ::v-deep .ProseMirror h1 {
    font-size: 44px;
    font-weight: bold;
    margin-top: 1.5em;
    margin-bottom: 0.5em;
  }

  ::v-deep .ProseMirror h2 {
    font-size: 36px;
    font-weight: bold;
    margin-top: 1.4em;
    margin-bottom: 0.4em;
  }

  ::v-deep .ProseMirror h3 {
    font-size: 30px;
    font-weight: bold;
    margin-top: 1.3em;
    margin-bottom: 0.4em;
  }

  ::v-deep .ProseMirror h4 {
    font-size: 24px;
    font-weight: bold;
    margin-top: 1.2em;
    margin-bottom: 0.3em;
  }

  ::v-deep .ProseMirror h5 {
    font-size: 20px;
    font-weight: bold;
    margin-top: 1.1em;
    margin-bottom: 0.3em;
  }

  ::v-deep .ProseMirror h6 {
    font-size: 18px;
    font-weight: bold;
    margin-top: 1em;
    margin-bottom: 0.2em;
  }

  /* List styles */
  ::v-deep .ProseMirror ul {
    list-style-type: disc;
    padding-left: 1.5em;
    margin-top: 0.5em;
    margin-bottom: 0.5em;
  }

  ::v-deep .ProseMirror ol {
    list-style-type: decimal;
    padding-left: 1.5em;
    margin-top: 0.5em;
    margin-bottom: 0.5em;
  }

  ::v-deep .ProseMirror li {
    margin-bottom: 0.5em;
  }

  ::v-deep .ProseMirror ul ul,
  ::v-deep .ProseMirror ol ol,
  ::v-deep .ProseMirror ul ol,
  ::v-deep .ProseMirror ol ul {
    margin-top: 0.5em;
    margin-bottom: 0.5em;
    padding-left: 1.5em;
    list-style-type: circle; /* Change nested list style */
  }

  /* Table styles */
  ::v-deep .ProseMirror table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 1em;
    margin-bottom: 1em;
  }

  ::v-deep .ProseMirror th,
  ::v-deep .ProseMirror td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }

  ::v-deep .ProseMirror th {
    background-color: #f2f2f2;
    font-weight: bold;
  }

  ::v-deep .ProseMirror td {
    background-color: #fff;
  }

  ::v-deep .ProseMirror tr:nth-child(even) td {
    background-color: #f9f9f9;
  }

  ::v-deep .ProseMirror tr:hover td {
    background-color: #e9e9e9;
  }
  </style>
