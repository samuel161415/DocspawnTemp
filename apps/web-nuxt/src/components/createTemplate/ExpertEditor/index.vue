<template>
  <div class=" left-0 z-50 w-full h-full  ml-[50%] translate-x-[-50%] " :style="{ width: `${expertEditorWrapperWidth}` }">
    <div v-show="templateEditorStore.showExpertEditor || templateEditorStore?.selectedAddedField?.fieldType === 'Text box'">
      <TipTapToolbar :is-expert-editor="true" />
    </div>

    <BubbleMenu
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
    </BubbleMenu>
    <TiptapEditorContent
      id="editor-content"
      :editor="editor" class="editor-content border  " :style="editorContentStyle"
    />
  </div>
</template>

<script setup>
import { h, onBeforeUnmount, ref, render, unref } from 'vue'
import { BubbleMenu, useEditor } from '@tiptap/vue-3'
import TiptapStarterKit from '@tiptap/starter-kit'
import TiptapTable from '@tiptap/extension-table'
import TiptapTableRow from '@tiptap/extension-table-row'
import TiptapTableCell from '@tiptap/extension-table-cell'
import TiptapTableHeader from '@tiptap/extension-table-header'
import Dropdown from 'primevue/dropdown'
import { Color } from '@tiptap/extension-color'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import TextStyle from '@tiptap/extension-text-style'
import TiptapImage from '@tiptap/extension-image'
import CodeBlock from '@tiptap/extension-code-block'
import Code from '@tiptap/extension-code'
import TipTapToolbar from '../templateEditor/editorCanvas/TipTapToolbar'
import DraggableItem from './DragExtension/DraggableItem.js'
import Commands from './CommandExtension/commands.js'
import suggestion from './CommandExtension/suggestion.js'

// import { BlockDraggableExtension } from './BlockDraggableExtension/BlockDraggableExtension.js'
import DraggableBlock from './AllBlocksDraggableExtension/DraggableBlock'
import DraggableParagraph from './DraggableNodes/DraggableParagraph.js'
import DraggableHeading from './DraggableNodes/DraggableHeading.js'
import { templateEditorStore } from '@/composables/useTemplateEditorData'
import { templateGeneralInformation } from '@/composables/useTemplateCreationData'
import { useScreenWidth } from '@/composables/useScreenWidth'

const props = defineProps(['editorId'])
const { screenWidth } = useScreenWidth()
const expertEditorWrapperWidth = ref()
const expertEditorWrapperHeight = ref()

// Manage dynamic width and height
const editorWidth = ref('100%')
const editorHeight = ref('100%')
const editor = useEditor({
  // content: templateEditorStore?.templateToEdit?.expert_container_html_content || '<p>I\'m running Tiptap with Vue.js. 🎉</p>',
  content: templateEditorStore.templateToEdit?.editors_data || ` 
            <p>Followed by a fancy draggable item.</p>
       `,
  // contentStates.value[selectedContentKey.value],
  onFocus() {
    // Set the active editor when it gains focus
    addToExpertEditor()
  },

  onUpdate({ editor }) {
    console.log('change in html', editor.getHTML())
    templateEditorStore.expertEditorHtmlContent = editor.getHTML()
    templateEditorStore.expertEditorWidth = expertEditorWrapperWidth.value
    templateEditorStore.expertEditorHeight = expertEditorWrapperHeight.value
    checkContentOverflow()
  },
  extensions: [
    TiptapStarterKit,
    TiptapTable.configure({
      resizable: true,
    //   paragraph: false, // Disable the default paragraph node
    //   heading: false, // Disable the default heading node
    }),
    DraggableBlock,
    TiptapTableRow,
    TiptapTableCell,
    TiptapTableHeader,
    Text,
    Color,
    TextStyle,
    // Paragraph,
    DraggableHeading,
    DraggableParagraph,
    // BlockDraggableExtension,
    TiptapImage.configure({
      inline: true, // Configuring image to be inline
      allowBase64: true,
    }),
    // DraggableItem,
    Commands.configure({
      suggestion,
    }),
    // CodeBlock,
    Code.configure({
      HTMLAttributes: {
        class: 'tiptap-code-node',
      },
    }),
  ],
})
function checkContentOverflow() {
  // Get the editor's content DOM element
  const editorContent = document.getElementById('editor-content')

  if (!editorContent)
    return // Guard clause if the element is not found

  // Get the height of the editor content and the maximum allowed height
  const contentHeight = editorContent.scrollHeight
  const maxHeight = editorContent.clientHeight

  // Log a message if the content exceeds the allowed height
  if (contentHeight > maxHeight)
    console.log('Content is overflowing the page boundaries')
}

