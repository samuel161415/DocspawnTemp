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
  accountType: '',
  datasetStartAtLine: 1,
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
  currentPreviewNo: '',
  watermarkImage: {},
  watermarkDisabled: false,
  templateToEdit: {},
  templateToGenerateDocs: {},
  lastScaledTextOptions: { x: 1, y: 1 },
  expertEditorHtmlContent: null,
  expertEditorWidth: 0,
  expertEditorHeight: 0,
  expertEditor: null,
  editorContainers: [],
  editorContainerRefs: {},
  fabricObjectRefs: {},
  canvasScaleFactors: { x: 1, y: 1 },
  editor_fields_data: {},
  showExpertEditor: true,
}
// Create reactive objects
export const activeTextStyles = reactive({ ...initialActiveTextStyles })
export const templateEditorStore = reactive({ ...initialTemplateEditorStore })
// Function to reset all values to their initial state
export function resetAllTemplateEditorValues() {
  Object.assign(activeTextStyles, { ...initialActiveTextStyles })
  Object.assign(templateEditorStore, { ...initialTemplateEditorStore })
}
