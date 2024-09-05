<template>
  <div class="absolute top-[200px] left-0 z-50 w-full h-full">
    <TiptapEditorContent :editor="editor" class="editor-content" />
  </div>
  <div class="editor-wrapper flex flex-col gap-4 relative border border-red-500 h-[200px] overflow-y-auto max-w-[1000px]">
    <div v-if="editor" class="toolbar">
      <Button
        class="w-max px-2"
        :disabled="!editor.can().chain().focus().toggleBold().run()"
        :class="{ 'is-active': editor.isActive('bold') }"
        @click="editor.chain().focus().toggleBold().run()"
      >
        bold
      </Button>
      <Button
        class="w-max px-2"
        :disabled="!editor.can().chain().focus().toggleItalic().run()"
        :class="{ 'is-active': editor.isActive('italic') }"
        @click="editor.chain().focus().toggleItalic().run()"
      >
        italic
      </Button>
      <Button
        class="w-max px-2"
        :disabled="!editor.can().chain().focus().toggleStrike().run()"
        :class="{ 'is-active': editor.isActive('strike') }"
        @click="editor.chain().focus().toggleStrike().run()"
      >
        strike
      </Button>
      <Button
        class="w-max px-2"
        :disabled="!editor.can().chain().focus().toggleCode().run()"
        :class="{ 'is-active': editor.isActive('code') }"
        @click="editor.chain().focus().toggleCode().run()"
      >
        code
      </Button>
      <Button class="w-max px-2" @click="editor.chain().focus().unsetAllMarks().run()">
        clear marks
      </Button>
      <Button class="w-max px-2" @click="editor.chain().focus().clearNodes().run()">
        clear nodes
      </Button>
      <Button
        class="w-max px-2"
        :class="{ 'is-active': editor.isActive('paragraph') }"
        @click="editor.chain().focus().setParagraph().run()"
      >
        paragraph
      </Button>
      <Button
        class="w-max px-2"
        :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
        @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
      >
        h1
      </Button>
      <Button
        class="w-max px-2"
        :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
        @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
      >
        h2
      </Button>
      <Button
        class="w-max px-2"
        :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
        @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
      >
        h3
      </Button>
      <Button
        class="w-max px-2"
        :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }"
        @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
      >
        h4
      </Button>
      <Button
        class="w-max px-2"
        :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }"
        @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
      >
        h5
      </Button>
      <Button
        class="w-max px-2"
        :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }"
        @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
      >
        h6
      </Button>
      <Button
        class="w-max px-2"
        :class="{ 'is-active': editor.isActive('bulletList') }"
        @click="editor.chain().focus().toggleBulletList().run()"
      >
        bullet list
      </Button>
      <Button
        class="w-max px-2"
        :class="{ 'is-active': editor.isActive('orderedList') }"
        @click="editor.chain().focus().toggleOrderedList().run()"
      >
        ordered list
      </Button>
      <Button
        class="w-max px-2"
        :class="{ 'is-active': editor.isActive('codeBlock') }"
        @click="editor.chain().focus().toggleCodeBlock().run()"
      >
        code block
      </Button>
      <Button
        class="w-max px-2"
        :class="{ 'is-active': editor.isActive('blockquote') }"
        @click="editor.chain().focus().toggleBlockquote().run()"
      >
        blockquote
      </Button>
      <Button class="w-max px-2" @click="editor.chain().focus().setHorizontalRule().run()">
        horizontal rule
      </Button>
      <Button class="w-max px-2" @click="editor.chain().focus().setHardBreak().run()">
        hard break
      </Button>
      <Button
        class="w-max px-2"
        :disabled="!editor.can().chain().focus().undo().run()"
        @click="editor.chain().focus().undo().run()"
      >
        undo
      </Button>
      <Button
        class="w-max px-2"
        :disabled="!editor.can().chain().focus().redo().run()"
        @click="editor.chain().focus().redo().run()"
      >
        redo
      </Button>
      <!-- Button to get HTML content -->
      <Button class="w-max px-2" @click="getHTMLContent">
        Get HTML Content
      </Button>
      <!-- Table Management -->
      <Button class="w-max px-2" :disabled="!editor.can().insertTable()" @click="addTable">
        Insert Table
      </Button>
      <Button class="w-max px-2" :disabled="!editor.can().deleteTable()" @click="deleteTable">
        Delete Table
      </Button>

      <!-- Row Management -->
      <Button class="w-max px-2" :disabled="!editor.can().addColumnBefore()" @click="addColumnBefore">
        Add Column Before
      </Button>
      <Button class="w-max px-2" :disabled="!editor.can().addColumnAfter()" @click="addColumnAfter">
        Add Column After
      </Button>
      <Button class="w-max px-2" :disabled="!editor.can().deleteColumn()" @click="deleteColumn">
        Delete Column
      </Button>
      <Button class="w-max px-2" :disabled="!editor.can().addRowBefore()" @click="addRowBefore">
        Add Row Before
      </Button>
      <Button class="w-max px-2" :disabled="!editor.can().addRowAfter()" @click="addRowAfter">
        Add Row After
      </Button>
      <Button class="w-max px-2" :disabled="!editor.can().deleteRow()" @click="deleteRow">
        Delete Row
      </Button>

      <!-- Cell Management -->
      <Button class="w-max px-2" :disabled="!editor.can().mergeCells()" @click="mergeCells">
        Merge Cells
      </Button>
      <Button class="w-max px-2" :disabled="!editor.can().splitCell()" @click="splitCell">
        Split Cell
      </Button>
      <Button class="w-max px-2" :disabled="!editor.can().toggleHeaderColumn()" @click="toggleHeaderColumn">
        Toggle Header Column
      </Button>
      <Button class="w-max px-2" :disabled="!editor.can().toggleHeaderRow()" @click="toggleHeaderRow">
        Toggle Header Row
      </Button>
      <Button class="w-max px-2" :disabled="!editor.can().toggleHeaderCell()" @click="toggleHeaderCell">
        Toggle Header Cell
      </Button>
    </div>
    <!-- <div class="absolute top-[200px] left-0 z-50">
      <TiptapEditorContent :editor="editor" class="editor-content" />
    </div> -->
  </div>
