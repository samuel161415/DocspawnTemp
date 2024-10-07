<template>
  <div
    v-if="templateGeneralInformation?.useCase === 'Form to doc'" class="px-5 h-[62px] flex items-center gap-2 rounded-lg shadow-sm w-full border font-poppins text-surface-500 cursor-pointer transition-transform duration-300 hover:bg-primary-50 border-surface-100 bg-surface-50" @click="() => {
      //   showFormFields ? showFormFields = false : showFormFields = true;
      emit('setShowFieldsToAdd')
    }"
  >
    <font-awesome-icon icon="fa-light fa-file-lines" size="lg" style="--fa-primary-color: #009ee2; --fa-secondary-color: #009ee299; --fa-secondary-opacity: 0.6;" />
    <p class="font-poppins text-surface-600 text-lg">
      {{ $t('Cp_createTemplate_editorTemplateFields.form_fields') }}
    </p>
    <font-awesome-icon icon="fa-light fa-caret-right transition-all duration-300" size="lg" :class="{ 'rotate-90': props.showFieldsToAdd === 'Formfield' }" />
  </div>
  <div v-if="props.showFieldsToAdd === 'Formfield'" class="flex flex-col gap-2">
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
        Date & time
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

    <div class="px-5 pl-14 h-[62px] flex flex-col justify-center py-2 gap-2 rounded-lg shadow-sm w-full border font-poppins text-surface-500 cursor-pointer transition-transform duration-300 hover:bg-primary-50" :class="{ 'border-primaryBlue bg-primary-50': templateEditorStore.activeTemplateField === 'Form signature', 'border-surface-100 bg-surface-50': templateEditorStore.activeTemplateField !== 'Form signature' }">
      <div class="flex items-center gap-2">
        <font-awesome-icon icon="fa-light fa-file-signature" size="lg" style="--fa-primary-color: #009ee2; --fa-secondary-color: #009ee299; --fa-secondary-opacity: 0.6;" />
        <p class="font-poppins text-surface-600 text-lg">
          {{ $t('Cp_createTemplate_editorTemplateFields.signature') }}
        </p>
        <Chip :label="$t('Cp_createTemplate_editorTemplateFields.coming_soon')" class="bg-primary-50 text-primary-500 text-xs py-0" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { templateGeneralInformation } from '~/composables/useTemplateCreationData'

const props = defineProps(['showFieldsToAdd'])
const emit = defineEmits(['setShowFieldsToAdd', 'selectField'])
const formFieldForNameInput = ref('')
const formFieldNameInputValue = ref('')
const showFormTimestamp = ref(false)
watch(() => props.showFieldsToAdd, (val) => {
  if (val !== 'Formfield') {
    formFieldForNameInput.value = ''
    formFieldNameInputValue.value = ''
  }
})
watch(formFieldNameInputValue, (val) => {
  if (val && formFieldForNameInput)
    emit('selectField', formFieldForNameInput.value, val)
})
watch(formFieldForNameInput, () => {
  formFieldNameInputValue.value = ''
})
</script>
