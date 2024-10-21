<template>
  <Button v-if="props?.isExpertEditor" v-tooltip.top="'Add snippet'" @click="showAddSnippetModal = true">
    <font-awesome-icon icon="fa-solid fa-plus" size="lg" />
  </Button>
  <Button v-else label="Add Snippet" @click="showAddSnippetModal = true" />
  <Dialog v-model:visible="showAddSnippetModal" modal header="Add snippet" :style="{ width: '50vw' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
    <div class="flex flex-col gap-4">
      <p class="text-lg font-semibold text-surface-600">
        Snippet Category
      </p>
      <div>
        <div v-if="!showAddcategoryForm" class="flex items-center justify-between gap-2">
          <p>Select Category: </p>
          <Button label="Add Category" @click="showAddcategoryForm = true" />
        </div>
        <p v-else class="mb-2 text-surface-600 text-lg ">
          Create category
        </p>

        <Dropdown v-if="!showAddcategoryForm" v-model="selectedCategory" :options="categories" placeholder="Select a Category" class="w-full md:w-56" />
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
        <SnippetEditorContent />
        {{ categoryName }}
        <Button label="Save snippet" :disabled="!snippetName || !selectedCategory" @click="saveSnippet" />
      </div>
    </div>
  </Dialog>
</template>

<script setup>
import { templateEditorStore } from '../../composables/useTemplateEditorData.js'
import SnippetEditorContent from './SnippetEditorContent'

const props = defineProps(['isExpertEditor', 'snippets'])
const emits = defineEmits(['setSnippets'])
const showAddSnippetModal = ref(false)
const selectedCategory = ref()
const showAddcategoryForm = ref(false)
const categoryName = ref('')
const snippetName = ref('')

const categories = ref([])
onMounted(() => {
  if (props?.snippets?.length > 0)
    categories.value = props?.snippets?.map(s => s?.category)
})

function saveCategory() {
  console.log('category to save', categoryName.value)
  emits('setSnippets', [...props?.snippets, { category: categoryName.value, snippets: [] }])
  categories.value = [...categories.value, categoryName.value]
  showAddcategoryForm.value = false
}
function saveSnippet() {
  console.log('category name', snippetName.value)
  console.log('categroy ', selectedCategory.value)
  console.log('httml content', templateEditorStore.snippetEditor.getHTML())
  const snippetsToSet = [...props?.snippets?.filter(s => s?.category !== selectedCategory.value), { category: selectedCategory.value, snippets: [...props?.snippets?.filter(s => s?.category === selectedCategory.value)[0]?.snippets] }]?.map((s) => {
    if (s?.category === selectedCategory.value) {
      return { ...s, snippets: [...s?.snippets, {
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
</script>
