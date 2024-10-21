<template>
  <div class=" flex-1 min-w-[200px] min-h-full">
    <div class="w-full mb-6 justify-left gap-2 h-[62px] rounded-md text-lg text-primary-500 bg-primary-50 flex items-center justify-center gap-2 transition-all ease-linear duration-75">
      <p class="font-poppins">
        Snippets
      </p>
    </div>
    <SnippetLibrary :is-expert-editor="true" />
  </div>
</template>

<script setup>
import SnippetLibrary from '../../snippetLibrary/SnippetLibrary'
</script>
