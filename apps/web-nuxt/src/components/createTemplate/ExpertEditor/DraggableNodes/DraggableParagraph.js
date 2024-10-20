// DraggableParagraph.js
import Paragraph from '@tiptap/extension-paragraph'
import { mergeAttributes } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import DraggableBlockComponent from './DraggableBlockComponent.vue'

export default Paragraph.extend({
  draggable: true, // Enable dragging for this node

  addAttributes() {
    return {
      ...this.parent?.(),
    }
  },

  parseHTML() {
    return [
      {
        tag: 'p',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['p', mergeAttributes(HTMLAttributes), 0]
  },

  addNodeView() {
    return VueNodeViewRenderer(DraggableBlockComponent)
  },
})
