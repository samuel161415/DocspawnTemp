// store.js
import { reactive } from 'vue'

export const templateEditorStore = reactive({
  templateBackgroundUrl: 'https://docspawn-bucket-1.s3.eu-central-1.amazonaws.com/docspawn-bucket-1/5505cb55-58e7-4784-888a-4ed8bbf5b70e_template_canvas_pdf_2.pdf',
  showOptionsBar: false,
  activeTemplateField: '',
  activeFormField: '',
  activeTimestampField: '',
  activeImageOption: '',
  activeDataField: '',
  addedFields: [],
  selectedAddedField: {},
  fabric: {},
  templateCanvas: {},
  datasetData: { keys: {}, allEntries: [] },
  activePageForCanvas: 1,
  totalPagesArray: [],
  activeAdvancedPointer: false,
  activeDisplayGuide: false,

})

// sample pdf
// https://docspawn-bucket-1.s3.eu-central-1.amazonaws.com/docspawn-bucket-1/fb48e439-497e-45aa-90fd-fbee7b7f33f1_Bon de livraison.pdf
// https://docspawn-bucket-1.s3.eu-central-1.amazonaws.com/docspawn-bucket-1/5505cb55-58e7-4784-888a-4ed8bbf5b70e_template_canvas_pdf_2.pdf
// https://docspawn-bucket-1.s3.eu-central-1.amazonaws.com/docspawn-bucket-1/bf4768eb-59f6-40b2-9ef8-fde65a76ea4b_docapwn multipage sample pdf.pdf
