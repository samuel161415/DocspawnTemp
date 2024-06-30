<template>
  <div class=" mb-10">
    <p class="font-semibold text-surface-600 text-2xl mb-5 flex text-center justify-center">
      Delivery options
    </p>

    <div class="flex flex-col">
      <!-- section 1  -->
      <p class="font-medium text-surface-600 text-lg mb-5 font-poppins">
        File management
      </p>
      <div class="flex sm:flex-col sm:space-y-3 md:space-y-0 md:flex-row md:space-x-12 w-full ">
        <!-- col 1 -->
        <div class="w-1/4">
          <p class="text-base text-surface-500 font-poppins">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus, odit. Officiis debitis modi eum.
          </p>
        </div>

        <!-- col 2 -->
        <div class="w-1/3">
          <p class="text-lg text-surface-500 font-poppins mb-2">
            File format
          </p>
          <div class="flex items-center mb-3">
            <Checkbox v-model="pdf" input-id="pdf" name="pdf" :value="pdf" :binary="true" />
            <label for="pdf" class="ml-2 text-base text-surface-500 font-poppins"> PDF document </label>
          </div>

          <div class="flex items-center ">
            <Checkbox v-model="pdfxml" input-id="pdfxml" name="pdfxml" :value="pdfxml" :binary="true" @change="showToast" />
            <label for="pdfxml" class="ml-2 text-base text-surface-500 flex font-poppins"> PDF + XML <TagComponent value="Business" /> </label>
          </div>
        </div>

        <!-- col 3 -->
        <div class="w-1/3">
          <p class="text-lg text-surface-500 font-poppins mb-2 ">
            File output
          </p>
          <div class="flex items-center mb-3">
            <Checkbox v-model="generatefile" input-id="generatefile" name="generatefile" value="generatefile" :binary="true" />
            <label for="generatefile" class="ml-2 text-base text-surface-500 font-poppins"> Generate 1 file per document </label>
          </div>

          <div class="flex items-center ">
            <Checkbox v-model="mergefile" input-id="mergefile" name="mergefile" value="mergefile" :binary="true" />
            <label for="mergefile" class="ml-2 text-base text-surface-500 flex font-poppins"> Merge all files in 1 document <TagComponent value="Business" /> </label>
          </div>
        </div>
      </div>

      <hr class="my-10" />

      <!-- section 2  -->
      <p class="font-medium text-surface-600 text-lg mb-5 font-poppins">
        File options
      </p>
      <div class="flex sm:flex-col sm:space-y-3 md:space-y-0 md:flex-row md:space-x-12 w-full mb-5">
        <!-- col 1 -->
        <div class="w-1/4">
          <p class="text-base text-surface-500 font-poppins">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus, odit. Officiis debitis modi eum.
          </p>
        </div>

        <!-- col 2 -->
        <div class="w-1/3 flex flex-col flex-wrap">
          <p class="text-lg text-surface-500 font-poppins mb-2">
            Checking information
          </p>
          <div class="flex items-center mb-3">
            <Checkbox v-model="verfication" input-id="verfication" name="verfication" value="verfication" :binary="true" />
            <label for="verfication" class="ml-2 text-base text-surface-500 font-poppins"> Dont force entries verification </label>
          </div>

          <div class="flex items-center ">
            <Checkbox v-model="forceverfication" input-id="forceverfication" name="forceverfication" value="forceverfication" :binary="true" />
            <label for="forceverfication" class="ml-2 text-base text-surface-500 font-poppins">
              Force entries verification upon form filling
              <span v-tooltip="'Explanation'" class="inline-flex items-center gap-x-1 rounded-full bg-gray-200 px-1.5 py-0 text-sm font-medium text-gray-600 font-sans cursor-pointer">
                ?
              </span>
              <TagComponent value="Business" />

            </label>
          </div>
        </div>

        <!-- col 3 -->
        <div class="w-1/3">
          <p class="text-lg text-surface-500 font-poppins mb-2">
            Form
          </p>
          <div class="flex items-center mb-3">
            <Checkbox v-model="thirdparty" input-id="thirdparty" name="thirdparty" value="thirdparty" :boolean="true" />
            <label for="thirdparty" class="ml-2 text-base text-surface-500 font-poppins"> Allow third party form filling  </label>
          </div>

          <div class="flex items-center ">
            <Checkbox v-model="addpages" disabled input-id="addpages" name="addpages" value="addpages" />
            <label for="addpages" class="ml-2 text-base text-surface-500 font-poppins"> Add additional pages with photo attachments <TagComponent value="Business" /> </label>
          </div>
        </div>
      </div>

      <hr class="my-10" />

      <!-- section 3  -->
      <p class="font-medium text-surface-600 text-lg mb-5 font-poppins">
        Recipients
      </p>
      <div class="flex sm:flex-col sm:space-y-3 md:space-y-0 md:flex-row md:space-x-12 w-full mb-5">
        <!-- col 1 -->
        <div class="w-1/4">
          <p class="text-base text-surface-500 font-poppins">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus, odit. Officiis debitis modi eum.
          </p>
        </div>

        <!-- col 2 -->
        <div class="w-1/3 flex flex-col flex-wrap">
          <p class="text-lg text-surface-500 font-poppins mb-2">
            Email delivery
          </p>
          <div class="flex">
            <div class="flex items-center mb-3">
              <Checkbox v-model="toLinkedData" disabled input-id="toLinkedData" name="toLinkedData" value="toLinkedData" :binary="true" />
              <label for="toLinkedData" class="ml-2 text-base text-surface-500 font-poppins"> Send to linked data  </label>
            </div>
            <Button v-if="toLinkedData" text label="Edit email template" class="-mt-3" @click="handleOpenEditModal" />
          </div>

          <div class="flex items-center ">
            <Checkbox v-model="sendToMultiple" input-id="sendToMultiple" name="sendToMultiple" value="sendToMultiple" :binary="true" />
            <label for="sendToMultiple" class="ml-2 text-base text-surface-500 flex font-poppins">
              Send to multiple
              <TagComponent value="Business" />
            </label>
          </div>
          <div v-if="sendToMultiple" class="mt-3 ml-8 w-2/3">
            <Chips v-model="selectedEmails" />
            <p class="font-poppins text-sm text-surface-400 mt-2">
              Write atleast one email to recieve generated documents
            </p>
          </div>
        </div>

        <!-- col 3 -->
        <div class="w-1/3">
          <p class="text-lg text-surface-500 font-poppins mb-2">
            Extranet
          </p>
          <div class="flex items-center mb-3">
            <Checkbox disabled input-id="thirdparty" name="thirdparty" value="thirdparty" />
            <label for="thirdparty" class="ml-2 text-base text-surface-500 font-poppins"> Create extranet account  </label>
          </div>

          <div class="flex items-center ">
            <Checkbox disabled input-id="addpages" name="addpages" value="addpages" />
            <label for="addpages" class="ml-2 text-base text-surface-500 font-poppins"> Create an extranet account </label>
          </div>
        </div>
      </div>

      <hr class="my-10" />

      <!-- section 4 -->
      <div class=" flex">
        <p class="font-medium text-surface-600 text-lg mb-5 font-poppins">
          Email Personalization
        </p>
        <TagComponent value="Business" />
      </div>
      <div class="flex sm:flex-col sm:space-y-3 md:space-y-0 md:flex-row md:space-x-12 w-full mb-5">
        <!-- col 1 -->
        <div class="w-1/4">
          <p class="text-base text-surface-500 font-poppins">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus, odit. Officiis debitis modi eum.
          </p>
        </div>

        <!-- col 2 -->
        <div class="w-1/3 flex flex-col flex-wrap">
          <p class="text-lg text-surface-500 font-poppins mb-2">
            {{ " " }}
          </p>
          <div class="flex">
            <div class="flex items-center mb-3">
              <Checkbox v-model="emailPersonalization" disabled input-id="emailPersonalization" name="emailPersonalization" value="emailPersonalization":binary="true" />
              <label for="emailPersonalization" class="ml-2 text-base text-surface-500 font-poppins">Email Personalization </label>
            </div>
          </div>

          <div class="flex items-center ">
            <Checkbox v-model="extranetaccount" disabled input-id="extranetaccount" name="extranetaccount" value="extranetaccount" :binary="true" />
            <label for="extranetaccount" class="ml-2 text-base text-surface-500 flex font-poppins">
              Create extranet account
            </label>
          </div>
        </div>

        <!-- col 3 -->
        <div class="w-1/3">
        </div>
      </div>
    </div>
    <EditEmailTemplateModal v-model:visible="openEditModal" />
    <Toast />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useToast } from 'primevue/usetoast'
