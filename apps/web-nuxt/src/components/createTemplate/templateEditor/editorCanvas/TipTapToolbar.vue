<template>
  <div class="editor-wrapper flex flex-col gap-4 relative h-max mb-4 overflow-y-auto ">
    <div v-if="editor" class="toolbar static-menu">
      <!-- Button for Bold -->
      <Button
        v-tooltip="$t('Cp_templateEditor_tiptap_topbar.bold')"
        class="w-max px-2"
        :disabled="!editor.can().chain().focus().toggleBold().run()"
        :class="{ 'is-active': editor.isActive('bold') }"
        @click="editor.chain().focus().toggleBold().run()"
      >
        <font-awesome-icon icon="fa-solid fa-bold" size="lg" />
      </Button>

      <!-- Button for Italic -->
      <Button
        v-tooltip="$t('Cp_templateEditor_tiptap_topbar.italic')"
        class="w-max px-2"
        :disabled="!editor.can().chain().focus().toggleItalic().run()"
        :class="{ 'is-active': editor.isActive('italic') }"
        @click="editor.chain().focus().toggleItalic().run()"
      >
        <font-awesome-icon icon="fa-solid fa-italic" size="lg" />
      </Button>

      <!-- Button for Strike -->
      <Button
        v-tooltip="$t('Cp_templateEditor_tiptap_topbar.strike')"
        class="w-max px-2"
        :disabled="!editor.can().chain().focus().toggleStrike().run()"
        :class="{ 'is-active': editor.isActive('strike') }"
        @click="editor.chain().focus().toggleStrike().run()"
      >
        <font-awesome-icon icon="fa-solid fa-strikethrough" size="lg" />
      </Button>

      <!-- Button for Code -->
      <Button
        v-tooltip="$t('Cp_templateEditor_tiptap_topbar.code')"
        class="w-max px-2"
        :disabled="!editor.can().chain().focus().toggleCode().run()"
        :class="{ 'is-active': editor.isActive('code') }"
        @click="editor.chain().focus().toggleCode().run()"
      >
        <font-awesome-icon icon="fa-solid fa-code" size="lg" />
      </Button>

      <!-- Button for Clear Marks -->
      <Button
        v-tooltip="$t('Cp_templateEditor_tiptap_topbar.clear_marks')"
        class="w-max px-2"
        @click="editor.chain().focus().unsetAllMarks().run()"
      >
        <font-awesome-icon icon="fa-solid fa-eraser" size="lg" />
      </Button>

      <!-- Button for Clear Nodes -->
      <Button
        v-tooltip="$t('Cp_templateEditor_tiptap_topbar.clear_nodes')"
        class="w-max px-2"
        @click="editor.chain().focus().clearNodes().run()"
      >
        <font-awesome-icon icon="fa-solid fa-trash-alt" size="lg" />
      </Button>

      <!-- Paragraph -->
      <Button
        v-tooltip="$t('Cp_templateEditor_tiptap_topbar.paragraph')"
        class="w-max px-2"
        :class="{ 'is-active': editor.isActive('paragraph') }"
        @click="editor.chain().focus().setParagraph().run()"
      >
        <font-awesome-icon icon="fa-solid fa-paragraph" size="lg" />
      </Button>

      <!-- Headings H1 to H6 -->
      <Button
        v-tooltip="$t('Cp_templateEditor_tiptap_topbar.heading_1')"
        class="w-max px-2"
        :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
        @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
      >
        <font-awesome-icon icon="fa-solid fa-heading" size="lg" />
      </Button>

      <Button
        v-tooltip="$t('Cp_templateEditor_tiptap_topbar.heading_2')"
        class="w-max px-2"
        :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
        @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
      >
        <font-awesome-icon icon="fa-solid fa-heading" size="lg" />
      </Button>

      <!-- Repeat for h3, h4, h5, h6 -->
      <Button
        v-tooltip="$t('Cp_templateEditor_tiptap_topbar.heading_3')"
        class="w-max px-2"
        :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
        @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
      >
        <font-awesome-icon icon="fa-solid fa-heading" size="lg" />
      </Button>
      <Button
        v-tooltip="$t('Cp_templateEditor_tiptap_topbar.heading_4')"
        class="w-max px-2"
        :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }"
        @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
      >
        <font-awesome-icon icon="fa-solid fa-heading" size="lg" />
      </Button>
      <Button
        v-tooltip="$t('Cp_templateEditor_tiptap_topbar.heading_5')"
        class="w-max px-2"
        :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }"
        @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
      >
        <font-awesome-icon icon="fa-solid fa-heading" size="lg" />
      </Button>
      <Button
        v-tooltip="$t('Cp_templateEditor_tiptap_topbar.heading_6')"
        class="w-max px-2"
        :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }"
        @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
      >
        <font-awesome-icon icon="fa-solid fa-heading" size="lg" />
      </Button>

      <!-- Bullet List -->
      <Button
        v-tooltip="$t('Cp_templateEditor_tiptap_topbar.bullet_list')"
        class="w-max px-2"
        :class="{ 'is-active': editor.isActive('bulletList') }"
        @click="editor.chain().focus().toggleBulletList().run()"
      >
        <font-awesome-icon icon="fa-solid fa-list-ul" size="lg" />
      </Button>

      <!-- Ordered List -->
      <Button
        v-tooltip="$t('Cp_templateEditor_tiptap_topbar.ordered_list')"
        class="w-max px-2"
        :class="{ 'is-active': editor.isActive('orderedList') }"
        @click="editor.chain().focus().toggleOrderedList().run()"
      >
        <font-awesome-icon icon="fa-solid fa-list-ol" size="lg" />
      </Button>

      <!-- Code Block -->
      <Button
        v-tooltip="$t('Cp_templateEditor_tiptap_topbar.code_block')"
        class="w-max px-2"
        :class="{ 'is-active': editor.isActive('codeBlock') }"
        @click="editor.chain().focus().toggleCodeBlock().run()"
      >
        <font-awesome-icon icon="fa-solid fa-file-code" size="lg" />
      </Button>

      <!-- Blockquote -->
      <Button
        v-tooltip="$t('Cp_templateEditor_tiptap_topbar.blockquote')"
        class="w-max px-2"
        :class="{ 'is-active': editor.isActive('blockquote') }"
        @click="editor.chain().focus().toggleBlockquote().run()"
      >
        <font-awesome-icon icon="fa-solid fa-quote-right" size="lg" />
      </Button>

      <!-- Horizontal Rule -->
      <Button
        v-tooltip="$t('Cp_templateEditor_tiptap_topbar.horizontal_rule')"
        class="w-max px-2"
        @click="editor.chain().focus().setHorizontalRule().run()"
      >
        <font-awesome-icon icon="fa-solid fa-minus" size="lg" />
      </Button>

      <!-- Hard Break -->
      <Button
        v-tooltip="$t('Cp_templateEditor_tiptap_topbar.hard_break')"
        class="w-max px-2"
        @click="editor.chain().focus().setHardBreak().run()"
      >
        <font-awesome-icon icon="fa-solid fa-level-down-alt" size="lg" />
      </Button>

      <!-- Undo and Redo -->
      <Button
        v-tooltip="$t('Cp_templateEditor_tiptap_topbar.undo')"
        class="w-max px-2"
        :disabled="!editor.can().chain().focus().undo().run()"
        @click="editor.chain().focus().undo().run()"
      >
        <font-awesome-icon icon="fa-solid fa-undo" size="lg" />
      </Button>

      <Button
        v-tooltip="$t('Cp_templateEditor_tiptap_topbar.redo')"
        class="w-max px-2"
        :disabled="!editor.can().chain().focus().redo().run()"
        @click="editor.chain().focus().redo().run()"
      >
        <font-awesome-icon icon="fa-solid fa-redo" size="lg" />
      </Button>

      <!-- Insert Table -->
      <Button
        v-tooltip="$t('Cp_templateEditor_tiptap_topbar.insert_table')"
        class="w-max px-2"
        :disabled="!editor.can().insertTable()"
        @click="addTable"
      >
        <font-awesome-icon icon="fa-solid fa-table" size="lg" />
      </Button>

      <!-- Delete Table -->
      <Button
        v-tooltip="$t('Cp_templateEditor_tiptap_topbar.delete_table')"
        class="w-max px-2"
        :disabled="!editor.can().deleteTable()"
        @click="deleteTable"
      >
        <font-awesome-icon icon="fa-solid fa-trash" size="lg" />
      </Button>

      <!-- Add Column Before -->
      <Button
        v-tooltip="$t('Cp_templateEditor_tiptap_topbar.add_column_before')"
        class="w-max px-2"
        :disabled="!editor.can().addColumnBefore()"
        @click="addColumnBefore"
      >
        <font-awesome-icon icon="fa-solid fa-arrow-left" size="lg" />
      </Button>

      <!-- Add Column After -->
      <Button
        v-tooltip="$t('Cp_templateEditor_tiptap_topbar.add_column_after')"
        class="w-max px-2"
        :disabled="!editor.can().addColumnAfter()"
        @click="addColumnAfter"
      >
        <font-awesome-icon icon="fa-solid fa-arrow-right" size="lg" />
      </Button>

      <!-- Delete Column -->
      <Button
        v-tooltip="$t('Cp_templateEditor_tiptap_topbar.delete_column')"
        class="w-max px-2"
        :disabled="!editor.can().deleteColumn()"
        @click="deleteColumn"
      >
        <font-awesome-icon icon="fa-solid fa-trash-alt" size="lg" />
      </Button>

      <!-- Add Row Before -->
      <Button
        v-tooltip="$t('Cp_templateEditor_tiptap_topbar.add_row_before')"
        class="w-max px-2"
        :disabled="!editor.can().addRowBefore()"
        @click="addRowBefore"
      >
        <font-awesome-icon icon="fa-solid fa-arrow-up" size="lg" />
      </Button>

      <!-- Add Row After -->
      <Button
        v-tooltip="$t('Cp_templateEditor_tiptap_topbar.add_row_after')"
        class="w-max px-2"
        :disabled="!editor.can().addRowAfter()"
        @click="addRowAfter"
      >
        <font-awesome-icon icon="fa-solid fa-arrow-down" size="lg" />
      </Button>

      <!-- Delete Row -->
      <Button
        v-tooltip="$t('Cp_templateEditor_tiptap_topbar.delete_row')"
        class="w-max px-2"
        :disabled="!editor.can().deleteRow()"
        @click="deleteRow"
      >
        <font-awesome-icon icon="fa-solid fa-trash" size="lg" />
      </Button>

      <!-- Merge Cells -->
      <Button
        v-tooltip="$t('Cp_templateEditor_tiptap_topbar.merge_cells')"
        class="w-max px-2"
        :disabled="!editor.can().mergeCells()"
        @click="mergeCells"
      >
        <font-awesome-icon icon="fa-solid fa-object-group" size="lg" />
      </Button>

      <!-- Split Cell -->
      <Button
        v-tooltip="$t('Cp_templateEditor_tiptap_topbar.split_cell')"
        class="w-max px-2"
        :disabled="!editor.can().splitCell()"
        @click="splitCell"
      >
        <font-awesome-icon icon="fa-solid fa-object-ungroup" size="lg" />
      </Button>

      <!-- Toggle Header Column -->
      <Button
        v-tooltip="$t('Cp_templateEditor_tiptap_topbar.toggle_header_column')"
        class="w-max px-2"
        :disabled="!editor.can().toggleHeaderColumn()"
        @click="toggleHeaderColumn"
      >
        <font-awesome-icon icon="fa-solid fa-columns" size="lg" />
      </Button>

      <!-- Toggle Header Row -->
      <Button
        v-tooltip="$t('Cp_templateEditor_tiptap_topbar.toggle_header_row')"
        class="w-max px-2"
        :disabled="!editor.can().toggleHeaderRow()"
        @click="toggleHeaderRow"
      >
        <font-awesome-icon icon="fa-light fa-rows" size="lg" />
      </Button>

      <!-- Toggle Header Cell -->
      <Button
        v-tooltip="$t('Cp_templateEditor_tiptap_topbar.toggle_header_cell')"
        class="w-max px-2"
        :disabled="!editor.can().toggleHeaderCell()"
        @click="toggleHeaderCell"
      >
        <font-awesome-icon icon="fa-solid fa-table-cells" size="lg" />
      </Button>

      <Button v-if="templateGeneralInformation?.useCase === 'Form to doc'" :label="$t('Cp_templateEditor_tiptap_topbar.add_form_field')" @click="showAddFormFieldsForm = true" />
    </div>

    <Dialog v-model:visible="showAddFormFieldsForm" modal :header="$t('Cp_tiptap_toolbar_formOptions.add_form_field_dialog_title')" :style="{ minWidth: '40rem' }">
      <DataTable
        v-model:filters="filters"
        v-model:selection="selectedField"
        :value="templateEditorStore?.addedFields?.filter(f => f?.isFormField && ['Form text', 'Form date', 'Form time']?.includes(f?.fieldType))"
        state-storage="session"
        state-key="dt-state-demo-session"
        paginator
        :rows="5"
        filter-display="menu"
        selection-mode="single"
        data-key="id"
        :global-filter-fields="['fieldName', 'fieldType', 'fieldDescription']"
        table-style="min-width: 50rem"
      >
        <template #header>
          <div class="flex items-center justify-between gap-2 ">
            <InputText v-model="filters.global.value" :placeholder="$t('Cp_tiptap_toolbar_formOptions.search_placeholder')" />
            <Button :label="$t('Cp_tiptap_toolbar_formOptions.add_new')" @click="showAddFieldForm = !showAddFieldForm" />
          </div>
          <div v-if="showAddFieldForm" class="w-full p-2 border bg-white mt-2 flex gap-2">
            <InputText v-model="formInputName" :placeholder="$t('Cp_tiptap_toolbar_formOptions.field_name_placeholder')" class="h-full" />
            <InputText v-model="formInputDescription" :placeholder="$t('Cp_tiptap_toolbar_formOptions.field_description_placeholder')" class="h-full" />
            <Dropdown
              v-model="selectedFormInput"
              :options="formInputOptions"
              :placeholder="$t('Cp_tiptap_toolbar_formOptions.select_field_input')"
              option-label="label"
            />
            <Dropdown v-if="selectedFormInput === 'Form time'" v-model="selectedTimeFormat" :options="timeFormats" option-label="label" :placeholder="$t('Cp_tiptap_toolbar_formOptions.select_format')" class="w-full md:w-full" />
            <Dropdown v-if="selectedFormInput === 'Form date'" v-model="selectedDateFormat" :options="dateFormats" option-label="name" :placeholder="$t('Cp_tiptap_toolbar_formOptions.select_format')" class="w-full md:w-full" />
            <Button :disabled="!formInputName || !selectedFormInput" :label="$t('Cp_tiptap_toolbar_formOptions.add')" class="min-w-[60px]" @click="addFormInputToTextbox" />
            <Button outlined :label="$t('Cp_tiptap_toolbar_formOptions.cancel')" class="px-2 min-w-[80px]" @click="showAddFieldForm = false" />
          </div>
        </template>

        <!-- Column for Field Name -->
        <Column field="name" :header="$t('Cp_tiptap_toolbar_formOptions.field_name')" sortable style="width: 25%" />

        <!-- Column for Field Type -->
        <Column field="fieldType" :header="$t('Cp_tiptap_toolbar_formOptions.field_type')" sortable style="width: 25%" />

        <!-- Column for Field Description -->
        <Column field="fieldDescription" :header="$t('Cp_tiptap_toolbar_formOptions.field_description')" sortable style="width: 25%" />

        <!-- Action Column -->
        <Column :header="$t('Cp_tiptap_toolbar_formOptions.action')" style="width: 25%">
          <template #body="{ data }">
            <Button
              :label="$t('Cp_tiptap_toolbar_formOptions.insert')"
              icon="pi pi-plus"
              class="p-button-sm p-button-success"
              @click="insertOnEditor(data)"
            />
          </template>
        </Column>

        <template #empty>
          {{ $t('Cp_tiptap_toolbar_formOptions.no_fields_found') }}
        </template>
      </DataTable>
    </Dialog>
  </div>
