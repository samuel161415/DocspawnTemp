// store.js
import { reactive } from 'vue'

export const templateEditorStore = reactive({
  showOptionsBar: false,
  activeTemplateField: '',
  activeFormField: '',
  activeTimestampField: '',
  activeImageOption: '',
  activeDataField: '',
  addedFields: '',
  selectedAddedField: {},
})