import TagComponent from '../shared/TagComponent.vue'
import EditEmailTemplateModal from './EditEmailTemplateModal.vue'
import { templateDeliveryOptions, templateGeneralInformation } from '~/composables/useTemplateCreationData'
import { templateEditorStore } from '@/composables/useTemplateEditorData'

// for first section
const pdf = ref(true)
const pdfxml = ref(false)
const generatefile = ref(true)
const mergefile = ref(false)

onMounted(() => {
  if (templateDeliveryOptions.fileFormat === 'pdf') {
    pdf.value = true
    pdfxml.value = false
  }
  else {
    pdf.value = false
    pdfxml.value = true
  }
})

watch([pdf], () => {
  if (pdf.value === true) {
    pdfxml.value = false
    templateDeliveryOptions.fileFormat = 'pdf'
  }
})
watch([pdfxml], () => {
  if (pdfxml.value === true) {
    pdf.value = false
    templateDeliveryOptions.fileFormat = 'pdfxml'
  }
})
watch([mergefile], () => {
  if (mergefile.value === true) {
    generatefile.value = false
    templateDeliveryOptions.fileFormat = 'mergefile'
  }
})
watch([generatefile], () => {
  if (generatefile.value === true) {
    mergefile.value = false
    templateDeliveryOptions.fileFormat = 'generatefile'
  }
})

