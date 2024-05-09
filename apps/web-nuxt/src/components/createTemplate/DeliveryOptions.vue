<template>
  <div class=" mb-10">
    <!-- <p class="font-semibold text-surface-600 text-2xl mb-5">Delivery Options</p> -->

    <div class="flex flex-col">
      <!-- section 1  -->
      <p class="font-medium text-surface-600 text-lg mb-5 font-poppins">File management</p>
      <div class="flex sm:flex-col sm:space-y-3 md:space-y-0 md:flex-row md:space-x-12 w-full ">
        <!-- col 1 -->
        <div class="w-1/4">
          <p class="text-base text-surface-500 font-poppins">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus, odit. Officiis debitis modi eum. </p>
        </div>

        <!-- col 2 -->
        <div class="w-1/3">
          <p class="text-lg text-surface-500 font-poppins mb-2">File format</p>
          <div class="flex items-center mb-3">
            <Checkbox v-model="pdf" inputId="pdf" name="pdf" :value="pdf" :binary="true"/>
            <label for="pdf" class="ml-2 text-base text-surface-500 font-poppins"> PDF document </label>
          </div>

          <div class="flex items-center ">
            <Checkbox v-model="pdfxml" inputId="pdfxml" name="pdfxml" :value="pdfxml" :binary="true" @change="showToast"/>
            <label for="pdfxml" class="ml-2 text-base text-surface-500 flex font-poppins"> PDF + XML <TagComponent value="Business"/> </label>
          </div>
    
        </div>

        <!-- col 3 -->
        <div class="w-1/3">
          <p class="text-lg text-surface-500 font-poppins mb-2 ">File output</p>
          <div class="flex items-center mb-3">
            <Checkbox v-model="generatefile" inputId="generatefile" name="generatefile" value="generatefile" :binary="true" />
            <label for="generatefile" class="ml-2 text-base text-surface-500 font-poppins"> Generate 1 file per document </label>
          </div>

          <div class="flex items-center ">
            <Checkbox v-model="mergefile" inputId="mergefile" name="mergefile" value="mergefile" />
            <label for="mergefile" class="ml-2 text-base text-surface-500 flex font-poppins"> Merge all files in 1 document <TagComponent value="Business"/> </label>
          </div>
        </div>
      </div>

      <hr class="my-10"/>

       <!-- section 2  -->
       
       <p class="font-medium text-surface-600 text-lg mb-5 font-poppins">File options</p>
       <div class="flex sm:flex-col sm:space-y-3 md:space-y-0 md:flex-row md:space-x-12 w-full mb-5">
        <!-- col 1 -->
        <div class="w-1/4">
          <p class="text-base text-surface-500 font-poppins">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus, odit. Officiis debitis modi eum. </p>
        </div>

        <!-- col 2 -->
        <div class="w-1/3 flex flex-col flex-wrap">
          <p class="text-lg text-surface-500 font-poppins mb-2">Checking information</p>
          <div class="flex items-center mb-3">
            <Checkbox v-model="verfiction" inputId="verfiction" name="verfiction" value="verfiction" />
            <label for="verfiction" class="ml-2 text-base text-surface-500 font-poppins"> Dont force entries verification </label>
          </div>

          <div class="flex items-center ">
            <Checkbox v-model="forceverfiction" inputId="forceverfiction" name="forceverfiction" value="forceverfiction" />
            <label for="forceverfiction" class="ml-2 text-base text-surface-500 font-poppins">
             Force entries verification upon form filling
                <!-- <Badge value="?" class="ml-1" v-tooltip="'explanation'" ></Badge> -->
                <span class="inline-flex items-center gap-x-1 rounded-full bg-gray-200 px-1.5 py-0 text-sm font-medium text-gray-600 font-sans cursor-pointer" v-tooltip="'Explanation'" >
                  
                  ?
                </span>
                <TagComponent value="Business"/>
           
            </label>
            
          </div>
    
        </div>

        <!-- col 3 -->
        <div class="w-1/3">
          <p class="text-lg text-surface-500 font-poppins mb-2">Form</p>
          <div class="flex items-center mb-3">
            <Checkbox v-model="thirdparty" inputId="thirdparty" name="thirdparty" value="thirdparty" />
            <label for="thirdparty" class="ml-2 text-base text-surface-500 font-poppins"> Allow third party form filling  </label>
          </div>

          <div class="flex items-center ">
            <Checkbox v-model="addpages" inputId="addpages" name="addpages" value="addpages" />
            <label for="addpages" class="ml-2 text-base text-surface-500 font-poppins"> Add additional pages with photo attachments <TagComponent value="Business"/> </label>
          </div>
        </div>
      </div>

      <hr class="my-10"/>
       <!-- section 3  -->
       <p class="font-medium text-surface-600 text-lg mb-5 font-poppins">Recipients</p>
       <div class="flex sm:flex-col sm:space-y-3 md:space-y-0 md:flex-row md:space-x-12 w-full mb-5">
        <!-- col 1 -->
        <div class="w-1/4">
          <p class="text-base text-surface-500 font-poppins">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus, odit. Officiis debitis modi eum. </p>
        </div>

        <!-- col 2 -->
        <div class="w-1/3">
          <p class="text-lg text-surface-500 font-poppins mb-2">Email Delivery</p>
          <div class="flex items-center mb-3">
            <Checkbox v-model="tolinkedData" inputId="tolinkedData" name="tolinkedData" value="tolinkedData" />
            <label for="tolinkedData" class="ml-2 text-base text-surface-500 font-poppins"> Send to linked data </label>
          </div>

          <div class="flex items-center ">
            <Checkbox v-model="sendtoMultiple" inputId="sendtoMultiple" name="sendtoMultiple" value="sendtoMultiple" :binary="true" />
            <label for="sendtoMultiple" class="ml-2 text-base text-surface-500 flex font-poppins"> Send to multiple <TagComponent value="Business"/> </label>
          </div>
          <div v-if="sendtoMultiple" class="mt-3">
              <Chips v-model="selectedEmails" />
          </div>
        </div>

        <!-- col 3 -->
        <div class="w-1/3">
          <p class="text-lg text-surface-500 font-poppins mb-2 flex">Extranet <TagComponent value="Business"/></p>
          <div class="flex items-center mb-3">
            <Checkbox v-model="recipentExtranetAccount" inputId="recipentExtranetAccount" name="recipentExtranetAccount" value="recipentExtranetAccount" />
            <label for="recipentExtranetAccount" class="ml-2 text-base text-surface-500 font-poppins"> Create an extranet account </label>
          </div>

          <div class="flex items-center ">
            <Checkbox v-model="recipentExtranetAccount" disabled="" inputId="recipentExtranetAccount" name="recipentExtranetAccount" value="recipentExtranetAccount" />
            <label for="recipentExtranetAccount" class="ml-2 text-base text-surface-500 font-poppins"> Create extranet account  </label>
          </div>
        </div>
      </div>

      <hr class="my-10"/>

       <!-- section 4  -->
       <p class="font-medium text-surface-600 text-lg mb-5 flex font-poppins">Email Personalization <TagComponent value="Business"/> </p>
       <div class="flex sm:flex-col sm:space-y-3 md:space-y-0 md:flex-row md:space-x-12 w-full mb-5">
        <!-- col 1 -->
        <div class="w-1/4">
          <p class="text-base text-surface-500 font-poppins">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus, odit. Officiis debitis modi eum. </p>
        </div>

        <!-- col 2 -->
        <div class="w-1/3">
          
          <div class="flex items-center mb-3">
            <Checkbox v-model="emailPersonalization" inputId="emailPersonalization" name="emailPersonalization" value="emailPersonalization" />
            <label for="emailPersonalization" class="ml-2 text-base text-surface-500 font-poppins"> Email Personalization </label>
          </div>

          <div class="flex items-center ">
            <Checkbox v-model="extranetaccount" inputId="extranetaccount" name="extranetaccount" value="extranetaccount" />
            <label for="extranetaccount" class="ml-2 text-base text-surface-500 flex font-poppins"> Create extranet account </label>
          </div>
    
        </div>

      </div>
    </div>
    <Toast />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useToast } from "primevue/usetoast";
import TagComponent from "../shared/TagComponent.vue";

// for first section
const pdf = ref(true);
const pdfxml = ref(false);
const generatefile = ref(true);
const mergefile = ref(false);

// for second section
const verfiction = ref(false);
const forceverfiction = ref(false);
const thirdparty = ref(false);
const addpages = ref(false);

// for third section
const tolinkedData = ref(false);
const sendtoMultiple = ref(false)
const extranetaccount = ref(false)
const emailPersonalization = ref(false)

const selectedEmails = ref([]);

// watch changes in sendtoMultiple
watch(() => sendtoMultiple, (value) => {
  if (!value) {
    selectedEmails.value = [];
  }
  console.log(selectedEmails.value);
});

// watch changes in selectedEmails
watch(() => selectedEmails, (value) => {
  console.log(selectedEmails.value);
});
// for fourth section
const recipentExtranetAccount = ref(false)

const toast = useToast();

const showToast = () => {
  if (pdfxml.value) {
    toast.add({ severity: 'info', summary: 'Checkbox Selected', detail: 'You have selected PDF + XML.', life: 3000 });
  }
};

</script>

