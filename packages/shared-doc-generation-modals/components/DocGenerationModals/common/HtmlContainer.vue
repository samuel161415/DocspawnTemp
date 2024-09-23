<template>
  <!-- {{ editorContentScaleX }}  {{ editorContentScaleY }} -->
  <div class="absolute top-[00px] left-0 z-50 w-full h-full">
    <!-- <BubbleMenu
      v-if="editor"
      :editor="editor"
      :tippy-options="{ duration: 100 }"
    >
      <div class="bubble-menu">
        <button :class="{ 'is-active': editor.isActive('bold') }" @click="editor.chain().focus().toggleBold().run()">
          <font-awesome-icon icon="fa-solid fa-bold" size="lg" />
        </button>

        <button :class="{ 'is-active': editor.isActive('italic') }" @click="editor.chain().focus().toggleItalic().run()">
          <font-awesome-icon icon="fa-solid fa-italic" size="lg" />
        </button>

        <button :class="{ 'is-active': editor.isActive('strike') }" @click="editor.chain().focus().toggleStrike().run()">
          <font-awesome-icon icon="fa-solid fa-strikethrough" size="lg" />
        </button>
      </div>
    </BubbleMenu> -->
    <TiptapEditorContent
      :editor="editor" class="editor-content" :style="{
        // transform: `scale(${parseFloat(editorContentScaleX)?.toFixed(2)}, ${parseFloat(editorContentScaleY)?.toFixed(2)})`,
        // transformOrigin: 'top left',
      }"
    />
  </div>
</template>

<script setup>
import { onBeforeUnmount, ref, unref } from 'vue'
import { BubbleMenu, useEditor } from '@tiptap/vue-3'
import TiptapStarterKit from '@tiptap/starter-kit'
import TiptapTable from '@tiptap/extension-table'
import TiptapTableRow from '@tiptap/extension-table-row'
import TiptapTableCell from '@tiptap/extension-table-cell'
import TiptapTableHeader from '@tiptap/extension-table-header'

import { docGenerationData } from '../../../composables/useDocGenerationData'
import { formatDateForInput, formatTimeForInput, parseDateString } from '@/utils/dateFunctions'

const props = defineProps(['editorId', 'isDataToDoc', 'datasetData', 'previewNo'])