// Function to handle custom context menu creation
function handleContextMenu(event) {
  event.preventDefault() // Disable the default browser context menu

  // Remove any existing custom menu
  const existingMenu = document.getElementById('custom-context-menu')
  if (existingMenu)
    existingMenu.remove()

  // Create the custom context menu
  const menu = document.createElement('div')
  menu.id = 'custom-context-menu'
  menu.style.position = 'absolute'
  menu.style.top = `${event.clientY}px`
  menu.style.left = `${event.clientX}px`
  menu.style.background = '#fff'
  menu.style.border = '1px solid #ccc'
  menu.style.padding = '10px'
  menu.style.zIndex = '1000'

  // Prevent menu from closing when interacting with the dropdown
  menu.addEventListener('click', e => e.stopPropagation())

  // Create the "Make Heading" option
  const makeHeadingOption = document.createElement('div')
  makeHeadingOption.textContent = 'Make Heading'
  makeHeadingOption.style.cursor = 'pointer'
  makeHeadingOption.style.marginBottom = '10px'
  makeHeadingOption.onclick = () => {
    editor.value.chain().focus().toggleHeading({ level: 4 }).run() // Toggle Heading level 4
    menu.remove() // Remove menu after applying action
  }

  // Create the select dropdown
  const selectLabel = document.createElement('label')
  selectLabel.textContent = 'Insert Dataset Key: '
  selectLabel.style.display = 'block'
  selectLabel.style.marginBottom = '5px'

  const selectDropdown = document.createElement('select')
  const options = templateEditorStore.datasetData.selectedKeys?.map((s) => {
    return { label: s, value: s }
  })
  // [
  //   { label: 'Select a key', value: '' },
  //   { label: 'Key 1', value: 'key1' },
  //   { label: 'Key 2', value: 'key2' },
  //   { label: 'Key 3', value: 'key3' },
  // ]

  options.forEach((option) => {
    const optionElement = document.createElement('option')
    optionElement.value = option.value
    optionElement.textContent = option.label
    selectDropdown.appendChild(optionElement)
  })

  // Function to insert the selected dataset key
  selectDropdown.onchange = () => {
    const selectedValue = selectDropdown.value
    if (selectedValue) {
      editor.value.chain().focus().insertContent(`{{dataset[${selectedValue}]}}`).run() // Insert dataset key
      menu.remove() // Remove menu after applying action
    }
  }

  // Append elements to the custom menu
  menu.appendChild(makeHeadingOption)
  menu.appendChild(selectLabel)
  menu.appendChild(selectDropdown)

  // Append the custom menu to the body
  document.body.appendChild(menu)

  // Remove the menu if clicking elsewhere
  document.addEventListener('click', () => {
    menu.remove()
  }, { once: true })
}

// const editorContentWidth = ref()
const editorContentWidth = computed(() => {
  if (screenWidth.value > 1600)
    // return 900
    return (Number.parseInt(screenWidth.value / 100) - 6) * 100
  else
    return (Number.parseInt(screenWidth.value / 100) - 3) * 100
})

const editorContentStyle = computed(() => ({
  width: expertEditorWrapperWidth.value,
  minHeight: expertEditorWrapperHeight.value,
  maxHeight: expertEditorWrapperHeight.value,
  //   height: 29.7cm; /* A4 height */
  //   width: 21cm; /* A4 width */
  overflowY: 'auto', /* Enable vertical scrolling */
  overflowX: 'hidden', /* Disable horizontal scrolling */
  //   padding: '1cm', /* Optional padding */
  boxSizing: 'border-box',
//   background: '#f1f1f1',
}))

