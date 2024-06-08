<template>
  <ConfirmPopup group="confirmFieldDeletion" />
  <div
    class=" flex-1 h-full overflow-auto  pr-1 "
  >
    <div class="w-full">
      <div v-if="templateEditorStore.ShowAddedFieldsinTemplateFields === true" icon="pi pi-angle-left" class="w-full mb-6 justify-left gap-2 h-[62px] text-lg rounded-md text-primary-500 cursor-pointer bg-primary-50   flex items-center justify-center gap-2  transition-all ease-linear duration-75 hover:border hover:border-primaryBlue " @click="templateEditorStore.ShowAddedFieldsinTemplateFields = false">
        <i class="pi pi-plus"></i>
        <p class="font-poppins  ">
          Add new field
        </p>
      </div>
      <div v-else icon="pi pi-angle-left" class="w-full mb-6 justify-left gap-2 h-[62px] rounded-md text-lg text-primary-500 cursor-pointer bg-primary-50   flex items-center justify-center gap-2  transition-all ease-linear duration-75 hover:border hover:border-primaryBlue" @click="templateEditorStore.ShowAddedFieldsinTemplateFields = true">
        <i class="pi pi-angle-left"></i>
        <p class="font-poppins ">
          Fields list
        </p>
      </div>

      <template v-for="(field, index) in templateEditorStore.addedFields">
        <div v-if="templateEditorStore.ShowAddedFieldsinTemplateFields === true" :key="index" class="px-5 h-[62px] flex items-center mb-3 gap-2 rounded-lg shadow-sm w-full border font-poppins text-surface-500 cursor-pointer transition-transform duration-300  hover:bg-primary-50" :class="{ 'border-primaryBlue bg-primary-50': templateEditorStore?.selectedAddedField?.hash === field?.hash, 'border-surface-100 bg-surface-50': templateEditorStore?.selectedAddedField?.hash !== field?.hash }">
          <div class=" h-full w-full py-2 cursor-pointer overflow-hidden" @click="templateEditorStore?.selectedAddedField?.hash !== field?.hash && selectAddedField(field)">
            <p v-if="field.name === 'Lorem ipsum' && field?.fieldType !== 'Static text'" class="font-poppins text-red-400 text-lg mt-1">
              Select a data field
            </p>
            <p v-else-if="field.name === 'Add text' && field?.fieldType === 'Static text'" class="font-poppins text-red-400 text-lg mt-1 ">
              Add text
            </p>
            <p v-else class="font-poppins text-surface-600 text-lg mt-1 overflow-ellipsis max-w-36 whitespace-nowrap overflow-hidden ">
              {{ field.name }}
            </p>
            <p class="font-poppins text-surface-600 text-sm">
              {{ field?.fieldType }} - <span class="text-primaryBlue">p.{{ field.page }}</span>
            </p>
          </div>

          <div
            class="flex flex-row gap-4   "
          >
            <Button v-tooltip.top="'Duplicate'" text class="text-lg text-surface-600  w-max h-max " @click="duplicateField(field)">
              <font-awesome-icon
                icon="fa-light fa-clone" size="lg"
              />
            </Button>
            <Button v-tooltip.top="'Delete'" text class="text-lg text-surface-600  w-max h-max" @click="fieldToDelete = field;confirm2($event)">
              <font-awesome-icon icon="fa-light fa-trash" size="lg" />
            </Button>
          </div>
        </div>
      </template>

      <div v-if="templateEditorStore.ShowAddedFieldsinTemplateFields === false" class="transition-all duration-200 ease-linear grid grid-cols-1 gap-2 w-full h-max flex-none">
        <div class="px-5 h-[62px] flex items-center gap-2 rounded-lg shadow-sm w-full border font-poppins text-surface-500 cursor-pointer transition-transform duration-300  hover:bg-primary-50 border-surface-100 bg-surface-50" @click="showDataFields ? showDataFields = false : showDataFields = true">
          <p class="font-poppins text-surface-600 text-lg">
            Data fields
          </p>
          <font-awesome-icon icon="fa-solid fa-caret-right transition-all duration-300" size="lg" :class="{ 'rotate-90': showDataFields }" />
        </div>
        <div v-if="showDataFields" class="flex flex-col gap-2">
          <div class="px-5 h-[62px] flex items-center pl-14 gap-2 rounded-lg shadow-sm w-full border font-poppins text-surface-500 cursor-pointer transition-transform duration-300  hover:bg-primary-50" :class="{ 'border-primaryBlue bg-primary-50': templateEditorStore.activeTemplateField === 'Data field', 'border-surface-100 bg-surface-50': templateEditorStore.activeTemplateField !== 'Data field' }" @click="selectField('Data field')">
            <!-- <font-awesome-icon icon="fa-light fa-arrow-turn-down-right" size="lg" class="text-surface-400 text-xs" /> -->
            <font-awesome-icon icon="fa-light fa-file-spreadsheet" size="lg" style="--fa-primary-color: #009ee2; --fa-secondary-color: #009ee299; --fa-secondary-opacity: 0.6;" />
            <p class="font-poppins text-surface-600 text-lg">
              Data field
            </p>
          </div>
          <div class="px-5 h-[62px] flex items-center pl-14 gap-2 rounded-lg shadow-sm w-full border font-poppins text-surface-500 cursor-pointer transition-transform duration-300  hover:bg-primary-50" :class="{ 'border-primaryBlue bg-primary-50': templateEditorStore.activeTemplateField === 'Dataset image', 'border-surface-100 bg-surface-50': templateEditorStore.activeTemplateField !== 'Dataset image' }" @click="selectField('Dataset image')">
            <!-- <font-awesome-icon icon="fa-light fa-arrow-turn-down-right" size="lg" class="text-surface-400 text-xs" /> -->
            <font-awesome-icon icon="fa-light fa-image" size="lg" style="--fa-primary-color: #009ee2; --fa-secondary-color: #009ee299; --fa-secondary-opacity: 0.6;" />
            <p class="font-poppins text-surface-600 text-lg">
              Dataset image
            </p>
          </div>
        </div>
        <div class="px-5 h-[62px] flex  items-center gap-2 rounded-lg shadow-sm w-full border font-poppins text-surface-500 cursor-pointer transition-transform duration-300  hover:bg-primary-50 border-surface-100 bg-surface-50" @click="showStaticFields ? showStaticFields = false : showStaticFields = true">
          <!-- <font-awesome-icon icon="fa-light fa-file-spreadsheet" size="lg" style="--fa-primary-color: #009ee2; --fa-secondary-color: #009ee299; --fa-secondary-opacity: 0.6;" /> -->
          <p class="font-poppins text-surface-600 text-lg">
            Static fields
          </p>
          <font-awesome-icon icon="fa-solid fa-caret-right transition-all duration-300" size="lg" :class="{ 'rotate-90': showStaticFields }" />
        </div>
        <div v-if="showStaticFields" class="flex flex-col gap-2">
          <div class="px-5 pl-14 h-[62px] flex items-center gap-2 rounded-lg shadow-sm w-full border font-poppins text-surface-500 cursor-pointer transition-transform duration-300  hover:bg-primary-50  " :class="{ 'border-primaryBlue bg-primary-50': templateEditorStore.activeTemplateField === 'Static text', 'border-surface-100 bg-surface-50': templateEditorStore.activeTemplateField !== 'Static text' }" @click="selectField('Static text')">
            <!-- <font-awesome-icon icon="fa-light fa-arrow-turn-down-right" size="lg" class="text-surface-400 text-xs" /> -->
            <font-awesome-icon icon="fa-light   fa-text" size="lg" style="--fa-primary-color: #009ee2; --fa-secondary-color: #009ee2cc; --fa-secondary-opacity: 0.6;" />
            <p class="font-poppins text-surface-600 text-lg">
              Text
            </p>
          </div>
          <div class="px-5 pl-14 h-[62px] flex items-center gap-2 rounded-lg shadow-sm w-full border font-poppins text-surface-500 cursor-pointer transition-transform duration-300  hover:bg-primary-50" :class="{ 'border-primaryBlue bg-primary-50': templateEditorStore.activeTemplateField === 'Fixed image', 'border-surface-100 bg-surface-50': templateEditorStore.activeTemplateField !== 'Fixed image' }" @click="selectField('Fixed image')">
            <!-- <font-awesome-icon icon="fa-light fa-arrow-turn-down-right" size="lg" class="text-surface-400 text-xs" /> -->
            <font-awesome-icon icon="fa-light fa-image" size="lg" style="--fa-primary-color: #009ee2; --fa-secondary-color: #009ee299; --fa-secondary-opacity: 0.6;" />
            <p class="font-poppins text-surface-600 text-lg">
              Image
            </p>
          </div>
          <div class="px-5 pl-14 h-[62px] flex items-center gap-2 rounded-lg shadow-sm w-full border font-poppins text-surface-500 cursor-pointer transition-transform duration-300  hover:bg-primary-50 border-surface-100 bg-surface-50" @click="showTimestamp ? showTimestamp = false : showTimestamp = true">
            <!-- <font-awesome-icon icon="fa-light fa-arrow-turn-down-right" size="lg" class="text-surface-400 text-xs" /> -->
            <font-awesome-icon icon="fa-light fa-calendar-clock" size="lg" style="--fa-primary-color: #009ee2; --fa-secondary-color: #009ee299; --fa-secondary-opacity: 0.6;" />
            <p class="font-poppins text-surface-600 text-lg">
              Timestamp
            </p>

            <font-awesome-icon icon="fa-solid fa-caret-right transition-all duration-300" size="lg" :class="{ 'rotate-90': showTimestamp }" />
          </div>
          <div v-if="showTimestamp" class="flex flex-col gap-2">
            <div class="px-5 pl-24 h-[62px] flex items-center gap-2 rounded-lg shadow-sm w-full border font-poppins text-surface-500 cursor-pointer transition-transform duration-300  hover:bg-primary-50 " :class="{ 'border-primaryBlue bg-primary-50': templateEditorStore.activeTemplateField === 'Static date', 'border-surface-100 bg-surface-50': templateEditorStore.activeTemplateField !== 'Static date' }" @click="selectField('Static date')">
              <!-- <font-awesome-icon icon="fa-light fa-arrow-turn-down-right" size="lg" class="text-surface-400 text-xs" /> -->
              <font-awesome-icon icon="fa-light fa-calendar" size="lg" style="--fa-primary-color: #009ee2; --fa-secondary-color: #009ee299; --fa-secondary-opacity: 0.6;" />
              <p class="font-poppins text-surface-600 text-lg">
                Date
              </p>
            </div>
            <div class="px-5 pl-24 h-[62px] flex items-center gap-2 rounded-lg shadow-sm w-full border font-poppins text-surface-500 cursor-pointer transition-transform duration-300  hover:bg-primary-50 " :class="{ 'border-primaryBlue bg-primary-50': templateEditorStore.activeTemplateField === 'Static time', 'border-surface-100 bg-surface-50': templateEditorStore.activeTemplateField !== 'Static time' }" @click="selectField('Static time')">
              <!-- <font-awesome-icon icon="fa-light fa-arrow-turn-down-right" size="lg" class="text-surface-400 text-xs" /> -->
              <font-awesome-icon icon="fa-light fa-clock" size="lg" style="--fa-primary-color: #009ee2; --fa-secondary-color: #009ee299; --fa-secondary-opacity: 0.6;" />
              <p class="font-poppins text-surface-600 text-lg">
                Time
              </p>
            </div>
          </div>
        </div>

        <div class="px-5 h-[62px] flex items-center gap-2 rounded-lg shadow-sm w-full border font-poppins text-surface-500 cursor-pointer transition-transform duration-300  hover:bg-primary-50 border-surface-100 bg-surface-50" @click="showFormFields ? showFormFields = false : showFormFields = true">
          <!-- <font-awesome-icon icon="fa-light fa-file-spreadsheet" size="lg" style="--fa-primary-color: #009ee2; --fa-secondary-color: #009ee299; --fa-secondary-opacity: 0.6;" /> -->
          <p class="font-poppins text-surface-600 text-lg">
            Form fields
          </p>
          <font-awesome-icon icon="fa-solid fa-caret-right transition-all duration-300" size="lg" :class="{ 'rotate-90': showFormFields }" />
        </div>
        <div v-if="showFormFields" class="flex flex-col gap-2">
          <div class="px-5 pl-14 h-[62px] flex items-center gap-2 rounded-lg shadow-sm w-full border font-poppins text-surface-500 cursor-pointer transition-transform duration-300  hover:bg-primary-50  " :class="{ 'border-primaryBlue bg-primary-50': templateEditorStore.activeTemplateField === 'Static text', 'border-surface-100 bg-surface-50': templateEditorStore.activeTemplateField !== 'Static text' }" @click="selectField('Static text')">
            <!-- <font-awesome-icon icon="fa-light fa-arrow-turn-down-right" size="lg" class="text-surface-400 text-xs" /> -->
            <font-awesome-icon icon="fa-light   fa-text" size="lg" style="--fa-primary-color: #009ee2; --fa-secondary-color: #009ee2cc; --fa-secondary-opacity: 0.6;" />
            <p class="font-poppins text-surface-600 text-lg">
              Text
            </p>
          </div>
          <div class="px-5 pl-14 h-[62px] flex items-center gap-2 rounded-lg shadow-sm w-full border font-poppins text-surface-500 cursor-pointer transition-transform duration-300  hover:bg-primary-50  " :class="{ 'border-primaryBlue bg-primary-50': templateEditorStore.activeTemplateField === 'Static text', 'border-surface-100 bg-surface-50': templateEditorStore.activeTemplateField !== 'Static text' }" @click="selectField('Static text')">
            <!-- <font-awesome-icon icon="fa-light fa-arrow-turn-down-right" size="lg" class="text-surface-400 text-xs" /> -->
            <font-awesome-icon icon="fa-light   fa-square-1" size="lg" style="--fa-primary-color: #009ee2; --fa-secondary-color: #009ee2cc; --fa-secondary-opacity: 0.6;" />
            <p class="font-poppins text-surface-600 text-lg">
              Number
            </p>
          </div>
          <div class="px-5 pl-14 h-[62px] flex items-center gap-2 rounded-lg shadow-sm w-full border font-poppins text-surface-500 cursor-pointer transition-transform duration-300  hover:bg-primary-50" :class="{ 'border-primaryBlue bg-primary-50': templateEditorStore.activeTemplateField === 'Fixed image', 'border-surface-100 bg-surface-50': templateEditorStore.activeTemplateField !== 'Fixed image' }" @click="selectField('Fixed image')">
            <!-- <font-awesome-icon icon="fa-light fa-arrow-turn-down-right" size="lg" class="text-surface-400 text-xs" /> -->
            <font-awesome-icon icon="fa-light fa-image" size="lg" style="--fa-primary-color: #009ee2; --fa-secondary-color: #009ee299; --fa-secondary-opacity: 0.6;" />
            <p class="font-poppins text-surface-600 text-lg">
              Image
            </p>
          </div>
          <div class="px-5 pl-14 h-[62px] flex items-center gap-2 rounded-lg shadow-sm w-full border font-poppins text-surface-500 cursor-pointer transition-transform duration-300  hover:bg-primary-50 border-surface-100 bg-surface-50" @click="showTimestamp ? showTimestamp = false : showTimestamp = true">
            <!-- <font-awesome-icon icon="fa-light fa-arrow-turn-down-right" size="lg" class="text-surface-400 text-xs" /> -->
            <font-awesome-icon icon="fa-light fa-calendar-clock" size="lg" style="--fa-primary-color: #009ee2; --fa-secondary-color: #009ee299; --fa-secondary-opacity: 0.6;" />
            <p class="font-poppins text-surface-600 text-lg">
              Timestamp
            </p>
            <font-awesome-icon icon="fa-solid fa-caret-right transition-all duration-300" size="lg" :class="{ 'rotate-90': showTimestamp }" />
          </div>
          <div v-if="showTimestamp" class="flex flex-col gap-2">
            <div class="px-5 pl-24 h-[62px] flex items-center gap-2 rounded-lg shadow-sm w-full border font-poppins text-surface-500 cursor-pointer transition-transform duration-300  hover:bg-primary-50 border-surface-100 bg-surface-50" @click="selectField('Static date')">
              <!-- <font-awesome-icon icon="fa-light fa-arrow-turn-down-right" size="lg" class="text-surface-400 text-xs" /> -->
              <font-awesome-icon icon="fa-light fa-calendar" size="lg" style="--fa-primary-color: #009ee2; --fa-secondary-color: #009ee299; --fa-secondary-opacity: 0.6;" />
              <p class="font-poppins text-surface-600 text-lg">
                Date
              </p>
            </div>
            <div class="px-5 pl-24 h-[62px] flex items-center gap-2 rounded-lg shadow-sm w-full border font-poppins text-surface-500 cursor-pointer transition-transform duration-300  hover:bg-primary-50 border-surface-100 bg-surface-50" @click="selectField('Static time')">
              <!-- <font-awesome-icon icon="fa-light fa-arrow-turn-down-right" size="lg" class="text-surface-400 text-xs" /> -->
              <font-awesome-icon icon="fa-light fa-clock" size="lg" style="--fa-primary-color: #009ee2; --fa-secondary-color: #009ee299; --fa-secondary-opacity: 0.6;" />
              <p class="font-poppins text-surface-600 text-lg">
                Time
              </p>
            </div>
          </div>
          <div class="px-5 pl-14 h-[62px] flex items-center gap-2 rounded-lg shadow-sm w-full border font-poppins text-surface-500 cursor-pointer transition-transform duration-300  hover:bg-primary-50 " :class="{ 'border-primaryBlue bg-primary-50': templateEditorStore.activeTemplateField === 'checkbox', 'border-surface-100 bg-surface-50': templateEditorStore.activeTemplateField !== 'checkbox' }" @click="selectField('checkbox')">
            <!-- <font-awesome-icon icon="fa-light fa-arrow-turn-down-right" size="lg" class="text-surface-400 text-xs" /> -->
            <font-awesome-icon icon="fa-light fa-square-check" size="lg" style="--fa-primary-color: #009ee2; --fa-secondary-color: #009ee299; --fa-secondary-opacity: 0.6;" />
            <p class="font-poppins text-surface-600 text-lg">
              Checkbox
            </p>
          </div>
          <div class="px-5 pl-14 h-[62px] flex items-center gap-2 rounded-lg shadow-sm w-full border font-poppins text-surface-500 cursor-pointer transition-transform duration-300  hover:bg-primary-50 " :class="{ 'border-primaryBlue bg-primary-50': templateEditorStore.activeTemplateField === 'radio', 'border-surface-100 bg-surface-50': templateEditorStore.activeTemplateField !== 'radio' }" @click="selectField('radio')">
            <!-- <font-awesome-icon icon="fa-light fa-arrow-turn-down-right" size="lg" class="text-surface-400 text-xs" /> -->
            <font-awesome-icon icon="fa-light fa-circle-dot" size="lg" style="--fa-primary-color: #009ee2; --fa-secondary-color: #009ee299; --fa-secondary-opacity: 0.6;" />
            <p class="font-poppins text-surface-600 text-lg">
              Radio
            </p>
          </div>
          <div class="px-5 pl-14 h-[62px] flex items-center gap-2 rounded-lg shadow-sm w-full border font-poppins text-surface-500 cursor-pointer transition-transform duration-300  hover:bg-primary-50  " :class="{ 'border-primaryBlue bg-primary-50': templateEditorStore.activeTemplateField === 'dropdown', 'border-surface-100 bg-surface-50': templateEditorStore.activeTemplateField !== 'dropdown' }" @click="selectField('dropdown')">
            <!-- <font-awesome-icon icon="fa-light fa-arrow-turn-down-right" size="lg" class="text-surface-400 text-xs" /> -->
            <font-awesome-icon icon="fa-light fa-square-caret-down" size="lg" style="--fa-primary-color: #009ee2; --fa-secondary-color: #009ee299; --fa-secondary-opacity: 0.6;" />
            <p class="font-poppins text-surface-600 text-lg">
              Dropdown
            </p>
          </div>
          <div class="px-5 pl-14 h-[62px] flex items-center gap-2 rounded-lg shadow-sm w-full border font-poppins text-surface-500 cursor-pointer transition-transform duration-300  hover:bg-primary-50  " :class="{ 'border-primaryBlue bg-primary-50': templateEditorStore.activeTemplateField === 'signature', 'border-surface-100 bg-surface-50': templateEditorStore.activeTemplateField !== 'signature' }" @click="selectField('signature')">
            <!-- <font-awesome-icon icon="fa-light fa-arrow-turn-down-right" size="lg" class="text-surface-400 text-xs" /> -->
            <font-awesome-icon icon="fa-light fa-file-signature" size="lg" style="--fa-primary-color: #009ee2; --fa-secondary-color: #009ee299; --fa-secondary-opacity: 0.6;" />
            <p class="font-poppins text-surface-600 text-lg">
              Signature
            </p>
          </div>
        </div>

        <!-- <div v-if="showFormFields" class="flex flex-col gap-2">
          <div class="bg-blue-50 p-3 cursor-pointer rounded-md text-lg text-gray-600 ml-5" @click="selectField('form-field', 'text')">
            Text
          </div>
          <div class="bg-blue-50 p-3 cursor-pointer rounded-md text-lg text-gray-600 ml-5" @click="selectField('form-field', 'multiline-text')">
            Multiline-text
          </div>
          <div class="bg-blue-50 p-3 cursor-pointer rounded-md text-lg text-gray-600 ml-5" @click="selectField('form-field', 'number')">
            Number
          </div>
          <div class="bg-blue-50 p-3 cursor-pointer rounded-md text-lg text-gray-600 ml-5" @click="selectField('form-field', 'signature')">
            Signature
          </div>
          <div class="bg-blue-50 p-3 cursor-pointer rounded-md text-lg text-gray-600 ml-5" @click="selectField('form-field', 'checkbox')">
            Checkbox
          </div>
          <div class="bg-blue-50 p-3 cursor-pointer rounded-md text-lg text-gray-600 ml-5" @click="selectField('form-field', 'date')">
            Date
          </div>
          <div class="bg-blue-50 p-3 cursor-pointer rounded-md text-lg text-gray-600 ml-5" @click="selectField('form-field', 'time')">
            Time
          </div>
          <div class="bg-blue-50 p-3 cursor-pointer rounded-md text-lg text-gray-600 ml-5" @click="selectField('form-field', 'image')">
            Image
          </div>
          <div class="bg-blue-50 p-3 cursor-pointer rounded-md text-lg text-gray-600 ml-5" @click="selectField('form-field', 'list')">
            List
          </div>
        </div>
        <div
          class="px-5 h-[62px] flex items-center gap-2 rounded-lg shadow-sm w-full border font-poppins text-surface-500 cursor-pointer transition-transform duration-300  hover:bg-primary-50" :class="{ 'border-primaryBlue bg-primary-50': templateEditorStore.activeTemplateField === 'Data field', 'border-surface-100 bg-surface-50': templateEditorStore.activeTemplateField !== 'Data field' }" @click="selectField('Data field')"
        >
          <font-awesome-icon icon="fa-light fa-file-spreadsheet" size="lg" style="--fa-primary-color: #009ee2; --fa-secondary-color: #009ee299; --fa-secondary-opacity: 0.6;" />

          <p class="font-poppins text-surface-600 text-lg">
            Data field
          </p>
        </div>

        <div class="px-5 h-[62px] flex items-center gap-2 rounded-lg shadow-sm w-full border font-poppins text-surface-500 cursor-pointer transition-transform duration-300  hover:bg-primary-50 border-surface-100 bg-surface-50" @click="showImageOptions ? showImageOptions = false : showImageOptions = true">
          <font-awesome-icon icon="fa-light fa-image" size="lg" style="--fa-primary-color: #009ee2; --fa-secondary-color: #009ee299; --fa-secondary-opacity: 0.6;" />
          <p class="font-poppins text-surface-600 text-lg">
            Image
          </p>
          <i class="pi pi-sort-down transition-all duration-300" :class="{ '-rotate-90': !showImageOptions }"></i>
        </div>
        <div v-if="showImageOptions" class="flex flex-col gap-2">
          <div class="px-5 h-[62px] flex items-center gap-2 rounded-lg shadow-sm w-5/6 ml-auto border font-poppins text-surface-500 cursor-pointer transition-transform duration-300  hover:bg-primary-50" :class="{ 'border-primaryBlue bg-primary-50': templateEditorStore.activeTemplateField === 'fixed-image', 'border-surface-100 bg-surface-50': templateEditorStore.activeTemplateField !== 'fixed-image' }" @click="selectField('fixed-image')">
            <p class="font-poppins text-surface-600 text-lg">
              Fixed image
            </p>
          </div>
          <div class="px-5 h-[62px] flex items-center gap-2 rounded-lg shadow-sm w-5/6 ml-auto border font-poppins text-surface-500 cursor-pointer transition-transform duration-300  hover:bg-primary-50" :class="{ 'border-primaryBlue bg-primary-50': templateEditorStore.activeTemplateField === 'Dataset image', 'border-surface-100 bg-surface-50': templateEditorStore.activeTemplateField !== 'Dataset image' }" @click="selectField('Dataset image')">
            <p class="font-poppins text-surface-600 text-lg">
              Dataset image
            </p>
          </div>
        </div>
        <div class="px-5 h-[62px] flex items-center gap-2 rounded-lg shadow-sm w-full border font-poppins text-surface-500 cursor-pointer transition-transform duration-300  hover:bg-primary-50  " :class="{ 'border-primaryBlue bg-primary-50': templateEditorStore.activeTemplateField === 'Static text', 'border-surface-100 bg-surface-50': templateEditorStore.activeTemplateField !== 'Static text' }" @click="selectField('Static text')">
          <font-awesome-icon icon="fa-light   fa-text" size="lg" style="--fa-primary-color: #009ee2; --fa-secondary-color: #009ee2cc; --fa-secondary-opacity: 0.6;" />
          <p class="font-poppins text-surface-600 text-lg">
            Text
          </p>
        </div>
        <div class="px-5 h-[62px] flex items-center gap-2 rounded-lg shadow-sm w-full border font-poppins text-surface-500 cursor-pointer transition-transform duration-300  hover:bg-primary-50 border-surface-100 bg-surface-50" @click="showTimestamp ? showTimestamp = false : showTimestamp = true">
          <font-awesome-icon icon="fa-light fa-clock" size="lg" style="--fa-primary-color: #009ee2; --fa-secondary-color: #009ee299; --fa-secondary-opacity: 0.6;" />
          <p class="font-poppins text-surface-600 text-lg">
            Timestamp
          </p>

          <i class="pi pi-sort-down transition-all duration-300" :class="{ '-rotate-90': !showTimestamp }"></i>
        </div>
        <div v-if="showTimestamp" class="flex flex-col gap-2">
          <div class="px-5 h-[62px] flex items-center gap-2 rounded-lg shadow-sm w-5/6 ml-auto border font-poppins text-surface-500 cursor-pointer transition-transform duration-300  hover:bg-primary-50 border-surface-100 bg-surface-50" @click="selectField('Static date')">
            <p class="font-poppins text-surface-600 text-lg">
              Date
            </p>
          </div>
          <div class="px-5 h-[62px] flex items-center gap-2 rounded-lg shadow-sm w-5/6 ml-auto border font-poppins text-surface-500 cursor-pointer transition-transform duration-300  hover:bg-primary-50 border-surface-100 bg-surface-50" @click="selectField('Static time')">
            <p class="font-poppins text-surface-600 text-lg">
              Time
            </p>
          </div>
        </div>
        <div class="px-5 h-[62px] flex items-center gap-2 rounded-lg shadow-sm w-full border font-poppins text-surface-500 cursor-pointer transition-transform duration-300  hover:bg-primary-50 " :class="{ 'border-primaryBlue bg-primary-50': templateEditorStore.activeTemplateField === 'checkbox', 'border-surface-100 bg-surface-50': templateEditorStore.activeTemplateField !== 'checkbox' }" @click="selectField('checkbox')">
          <font-awesome-icon icon="fa-light fa-square-check" size="lg" style="--fa-primary-color: #009ee2; --fa-secondary-color: #009ee299; --fa-secondary-opacity: 0.6;" />
          <p class="font-poppins text-surface-600 text-lg">
            Checkbox
          </p>
        </div>
        <div class="px-5 h-[62px] flex items-center gap-2 rounded-lg shadow-sm w-full border font-poppins text-surface-500 cursor-pointer transition-transform duration-300  hover:bg-primary-50 " :class="{ 'border-primaryBlue bg-primary-50': templateEditorStore.activeTemplateField === 'radio', 'border-surface-100 bg-surface-50': templateEditorStore.activeTemplateField !== 'radio' }" @click="selectField('radio')">
          <font-awesome-icon icon="fa-light fa-circle-dot" size="lg" style="--fa-primary-color: #009ee2; --fa-secondary-color: #009ee299; --fa-secondary-opacity: 0.6;" />
          <p class="font-poppins text-surface-600 text-lg">
            Radio
          </p>
        </div>
        <div class="px-5 h-[62px] flex items-center gap-2 rounded-lg shadow-sm w-full border font-poppins text-surface-500 cursor-pointer transition-transform duration-300  hover:bg-primary-50  " :class="{ 'border-primaryBlue bg-primary-50': templateEditorStore.activeTemplateField === 'dropdown', 'border-surface-100 bg-surface-50': templateEditorStore.activeTemplateField !== 'dropdown' }" @click="selectField('dropdown')">
          <font-awesome-icon icon="fa-light fa-square-caret-down" size="lg" style="--fa-primary-color: #009ee2; --fa-secondary-color: #009ee299; --fa-secondary-opacity: 0.6;" />
          <p class="font-poppins text-surface-600 text-lg">
            Dropdown
          </p>
        </div>
        <div class="px-5 h-[62px] flex items-center gap-2 rounded-lg shadow-sm w-full border font-poppins text-surface-500 cursor-pointer transition-transform duration-300  hover:bg-primary-50  " :class="{ 'border-primaryBlue bg-primary-50': templateEditorStore.activeTemplateField === 'signature', 'border-surface-100 bg-surface-50': templateEditorStore.activeTemplateField !== 'signature' }" @click="selectField('signature')">
          <font-awesome-icon icon="fa-light fa-file-signature" size="lg" style="--fa-primary-color: #009ee2; --fa-secondary-color: #009ee299; --fa-secondary-opacity: 0.6;" />
          <p class="font-poppins text-surface-600 text-lg">
            Signature
          </p>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { uuid } from 'vue-uuid'
