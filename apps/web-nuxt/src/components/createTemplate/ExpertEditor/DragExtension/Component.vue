<template>
  <NodeViewWrapper class="draggable-item">
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
    // Method to add a sibling item
    addSibling() {
      const view = this.editor.view
      const { state, dispatch } = view

      // Get the position of the current node
      const currentPos = this.getPos()
      console.log('this getPos', this.getPos())

      // Calculate the position right after the current node
      const nodeEndPos = currentPos + this.node.nodeSize

      // Use setSelection to move the cursor after the current node
      dispatch(
        state.tr.setSelection(
          state.selection.constructor.near(state.doc.resolve(nodeEndPos)),
        ),
      )

      // Insert the new content (sibling) after the current node
      this.editor
        .chain()
        .insertContentAt(nodeEndPos, {
          type: 'draggableItem',
          content: [
            {
              type: 'paragraph',
              content: [{ type: 'text', text: '/' }],
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
.draggable-item {
  display: flex;
  padding: 0.5rem;
  margin: 0.5rem 0;
  border-radius: 0.5rem;

  background: #fff3;
   box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.05), 0px 10px 20px rgba(0, 0, 0, 0.1);

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
