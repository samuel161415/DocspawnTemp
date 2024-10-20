import { Node, mergeAttributes } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'

import DraggableBlockComponent from './DraggableBlockComponent.vue'

// Vue component with drag logic

export default Node.create({
  name: 'draggableBlock',

  group: 'block',

  content: 'block+',

  draggable: true,

  parseHTML() {
    return [
      {
        tag: 'div[data-type="draggable-block"]',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'draggable-block' }), 0]
  },

  addNodeView() {
    return VueNodeViewRenderer(DraggableBlockComponent)
  },
})