import { useConfirm } from 'primevue/useconfirm'
import { activeTextStyles, templateEditorStore } from '@/composables/useTemplateEditorData'

const showFormFields = ref(false)
const showDataFields = ref(false)
const showStaticFields = ref(false)
const showTimestamp = ref(false)
const fieldToDelete = ref(false)
const deleteText = ref('')
const confirm = useConfirm()

function duplicateField(field) {
  const alertIconUrl = 'https://docspawn-bucket-1.s3.eu-central-1.amazonaws.com/docspawn-bucket-1/33538a37-c1a2-4b6e-93d8-ab8433a8f727_attention.png.png'

  const objs = templateEditorStore.canvas._objects
  objs.forEach((obj) => {
    if (obj.hash === field.hash) {
      if (obj?._element && !obj.stroke && !obj.isAlertIcon) {
        fabric.Image.fromURL(
          'https://placehold.co/300x200?text=DocSpawn'
          , (myImg) => {
            myImg.set({
              left: 20,
              top: 20,
              scaleX: obj.scaleX,
              scaleY: obj.scaleY,
              height: obj.height,
              width: obj.width,
              id: obj.id,
              hash: uuid.v1(),
              fieldType: obj.fieldType,
              pageNo: obj.pageNo,
              displayGuide: false,
            })

            if (obj?.id === 'Lorem ipsum') {
              fabric.Image.fromURL(
                alertIconUrl
                , (imgia) => {
                  imgia.set({
                    left: myImg.left + (myImg.width * myImg.scaleX),
                    top: myImg.top,
                    scaleX: 0.07,
                    scaleY: 0.07,
                    isAlertIcon: true,
                    id: myImg.hash,
                    pageNo: myImg.pageNo,
                    displayGuide: false,
                    selectable: false,
                  })
                  templateEditorStore.canvas.add(imgia)
                  templateEditorStore.canvas.renderAll()
                },
              )
            }

            const fieldToAdd = { fieldType: myImg.fieldType, name: myImg.id, hash: myImg.hash, page: myImg.pageNo,
            }
            const allFields = []
            templateEditorStore.addedFields.forEach((f) => {
              allFields.push(JSON.parse(JSON.stringify(f)))
            })
            allFields.push(fieldToAdd)

            templateEditorStore.addedFields = allFields
            templateEditorStore.canvas.renderAll()

            myImg.on('mouseover', (e) => {
              if (!templateEditorStore.activeAdvancedPointer)
                return
              templateEditorStore.canvas.add(new fabric.Line([100, 1000, 100, 5000], {
                left: e.target.left,
                top: 0,
                stroke: '#3978eb',
                id: e.target.hash,
                fieldType: myImg.fieldType,

              }))
              templateEditorStore.canvas.add(new fabric.Line([1000, 100, 2000, 100], {
                left: 0, // event.absolutePointer.x,
                top: e.target.top + (Number.parseFloat(e.target.height) * e.target.scaleY),

                stroke: '#3978eb',
                id: e.target.hash,
                fieldType: myImg.fieldType,
              }))
            })
            myImg.on('mouseout', (e) => {
              if (!templateEditorStore.activeAdvancedPointer)
                return

              const objs = templateEditorStore.canvas._objects
              templateEditorStore.canvas._objects = objs.filter((obj) => {
                if (obj?.stroke === '#3978eb' && obj?.id === e.target.hash && !e.target.displayGuide)
                  return false
                else
                  return true
              })

              templateEditorStore.canvas.renderAll()
            })

            templateEditorStore.canvas.add(myImg)
            templateEditorStore.canvas.renderAll()
            setTimeout(() => selectAddedField({ ...fieldToAdd, obj: myImg }), 50)
          },
        )
      }
      else {
        const ele = new templateEditorStore.fabric.Text(
        `${obj.text}`,
        {

          top: 20,
          left: 20,
          fill: obj.fill,
          fontFamily: obj.fontFamily,
          fontSize: obj.fontSize,
          fontStyle: obj.fontStyle,
          underline: obj.underline,
          fontWeight: obj.fontWeight,
          textAlign: obj.textAlign,
          fieldType: field.fieldType,
          id: obj.id,
          name: field.name,
          hash: uuid.v1(),
          pageNo: obj.pageNo,
        },
        )
        templateEditorStore.canvas.add(ele)

        const fieldToAdd = { fieldType: field.fieldType, name: field.name, hash: ele.hash, page: ele.pageNo, obj: ele }
        const allFields = []
        templateEditorStore.addedFields.forEach((f) => {
          allFields.push(JSON.parse(JSON.stringify(f)))
        })
        allFields.push(fieldToAdd)
        templateEditorStore.addedFields = allFields

        ele.on('mouseover', (e) => {
          if (!templateEditorStore.activeAdvancedPointer)
            return
          templateEditorStore.canvas.add(new fabric.Line([100, 1000, 100, 5000], {
            left: e.target.left,
            top: 0,
            stroke: '#3978eb',
            id: e.target.hash,
            fieldType: ele.fieldType,
          }))
          templateEditorStore.canvas.add(new fabric.Line([1000, 100, 2000, 100], {
            left: 0,
            top: e.target.top + (Number.parseFloat(e.target.height) * e.target.scaleY) - (1 * ((Number.parseFloat(e.target.height) * e.target.scaleY) / 5)),
            stroke: '#3978eb',
            id: e.target.hash,
            fieldType: ele.fieldType,
          }))
        })
        ele.on('mouseout', (e) => {
          if (!templateEditorStore.activeAdvancedPointer)
            return

          const objs = templateEditorStore.canvas._objects
          templateEditorStore.canvas._objects = objs.filter((obj) => {
            if (obj.stroke === '#3978eb' && obj?.id === e.target.hash && !e.target.displayGuide)
              return false
            else
              return true
          })

          templateEditorStore.canvas.renderAll()
        })

        templateEditorStore.canvas.setActiveObject(ele)
        templateEditorStore.canvas.renderAll()
        setTimeout(() => selectAddedField(fieldToAdd), 50)
      }
    }
  })
}

