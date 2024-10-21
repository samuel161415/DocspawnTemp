<template>
  <div class="h-full w-full bg-white rounded-lg overflow-scroll no-scrollbar">
    <div class="px-8 py-8 h-full">
      <h2 class="font-semibold text-surface-600 text-2xl px-3 py-2">
        Snippet Library
      </h2>
      <SnippetLibrary />
    </div>
  </div>
</template>

<script setup>
import SnippetLibrary from '../../components/snippetLibrary/SnippetLibrary'
</script>
