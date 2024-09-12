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

import { templateEditorStore } from '@/composables/useTemplateEditorData'

const props = defineProps(['editorWidth', 'editorHeight'])

// Reactive state to store multiple content states
const contentStates = ref({})

// Current selected content key (e.g., "Content 1")
const selectedContentKey = ref('Content 1')
// Manage dynamic width and height
const editorWidth = ref('100%')
const editorHeight = ref('200px')
const editor = useEditor({
  // content: templateEditorStore?.templateToEdit?.expert_container_html_content || '<p>I\'m running Tiptap with Vue.js. 🎉</p>',
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

// templateEditorStore.expertEditor=editor

onMounted(() => {
  templateEditorStore.expertEditor = editor.value
  let keysOfContent = {}
  templateEditorStore?.totalPagesArray?.forEach((f) => {
    keysOfContent = { ...keysOfContent, [`Content ${f}`]: `<p> </p>` }
  })
  contentStates.value = templateEditorStore?.templateToEdit?.expert_container_html_content || keysOfContent
  if (editor.value)
    editor.value.commands.setContent(contentStates.value['Content 1'])
  if (templateEditorStore?.templateToEdit?.expert_editor_dimensions) {
    editorHeight.value = `${(Number.parseInt(templateEditorStore?.templateToEdit?.expert_editor_dimensions?.height))}px`
    editorWidth.value = `${Number.parseInt(templateEditorStore?.templateToEdit?.expert_editor_dimensions?.width)}px`
  }
  else {
    editorHeight.value = `${(Number.parseInt(props?.editorHeight))}px`
    editorWidth.value = `${Number.parseInt(props?.editorWidth)}px`
  }
  /** */
  templateEditorStore.expertEditorWidth = templateEditorStore?.templateToEdit?.expert_editor_dimensions?.width || props?.editorWidth
  templateEditorStore.expertEditorHeight = templateEditorStore?.templateToEdit?.expert_editor_dimensions?.height || props?.editorHeight
})
watch(() => templateEditorStore?.activePageForCanvas, () => {
  switchContent(`Content ${templateEditorStore?.activePageForCanvas}`)
})
watch(props?.editorHeight, (newVal) => {
//   console.log('props?.editorHeight', props?.editorHeight)
  if (templateEditorStore?.templateToEdit?.expert_editor_dimensions)
    editorHeight.value = `${Number.parseInt(templateEditorStore?.templateToEdit?.expert_editor_dimensions?.height)}px`
  else
    editorHeight.value = `${Number.parseInt(newVal)}px`
  /** */
  templateEditorStore.expertEditorHeight = templateEditorStore?.templateToEdit?.expert_editor_dimensions?.height || props?.editorHeight
})
watch(props?.editorWidth, (newVal) => {
//   console.log('props?.editorWidth', props?.editorWidth)
  if (templateEditorStore?.templateToEdit?.expert_editor_dimensions)
    editorHeight.value = `${Number.parseInt(templateEditorStore?.templateToEdit?.expert_editor_dimensions?.width)}px`
  else
    editorWidth.value = `${Number.parseInt(newVal)}px`
  /** */
  templateEditorStore.expertEditorWidth = templateEditorStore?.templateToEdit?.expert_editor_dimensions?.width || props?.editorWidth
})
const editorContentScaleX = ref(1)
const editorContentScaleY = ref(1)
watch([editorHeight, editorWidth], () => {
  const scaleX = props?.editorWidth / templateEditorStore?.templateToEdit?.expert_editor_dimensions?.width
  const scaleY = props?.editorHeight / templateEditorStore?.templateToEdit?.expert_editor_dimensions?.height

  editorContentScaleX.value = scaleX
  editorContentScaleY.value = scaleY
})

// Watch the editor for updates and save the content to the current state
watch(editor, (newEditor) => {
  templateEditorStore.expertEditor = editor.value
  if (newEditor) {
    newEditor.on('update', () => {
      contentStates.value[selectedContentKey.value] = newEditor.getHTML()
      templateEditorStore.expertEditorHtmlContent = contentStates.value
      templateEditorStore.expertEditorHeight = templateEditorStore?.templateToEdit?.expert_editor_dimensions?.height || props?.editorHeight
      templateEditorStore.expertEditorWidth = templateEditorStore?.templateToEdit?.expert_editor_dimensions?.width || props?.editorWidth
    })
    newEditor.on('selection', () => {
      console.log('Selection changed')
    })
  }
})

// Function to switch content in the editor when a new content key is selected
function switchContent(key) {
  selectedContentKey.value = key
  if (editor.value)
    editor.value.commands.setContent(contentStates.value[key]) // Load the selected content
}

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
  padding: 15px;
  min-height: 300px;
  border: 1px solid #ddd;
  border-radius: 4px;
  color: #333;

   width: v-bind('editorWidth') !important;
  height: v-bind('editorHeight') !important;
  overflow:hidden;
  /* border:3px solid red; */

}
::v-deep .ProseMirror:focus{
/* border:none; */
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
