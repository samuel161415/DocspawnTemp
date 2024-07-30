<template>
  <ConfirmPopup group="confirmFieldDeletion" />
  <div class="flex-1 h-full overflow-auto pr-1">
    <div class="w-full">
      <div
        v-if="templateEditorStore.ShowAddedFieldsinTemplateFields === true"
        icon="pi pi-angle-left"
        class="w-full mb-6 justify-left gap-2 h-[62px] text-lg rounded-md text-primary-500 cursor-pointer bg-primary-50 flex items-center justify-center gap-2 transition-all ease-linear duration-75 hover:border hover:border-primaryBlue"
        @click="templateEditorStore.ShowAddedFieldsinTemplateFields = false"
      >
        <i class="pi pi-plus"></i>
        <p class="font-poppins">
          {{ $t('Cp_createTemplate_editorTemplateFields.add_new_field') }}
        </p>
      </div>
      <div
        v-else
        icon="pi pi-angle-left"
        class="w-full mb-6 justify-left gap-2 h-[62px] rounded-md text-lg text-primary-500 cursor-pointer bg-primary-50 flex items-center justify-center gap-2 transition-all ease-linear duration-75 hover:border hover:border-primaryBlue"
        @click="templateEditorStore.ShowAddedFieldsinTemplateFields = true"
      >
        <i class="pi pi-angle-left"></i>
        <p class="font-poppins">
          {{ $t('Cp_createTemplate_editorTemplateFields.fields_list') }}
        </p>
      </div>

      <template v-for="(field, index) in templateEditorStore.addedFields">
        <div
          v-if="templateEditorStore.ShowAddedFieldsinTemplateFields === true"
          :key="index"
          class="px-5 h-[62px] flex items-center mb-3 gap-2 rounded-lg shadow-sm w-full border font-poppins text-surface-500 cursor-pointer transition-transform duration-300 hover:bg-primary-50"
          :class="{
            'border-primaryBlue bg-primary-50': templateEditorStore?.selectedAddedField?.hash === field?.hash,
            'border-surface-100 bg-surface-50': templateEditorStore?.selectedAddedField?.hash !== field?.hash,
          }"
        >
          <div
            class="h-full w-full py-2 cursor-pointer overflow-hidden"
            @click="templateEditorStore?.selectedAddedField?.hash !== field?.hash && selectAddedField(field)"
          >
            <p
              v-if="field.name === 'Lorem ipsum' && (field?.fieldType === 'Data field' && field?.fieldType === 'Dataset image')"
              class="font-poppins text-red-400 text-lg mt-1"
            >
              {{ $t('Cp_createTemplate_editorTemplateFields.select_a_data_field') }}
            </p>
            <p
              v-else-if="(field.name === 'Add text' || field.name === 'Lorem ipsum') && field?.fieldType === 'Static text'"
              class="font-poppins text-red-400 text-lg mt-1"
            >
              {{ $t('Cp_createTemplate_editorTemplateFields.add_text') }}
            </p>
            <p
              v-else-if="(field.name === 'Add field name' || field.name === 'Lorem ipsum') && (field?.fieldType === 'Static image')"
              class="font-poppins text-red-400 text-lg mt-1"
            >
              {{ $t('Cp_createTemplate_editorTemplateFields.select_image') }}
            </p>
            <p
              v-else-if="(field.name === 'Add field name' || field.name === 'Lorem ipsum') && (field?.fieldType === 'Form text' || field?.fieldType === 'Form image' || field?.fieldType === 'Form date' || field?.fieldType === 'Form time' || field?.fieldType === 'Form long text' || field?.fieldType === 'Form list')"
              class="font-poppins text-red-400 text-lg mt-1"
            >
              {{ $t('Cp_createTemplate_editorTemplateFields.add_field_name') }}
            </p>
            <p
              v-else-if="(field.name === 'Add description' || field.name === 'Lorem ipsum') && (field?.fieldType === 'Form checkbox group')"
              class="font-poppins text-red-400 text-lg mt-1"
            >
              {{ $t('Cp_createTemplate_editorTemplateFields.add_description') }}
            </p>

            <p v-if="field.name !== 'Lorem ipsum'" class="font-poppins text-surface-600 text-lg mt-1 overflow-ellipsis max-w-36 whitespace-nowrap overflow-hidden">
              {{ field.name }}
            </p>

            <p v-if="field?.fieldType === 'Form checkbox group'" class="font-poppins text-surface-600 text-sm">
              {{ $t('Cp_createTemplate_editorTemplateFields.checkbox_group') }} {{ field?.groupPosition }} - <span class="text-primaryBlue">p.{{ field.page }}</span>
            </p>
            <p v-else class="font-poppins text-surface-600 text-sm">
              {{ field?.fieldType === 'Form list' ? $t('Cp_createTemplate_editorTemplateFields.list_selection') : field?.fieldType }} - <span class="text-primaryBlue">p.{{ field.page }}</span>
            </p>
          </div>

          <div class="flex flex-row gap-4">
            <Button v-if="field?.fieldType !== 'Form checkbox group'" v-tooltip.top="$t('Cp_createTemplate_editorTemplateFields.duplicate')" text class="text-lg text-surface-600 w-max h-max" @click="duplicateField(field)">
              <font-awesome-icon icon="fa-light fa-clone" size="lg" />
            </Button>
            <Button v-tooltip.top="$t('Cp_createTemplate_editorTemplateFields.delete')" text class="text-lg text-surface-600 w-max h-max" @click="fieldToDelete = field;confirm2($event)">
              <font-awesome-icon icon="fa-light fa-trash" size="lg" />
            </Button>
          </div>
        </div>
      </template>

      <div v-if="templateEditorStore.ShowAddedFieldsinTemplateFields === false" class="transition-all duration-200 ease-linear grid grid-cols-1 gap-2 w-full h-max flex-none">
        <div v-if="templateGeneralInformation?.useCase === 'Data to doc'" class="px-5 h-[62px] flex items-center gap-2 rounded-lg shadow-sm w-full border font-poppins text-surface-500 cursor-pointer transition-transform duration-300 hover:bg-primary-50 border-surface-100 bg-surface-50" @click="showDataFields ? showDataFields = false : showDataFields = true">
          <font-awesome-icon icon="fa-light fa-file-spreadsheet" size="lg" style="--fa-primary-color: #009ee2; --fa-secondary-color: #009ee299; --fa-secondary-opacity: 0.6;" />

          <p class="font-poppins text-surface-600 text-lg">
            {{ $t('Cp_createTemplate_editorTemplateFields.data_fields') }}
          </p>
          <font-awesome-icon icon="fa-light fa-caret-right transition-all duration-300" size="lg" :class="{ 'rotate-90': showDataFields }" />
        </div>
        <div v-if="showDataFields" class="flex flex-col gap-2">
          <div
            class="px-5 h-[62px] flex flex-col justify-center pl-14 gap-2 rounded-lg shadow-sm w-full border font-poppins text-surface-500 cursor-pointer transition-transform duration-300 hover:bg-primary-50"
            :class="{ 'border-primaryBlue bg-primary-50': showDatasetOptions, 'border-surface-100 bg-surface-50': !showDatasetOptions }"
            @click="showDatasetOptions ? showDatasetOptions = false : showDatasetOptions = true;showDatasetOptions2 = false;"
          >
            <div class="flex gap-2 items-center">
              <font-awesome-icon icon="fa-light fa-file-spreadsheet" size="lg" style="--fa-primary-color: #009ee2; --fa-secondary-color: #009ee299; --fa-secondary-opacity: 0.6;" />
              <p class="font-poppins text-surface-600 text-lg">
                {{ $t('Cp_createTemplate_editorTemplateFields.text') }}
              </p>
              <font-awesome-icon icon="fa-light fa-caret-right transition-all duration-300" size="lg" :class="{ 'rotate-90': showDatasetOptions }" />
            </div>
          </div>
          <div v-if="showDatasetOptions" class="px-5 h-[62px] flex items-center pl-14 gap-2 rounded-lg shadow-sm w-full border font-poppins text-surface-500 cursor-pointer transition-transform duration-300 hover:bg-primary-50 border-surface-100 bg-surface-50">
            <Dropdown v-model="selectedDatasetOption" :options="templateEditorStore.datasetData.selectedKeys" filter placeholder="Select data field" class="w-full md:w-full">
              <template #value="slotProps">
                <div v-if="slotProps.value" class="flex align-items-center">
                  <p class="font-poppins">
                    {{ slotProps.value }}
                  </p>
                </div>
                <span v-else>
                  <p class="font-poppins">{{ slotProps.placeholder }}</p>
                </span>
              </template>
              <template #option="slotProps">
                <div class="flex align-items-center">
                  <p class="font-poppins">
                    {{ slotProps.option }}
                  </p>
                </div>
              </template>
            </Dropdown>
          </div>
          <div
            class="px-5 h-[62px] flex items-center pl-14 gap-2 rounded-lg shadow-sm w-full border font-poppins text-surface-500 cursor-pointer transition-transform duration-300 hover:bg-primary-50"
            :class="{ 'border-primaryBlue bg-primary-50': showDatasetOptions2, 'border-surface-100 bg-surface-50': !showDatasetOptions2 }"
            @click="showDatasetOptions2 ? showDatasetOptions2 = false : showDatasetOptions2 = true;showDatasetOptions = false;"
          >
            <font-awesome-icon icon="fa-light fa-image" size="lg" style="--fa-primary-color: #009ee2; --fa-secondary-color: #009ee299; --fa-secondary-opacity: 0.6;" />
            <p class="font-poppins text-surface-600 text-lg">
              {{ $t('Cp_createTemplate_editorTemplateFields.image') }}
            </p>
            <font-awesome-icon icon="fa-light fa-caret-right transition-all duration-300" size="lg" :class="{ 'rotate-90': showDatasetOptions2 }" />
          </div>
          <div v-if="showDatasetOptions2" class="px-5 h-[62px] flex items-center pl-14 gap-2 rounded-lg shadow-sm w-full border font-poppins text-surface-500 cursor-pointer transition-transform duration-300 hover:bg-primary-50 border-surface-100 bg-surface-50">
            <Dropdown v-model="selectedDatasetOption2" :options="templateEditorStore?.datasetData?.urlKeys?.filter((d) => templateEditorStore.datasetData.selectedKeys?.includes(d))" filter placeholder="Select data field" class="w-full md:w-full">
              <template #value="slotProps">
                <div v-if="slotProps.value" class="flex align-items-center">
                  <p class="font-poppins">
                    {{ slotProps.value }}
                  </p>
                </div>
                <span v-else>
                  <p class="font-poppins">{{ slotProps.placeholder }}</p>
                </span>
              </template>
              <template #option="slotProps">
                <div class="flex align-items-center">
                  <p class="font-poppins">
                    {{ slotProps.option }}
                  </p>
                </div>
              </template>
            </Dropdown>
          </div>
        </div>

        <div v-if="templateGeneralInformation?.useCase === 'Form to doc'" class="px-5 h-[62px] flex items-center gap-2 rounded-lg shadow-sm w-full border font-poppins text-surface-500 cursor-pointer transition-transform duration-300 hover:bg-primary-50 border-surface-100 bg-surface-50" @click="showFormFields ? showFormFields = false : showFormFields = true">
          <font-awesome-icon icon="fa-light fa-file-lines" size="lg" style="--fa-primary-color: #009ee2; --fa-secondary-color: #009ee299; --fa-secondary-opacity: 0.6;" />
          <p class="font-poppins text-surface-600 text-lg">
            {{ $t('Cp_createTemplate_editorTemplateFields.form_fields') }}
          </p>
          <font-awesome-icon icon="fa-light fa-caret-right transition-all duration-300" size="lg" :class="{ 'rotate-90': showFormFields }" />
        </div>
        <div v-if="showFormFields" class="flex flex-col gap-2">
          <div
            class="px-5 pl-14 h-[62px] flex items-center gap-2 rounded-lg shadow-sm w-full border font-poppins text-surface-500 cursor-pointer transition-transform duration-300 hover:bg-primary-50"
            :class="{ 'border-primaryBlue bg-primary-50': formFieldForNameInput === 'Form text', 'border-surface-100 bg-surface-50': formFieldForNameInput !== 'Form text' }"
            @click="formFieldForNameInput = 'Form text';showFormFieldNameInput = true"
          >
            <font-awesome-icon icon="fa-light fa-text" size="lg" style="--fa-primary-color: #009ee2; --fa-secondary-color: #009ee2cc; --fa-secondary-opacity: 0.6;" />
            <p class="font-poppins text-surface-600 text-lg">
              {{ $t('Cp_createTemplate_editorTemplateFields.text') }}
            </p>
          </div>
          <div v-if="formFieldForNameInput === 'Form text' && showFormFieldNameInput" class="px-5 pl-14 h-[62px] flex items-center gap-2 rounded-lg shadow-sm w-full border font-poppins text-surface-500 cursor-pointer transition-transform duration-300 hover:bg-primary-50 border-surface-100 bg-surface-50">
            <InputText v-model="formFieldNameInputValue" class="w-full md:w-full" :placeholder="$t('Cp_createTemplate_editorTemplateFields.write_field_name')" />
          </div>
          <div
            class="px-5 pl-14 h-[62px] flex items-center gap-2 rounded-lg shadow-sm w-full border font-poppins text-surface-500 cursor-pointer transition-transform duration-300 hover:bg-primary-50"
            :class="{ 'border-primaryBlue bg-primary-50': formFieldForNameInput === 'Form long text', 'border-surface-100 bg-surface-50': formFieldForNameInput !== 'Form long text' }"
            @click="formFieldForNameInput = 'Form long text';showFormFieldNameInput = true"
          >
            <font-awesome-icon icon="fa-light fa-paragraph" size="lg" style="--fa-primary-color: #009ee2; --fa-secondary-color: #009ee2cc; --fa-secondary-opacity: 0.6;" />
            <p class="font-poppins text-surface-600 text-lg">
              {{ $t('Cp_createTemplate_editorTemplateFields.long_text') }}
            </p>
          </div>
          <div v-if="formFieldForNameInput === 'Form long text' && showFormFieldNameInput" class="px-5 pl-14 h-[62px] flex items-center gap-2 rounded-lg shadow-sm w-full border font-poppins text-surface-500 cursor-pointer transition-transform duration-300 hover:bg-primary-50 border-surface-100 bg-surface-50">
            <InputText v-model="formFieldNameInputValue" class="w-full md:w-full" :placeholder="$t('Cp_createTemplate_editorTemplateFields.write_field_name')" />
          </div>

          <div
            class="px-5 pl-14 h-[62px] flex items-center gap-2 rounded-lg shadow-sm w-full border font-poppins text-surface-500 cursor-pointer transition-transform duration-300 hover:bg-primary-50"
            :class="{ 'border-primaryBlue bg-primary-50': formFieldForNameInput === 'Form image', 'border-surface-100 bg-surface-50': formFieldForNameInput !== 'Form image' }"
            @click="formFieldForNameInput = 'Form image';showFormFieldNameInput = true"
          >
            <font-awesome-icon icon="fa-light fa-image" size="lg" style="--fa-primary-color: #009ee2; --fa-secondary-color: #009ee299; --fa-secondary-opacity: 0.6;" />
            <p class="font-poppins text-surface-600 text-lg">
              {{ $t('Cp_createTemplate_editorTemplateFields.image') }}
            </p>
          </div>
          <div v-if="formFieldForNameInput === 'Form image' && showFormFieldNameInput" class="px-5 pl-14 h-[62px] flex items-center gap-2 rounded-lg shadow-sm w-full border font-poppins text-surface-500 cursor-pointer transition-transform duration-300 hover:bg-primary-50 border-surface-100 bg-surface-50">
            <InputText v-model="formFieldNameInputValue" class="w-full md:w-full" :placeholder="$t('Cp_createTemplate_editorTemplateFields.write_field_name')" />
          </div>
          <div
            class="px-5 pl-14 h-[62px] flex items-center gap-2 rounded-lg shadow-sm w-full border font-poppins text-surface-500 cursor-pointer transition-transform duration-300 hover:bg-primary-50 border-surface-100 bg-surface-50"
            @click="showFormTimestamp ? showFormTimestamp = false : showFormTimestamp = true"
          >
            <font-awesome-icon icon="fa-light fa-calendar-clock" size="lg" style="--fa-primary-color: #009ee2; --fa-secondary-color: #009ee299; --fa-secondary-opacity: 0.6;" />
            <p class="font-poppins text-surface-600 text-lg">
              {{ $t('Cp_createTemplate_editorTemplateFields.timestamp') }}
            </p>
            <font-awesome-icon icon="fa-light fa-caret-right transition-all duration-300" size="lg" :class="{ 'rotate-90': showFormTimestamp }" />
          </div>
          <div v-if="showFormTimestamp" class="flex flex-col gap-2">
            <div
              class="px-5 pl-20 h-[62px] flex items-center gap-2 rounded-lg shadow-sm w-full border font-poppins text-surface-500 cursor-pointer transition-transform duration-300 hover:bg-primary-50"
              :class="{ 'border-primaryBlue bg-primary-50': formFieldForNameInput === 'Form date', 'border-surface-100 bg-surface-50': formFieldForNameInput !== 'Form date' }"
              @click="formFieldForNameInput = 'Form date';showFormFieldNameInput = true"
            >
              <font-awesome-icon icon="fa-light fa-calendar" size="lg" style="--fa-primary-color: #009ee2; --fa-secondary-color: #009ee299; --fa-secondary-opacity: 0.6;" />
              <p class="font-poppins text-surface-600 text-lg">
                {{ $t('Cp_createTemplate_editorTemplateFields.date') }}
              </p>
            </div>
            <div v-if="formFieldForNameInput === 'Form date' && showFormFieldNameInput" class="px-5 pl-20 h-[62px] flex items-center gap-2 rounded-lg shadow-sm w-full border font-poppins text-surface-500 cursor-pointer transition-transform duration-300 hover:bg-primary-50 border-surface-100 bg-surface-50">
              <InputText v-model="formFieldNameInputValue" class="w-full md:w-full" :placeholder="$t('Cp_createTemplate_editorTemplateFields.write_field_name')" />
            </div>
            <div
              class="px-5 pl-20 h-[62px] flex items-center gap-2 rounded-lg shadow-sm w-full border font-poppins text-surface-500 cursor-pointer transition-transform duration-300 hover:bg-primary-50"
              :class="{ 'border-primaryBlue bg-primary-50': formFieldForNameInput === 'Form time', 'border-surface-100 bg-surface-50': formFieldForNameInput !== 'Form time' }"
              @click="formFieldForNameInput = 'Form time';showFormFieldNameInput = true"
            >
              <font-awesome-icon icon="fa-light fa-clock" size="lg" style="--fa-primary-color: #009ee2; --fa-secondary-color: #009ee299; --fa-secondary-opacity: 0.6;" />
              <p class="font-poppins text-surface-600 text-lg">
                {{ $t('Cp_createTemplate_editorTemplateFields.time') }}
              </p>
            </div>
            <div v-if="formFieldForNameInput === 'Form time' && showFormFieldNameInput" class="px-5 pl-20 h-[62px] flex items-center gap-2 rounded-lg shadow-sm w-full border font-poppins text-surface-500 cursor-pointer transition-transform duration-300 hover:bg-primary-50 border-surface-100 bg-surface-50">
              <InputText v-model="formFieldNameInputValue" class="w-full md:w-full" :placeholder="$t('Cp_createTemplate_editorTemplateFields.write_field_name')" />
            </div>
          </div>
          <div
            class="px-5 pl-14 h-[62px] flex items-center gap-2 rounded-lg shadow-sm w-full border font-poppins text-surface-500 cursor-pointer transition-transform duration-300 hover:bg-primary-50"
            :class="{ 'border-primaryBlue bg-primary-50': formFieldForNameInput === 'Form list', 'border-surface-100 bg-surface-50': formFieldForNameInput !== 'Form list' }"
            @click="formFieldForNameInput = 'Form list';showFormFieldNameInput = true"
          >
            <font-awesome-icon icon="fa-light fa-square-caret-down" size="lg" style="--fa-primary-color: #009ee2; --fa-secondary-color: #009ee299; --fa-secondary-opacity: 0.6;" />
            <p class="font-poppins text-surface-600 text-lg">
              {{ $t('Cp_createTemplate_editorTemplateFields.list') }}
            </p>
          </div>
          <div v-if="formFieldForNameInput === 'Form list' && showFormFieldNameInput" class="px-5 pl-14 h-[62px] flex items-center gap-2 rounded-lg shadow-sm w-full border font-poppins text-surface-500 cursor-pointer transition-transform duration-300 hover:bg-primary-50 border-surface-100 bg-surface-50">
            <InputText v-model="formFieldNameInputValue" class="w-full md:w-full" :placeholder="$t('Cp_createTemplate_editorTemplateFields.write_field_name')" />
          </div>
          <div
            class="px-5 pl-14 h-[62px] flex items-center gap-2 rounded-lg shadow-sm w-full border font-poppins text-surface-500 cursor-pointer transition-transform duration-300 hover:bg-primary-50"
            :class="{ 'border-primaryBlue bg-primary-50': formFieldForNameInput === 'Form checkbox group', 'border-surface-100 bg-surface-50': formFieldForNameInput !== 'Form checkbox group' }"
            @click="formFieldForNameInput = 'Form checkbox group';showFormFieldNameInput = true"
          >
            <font-awesome-icon icon="fa-light fa-square-check" size="lg" style="--fa-primary-color: #009ee2; --fa-secondary-color: #009ee299; --fa-secondary-opacity: 0.6;" />
            <p class="font-poppins text-surface-600 text-lg">
              {{ $t('Cp_createTemplate_editorTemplateFields.checkbox') }}
            </p>
          </div>
          <div v-if="formFieldForNameInput === 'Form checkbox group' && showFormFieldNameInput" class="px-5 pl-14 h-[62px] flex items-center gap-2 rounded-lg shadow-sm w-full border font-poppins text-surface-500 cursor-pointer transition-transform duration-300 hover:bg-primary-50 border-surface-100 bg-surface-50">
            <InputText v-model="formFieldNameInputValue" class="w-full md:w-full" :placeholder="$t('Cp_createTemplate_editorTemplateFields.write_field_name')" />
          </div>
          <!-- <div class="px-5 pl-14 h-[62px] flex flex-col justify-center py-2 gap-2 rounded-lg shadow-sm w-full border font-poppins text-surface-500 cursor-pointer transition-transform duration-300 hover:bg-primary-50" :class="{ 'border-primaryBlue bg-primary-50': templateEditorStore.activeTemplateField === 'Form radio', 'border-surface-100 bg-surface-50': templateEditorStore.activeTemplateField !== 'Form radio' }">
            <div class="flex items-center gap-2">
              <font-awesome-icon icon="fa-light fa-circle-dot" size="lg" style="--fa-primary-color: #009ee2; --fa-secondary-color: #009ee299; --fa-secondary-opacity: 0.6;" />
              <p class="font-poppins text-surface-600 text-lg">
                {{ $t('Cp_createTemplate_editorTemplateFields.radio') }}
              </p>
              <Chip :label="$t('Cp_createTemplate_editorTemplateFields.coming_soon')" class="bg-primary-50 text-primary-500 text-xs py-0" />
            </div>

          </div> -->

          <div class="px-5 pl-14 h-[62px] flex flex-col justify-center py-2 gap-2 rounded-lg shadow-sm w-full border font-poppins text-surface-500 cursor-pointer transition-transform duration-300 hover:bg-primary-50" :class="{ 'border-primaryBlue bg-primary-50': templateEditorStore.activeTemplateField === 'Form signature', 'border-surface-100 bg-surface-50': templateEditorStore.activeTemplateField !== 'Form signature' }">
            <div class="flex items-center gap-2">
              <font-awesome-icon icon="fa-light fa-file-signature" size="lg" style="--fa-primary-color: #009ee2; --fa-secondary-color: #009ee299; --fa-secondary-opacity: 0.6;" />
              <p class="font-poppins text-surface-600 text-lg">
                {{ $t('Cp_createTemplate_editorTemplateFields.signature') }}
              </p>
              <Chip :label="$t('Cp_createTemplate_editorTemplateFields.coming_soon')" class="bg-primary-50 text-primary-500 text-xs py-0" />
            </div>
            <!-- <Chip label="Coming soon" class="bg-primary-50 text-primary-500 text-sm" /> -->
          </div>
        </div>
        <div class="px-5 h-[62px] flex items-center gap-2 rounded-lg shadow-sm w-full border font-poppins text-surface-500 cursor-pointer transition-transform duration-300 hover:bg-primary-50 border-surface-100 bg-surface-50" @click="showStaticFields ? showStaticFields = false : showStaticFields = true">
          <font-awesome-icon icon="fa-light fa-snowflake" size="lg" style="--fa-primary-color: #009ee2; --fa-secondary-color: #009ee299; --fa-secondary-opacity: 0.6;" />

          <p class="font-poppins text-surface-600 text-lg">
            {{ $t('Cp_createTemplate_editorTemplateFields.static_fields') }}
          </p>
          <font-awesome-icon icon="fa-light fa-caret-right transition-all duration-300" size="lg" :class="{ 'rotate-90': showStaticFields }" />
        </div>
        <div v-if="showStaticFields" class="flex flex-col gap-2">
          <div
            class="px-5 pl-14 h-[62px] flex items-center gap-2 rounded-lg shadow-sm w-full border font-poppins text-surface-500 cursor-pointer transition-transform duration-300 hover:bg-primary-50"
            :class="{ 'border-primaryBlue bg-primary-50': showStaticOption1, 'border-surface-100 bg-surface-50': !showStaticOption1 }"
            @click="showStaticOption1 = true;templateEditorStore.activeTemplateField = ''"
          >
            <font-awesome-icon icon="fa-light fa-text" size="lg" style="--fa-primary-color: #009ee2; --fa-secondary-color: #009ee2cc; --fa-secondary-opacity: 0.6;" />
            <p class="font-poppins text-surface-600 text-lg">
              {{ $t('Cp_createTemplate_editorTemplateFields.text') }}
            </p>
          </div>
          <div v-if="showStaticOption1" class="px-5 pl-14 h-[62px] flex items-center gap-2 rounded-lg shadow-sm w-full border font-poppins text-surface-500 cursor-pointer transition-transform duration-300 hover:bg-primary-50 border-surface-100 bg-surface-50">
            <InputText v-model="staticOption1Val" class="w-full md:w-full" :placeholder="$t('Cp_createTemplate_editorTemplateFields.write_text_to_add')" />
          </div>
          <!-- @click="selectField('Static text') -->
          <div
            class="px-5 pl-14 h-[62px] flex items-center gap-2 rounded-lg shadow-sm w-full border font-poppins text-surface-500 cursor-pointer transition-transform duration-300 hover:bg-primary-50"
            :class="{ 'border-primaryBlue bg-primary-50': templateEditorStore.activeTemplateField === 'Static image', 'border-surface-100 bg-surface-50': templateEditorStore.activeTemplateField !== 'Static image' }"
            @click="selectField('Static image');showStaticOption1 = false;"
          >
            <font-awesome-icon icon="fa-light fa-image" size="lg" style="--fa-primary-color: #009ee2; --fa-secondary-color: #009ee299; --fa-secondary-opacity: 0.6;" />
            <p class="font-poppins text-surface-600 text-lg">
              {{ $t('Cp_createTemplate_editorTemplateFields.image') }}
            </p>
          </div>
          <div
            class="px-5 pl-14 h-[62px] flex items-center gap-2 rounded-lg shadow-sm w-full border font-poppins text-surface-500 cursor-pointer transition-transform duration-300 hover:bg-primary-50 border-surface-100 bg-surface-50"
            @click="showTimestamp ? showTimestamp = false : showTimestamp = true;showStaticOption1 = false;templateEditorStore.activeTemplateField = ''"
          >
            <font-awesome-icon icon="fa-light fa-calendar-clock" size="lg" style="--fa-primary-color: #009ee2; --fa-secondary-color: #009ee299; --fa-secondary-opacity: 0.6;" />
            <p class="font-poppins text-surface-600 text-lg">
              {{ $t('Cp_createTemplate_editorTemplateFields.timestamp') }}
            </p>

            <font-awesome-icon icon="fa-light fa-caret-right transition-all duration-300" size="lg" :class="{ 'rotate-90': showTimestamp }" />
          </div>
          <div v-if="showTimestamp" class="flex flex-col gap-2">
            <div
              class="px-5 pl-24 h-[62px] flex items-center gap-2 rounded-lg shadow-sm w-full border font-poppins text-surface-500 cursor-pointer transition-transform duration-300 hover:bg-primary-50"
              :class="{ 'border-primaryBlue bg-primary-50': templateEditorStore.activeTemplateField === 'Static date', 'border-surface-100 bg-surface-50': templateEditorStore.activeTemplateField !== 'Static date' }"
              @click="selectField('Static date');showStaticOption1 = false;"
            >
              <font-awesome-icon icon="fa-light fa-calendar" size="lg" style="--fa-primary-color: #009ee2; --fa-secondary-color: #009ee299; --fa-secondary-opacity: 0.6;" />
              <p class="font-poppins text-surface-600 text-lg">
                {{ $t('Cp_createTemplate_editorTemplateFields.date') }}
              </p>
            </div>
            <div
              class="px-5 pl-24 h-[62px] flex items-center gap-2 rounded-lg shadow-sm w-full border font-poppins text-surface-500 cursor-pointer transition-transform duration-300 hover:bg-primary-50"
              :class="{ 'border-primaryBlue bg-primary-50': templateEditorStore.activeTemplateField === 'Static time', 'border-surface-100 bg-surface-50': templateEditorStore.activeTemplateField !== 'Static time' }"
              @click="selectField('Static time');showStaticOption1 = false;"
            >
              <font-awesome-icon icon="fa-light fa-clock" size="lg" style="--fa-primary-color: #009ee2; --fa-secondary-color: #009ee299; --fa-secondary-opacity: 0.6;" />
              <p class="font-poppins text-surface-600 text-lg">
                {{ $t('Cp_createTemplate_editorTemplateFields.time') }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { uuid } from 'vue-uuid'
import { useConfirm } from 'primevue/useconfirm'
import { activeTextStyles, templateEditorStore } from '@/composables/useTemplateEditorData'
import canvasService from '@/composables/useTemplateCanvas'
import { templateGeneralInformation } from '~/composables/useTemplateCreationData'

const showFormFields = ref(false)
const showDataFields = ref(false)
const showDatasetOptions = ref(false)
const showDatasetOptions2 = ref(false)
const showStaticOption1 = ref(false)
const selectedDatasetOption = ref('')
const selectedDatasetOption2 = ref('')
const staticOption1Val = ref()
watch(selectedDatasetOption, (val) => {
  if (val)
    selectField('Data field', val)
})
watch(selectedDatasetOption2, (val) => {
  if (val)
    selectField('Dataset image', val)
})
watch(staticOption1Val, (val) => {
  if (val)
    selectField('Static text', val)
})
const showFormFieldNameInput = ref('')
const formFieldForNameInput = ref('')
const formFieldNameInputValue = ref('')

watch(formFieldNameInputValue, (val) => {
  if (val && formFieldForNameInput)
    selectField(formFieldForNameInput.value, val)
})
watch(formFieldForNameInput, () => {
  formFieldNameInputValue.value = ''
})
const showStaticFields = ref(false)
const showTimestamp = ref(false)
const showFormTimestamp = ref(false)
const fieldToDelete = ref(false)
const deleteText = ref('')
const confirm = useConfirm()

watch(showFormFields, (val) => {
  if (val) {
    showStaticFields.value = false
    showDataFields.value = false
    showStaticOption1.value = false
    formFieldForNameInput.value = false
    templateEditorStore.activeTemplateField = false
  }
})
watch(showStaticFields, (val) => {
  if (val) {
    showFormFields.value = false
    showDataFields.value = false
    showStaticOption1.value = false
    formFieldForNameInput.value = false
    templateEditorStore.activeTemplateField = false
  }
})
watch(showDataFields, (val) => {
  if (val) {
    showStaticFields.value = false
    showFormFields.value = false
    showStaticOption1.value = false
    formFieldForNameInput.value = false
    templateEditorStore.activeTemplateField = false
  }
})

function duplicateField(field) {
  const canvas = canvasService.getCanvas()
  if (canvas) {
    const objs = canvas._objects
    objs.forEach((obj) => {
      if (obj.hash === field.hash) {
        if (obj?._element && !obj.stroke && !obj.isAlertIcon) {
          fabric.Image.fromURL(
            'https://placehold.co/300x200?text=Image'
            , (myImg) => {
              myImg.set({
                cornerStyle: 'circle',
                borderColor: '#00000066',
                cornerColor: '#119bd6',
                transparentCorners: false,
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
                lockScalingFlip: true,
              })
              myImg.setControlsVisibility({ mtr: false })

              const fieldToAdd = { fieldType: myImg.fieldType, name: myImg.id, hash: myImg.hash, page: myImg.pageNo,
              }
              const allFields = []
              templateEditorStore.addedFields.forEach((f) => {
                allFields.push(JSON.parse(JSON.stringify(f)))
              })
              allFields.push(fieldToAdd)

              templateEditorStore.addedFields = allFields
              canvas.renderAll()

              myImg.on('mouseover', (e) => {
                if (!templateEditorStore.activeAdvancedPointer)
                  return
                canvas.add(new fabric.Line([100, 1000, 100, 5000], {
                  left: e.target.left,
                  top: 0,
                  stroke: '#3978eb',
                  id: e.target.hash,
                  fieldType: myImg.fieldType,

                }))
                canvas.add(new fabric.Line([1000, 100, 2000, 100], {
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

                const objs = canvas._objects
                canvas._objects = objs.filter((obj) => {
                  if (obj?.stroke === '#3978eb' && obj?.id === e.target?.hash && !e.target.displayGuide)
                    return false
                  else
                    return true
                })

                canvas.renderAll()
              })

              canvas.add(myImg)
              canvas.renderAll()
              setTimeout(() => selectAddedField({ ...fieldToAdd, obj: myImg }), 50)
            },
          )
        }
        else if (obj?.type === 'textbox') {
          const textEle = new templateEditorStore.fabric.Textbox(
          `${templateEditorStore.fieldToAdd.name}`,
          {
            cornerStyle: 'circle',
            borderColor: '#00000066',
            cornerColor: '#119bd6',

            transparentCorners: false,
            transparentBorders: false,
            width: obj.width,
            top: 20,
            left: 20,
            scaleX: obj.scaleX,
            scaleY: obj.scaleY,
            fill: obj.fill,
            fontFamily: obj.fontFamily,
            fontSize: obj.fontSize,
            fontStyle: obj.fontStyle,
            underline: obj.underline,
            fontWeight: obj.fontWeight,
            textAlign: obj.textAlign,
            fieldType: field.fieldType,
            charSpacing: obj.charSpacing,
            id: obj.id,
            name: field.name,
            hash: uuid.v1(),
            pageNo: obj.pageNo,
            editable: false,
            text: obj.text,
            lockScalingFlip: true,
          },
          )
          textEle.setControlsVisibility({
            mt: false, // middle top
            // mb: false, // middle bottom
            ml: false, // middle left
            // mr: false, // middle right
            bl: false, // bottom left
            br: false, // bottom right
            tl: false, // top left
            tr: false, // top right
            mtr: false, // middle top rotate
          })

          const fieldToAdd = { ...field, fieldType: field.fieldType, name: field.name, hash: textEle.hash, page: textEle.pageNo, obj: textEle }

          const allFields = []
          templateEditorStore.addedFields.forEach((f) => {
            allFields.push(JSON.parse(JSON.stringify(f)))
          })
          allFields.push(fieldToAdd)
          templateEditorStore.addedFields = allFields

          canvas.renderAll()

          textEle.on('mouseover', (e) => {
            if (!templateEditorStore.activeAdvancedPointer)
              return
            canvas.add(new fabric.Line([100, 1000, 100, 5000], {
              left: e.target.left,
              top: 0,
              stroke: '#3978eb',
              id: e.target.hash,
              fieldType: textEle.fieldType,
              selectable: false,
            }))
            canvas.add(new fabric.Line([1000, 100, 2000, 100], {
              left: 0, // event.absolutePointer.x,
              top: e.target.top + (Number.parseFloat(e.target.height) * e.target.scaleY),
              stroke: '#3978eb',
              id: e.target.hash,
              fieldType: textEle.fieldType,
              selectable: false,
            }))
          })

          textEle.on('mouseout', (e) => {
            if (!templateEditorStore.activeAdvancedPointer)
              return

            const objs = canvas._objects
            canvas._objects = objs.filter((obj) => {
              if (obj.stroke === '#3978eb' && obj?.id === e.target.hash && !e.target.displayGuide)
                return false
              else
                return true
            })

            canvas.renderAll()
          })
          canvas.add(textEle)

          canvas.renderAll()
          canvas.setActiveObject(textEle)
          canvas.renderAll()
          setTimeout(() => selectAddedField(fieldToAdd), 50)
        }
        else {
          const ele = new templateEditorStore.fabric.Text(
        `${obj.text}`,
        {
          cornerStyle: 'circle',
          borderColor: '#00000066',
          cornerColor: '#119bd6',
          transparentCorners: false,
          top: 20,
          left: 20,
          scaleX: obj.scaleX,
          scaleY: obj.scaleY,
          fill: obj.fill,
          fontFamily: obj.fontFamily,
          fontSize: obj.fontSize,
          fontStyle: obj.fontStyle,
          underline: obj.underline,
          fontWeight: obj.fontWeight,
          charSpacing: obj.charSpacing,
          textAlign: obj.textAlign,
          fieldType: field.fieldType,
          id: obj.id,
          name: field.name,
          hash: uuid.v1(),
          pageNo: obj.pageNo,
          lockScalingFlip: true,
        },
          )
          ele.setControlsVisibility({ mt: false, mb: false, mr: false, ml: false, mtr: false })
          canvas.add(ele)

          const fieldToAdd = { ...field, fieldType: field.fieldType, name: field.name, hash: ele.hash, page: ele.pageNo, obj: ele }
          const allFields = []
          templateEditorStore.addedFields.forEach((f) => {
            allFields.push(JSON.parse(JSON.stringify(f)))
          })
          allFields.push(fieldToAdd)
          templateEditorStore.addedFields = allFields

          ele.on('mouseover', (e) => {
            if (!templateEditorStore.activeAdvancedPointer)
              return
            canvas.add(new fabric.Line([100, 1000, 100, 5000], {
              left: e.target.left,
              top: 0,
              stroke: '#3978eb',
              id: e.target.hash,
              fieldType: ele.fieldType,
            }))
            canvas.add(new fabric.Line([1000, 100, 2000, 100], {
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

            const objs = canvas._objects
            canvas._objects = objs.filter((obj) => {
              if (obj.stroke === '#3978eb' && obj?.id === e.target.hash && !e.target.displayGuide)
                return false
              else
                return true
            })

            canvas.renderAll()
          })

          canvas.setActiveObject(ele)
          canvas.renderAll()
          setTimeout(() => selectAddedField(fieldToAdd), 50)
        }
      }
    })
  }
}

function deleteField() {
  const canvas = canvasService.getCanvas()
  if (canvas) {
    canvas._objects = canvas._objects.filter((obj) => {
      if (obj?.hash === fieldToDelete?.value?.hash || obj.id === fieldToDelete?.value?.hash || obj?.checkboxGroupHash === fieldToDelete?.value?.hash)
        return false
      else
        return true
    })

    const fieldsS = templateEditorStore.addedFields.filter(f => f?.hash !== fieldToDelete?.value?.hash)
    templateEditorStore.addedFields = fieldsS.map(f => JSON.parse(JSON.stringify (f)))
    canvas.discardActiveObject()
    canvas.renderAll()
    templateEditorStore.showOptionsBar = false
    deleteText.value = ''
  }
}
watch(() => templateEditorStore.fieldToAdd, (val) => {
  if (!val?.id) {
    showDatasetOptions.value = false
    selectedDatasetOption.value = ''
    showDatasetOptions2.value = false
    selectedDatasetOption2.value = ''
    showStaticOption1.value = false
    staticOption1Val.value = ''
    formFieldForNameInput.value = ''
    showFormFieldNameInput.value = false
  }
})

function selectField(field, option) {
  // clear refs in case of Data field
  // showDatasetOptions.value = false
  // selectedDatasetOption.value = ''

  const canvas = canvasService.getCanvas()
  if (canvas) {
    canvas.discardActiveObject()
    canvas.renderAll()
    templateEditorStore.activeTemplateField = field
    if (field === 'Data field' || field === 'Dataset image') {
      templateEditorStore.fieldToAdd = { name: option || 'Select a data field', type: field, id: option || 'Lorem ipsum' }
    }
    else if (field === 'Static text') {
      templateEditorStore.fieldToAdd = { name: option || 'Add text', type: field, id: option || 'Lorem ipsum' }
    }
    else if (field === 'Static date') {
      templateEditorStore.fieldToAdd = { name: 'MM/DD/YYYY', type: field, id: 'MM/DD/YYYY' }
    }
    else if (field === 'Static time') {
      templateEditorStore.fieldToAdd = { name: 'HH:MM:SS', type: field, id: 'HH:MM:SS' }
    }
    else if (field === 'Static image') {
      templateEditorStore.fieldToAdd = { name: 'Select image', type: field, id: 'Lorem ipsum' }
    }
    else if (field === 'Form text') {
      templateEditorStore.fieldToAdd = { name: option || 'Add field name', type: field, id: option || 'Lorem ipsum' }
    }
    else if (field === 'Form long text') {
      templateEditorStore.fieldToAdd = { name: option || 'Long-text', type: field, id: option || 'Lorem ipsum' }
    }
    else if (field === 'Form image') {
      templateEditorStore.fieldToAdd = { name: option || 'Add field name', type: field, id: option || 'Lorem ipsum' }
    }
    else if (field === 'Form date') {
      templateEditorStore.fieldToAdd = { name: option || 'Add field name', type: field, id: option || 'Lorem ipsum', dateFormat: 'MM/DD/YYYY' }
    }
    else if (field === 'Form time') {
      templateEditorStore.fieldToAdd = { name: option || 'Add field name', type: field, id: option || 'Lorem ipsum', timeFormat: 'HH:MM:SS' }
    }
    else if (field === 'Form list') {
      templateEditorStore.fieldToAdd = { name: option || 'Add field name', type: field, id: option || 'Lorem ipsum' }
    }
    else if (field === 'Form checkbox group') {
      templateEditorStore.fieldToAdd = { name: option || 'Add field name', type: field, id: option || 'Lorem ipsum', designs: {
        yes: 'https://docspawn-bucket-1.s3.eu-central-1.amazonaws.com/docspawn-bucket-1/cb212f15-9a46-420d-b091-6f9f8096a048_yes1.png',
        no: 'https://docspawn-bucket-1.s3.eu-central-1.amazonaws.com/docspawn-bucket-1/4cc552c3-7ae4-407f-a7f3-33f3a47aa9d8_No3.png',
      } }
    }
    else { templateEditorStore.fieldToAdd = { name: field, type: field, id: field } }
    templateEditorStore.showOptionsBar = true
  }
}

function selectAddedField(field) {
  const canvas = canvasService.getCanvas()
  if (canvas) {
    canvas.discardActiveObject()
    canvas.renderAll()
    if (field?.fieldType === 'Form checkbox group') {
      let obj = {}
      const allObjs = canvas?.getObjects()
      allObjs?.forEach((r) => {
        if (obj?.checkboxIdentifierHash)
          return
        if (r?.id !== 'checkboxIdNoIcon' && r?.hash === field?.hash) {
          obj = r
          canvas.discardActiveObject()
          canvas.renderAll()
        }
      })

      if (field.page !== templateEditorStore.activePageForCanvas) {
        templateEditorStore.activePageForCanvas = field.page
        setTimeout(() => {
          const sel = new fabric.ActiveSelection(canvas.getObjects()?.filter(f => f?.hash === obj?.hash || f?.checkboxGroupHash === obj?.hash), {
            canvas,
            cornerStyle: 'circle',
            borderColor: '#00000066',
            cornerColor: '#119bd6',
            transparentCorners: false,
            hash: obj?.hash,
            lockScalingFlip: true,
          })
          sel.setControlsVisibility({ mtr: false })
          canvas.setActiveObject(sel)
          canvas.requestRenderAll()
          canvas.renderAll()
        }, 500)
      }
      else {
        const sel = new fabric.ActiveSelection(canvas.getObjects()?.filter(f => f?.hash === obj?.hash || f?.checkboxGroupHash === obj?.hash), {
          canvas,
          cornerStyle: 'circle',
          borderColor: '#00000066',
          cornerColor: '#119bd6',
          transparentCorners: false,
          hash: obj?.hash,
        })
        sel.setControlsVisibility({ mtr: false })
        canvas.setActiveObject(sel)
        canvas.requestRenderAll()
        canvas.renderAll()
      }
      templateEditorStore.selectedAddedField = { ...field }
      templateEditorStore.showOptionsBar = true
    }
    else {
      canvas._objects.forEach((obj) => {
        if (obj.hash === field.hash) {
          if (field.page !== templateEditorStore.activePageForCanvas) {
            templateEditorStore.activePageForCanvas = field.page
            setTimeout(() => {
              canvas.setActiveObject(obj)
              canvas.renderAll()
            }, 500)
          }
          else {
            canvas.setActiveObject(obj)
            canvas.renderAll()
          }

          templateEditorStore.selectedAddedField = { ...field }
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
  }
}

function confirm2(event) {
  confirm.require({
    target: event.currentTarget,
    message: ' Do you want to delete this field?',
    group: 'confirmFieldDeletion',
    icon: 'pi pi-info-circle',
    rejectClass: 'p-button-secondary p-button-outlined p-button-sm text-black  ',
    acceptClass: ' p-button-sm bg-surface-500 hover:bg-surface-500 ring-0 focus:ring-0 border-none ',
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