function deleteField() {
  templateEditorStore.canvas._objects = templateEditorStore.canvas._objects.filter((obj) => {
    if (obj?.hash === fieldToDelete?.value?.hash || obj.id === fieldToDelete?.value?.hash)
      return false
    else
      return true
  })

  const fieldsS = templateEditorStore.addedFields.filter(f => f?.hash !== fieldToDelete?.value?.hash)
  templateEditorStore.addedFields = fieldsS.map(f => JSON.parse(JSON.stringify (f)))
  templateEditorStore.canvas.discardActiveObject()
  templateEditorStore.canvas.renderAll()
  templateEditorStore.showOptionsBar = false
  deleteText.value = ''
}

function selectField(field) {
  templateEditorStore.canvas.discardActiveObject()
  templateEditorStore.canvas.renderAll()
  templateEditorStore.activeTemplateField = field
  if (field === 'Data field' || field === 'Dataset image')
    templateEditorStore.fieldToAdd = { name: 'Select a data field', type: field, id: 'Lorem ipsum' }
  if (field === 'Static text')
    templateEditorStore.fieldToAdd = { name: 'Add text', type: field, id: 'Lorem ipsum' }
  if (field === 'Static date')
    templateEditorStore.fieldToAdd = { name: 'MM/DD/YYYY', type: field, id: 'MM/DD/YYYY' }
  if (field === 'Static time')
    templateEditorStore.fieldToAdd = { name: 'HH:MM:SS', type: field, id: 'HH:MM:SS' }
  templateEditorStore.showOptionsBar = true
}

