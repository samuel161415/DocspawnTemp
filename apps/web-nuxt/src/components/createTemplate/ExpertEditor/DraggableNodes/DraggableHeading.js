// // DraggableHeading.js
// import Heading from '@tiptap/extension-heading'
// import { VueNodeViewRenderer } from '@tiptap/vue-3'
// import DraggableBlockComponent from './DraggableBlockComponent.vue'

// export default Heading.extend({
//   name: 'heading',

//   draggable: true,

//   addNodeView() {
//     return VueNodeViewRenderer(DraggableBlockComponent)
//   },
// })
// DraggableHeading.js
import Heading from '@tiptap/extension-heading'
import { mergeAttributes } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import DraggableBlockComponent from './DraggableBlockComponent.vue'

export default Heading.extend({
  draggable: true,

  addAttributes() {
    return {
      ...this.parent?.(),
    }
  },

  parseHTML() {
    return [
      { tag: 'h1' },
      { tag: 'h2' },
      { tag: 'h3' },
      { tag: 'h4' },
      { tag: 'h5' },
      { tag: 'h6' },
      // Include other heading levels if needed
    ]
  },

  renderHTML({ node, HTMLAttributes }) {
    const level = node.attrs.level || 1
    return [`h${level}`, mergeAttributes(HTMLAttributes), 0]
  },

  addNodeView() {
    return VueNodeViewRenderer(DraggableBlockComponent)
  },
})
