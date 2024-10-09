<template>
  <div
    class="px-5 h-[62px] flex items-center gap-2 rounded-lg shadow-sm w-full border font-poppins text-surface-500 cursor-pointer transition-transform duration-300 hover:bg-primary-50 border-surface-100 bg-surface-50" @click="() => {
      //   showStaticFields ? showStaticFields = false : showStaticFields = true;
      emit('setShowFieldsToAdd')
    }"
  >
    <font-awesome-icon icon="fa-light fa-snowflake" size="lg" style="--fa-primary-color: #009ee2; --fa-secondary-color: #009ee299; --fa-secondary-opacity: 0.6;" />

    <p class="font-poppins text-surface-600 text-lg">
      {{ $t('Cp_createTemplate_editorTemplateFields.static_fields') }}
    </p>
    <font-awesome-icon icon="fa-light fa-caret-right transition-all duration-300" size="lg" :class="{ 'rotate-90': props.showFieldsToAdd === 'Staticfield' }" />
  </div>
  <div v-if="props.showFieldsToAdd === 'Staticfield'" class="flex flex-col gap-2">
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
</template>

<script setup>
import { templateEditorStore } from '@/composables/useTemplateEditorData'

const props = defineProps(['showFieldsToAdd'])
const emit = defineEmits(['setShowFieldsToAdd', 'selectField'])
function selectField(val) {
  emit('selectField', val)
}
const showStaticOption1 = ref(false)
const staticOption1Val = ref()
const showTimestamp = ref(false)
watch(() => props.showFieldsToAdd, (val) => {
  if (val !== 'Staticfield') {
    showStaticOption1.value = false
    staticOption1Val.value = ''
    showTimestamp.value = false
  }
})
watch(staticOption1Val, (val) => {
  if (val)
    emit('selectField', 'Static text', val)
})
</script>
