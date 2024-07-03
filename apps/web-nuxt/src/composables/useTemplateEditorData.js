import { reactive } from 'vue'

// Define initial values for each reactive object
const initialActiveTextStyles = {
  fontFamily: 'Arial',
  fontSize: 32,
  textAlign: 'left',
  fill: '#000000',
  fontStyle: 'normal',
  fontWeight: 300,
  underline: false,
  charSpacing: 0,
}

const initialTemplateEditorStore = {
  templateBackgroundUrl: 'https://docspawn-bucket-1.s3.eu-central-1.amazonaws.com/docspawn-bucket-1/96205cfa-09dc-46c9-bef5-aa9c2a9c868f_DS demo 1 - Delivery notice - template.pdf',
  showOptionsBar: false,
  ShowAddedFieldsinTemplateFields: false,
  activeTemplateField: '',
  activeFormField: '',
  activeTimestampField: '',
  activeImageOption: '',
  activeDataField: '',
  addedFields: [],
  selectedAddedField: {},
  fieldToAdd: {},
  fabric: {},
  canvas: {},
  datasetData: { keys: {}, allEntries: [], selectedKeys: [] },
  activePageForCanvas: 1,
  totalPagesArray: [],
  activeAdvancedPointer: false,
  activeDisplayGuide: false,
  activeDisplayGuideForAll: false,
  anyObjectSelected: false,
  showPreview: false,
  watermarkImage: {},
  templateToEdit: {},
  lastScaledTextOptions: { x: 1, y: 1 },
}
// Create reactive objects
export const activeTextStyles = reactive({ ...initialActiveTextStyles })
export const templateEditorStore = reactive({ ...initialTemplateEditorStore })
// Function to reset all values to their initial state
export function resetAllTemplateEditorValues() {
  Object.assign(activeTextStyles, { ...initialActiveTextStyles })
  Object.assign(templateEditorStore, { ...initialTemplateEditorStore })
}
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
// // 'https://docspawn-bucket-1.s3.eu-central-1.amazonaws.com/docspawn-bucket-1/5505cb55-58e7-4784-888a-4ed8bbf5b70e_template_canvas_pdf_2.pdf',

// export const templateEditorStore = reactive({
//   templateBackgroundUrl: 'https://docspawn-bucket-1.s3.eu-central-1.amazonaws.com/docspawn-bucket-1/96205cfa-09dc-46c9-bef5-aa9c2a9c868f_DS demo 1 - Delivery notice - template.pdf',
//   showOptionsBar: false,
//   ShowAddedFieldsinTemplateFields: false,
//   activeTemplateField: '',
//   activeFormField: '',
//   activeTimestampField: '',
//   activeImageOption: '',
//   activeDataField: '',
//   addedFields: [],
//   selectedAddedField: {},
//   fieldToAdd: {},
//   fabric: {},
//   canvas: {},
//   datasetData: { keys: {}, allEntries: [], selectedKeys: [] },
//   activePageForCanvas: 1,
//   totalPagesArray: [],
//   activeAdvancedPointer: false,
//   activeDisplayGuide: false,
//   activeDisplayGuideForAll: false,
//   anyObjectSelected: false,
//   showPreview: false,
//   watermarkImage: {},
//   templateToEdit: {},

// })