onMounted(() => {
  expertEditorWrapperWidth.value = `${editorContentWidth.value}px`
  expertEditorWrapperHeight.value = `${templateGeneralInformation?.selectedPageSize === 'A4' ? editorContentWidth.value * 1.414 : editorContentWidth.value * 1.647}px`

  templateEditorStore.expertEditor = editor.value
  // console.log('templateEditorStore.editorContainers?.filter(e => e?.id === props?.editorId)[0]?.content', templateEditorStore.editorContainers?.filter(e => e?.id === props?.editorId)[0]?.content)
  if (templateEditorStore.editorContainers?.filter(e => e?.id === props?.editorId)[0]?.content)
    editor.value.commands.setContent(templateEditorStore.editorContainers?.filter(e => e?.id === props?.editorId)[0]?.content)

  if (editor.value)
    editor.value.view.dom.addEventListener('contextmenu', handleContextMenu)
})

watch(() => [templateEditorStore.currentPreviewNo, templateEditorStore.showPreview], ([currentPreviewNo, showPreview]) => {
  // console.log('change in current preview', currentPreviewNo, showPreview)
  if (showPreview) {
    if (currentPreviewNo > 0) {
      const htmlContent = templateEditorStore.editorContainers?.filter(e => e?.id === props?.editorId)[0]?.content
      const htmlContentWithRealValues = replaceDatasetValues(htmlContent, templateEditorStore?.datasetData?.allEntries[currentPreviewNo - 1])
      editor.value.commands.setContent(htmlContentWithRealValues)
    }
  }
  else {
    const htmlContent = templateEditorStore.editorContainers?.filter(e => e?.id === props?.editorId)[0]?.content
    editor.value.commands.setContent(htmlContent)
  }
})

