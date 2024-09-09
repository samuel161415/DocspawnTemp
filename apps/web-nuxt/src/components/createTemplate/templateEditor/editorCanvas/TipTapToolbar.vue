<template>
  <div class="editor-wrapper flex flex-col gap-4 relative  h-max mb-4 overflow-y-auto ">
    <div v-if="editor" class="toolbar static-menu">
      <!-- <Button
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
      </Button> -->
      <!-- Button for Bold -->
      <Button
        v-tooltip="'Bold'"
        class="w-max px-2"
        :disabled="!editor.can().chain().focus().toggleBold().run()"
        :class="{ 'is-active': editor.isActive('bold') }"
        @click="editor.chain().focus().toggleBold().run()"
      >
        <font-awesome-icon icon="fa-solid fa-bold" size="lg" />
      </Button>

      <!-- Button for Italic -->
      <Button
        v-tooltip="'Italic'"
        class="w-max px-2"
        :disabled="!editor.can().chain().focus().toggleItalic().run()"
        :class="{ 'is-active': editor.isActive('italic') }"
        @click="editor.chain().focus().toggleItalic().run()"
      >
        <font-awesome-icon icon="fa-solid fa-italic" size="lg" />
      </Button>

      <!-- Button for Strike -->
      <Button
        v-tooltip="'Strike'"
        class="w-max px-2"
        :disabled="!editor.can().chain().focus().toggleStrike().run()"
        :class="{ 'is-active': editor.isActive('strike') }"
        @click="editor.chain().focus().toggleStrike().run()"
      >
        <font-awesome-icon icon="fa-solid fa-strikethrough" size="lg" />
      </Button>

      <!-- Button for Code -->
      <Button
        v-tooltip="'Code'"
        class="w-max px-2"
        :disabled="!editor.can().chain().focus().toggleCode().run()"
        :class="{ 'is-active': editor.isActive('code') }"
        @click="editor.chain().focus().toggleCode().run()"
      >
        <font-awesome-icon icon="fa-solid fa-code" size="lg" />
      </Button>

      <!-- Button for Clear Marks -->
      <Button
        v-tooltip="'Clear Marks'"
        class="w-max px-2"
        @click="editor.chain().focus().unsetAllMarks().run()"
      >
        <font-awesome-icon icon="fa-solid fa-eraser" size="lg" />
      </Button>

      <!-- Button for Clear Nodes -->
      <Button
        v-tooltip="'Clear Nodes'"
        class="w-max px-2"
        @click="editor.chain().focus().clearNodes().run()"
      >
        <font-awesome-icon icon="fa-solid fa-trash-alt" size="lg" />
      </Button>

      <!-- Paragraph -->
      <Button
        v-tooltip="'Paragraph'"
        class="w-max px-2"
        :class="{ 'is-active': editor.isActive('paragraph') }"
        @click="editor.chain().focus().setParagraph().run()"
      >
        <font-awesome-icon icon="fa-solid fa-paragraph" size="lg" />
      </Button>

      <!-- Headings H1 to H6 -->
      <Button
        v-tooltip="'Heading 1'"
        class="w-max px-2"
        :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
        @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
      >
        <font-awesome-icon icon="fa-solid fa-heading" size="lg" />
      </Button>

      <Button
        v-tooltip="'Heading 2'"
        class="w-max px-2"
        :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
        @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
      >
        <font-awesome-icon icon="fa-solid fa-heading" size="lg" />
      </Button>

      <!-- Repeat for h3, h4, h5, h6 -->
      <Button
        v-tooltip="'Heading 3'"
        class="w-max px-2"
        :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
        @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
      >
        <font-awesome-icon icon="fa-solid fa-heading" size="lg" />
      </Button>
      <Button
        v-tooltip="'Heading 4'"
        class="w-max px-2"
        :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }"
        @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
      >
        <font-awesome-icon icon="fa-solid fa-heading" size="lg" />
      </Button>
      <Button
        v-tooltip="'Heading 5'"
        class="w-max px-2"
        :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }"
        @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
      >
        <font-awesome-icon icon="fa-solid fa-heading" size="lg" />
      </Button>
      <Button
        v-tooltip="'Heading 6'"
        class="w-max px-2"
        :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }"
        @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
      >
        <font-awesome-icon icon="fa-solid fa-heading" size="lg" />
      </Button>

      <!-- Bullet List -->
      <Button
        v-tooltip="'Bullet List'"
        class="w-max px-2"
        :class="{ 'is-active': editor.isActive('bulletList') }"
        @click="editor.chain().focus().toggleBulletList().run()"
      >
        <font-awesome-icon icon="fa-solid fa-list-ul" size="lg" />
      </Button>

      <!-- Ordered List -->
      <Button
        v-tooltip="'Ordered List'"
        class="w-max px-2"
        :class="{ 'is-active': editor.isActive('orderedList') }"
        @click="editor.chain().focus().toggleOrderedList().run()"
      >
        <font-awesome-icon icon="fa-solid fa-list-ol" size="lg" />
      </Button>

      <!-- Code Block -->
      <Button
        v-tooltip="'Code Block'"
        class="w-max px-2"
        :class="{ 'is-active': editor.isActive('codeBlock') }"
        @click="editor.chain().focus().toggleCodeBlock().run()"
      >
        <font-awesome-icon icon="fa-solid fa-file-code" size="lg" />
      </Button>

      <!-- Blockquote -->
      <Button
        v-tooltip="'Blockquote'"
        class="w-max px-2"
        :class="{ 'is-active': editor.isActive('blockquote') }"
        @click="editor.chain().focus().toggleBlockquote().run()"
      >
        <font-awesome-icon icon="fa-solid fa-quote-right" size="lg" />
      </Button>

      <!-- Horizontal Rule -->
      <Button
        v-tooltip="'Horizontal Rule'"
        class="w-max px-2"
        @click="editor.chain().focus().setHorizontalRule().run()"
      >
        <font-awesome-icon icon="fa-solid fa-minus" size="lg" />
      </Button>

      <!-- Hard Break -->
      <Button
        v-tooltip="'Hard Break'"
        class="w-max px-2"
        @click="editor.chain().focus().setHardBreak().run()"
      >
        <font-awesome-icon icon="fa-solid fa-level-down-alt" size="lg" />
      </Button>

      <!-- Undo and Redo -->
      <Button
        v-tooltip="'Undo'"
        class="w-max px-2"
        :disabled="!editor.can().chain().focus().undo().run()"
        @click="editor.chain().focus().undo().run()"
      >
        <font-awesome-icon icon="fa-solid fa-undo" size="lg" />
      </Button>

      <Button
        v-tooltip="'Redo'"
        class="w-max px-2"
        :disabled="!editor.can().chain().focus().redo().run()"
        @click="editor.chain().focus().redo().run()"
      >
        <font-awesome-icon icon="fa-solid fa-redo" size="lg" />
      </Button>

      <!-- Insert Table, Delete Table -->
      <Button
        v-tooltip="'Insert Table'"
        class="w-max px-2"
        :disabled="!editor.can().insertTable()"
        @click="addTable"
      >
        <font-awesome-icon icon="fa-solid fa-table" size="lg" />
      </Button>

      <Button
        v-tooltip="'Delete Table'"
        class="w-max px-2"
        :disabled="!editor.can().deleteTable()"
        @click="deleteTable"
      >
        <font-awesome-icon icon="fa-solid fa-trash" size="lg" />
      </Button>
      <!-- <Button class="w-max px-2" :disabled="!editor.can().addColumnBefore()" @click="addColumnBefore">
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
      </Button> -->
      <!-- Add Column Before -->
      <Button
        v-tooltip="'Add Column Before'"
        class="w-max px-2"
        :disabled="!editor.can().addColumnBefore()"
        @click="addColumnBefore"
      >
        <font-awesome-icon icon="fa-solid fa-arrow-left" size="lg" />
      </Button>

      <!-- Add Column After -->
      <Button
        v-tooltip="'Add Column After'"
        class="w-max px-2"
        :disabled="!editor.can().addColumnAfter()"
        @click="addColumnAfter"
      >
        <font-awesome-icon icon="fa-solid fa-arrow-right" size="lg" />
      </Button>

      <!-- Delete Column -->
      <Button
        v-tooltip="'Delete Column'"
        class="w-max px-2"
        :disabled="!editor.can().deleteColumn()"
        @click="deleteColumn"
      >
        <font-awesome-icon icon="fa-solid fa-trash-alt" size="lg" />
      </Button>

      <!-- Add Row Before -->
      <Button
        v-tooltip="'Add Row Before'"
        class="w-max px-2"
        :disabled="!editor.can().addRowBefore()"
        @click="addRowBefore"
      >
        <font-awesome-icon icon="fa-solid fa-arrow-up" size="lg" />
      </Button>

      <!-- Add Row After -->
      <Button
        v-tooltip="'Add Row After'"
        class="w-max px-2"
        :disabled="!editor.can().addRowAfter()"
        @click="addRowAfter"
      >
        <font-awesome-icon icon="fa-solid fa-arrow-down" size="lg" />
      </Button>

      <!-- Delete Row -->
      <Button
        v-tooltip="'Delete Row'"
        class="w-max px-2"
        :disabled="!editor.can().deleteRow()"
        @click="deleteRow"
      >
        <font-awesome-icon icon="fa-solid fa-trash" size="lg" />
      </Button>

      <!-- Merge Cells -->
      <Button
        v-tooltip="'Merge Cells'"
        class="w-max px-2"
        :disabled="!editor.can().mergeCells()"
        @click="mergeCells"
      >
        <font-awesome-icon icon="fa-solid fa-object-group" size="lg" />
      </Button>

      <!-- Split Cell -->
      <Button
        v-tooltip="'Split Cell'"
        class="w-max px-2"
        :disabled="!editor.can().splitCell()"
        @click="splitCell"
      >
        <font-awesome-icon icon="fa-solid fa-object-ungroup" size="lg" />
      </Button>

      <!-- Toggle Header Column -->
      <Button
        v-tooltip="'Toggle Header Column'"
        class="w-max px-2"
        :disabled="!editor.can().toggleHeaderColumn()"
        @click="toggleHeaderColumn"
      >
        <font-awesome-icon icon="fa-solid fa-columns" size="lg" />
      </Button>

      <!-- Toggle Header Row -->
      <Button
        v-tooltip="'Toggle Header Row'"
        class="w-max px-2"
        :disabled="!editor.can().toggleHeaderRow()"
        @click="toggleHeaderRow"
      >
        <font-awesome-icon icon="fa-light fa-rows" size="lg" />
      </Button>

      <!-- Toggle Header Cell -->
      <Button
        v-tooltip="'Toggle Header Cell'"
        class="w-max px-2"
        :disabled="!editor.can().toggleHeaderCell()"
        @click="toggleHeaderCell"
      >
        <font-awesome-icon icon="fa-solid fa-table-cells" size="lg" />
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

<style scoped>
.static-menu {
  background-color: #ffffff;
  border-radius: 0.7rem;
  box-shadow: var(--shadow);
  display: flex;
  width:100%;
  flex-wrap: wrap;
  padding: 0.2rem;
  gap:8px;
}

.static-menu button {
  background-color: unset;
  color: #009ee2;
  border: 1px solid #009ee2;
  min-width:30px;
}

.static-menu button:hover {
  background-color: var(--gray-3);
  color: #000;
}

.static-menu button.is-active {
  background-color: #009ee2;
  color: #fff;
}

.static-menu button.is-active:hover {
  background-color: var(--purple-contrast);
  color: #000;
}
</style>
