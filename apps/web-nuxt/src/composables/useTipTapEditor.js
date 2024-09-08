import { onBeforeUnmount, ref } from 'vue'
import { useEditor } from '@tiptap/vue-3'
import TiptapStarterKit from '@tiptap/starter-kit'
import TiptapTable from '@tiptap/extension-table'
import TiptapTableRow from '@tiptap/extension-table-row'
import TiptapTableCell from '@tiptap/extension-table-cell'
import TiptapTableHeader from '@tiptap/extension-table-header'

export function useTiptapEditor() {
  const editor = ref(null)

  // Initialize the editor instance
  const initEditor = (content = '') => {
    editor.value = useEditor({
      content,
      extensions: [
        TiptapStarterKit,
        TiptapTable,
        TiptapTableRow,
        TiptapTableCell,
        TiptapTableHeader,
      ],
    })
  }

  onBeforeUnmount(() => {
    if (editor.value)
      editor.value.destroy()
  })

  return {
    editor,
    initEditor,
  }
}