// Manage dynamic width and height
const editorWidth = ref('100%')
const editorHeight = ref('100%')
const editor = useEditor({
  // content: templateEditorStore?.templateToEdit?.expert_container_html_content || '<p>I\'m running Tiptap with Vue.js. 🎉</p>',
  content: docGenerationData.editorContainers?.filter(e => e?.id === props?.editorId)[0]?.content || '<p>I\'m running Tiptap with Vue.js. 🎉</p>',
  // contentStates.value[selectedContentKey.value],
  // '<p>I\'m running Tiptap with Vue.js. 🎉</p>',
  onFocus() {
    // Set the active editor when it gains focus
    addToExpertEditor()
  },
  editable: false,
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
function replaceDatasetValues(html, dataset) {
  console.log('at replacement datset values function')
  console.log('html', html)
  console.log('dataset', dataset)
  // Regular expression to match {{dataset[key]}} pattern
  const regex = /{{dataset\[([^\]]+)\]}}/g

  // Replace each match with the corresponding value from the dataset
  return html.replace(regex, (match, key) => {
    // Trim the key and handle cases where key may have extra spaces
    key = key.trim()

    // Access the value from the dataset
    const value = dataset[key]

    // If the key exists in the dataset and is not null, return the value, otherwise leave it as is
    if (value !== undefined && value !== null) {
      // Check if the value is an object (like 'Anomaly 1'), and pick the 'text' or hyperlink field if necessary
      if (typeof value === 'object' && value.text)
        return value.text
      else
        return value
    }

    // If key is not found, return the original match (without any replacement)
    return match
  })
}

// templateEditorStore.expertEditor=editor

onMounted(() => {
  // templateEditorStore.expertEditor = editor.value

  if (docGenerationData.editorContainers?.filter(e => e?.id === props?.editorId)[0]?.content)
    editor.value.commands.setContent(docGenerationData.editorContainers?.filter(e => e?.id === props?.editorId)[0]?.content)
})
watch(() => props?.previewNo, (val) => {
  if (val > 0) {
    const htmlContent = docGenerationData.editorContainers?.filter(e => e?.id === props?.editorId)[0]?.content
    const htmlCOntentWithRealValues = replaceDatasetValues(htmlContent, props?.datasetData[val - 1])
    editor.value.commands.setContent(htmlCOntentWithRealValues)
  }
  else {
    const htmlContent = docGenerationData.editorContainers?.filter(e => e?.id === props?.editorId)[0]?.content
    editor.value.commands.setContent(htmlContent)
  }
})

function addToExpertEditor() {
  // console.log(' add to expert editor running')
  // templateEditorStore.expertEditor = editor.value
}

// Watch the editor for updates and save the content to the current state
watch(editor, (newEditor) => {
  // templateEditorStore.expertEditor = editor.value
  if (newEditor) {
    newEditor.on('update', () => {
      // contentStates.value[selectedContentKey.value] = newEditor.getHTML()
      docGenerationData.editorContainers = docGenerationData.editorContainers?.map((e) => {
        if (e?.id === props?.editorId)
          return { ...e, content: newEditor.getHTML() }
        else return e
      })
    })
    newEditor.on('selection', () => {
      // console.log('Selection changed')
    })
  }
})

watch(() => props.datasetData, (val) => {
  console.log('props dataste', props?.datasetData)
  if (!props?.isDataToDoc) {
    let replacementObjects = {}
    val?.forEach((f) => {
      if (f?.textboxHash === props?.editorId) {
        let stateValue = f?.state
        if (f?.fieldType === 'Form date')
          stateValue = formatDateForInput(f?.state, f?.dateFormat)
        if (f?.fieldType === 'Form time')
          stateValue = formatTimeForInput(f?.state, f?.timeFormat)
        if (stateValue)
          replacementObjects = { ...replacementObjects, [f?.id]: stateValue || f?.state }
      }
    })

    if (replacementObjects) {
      const htmlContent = docGenerationData.editorContainers?.filter(e => e?.id === props?.editorId)[0]?.content
      const htmlCOntentWithRealValues = replaceDatasetValues(htmlContent, replacementObjects)
      editor.value.commands.setContent(htmlCOntentWithRealValues)
    }
    // else {
    //   const htmlContent = docGenerationData.editorContainers?.filter(e => e?.id === props?.editorId)[0]?.content
    //   editor.value.commands.setContent(htmlContent)
    // }
  }
}, { deep: true })

// Function to get HTML content

onBeforeUnmount(() => {
  unref(editor).destroy()
})
</script>

<style scoped>
/* Wrapper styles */
/* Bubble menu */
.bubble-menu {
  background-color: #ffffff;
  border: 1px solid #009ee2;

  border-radius: 0.7rem;
  box-shadow: var(--shadow);
  display: flex;
  padding: 0.2rem;

  button {
    background-color: unset;
    color:#009ee2;
    border:1px solid #009ee2;

    &:hover {
      background-color: var(--gray-3);
      color:#000;
    }

    &.is-active {
      background-color: #009ee2;
      color:#fff;

      &:hover {
        background-color: var(--purple-contrast);
        color:#000;
      }
    }
  }
}

.editor-wrapper {
  padding: 10px;
  border: 1px solid #ccc;
  /* resize:both;
  overflow:auto; */
}

/* Toolbar styles */
.toolbar button {
  margin-right: 5px;
}

.toolbar button.is-active {
  background-color: #007bff;
  color: white;
}

.ProseMirror {
  cursor: crosshair; /* Change the cursor to crosshair */
  /* caret-color: red; */
  resize:both;
  overflow:auto;
}
::v-deep .ProseMirror *{
  font-family:Arial, Helvetica, sans-serif;
}
/* You can also apply different cursor styles to specific elements */
.ProseMirror p {
  cursor: text; /* Cursor will appear as text in paragraphs */
}
 .bubble-menu {
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 5px;
  display: flex;
  gap: 5px;
}
.bubble-menu button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 5px;
  cursor: pointer;
  border-radius: 3px;
}
.bubble-menu {
  @apply bg-white border border-gray-300 rounded-lg p-2 flex gap-2; /* Tailwind classes */
}
.bubble-menu button {
  @apply bg-blue-500 text-white px-4 py-2 rounded cursor-pointer; /* Tailwind classes */
}
::v-deep .ProseMirror {
  background-color: transparent;
  padding: 0px;
  min-height: 300px;
  border: 1px solid #ddd;
  border-radius: 4px;
  color: #333;

   width: v-bind('editorWidth') !important;
  height: v-bind('editorHeight') !important;
  overflow:hidden;
  /* border:3px solid red; */
  border:none;
  outline:none;

}
::v-deep .ProseMirror:focus{
 border:none;
outline:none;
}

