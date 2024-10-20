<template>
  <NodeViewWrapper class="draggable-block">
    <!-- Drag handle for reordering -->
    <div class="drag-handle" contenteditable="false" draggable="true" data-drag-handle>
      <!-- Your drag icon -->
      <font-awesome-icon icon="fa-solid fa-grip-lines" size="lg" />
    </div>
    <!-- Block content -->
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
}
</script>

  <style scoped>
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
