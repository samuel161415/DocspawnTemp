<template>
  <div v-if="props?.isEditing">
    <Button v-if="props?.isExpertEditor" v-tooltip.top="'Edit'" text size="xs" @click="showAddSnippetModal = true">
      <font-awesome-icon icon="fa-solid fa-pen-to-square" size="lg" />
    </Button>
    <Button v-else label="Edit" @click="showAddSnippetModal = true" />
  </div>
  <div v-else>
    <Button v-if="props?.isExpertEditor" v-tooltip.top="'Add snippet'" @click="showAddSnippetModal = true">
      <font-awesome-icon icon="fa-solid fa-plus" size="lg" />
    </Button>
    <Button v-else label="Add Snippet" @click="showAddSnippetModal = true" />
  </div>

  <Dialog v-model:visible="showAddSnippetModal" modal header="Add snippet" :style="{ width: '50vw' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
    <div class="flex flex-col gap-4">
      <p class="text-lg font-semibold text-surface-600">
        Snippet Category
      </p>
      <div>
        <div v-if="!showAddcategoryForm" class="flex items-center justify-between gap-2">
          <p>Select Category: </p>
          <Button v-if="!props?.isEditing" label="Add Category" @click="showAddcategoryForm = true" />
        </div>
        <p v-else class="mb-2 text-surface-600 text-lg ">
          Create category
        </p>

        <Dropdown v-if="!showAddcategoryForm" v-model="selectedCategory" :disabled="props?.isEditing" :options="categories" placeholder="Select a Category" class="w-full md:w-56" />
        <div v-else class="flex">
          <InputText v-model="categoryName" /><Button label="Save" @click="saveCategory" /><Button
            label="cancel" outlined
            @click="() => {
              showAddcategoryForm = false
              categoryName = ''
            }"
          />
        </div>
      </div>
      <p class="text-lg font-semibold text-surface-600">
        Snippet name
      </p>
      <div>
        <InputText v-model="snippetName" />
      </div>
      <p class="text-lg font-semibold text-surface-600">
        Snippet Content (use Slash '/' to enter commands)
      </p>
      <div class="flex flex-col">
        <SnippetEditorContent :is-editing="props?.isEditing" :current-snippet="props?.currentSnippet" />
        <!-- :is-editing="props?.isEditing" :currentSnippet="props?.currentSnippet"  -->

        <Button v-if="props?.isEditing" label="Update snippet" :disabled="!snippetName || !selectedCategory" @click="editSnippet" />
        <Button v-else label="Save snippet" :disabled="!snippetName || !selectedCategory" @click="saveSnippet" />
      </div>
    </div>
  </Dialog>
</template>

<script setup>
import { v4 as uuidv4 } from 'uuid'
import { templateEditorStore } from '../../composables/useTemplateEditorData.js'
import SnippetEditorContent from './SnippetEditorContent'

const props = defineProps(['isExpertEditor', 'snippets', 'isEditing', 'currentSnippet'])
const emits = defineEmits(['setSnippets'])
const showAddSnippetModal = ref(false)
const selectedCategory = ref()
const showAddcategoryForm = ref(false)
const categoryName = ref('')
const snippetName = ref('')

const categories = ref([])
function toStart() {
  if (props?.snippets?.length > 0)
    categories.value = props?.snippets?.map(s => s?.category)
  if (props?.isEditing) {
    props?.snippets?.forEach((s) => {
      s?.snippets?.forEach((snippet) => {
        if (snippet?.id === props?.currentSnippet?.id) {
          selectedCategory.value = s?.category
          snippetName.value = snippet?.name
        //   templateEditorStore.snippetEditor.commands.setContent(snippet.Html)
        }
      })
    })
  }
}
onMounted(() => {
  console.log('props?.currentSnippet', props?.currentSnippet)
  toStart()
})
watch(showAddSnippetModal, (val) => {
  console.log('val', true)
  if (val)
    toStart()
})
// watch(() => templateEditorStore?.snippetEditor, (val) => {
//   if (props?.isEditing) {
//     props?.snippets?.forEach((s) => {
//       s?.snippets?.forEach((snippet) => {
//         if (snippet?.id === props?.currentSnippet?.id) {
//           //   selectedCategory.value = s?.category
//           //   snippetName.value = snippet?.name
//           templateEditorStore.snippetEditor.commands.setContent(snippet.Html)
//         }
//       })
//     })
//   }
// })

function saveCategory() {
  emits('setSnippets', [...props?.snippets, { category: categoryName.value, snippets: [] }])
  categories.value = [...categories.value, categoryName.value]
  showAddcategoryForm.value = false
}
function saveSnippet() {
  const snippetsToSet = [...props?.snippets?.filter(s => s?.category !== selectedCategory.value), { category: selectedCategory.value, snippets: [...props?.snippets?.filter(s => s?.category === selectedCategory.value)[0]?.snippets] }]?.map((s) => {
    if (s?.category === selectedCategory.value) {
      return { ...s, snippets: [...s?.snippets, {
        id: uuidv4(),
        name: snippetName.value,
        Html: templateEditorStore.snippetEditor.getHTML(),
        viewMode: 'rendered',
      }] }
    }
    else { return s }
  })
  console.log('snippets to add', snippetsToSet)
  //   return
  emits('setSnippets', snippetsToSet)
  snippetName.value = ''
  selectedCategory.value = ''
  showAddSnippetModal.value = false
}
function editSnippet() {
  console.log('snippet to edit', props?.currentSnippet)
  const snippetsToUpdate = props?.snippets?.map((s) => {
    let isFound = false
    const snippetsToAdd = s?.snippets?.map((snippet) => {
      if (snippet?.id === props?.currentSnippet?.id) {
        isFound = true
        return {
          ...snippet,
          name: snippetName.value,
          Html: templateEditorStore?.snippetEditor?.getHTML(),

        }
      }
      else { return snippet }
    })
    if (isFound)
      return { ...s, snippets: snippetsToAdd }
    else
      return s
  })
  console.log('snippets to update', snippetsToUpdate)
  emits('setSnippets', snippetsToUpdate)
  snippetName.value = ''
  selectedCategory.value = ''
  showAddSnippetModal.value = false
}
</script>