</template>

<script setup>
import { v4 as uuidv4 } from 'uuid'
import { FilterMatchMode, FilterOperator } from 'primevue/api'
import { useTimestampFormats } from '@/composables/useTimestampFormats'
import { templateEditorStore } from '@/composables/useTemplateEditorData'
import { templateGeneralInformation } from '@/composables/useTemplateCreationData.js'

// Data for the form fields

// Selected field for table row selection
const selectedField = ref(null)

// Filters configuration for DataTable
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
  fieldType: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
  fieldDescription: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
})

const selectedTimeFormat = ref()
const selectedDateFormat = ref()
const { timeFormats, dateFormats } = useTimestampFormats()

const showAddFormFieldsForm = ref(false)

// Action column template function

const editor = ref()
watch(() => templateEditorStore.expertEditor, (val) => {
//   console.log('template editor store', templateEditorStore?.expertEditor)
  editor.value = val
})

const formInputOptions = [{ label: 'Text', value: 'Form text' }, { label: 'Date', value: 'Form date' }, { label: 'Time', value: 'Form time' }]
const selectedFormInput = ref()
const formInputName = ref()
const formInputDescription = ref()
const showAddFieldForm = ref(false)

// Table-related actions
const addTable = () => editor.value.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
const deleteTable = () => editor.value.chain().focus().deleteTable().run()

