import { reactive } from 'vue'

const initialTemplateGeneralInformation = {
  name: '',
  useCase: '', // dataToDoc or forToDoc
  backgroundFileUrl: '',
  datasetFileUrl: '',
}

const initialTemplateDeliveryOptions = {
  fileFormat: 'pdf', // pdf or pdfxml
  fileOutput: 'generatefile', // generatefile or mergeFile
  forceEntriesVerification: false, // true or false,
  thirdPartyFormFilling: false, // true or false
  emailDeliveryOption: 'sendToMultiple', // toLinkedData or sendToMultiple
  selectedEmails: [], // if emailDeliveryOptions=sendToMultiple
}

// Create reactive objects
export const templateGeneralInformation = reactive({ ...initialTemplateGeneralInformation })
export const templateDeliveryOptions = reactive({ ...initialTemplateDeliveryOptions })

// Function to reset all values to their initial state
export function resetAllTemplateCreationValues() {
  Object.assign(templateGeneralInformation, { ...initialTemplateGeneralInformation })
  Object.assign(templateDeliveryOptions, { ...initialTemplateDeliveryOptions })
}
