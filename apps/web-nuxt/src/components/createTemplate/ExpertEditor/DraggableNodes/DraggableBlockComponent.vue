<template>
  <NodeViewWrapper class="draggable-block">
    <!-- Plus icon for adding a sibling -->
    <div class="add-sibling mt-2" contenteditable="false" @click="addSibling">
      <font-awesome-icon icon="fa-solid fa-plus" size="xl" style="--fa-primary-color: #009ee2; --fa-secondary-color: #009ee2; --fa-secondary-opacity: 1;" />
    </div>

    <!-- Drag handle for reordering -->
    <div
      class="drag-handle mt-2"
      contenteditable="false"
      draggable="true"
      data-drag-handle
    >
    </div>

    <!-- Content of the draggable item -->
    <NodeViewContent class="content" />
  </NodeViewWrapper>
</template>

<script>
import { NodeViewContent, NodeViewWrapper, nodeViewProps } from '@tiptap/vue-3'

export default {
  components: {
    NodeViewWrapper,
    NodeViewContent,
  },
  props: {
    ...nodeViewProps,
    editor: Object, // Accept the editor as a prop
    getPos: Function, // Ensure getPos is passed to get the node's position
  },

  methods: {
    // addSibling() {
    //   const { editor, getPos } = this
    //   const view = editor.view
    //   const { state, dispatch } = view

    //   // Get the position after the current node
    //   const currentPos = getPos()
    //   const nodeEndPos = currentPos + this.node.nodeSize

    //   // Create a new paragraph node with predefined text "new paragraph"
    //   const paragraphNode = editor.schema.nodes.paragraph.create(null, editor.schema.text('/'))

    //   // Insert the new paragraph node after the current node
    //   const transaction = state.tr.insert(nodeEndPos, paragraphNode)

    //   dispatch(transaction)
    //   editor.view.focus()
    // },
    addSibling() {
      const { editor, getPos } = this

      // Get the position after the current node
      const currentPos = getPos()
      const nodeEndPos = currentPos + this.node.nodeSize

      // Use the chain command to insert a paragraph with predefined text
      editor
        .chain()
        .insertContentAt(nodeEndPos, {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: '/',
            },
          ],
        })
        .focus() // Ensure the editor remains focused after the insertion
        .run()
    },

  },

}
</script>

<style lang="scss">
.draggable-block {
  display: flex;
  padding: 0.5rem;
  margin: 0.5rem 0;
  border-radius: 0.5rem;

  background: #fff3;
  /*  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.05), 0px 10px 20px rgba(0, 0, 0, 0.1);*/

  /* Hide both add and drag icons by default */
  .add-sibling,
  .drag-handle {
    opacity: 0;
    transition: opacity 0.4s ease-in-out;
  }

  /* Show both icons on hover */
  &:hover .add-sibling,
  &:hover .drag-handle {
    opacity: 1;
  }

  /* Add icon styling */
  .add-sibling {
    flex: 0 0 auto;
    position: relative;
    width: 1rem;
    height: 1rem;
    margin-right: 0.5rem;
    cursor: pointer;
    color: lightgray;
    /* background-color: #00aaff;
     color: white;*/
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 1.2rem;
    transition: background-color 0.2s ease;
  }

  .add-sibling:hover {
    background-color:transparent;
  }

  /* Drag handle styling */
  .drag-handle {
    flex: 0 0 auto;
    position: relative;
    width: 1rem;
    height: 1rem;
    margin-right: 0.5rem;
    cursor: grab;
    background-image: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 16"><path fill-opacity="0.2" d="M4 14c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zM2 6C.9 6 0 6.9 0 8s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6C.9 0 0 .9 0 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" /></svg>');
     background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    transition: background-color 0.2s ease;
  }

  .drag-handle:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }

  .content {
    flex: 1 1 auto;
  }

}
</style>

<!-- <template>
  <NodeViewWrapper
    class="draggable-block"
    :draggable="true"
    @dragstart="onDragStart"
  >
    <div
      class="drag-handle"
      contenteditable="false"
      data-drag-handle
    >
      <font-awesome-icon icon="fa-solid fa-grip-lines" size="lg" />
    </div>

    <NodeViewContent />
  </NodeViewWrapper>
</template>

<script>
import { NodeViewContent, NodeViewWrapper } from '@tiptap/vue-3'

export default {
  components: {
    NodeViewWrapper,
    NodeViewContent,
  },
  props: {
    editor: Object,
    node: Object,
    getPos: Function,
  },
  methods: {
    onDragStart(event) {
      // Optional: Customize the drag image or data if needed
    },
  },
}
</script>

<style scoped>
.draggable-block {
  display: flex;
  align-items: flex-start;
  position: relative;
}

.drag-handle {
  cursor: grab;
  opacity: 0;
  transition: opacity 0.3s ease;
  margin-right: 8px;
  user-select: none;
}

.draggable-block:hover .drag-handle {
  opacity: 1;
}
</style> -->