// for second section
const verfication = ref(true)
const forceverfication = ref(false)
const thirdparty = ref(false)
const addpages = ref(false)

watch([forceverfication], () => {
  if (forceverfication.value === true) {
    verfication.value = false
    templateDeliveryOptions.forceEntriesVerification = true
  }
})
watch([verfication], () => {
  if (verfication.value === true) {
    forceverfication.value = false
    templateDeliveryOptions.forceEntriesVerification = false
  }
})

watch(thirdparty, () => {
  if (thirdparty.value === true)
    templateDeliveryOptions.thirdPartyFormFilling = true
  else
    templateDeliveryOptions.thirdPartyFormFilling = false
})

// for third section
const toLinkedData = ref(false)
const sendToMultiple = ref(true)
const extranetaccount = ref(false)
const emailPersonalization = ref(false)
const selectedEmails = ref()
const openEditModal = ref(false)
onMounted(() => {
  if (templateEditorStore?.templateToEdit?.id)
    selectedEmails.value = templateEditorStore?.templateToEdit?.delivery_options?.selectedEmails
})
watch(selectedEmails, (newVal) => {
  templateDeliveryOptions.selectedEmails = newVal
})

// for fourth section
const recipentExtranetAccount = ref(false)

const toast = useToast()

function showToast() {
  if (pdfxml.value)
    toast.add({ severity: 'info', summary: 'Checkbox Selected', detail: 'You have selected PDF + XML.', life: 3000 })
}

function handleOpenEditModal() {
  openEditModal.value = true
}
</script>