::v-deep .ProseMirror p {
  font-size: 18px;
}
::v-deep .ProseMirror p:empty::before {
  content: '';
  display: inline-block;
}
/* Headings styles */
::v-deep .ProseMirror h1 {
  font-size: 44px;
  font-weight: bold;
  margin-top: 24px; /* 1.5em = 24px */
  margin-bottom: 8px; /* 0.5em = 8px */
}

::v-deep .ProseMirror h2 {
  font-size: 36px;
  font-weight: bold;
  margin-top: 22.4px; /* 1.4em = 22.4px */
  margin-bottom: 6.4px; /* 0.4em = 6.4px */
}

::v-deep .ProseMirror h3 {
  font-size: 30px;
  font-weight: bold;
  margin-top: 20.8px; /* 1.3em = 20.8px */
  margin-bottom: 6.4px; /* 0.4em = 6.4px */
}

::v-deep .ProseMirror h4 {
  font-size: 24px;
  font-weight: bold;
  margin-top: 19.2px; /* 1.2em = 19.2px */
  margin-bottom: 4.8px; /* 0.3em = 4.8px */
}

::v-deep .ProseMirror h5 {
  font-size: 20px;
  font-weight: bold;
  margin-top: 17.6px; /* 1.1em = 17.6px */
  margin-bottom: 4.8px; /* 0.3em = 4.8px */
}

::v-deep .ProseMirror h6 {
  font-size: 18px;
  font-weight: bold;
  margin-top: 16px; /* 1em = 16px */
  margin-bottom: 3.2px; /* 0.2em = 3.2px */
}

/* List styles */
::v-deep .ProseMirror ul {
  list-style-type: disc;
  padding-left: 24px; /* 1.5em = 24px */
  margin-top: 8px; /* 0.5em = 8px */
  margin-bottom: 8px; /* 0.5em = 8px */
}

::v-deep .ProseMirror ol {
  list-style-type: decimal;
  padding-left: 24px; /* 1.5em = 24px */
  margin-top: 8px; /* 0.5em = 8px */
  margin-bottom: 8px; /* 0.5em = 8px */
}

::v-deep .ProseMirror li {
  margin-bottom: 8px; /* 0.5em = 8px */
}

::v-deep .ProseMirror ul ul,
::v-deep .ProseMirror ol ol,
::v-deep .ProseMirror ul ol,
::v-deep .ProseMirror ol ul {
  margin-top: 8px; /* 0.5em = 8px */
  margin-bottom: 8px; /* 0.5em = 8px */
  padding-left: 24px; /* 1.5em = 24px */
  list-style-type: circle; /* Change nested list style */
}

/* Table styles */
::v-deep .ProseMirror table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 16px; /* 1em = 16px */
  margin-bottom: 16px; /* 1em = 16px */
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
