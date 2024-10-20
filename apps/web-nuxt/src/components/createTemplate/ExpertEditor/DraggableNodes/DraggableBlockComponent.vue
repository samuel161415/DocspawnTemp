<template>
  <NodeViewWrapper :as="tagName || 'p'" class="draggable-block flex items-center relative">
    <!-- Plus icon for adding a sibling -->
    <div class="add-sibling mt-2 text-md font-normal  " contenteditable="false" @click="addSibling">
      <font-awesome-icon
        icon="fa-solid fa-plus"
        size="md"
        style="--fa-primary-color: #009ee2; --fa-secondary-color: #009ee2; --fa-secondary-opacity: 1;"
      />
    </div>

    <!-- Drag handle for reordering -->
    <div
      class="drag-handle mt-2 text-md font-normal "
      contenteditable="false"
      draggable="true"
    >
      <!-- data-drag-handle -->
      <font-awesome-icon icon="fa-solid fa-grip-vertical" size="md" />
    </div>
    <!-- Content of the draggable item -->
    <NodeViewContent class="content pl-[20px]" />
  </NodeViewWrapper>
</template>

<script>
import { NodeViewContent, NodeViewWrapper, nodeViewProps } from '@tiptap/vue-3'

export default {
  name: 'DraggableBlockComponent',
  components: {
    NodeViewWrapper,
    NodeViewContent,
  },
  props: {
    ...nodeViewProps,
  },
  computed: {
    tagName() {
      const nodeType = this.node.type.name

      if (nodeType === 'paragraph') {
        return 'p'
      }
      else if (nodeType === 'heading') {
        const level = this.node.attrs.level || 1
        return `h${level}`
      }
      // Add other node types as needed
      else {
        return 'div' // Default fallback
      }
    },
  },
  methods: {
    addSibling() {
      const { editor, getPos } = this

      const currentPos = getPos()
      const nodeEndPos = currentPos + this.node.nodeSize

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
        .focus()
        .run()
    },
  },
}
</script>

<style scoped lang="scss">
.draggable-block {
  display: flex;
  align-items: center;
  position: relative;
  padding: 0.5rem;
  margin: 0.5rem 0;
  border-radius: 0.5rem;
  background: #fff3;

  /* Content styling */
  .content {
    flex: 1 1 auto;
  }

  /* Add icon styling */
  .add-sibling {
    flex: 0 0 auto;
    margin-right: 0.5rem;
    cursor: pointer;
    color: lightgray;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 1.2rem;
    transition: background-color 0.2s ease;
    contenteditable: false;
  }

  /* Drag handle styling */
  .drag-handle {
    flex: 0 0 auto;
    margin-left: 0.5rem;
    cursor: grab;
    transition: background-color 0.2s ease;
    font-size: 1.2rem;
    color: lightgray;
    contenteditable: false;
  }

  /* Hide icons by default */
  .add-sibling,
  .drag-handle {
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  /* Show icons on hover */
  &:hover .add-sibling,
  &:hover .drag-handle {
    opacity: 1;
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
