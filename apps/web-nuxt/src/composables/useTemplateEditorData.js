import { reactive } from 'vue'

export const activeTextStyles = reactive({
  fontFamily: 'Arial',
  fontSize: 32,
  textAlign: 'left',
  fill: '#000000',
  fontStyle: 'normal',
  fontWeight: 300,
  underline: false,
  charSpacing: 0,

})

export const templateEditorStore = reactive({
  templateBackgroundUrl: 'https://docspawn-bucket-1.s3.eu-central-1.amazonaws.com/docspawn-bucket-1/5505cb55-58e7-4784-888a-4ed8bbf5b70e_template_canvas_pdf_2.pdf',
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

})