function replaceDatasetValues(html, dataset) {
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
function addToExpertEditor() {
  // console.log(' add to expert editor running')
  templateEditorStore.expertEditor = editor.value
  // setting current added field when focus on container
  const toBeCurrent = templateEditorStore?.addedFields?.filter(f => f?.hash === props?.editorId)[0]

  templateEditorStore.selectedAddedField = toBeCurrent
  templateEditorStore.showOptionsBar = true
  templateEditorStore.ShowAddedFieldsinTemplateFields = true

  templateEditorStore.showExpertEditor = true
}

// Function to get HTML content

onBeforeUnmount(() => {
  unref(editor).destroy()
  if (editor.value)
    editor.value.view.dom.removeEventListener('contextmenu', handleContextMenu)
})
</script>

<style scoped>
.bubble-menu {
    background-color: #ffffff;
    border: 1px solid #009ee2;
    border-radius: 0.7rem;
    box-shadow: var(--shadow);
    display: flex;
    padding: 0.2rem;
  }

  .bubble-menu button {
    background-color: unset;
    color: #009ee2;
    border: 1px solid #009ee2;
  }

  .bubble-menu button:hover {
    background-color: var(--gray-3);
    color: #000;
  }

  .bubble-menu button.is-active {
    background-color: #009ee2;
    color: #fff;
  }

  .bubble-menu button.is-active:hover {
    background-color: var(--purple-contrast);
    color: #000;
  }

  .editor-wrapper {
    padding: 10px;
    border: 1px solid #ccc;

  }

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
  :deep(.ProseMirror *) {
    font-family: Arial, Helvetica, sans-serif;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
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
  :deep(.ProseMirror) {
    background-color: transparent;
    padding: 0px;
    min-height: 100%;
    /*border: 1px solid #ddd;*/
    border-radius: 4px;
    color: #333;

    width: v-bind('editorWidth') !important;
    height: v-bind('editorHeight') !important;
    overflow: hidden;
    /* border:3px solid red; */
  }
  :deep(.ProseMirror:focus) {
    /* border:none; */
    outline: none;
  }

  :deep(.ProseMirror p)  {
    font-size: 22px;
  }

  :deep(.ProseMirror p:empty::before) {
    content: '';
    display: inline-block;
  }
  /* Headings styles */
  :deep(.ProseMirror h1) {
    font-size: 44px;
    font-weight: bold;
    margin-top: 24px; /* 1.5em = 24px */
    margin-bottom: 8px; /* 0.5em = 8px */
  }

  :deep(.ProseMirror h2) {
    font-size: 36px;
    font-weight: bold;
    margin-top: 22.4px; /* 1.4em = 22.4px */
    margin-bottom: 6.4px; /* 0.4em = 6.4px */
  }

  :deep(.ProseMirror h3) {
    font-size: 30px;
    font-weight: bold;
    margin-top: 20.8px; /* 1.3em = 20.8px */
    margin-bottom: 6.4px; /* 0.4em = 6.4px */
  }

  :deep(.ProseMirror h4) {
    font-size: 24px;
    font-weight: bold;
    margin-top: 19.2px; /* 1.2em = 19.2px */
    margin-bottom: 4.8px; /* 0.3em = 4.8px */
  }

  :deep(.ProseMirror h5) {
    font-size: 20px;
    font-weight: bold;
    margin-top: 17.6px; /* 1.1em = 17.6px */
    margin-bottom: 4.8px; /* 0.3em = 4.8px */
  }

  :deep(.ProseMirror h6) {
    font-size: 18px;
    font-weight: bold;
    margin-top: 16px; /* 1em = 16px */
    margin-bottom: 3.2px; /* 0.2em = 3.2px */
  }

  /* List styles */
  :deep(.ProseMirror ul) {
    list-style-type: disc;
    padding-left: 24px; /* 1.5em = 24px */
    margin-top: 8px; /* 0.5em = 8px */
    margin-bottom: 8px; /* 0.5em = 8px */
  }

  :deep(.ProseMirror ol) {
    list-style-type: decimal;
    padding-left: 24px; /* 1.5em = 24px */
    margin-top: 8px; /* 0.5em = 8px */
    margin-bottom: 8px; /* 0.5em = 8px */
  }

  :deep(.ProseMirror li) {
    margin-bottom: 8px; /* 0.5em = 8px */
  }

  :deep(.ProseMirror ul ul),
  :deep(.ProseMirror ol ol),
  :deep(.ProseMirror ul ol),
  :deep(.ProseMirror ol ul) {
    margin-top: 8px; /* 0.5em = 8px */
    margin-bottom: 8px; /* 0.5em = 8px */
    padding-left: 24px; /* 1.5em = 24px */
    list-style-type: circle; /* Change nested list style */
  }

  /* Table styles */
  :deep(.ProseMirror table) {
    width: 100%;
    border-collapse: collapse;
    margin-top: 16px; /* 1em = 16px */
    margin-bottom: 16px; /* 1em = 16px */
  }

  :deep(.ProseMirror th),
  :deep(.ProseMirror td) {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
}

:deep(.ProseMirror th) {
    background-color: #f2f2f2;
    font-weight: bold;
}

:deep(.ProseMirror td) {
    background-color: #fff;
}

:deep(.ProseMirror tr:nth-child(even) td) {
    background-color: #f9f9f9;
}

:deep(.ProseMirror tr:hover td) {
    background-color: #e9e9e9;
}
:deep(.tiptap-code-node){
    background:rgb(var(--primary-50));
    /* background-color: var(--purple-light); */
    border-radius: 0.4rem;
    color: var(--black);
    font-size: 0.85rem;
    padding: 0.25em 0.3em;
}
.draggable-block {
  display: flex;
  align-items: center;
  position: relative;
}

.drag-handle {
  cursor: grab;
  opacity: 0;
  transition: opacity 0.3s ease;
  margin-right: 8px;
}

.draggable-block:hover .drag-handle {
  opacity: 1;
}

.drag-handle:hover {
  background-color: rgba(0, 0, 0, 0.1);
}
</style>
