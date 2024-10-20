// DraggableHeading.js
import Heading from '@tiptap/extension-heading'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import DraggableBlockComponent from './DraggableBlockComponent.vue'

export default Heading.extend({
  name: 'heading',

  draggable: true,

  addNodeView() {
    return VueNodeViewRenderer(DraggableBlockComponent)
  },
})
