import { reactive } from 'vue'

const initialDocGenerationData = {
  generatedDocs: '',
  templateToGenerateDocs: {},
  activePageForCanvas: 1,
  totalPagesArray: [],
}

// Create reactive objects
export const docGenerationData = reactive({ ...initialDocGenerationData })
// Function to reset all values to their initial state
export function resetAllDocGenerationValues() {
  Object.assign(docGenerationData, { ...initialDocGenerationData })
}