function selectAddedField(field) {
  templateEditorStore.canvas.discardActiveObject()
  templateEditorStore.canvas.renderAll()
  templateEditorStore.canvas._objects.forEach((obj) => {
    if (obj.hash === field.hash) {
      if (field.page !== templateEditorStore.activePageForCanvas) {
        templateEditorStore.activePageForCanvas = field.page
        setTimeout(() => {
          templateEditorStore.canvas.setActiveObject(obj)
          templateEditorStore.canvas.renderAll()
        }, 500)
      }
      else {
        templateEditorStore.canvas.setActiveObject(obj)
        templateEditorStore.canvas.renderAll()
      }
      templateEditorStore.selectedAddedField = { ...field, obj }
      templateEditorStore.showOptionsBar = true

      if (obj.text && obj.id !== 'Lorem ipsum') {
        activeTextStyles.fill = obj.fill ? obj.fill : '#000000'
        activeTextStyles.fontFamily = obj.fontFamily ? obj.fontFamily : 'Arial'
        activeTextStyles.fontSize = obj.fontSize ? obj.fontSize : 32
        activeTextStyles.underline = obj.underline ? obj.underline : false
        activeTextStyles.textAlign = obj.textAlign ? obj.textAlign : 'center'
        activeTextStyles.fontStyle = obj.fontStyle ? obj.fontStyle : 'normal'
        activeTextStyles.fontWeight = obj.fontWeight ? obj.fontWeight : 300
      }
    }
  })
}

function confirm2(event) {
  confirm.require({
    target: event.currentTarget,
    message: ' Do you want to delete this field?',
    group: 'confirmFieldDeletion',
    icon: 'pi pi-info-circle',
    rejectClass: 'p-button-secondary p-button-outlined p-button-sm text-black  ',
    acceptClass: ' p-button-sm bg-red-500 hover:bg-red-500 ring-0 focus:ring-0 border-none ',
    rejectLabel: 'Cancel',
    acceptLabel: 'Delete',
    accept: () => {
      deleteField()
    },
    reject: () => {
    },
  })
}
</script>

<style lang="scss" scoped>
::-webkit-scrollbar {
    width: 10px;
    height:10px;
    }

    ::-webkit-scrollbar-track {
    background: #f1f1f1;
    }

    ::-webkit-scrollbar-thumb {
    background: #009ee233;
    border-radius: 8px;
    }

    ::-webkit-scrollbar-thumb:hover {
    background: #009ee277;
    }
  </style>
