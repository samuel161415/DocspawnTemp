import { reactive } from 'vue'

const initialDocGenerationData = {
  generatedDocs: '',

}

// Create reactive objects
export const docGenerationData = reactive({ ...initialDocGenerationData })
// Function to reset all values to their initial state
export function resetAllTemplateCreationValues() {
  Object.assign(docGenerationData, { ...initialDocGenerationData })
}
