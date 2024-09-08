<template>
  <div class="editor-wrapper flex flex-col gap-4 relative  h-max mb-4 overflow-y-auto ">
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

      <Button class="w-max px-2" @click="getHTMLContent">
        Get HTML Content
      </Button>

      <Button class="w-max px-2" :disabled="!editor.can().insertTable()" @click="addTable">
        Insert Table
      </Button>
      <Button class="w-max px-2" :disabled="!editor.can().deleteTable()" @click="deleteTable">
        Delete Table
      </Button>

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
  </div>
</template>

<script setup>
import { templateEditorStore } from '@/composables/useTemplateEditorData'

const editor = ref()
watch(() => templateEditorStore.expertEditor, (val) => {
//   console.log('template editor store', templateEditorStore?.expertEditor)
  editor.value = val
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
const htmlContent = ref('')
async function getHTMLContent() {
  if (editor.value)
    htmlContent.value = editor.value.getHTML()
}
</script>
