// store.js
import { reactive } from 'vue'

export const templateEditorStore = reactive({
  activeTemplateField: '',
  activeFormField: '',
  activeTimestampField: '',
  activeImageOption: '',
  activeDataField: '',
})
