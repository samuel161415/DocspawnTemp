<template>
  <div class="p-3">
    <div class="flex justify-between items-center w-full border-b pb-2 mb-3">
      <p v-if="!props.isExpertEditor" class="text-lg font-semibold text-surface-500">
        Snippets
      </p>
      <div class="flex gap-2 justify-between">
        <InputText placeholder="Search snippets..." />
        <AddSnippModal :is-expert-editor="props?.isExpertEditor" :snippets="snippets" @set-snippets="(val) => snippets = val" />
      </div>
    </div>
    <Accordion multiple>
      <AccordionTab v-for="(category, index) in snippets" :key="index" :header="category.category">
        <ul>
          <li v-for="(snippet, idx) in category.snippets" :key="idx">
            <div class="flex justify-between items-center">
              <p class="font-medium">
                Snippet {{ snippet.name }}
              </p>
              <div class="flex gap-2">
                <Button v-if="props?.isExpertEditor" v-tooltip.top="'Edit'" text size="xs">
                  <font-awesome-icon icon="fa-solid fa-pen-to-square" size="lg" />
                </Button>
                <Button v-else label="Edit" />

                <Button v-if="!props?.isExpertEditor" v-tooltip.top="snippet.viewMode === 'rendered' ? 'Show Snippet Code' : 'Show Output'" text @click="toggleViewMode(category, idx)">
                  <font-awesome-icon icon="fa-solid fa-eye" size="lg" />
                </Button>
                <!-- <Button
                  v-else
                  outlined
                  :label="snippet.viewMode === 'rendered' ? 'Show Snippet Code' : 'Show Output'"
                  @click="toggleViewMode(category, idx)"
                /> -->
                <Button
                  v-if="props?.isExpertEditor" v-tooltip.top="'Add to template'"
                  @click="() => addSinppetToTemplate(snippet)"
                >
                  <font-awesome-icon icon="fa-duotone fa-right" size="lg" />
                </Button>
              </div>
            </div>

            <div v-if="!props?.isExpertEditor" class="py-2 bg-surface-50">
              <!-- Toggle between HTML output and raw snippet code -->
              <div v-if="snippet.viewMode === 'rendered'" v-html="snippet.Html"></div>
              <pre v-else>{{ snippet.Html }}</pre>
            </div>
          </li>
        </ul>
      </AccordionTab>
    </Accordion>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AddSnippModal from './AddSnippetModal'

const props = defineProps(['isExpertEditor'])

// Define the data using ref
const snippets = ref([
  {
    category: 'Personal',
    snippets: [
      { name: 'A', Html: '<p>What\'s your name?</p>', viewMode: 'rendered' },
      { name: 'B', Html: '<p>What\'s your age?</p>', viewMode: 'rendered' },
    ],
  },
  {
    category: 'Work',
    snippets: [
      { name: 'C', Html: '<p>What\'s your job?</p>', viewMode: 'rendered' },
      { name: 'D', Html: '<p>What\'s your salary?</p>', viewMode: 'rendered' },
      { name: 'E', Html: '<p>What\'s your designation?</p>', viewMode: 'rendered' },
    ],
  },
])
watch(snippets, (val) => {
  console.log('snippets', val)
})
// Define the toggleViewMode function
function toggleViewMode(category, idx) {
  const snippet = category.snippets[idx]
  snippet.viewMode = snippet.viewMode === 'rendered' ? 'raw' : 'rendered'
}
function addSinppetToTemplate(snippet) {
  console.log('snippet', snippet)
  console.log('template editor stor expert view', templateEditorStore.expertEditor)
  //   templateEditorStore.expertEditor.chain().focus().insertContent(`{{dataset[${selectedValue}]}}`).run() // Insert dataset key
  templateEditorStore.expertEditor.commands.insertContent(snippet.Html)
}
</script>

    <style>
    .no-scrollbar::-webkit-scrollbar {
      display: none;
    }
    .no-scrollbar {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
    </style>