</template>

<script setup>
import { onBeforeUnmount, ref, unref } from 'vue'
import { useEditor } from '@tiptap/vue-3'
import TiptapStarterKit from '@tiptap/starter-kit'
import TiptapTable from '@tiptap/extension-table'
import TiptapTableRow from '@tiptap/extension-table-row'
import TiptapTableCell from '@tiptap/extension-table-cell'
import TiptapTableHeader from '@tiptap/extension-table-header'
import { templateEditorStore } from '@/composables/useTemplateEditorData'

const props = defineProps(['editorWidth', 'editorHeight'])

// Manage dynamic width and height
const editorWidth = ref('100%')
const editorHeight = ref('2000px')

onMounted(() => {
  console.log('templateEditorStore?.templateToEdit?.expert_container_html_content', templateEditorStore?.templateToEdit?.expert_container_html_content)
  console.log('templateEditorStore?.templateToEdit', templateEditorStore?.templateToEdit)
  //   console.log('props>>>>>>>>', props)
  editorHeight.value = `${(Number.parseInt(props?.editorHeight))}px`
  editorWidth.value = `${Number.parseInt(props?.editorWidth)}px`
})

watch(props?.editorHeight, (newVal) => {
//   console.log('props?.editorHeight', props?.editorHeight)
  editorHeight.value = `${Number.parseInt(newVal)}px`
})
watch(props?.editorWidth, (newVal) => {
//   console.log('props?.editorWidth', props?.editorWidth)
  editorWidth.value = `${Number.parseInt(newVal)}px`
})

const editor = useEditor({
  content: templateEditorStore?.templateToEdit?.expert_container_html_content || '<p>I\'m running Tiptap with Vue.js. 🎉</p>',
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

// Table-related actions
const addTable = () => editor.value.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
const deleteTable = () => editor.value.chain().focus().deleteTable().run()

// Column-related actions
const addColumnBefore = () => editor.value.chain().focus().addColumnBefore().run()
const addColumnAfter = () => editor.value.chain().focus().addColumnAfter().run()
const deleteColumn = () => editor.value.chain().focus().deleteColumn().run()

// Row-related actions
const addRowBefore = () => editor.value.chain().focus().addRowBefore().run()
const addRowAfter = () => editor.value.chain().focus().addRowAfter().run()
const deleteRow = () => editor.value.chain().focus().deleteRow().run()

// Cell-related actions
const mergeCells = () => editor.value.chain().focus().mergeCells().run()
const splitCell = () => editor.value.chain().focus().splitCell().run()
const toggleHeaderColumn = () => editor.value.chain().focus().toggleHeaderColumn().run()
const toggleHeaderRow = () => editor.value.chain().focus().toggleHeaderRow().run()
const toggleHeaderCell = () => editor.value.chain().focus().toggleHeaderCell().run()

// const editor = useEditor({
//   content: '<p>I\'m running Tiptap with Vue.js. 🎉</p>',
//   extensions: [TiptapStarterKit],

// })

const htmlContent = ref('')

// Function to get HTML content

async function getHTMLContent() {
  if (editor.value) {
    htmlContent.value = editor.value.getHTML()
    console.log(htmlContent.value) // Log the HTML content to the console
    templateEditorStore.expertEditorHtmlContent = htmlContent.value
    const objToSend = {
      html: htmlContent.value,
    }
    try {
      const response = await fetch(`http://localhost:5000/html2pdf`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Specify content type as JSON
        },
        body: JSON.stringify(objToSend), // Serialize the object to JSON string
      })
      if (!response.ok)
        throw new Error(`Network response was not ok ${response.statusText}`)

      // const data = await response.json()
    }
    catch (error) {
      console.error('Error:', error)
    }
  }
}

onBeforeUnmount(() => {
  unref(editor).destroy()
})
</script>

<style scoped>
/* Wrapper styles */
.editor-wrapper {
  padding: 10px;
  border: 1px solid #ccc;
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
.editor-content .ProseMirror {
  /* background-color: #f9f9f9;
  padding: 15px;
  min-height: 300px;
  border: 1px solid #ddd;
  border-radius: 4px;
  color: #333; */
}

::v-deep .ProseMirror {
  background-color: transparent;
  padding: 15px;
  min-height: 300px;
  border: 1px solid #ddd;
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