// Column-related actions
const addColumnBefore = () => editor.value.chain().focus().addColumnBefore().run()
const addColumnAfter = () => editor.value.chain().focus().addColumnAfter().run()
const deleteColumn = () => editor.value.chain().focus().deleteColumn().run()

// Row-related actions
const addRowBefore = () => editor.value.chain().focus().addRowBefore().run()
const addRowAfter = () => editor.value.chain().focus().addRowAfter().run()
const deleteRow = () => editor.value.chain().focus().deleteRow().run()

// Cell-related actions
const mergeCells = () => editor.value.chain().focus().mergeCells().run()
const splitCell = () => editor.value.chain().focus().splitCell().run()
const toggleHeaderColumn = () => editor.value.chain().focus().toggleHeaderColumn().run()
const toggleHeaderRow = () => editor.value.chain().focus().toggleHeaderRow().run()
const toggleHeaderCell = () => editor.value.chain().focus().toggleHeaderCell().run()
const htmlContent = ref('')

function addFormInputToTextbox() {
  // Insert the selected fruit wrapped in {{}} into the editor
  // editor.value.chain().focus().insertContent(`{{dataset[${formInputName.value}]}}`).run()
  const hash = uuidv4()
  if (!formInputName.value || !selectedFormInput.value.value)
    return
  let fieldToAdd = { isFormField: true, isRequired: true, fieldType: selectedFormInput.value.value, name: formInputName.value, fieldDescription: formInputDescription.value, id: formInputName.value, hash, isTextBoxInserted: true, textboxHash: templateEditorStore?.selectedAddedField?.hash }

  if (selectedFormInput.value.value === 'Form text')
    fieldToAdd = { ...fieldToAdd, allowDecimals: false, minCharAllowed: 2, maxCharAllowed: 50, characterAcception: 'Text' }

  if (selectedFormInput.value.value === 'Form date')
    fieldToAdd = { ...fieldToAdd, dateFormat: selectedDateFormat }
  if (selectedFormInput.value.value === 'Form time')
    fieldToAdd = { ...fieldToAdd, timeFormat: selectedTimeFormat }

  const allFields = []
  templateEditorStore.addedFields.forEach((f) => {
    allFields.push(JSON.parse(JSON.stringify(f)))
  })
  allFields.push(fieldToAdd)
  templateEditorStore.addedFields = allFields

  formInputName.value = ''
  formInputDescription.value = ''
  selectedFormInput.value = ''
  selectedTimeFormat.value = ''
  showAddFieldForm.value = false
  selectedDateFormat.value = ''
}
function insertOnEditor(data) {
  editor.value.chain().focus().insertContent(`{{dataset[${data?.name}]}}`).run()
  showAddFormFieldsForm.value = false
}
// async function getHTMLContent() {
//   if (editor.value)
//     htmlContent.value = editor.value.getHTML()
// }

// const selectedDatasetkey = ref(null)

// function insetDatasetKey() {
//   if (!selectedDatasetkey.value)
//     return

//   // Insert the selected fruit wrapped in {{}} into the editor
//   editor.value.chain().focus().insertContent(`{{dataset[${selectedDatasetkey.value}]}}`).run()

//   // Reset the dropdown
//   selectedDatasetkey.value = null
// }
</script>

<style scoped>
.static-menu {
  background-color: #ffffff;
  border-radius: 0.7rem;
  box-shadow: var(--shadow);
  display: flex;
  width:100%;
  flex-wrap: wrap;
  padding: 0.2rem;
  gap:8px;
}

.static-menu button {
  background-color: unset;
  color: #009ee2;
  border: 1px solid #009ee2;
  min-width:30px;
}

.static-menu button:hover {
  background-color: var(--gray-3);
  color: #000;
}

.static-menu button.is-active {
  background-color: #009ee2;
  color: #fff;
}

.static-menu button.is-active:hover {
  background-color: var(--purple-contrast);
  color: #000;
}
</style>
