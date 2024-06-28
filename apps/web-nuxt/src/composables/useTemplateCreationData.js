import { reactive } from 'vue'

// export const activeTextStyles = reactive({
//   fontFamily: 'Arial',
//   fontSize: 32,
//   textAlign: 'left',
//   fill: '#000000',
//   fontStyle: 'normal',
//   fontWeight: 300,
//   underline: false,
//   charSpacing: 0,

// })

export const templateGeneralInformation = reactive({
  name: '',
  useCase: '', // dataToDoc or forToDoc
  backgroundFileUrl: '',
  datasetFileUrl: '',

})

export const templateDeliveryOptions = reactive({
  fileFormat: 'pdf', // pdf or pdfxml
  fileOutput: 'generatefile', // generatefile or mergeFile
  forceEntriesVerification: false, // true or false,
  thirdPartyFormFilling: false, // true or false
  emailDeliveryOption: 'sendToMultiple', // toLinkedData or sendToMultiple
  selectedEmails: [], // if emailDeliveryOptions=sendToMultiple

})
