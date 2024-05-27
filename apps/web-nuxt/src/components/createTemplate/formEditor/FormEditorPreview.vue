<template>
    <Dialog v-model:visible="visible" modal :draggable="false"
      :style="mobile ? { width: '25rem' } : { width: '100rem' }" :pt="{
        header: {
          class: ['flex items-center justify-between',
            'shrink-0', 'p-6', `pb-${mobile ? '0' : ''}`, 'border-t-0', 'rounded-tl-lg', 'rounded-tr-lg', 'bg-surface-0 dark:bg-surface-800',
            'text-surface-700 dark:text-surface-0/80']
        }
      }">
      <template #header>
        <div :class="`${mobile ? '' : 'pl-16'}`" class="flex flex-row gap-3 w-full">
          <div class="flex flex-col">
            <i class="pi pi-mobile"></i>
            <RadioButton class="pl-0.5" v-model="mobile" inputId="mobile1" name="pizza" :value="true" />
          </div>
          <div class="flex flex-col">
            <i class="pi pi-desktop"></i>
            <RadioButton class="pl-0.5" v-model="mobile" inputId="desktop1" name="pizza" :value="false" />
          </div>
          <div class="mx-auto place-self-center flex flex-row">
            <img src="../../../assets/icons/LogoMark.svg" class="w-12 h-auto " />
            <img v-if="!isCollapsed" src="../../../assets/icons/logotext.svg" class="w-36 ml-1 h-auto" />
          </div>
        </div>
      </template>
      <template #default>
        <div :class="`flex flex-col gap-4 ${mobile ? '' : 'pl-16'}`">
          <p :class="` place-self-${mobile ? 'center' : 'start'} text-xl font-semibold form-title-preview`">{{ formTitle }}</p>
          <div class="w-80 place-self-center text-justify mb-4">
            {{ formDescription }}
          </div>
  
          <div :class="`${mobile ? 'w-80' : 'w-full pr-96'} place-self-start flex flex-col gap-5`">
            <div v-for="(formField, index) in formFields" :key="formField.id">
  
              <div v-if="formField.type === 'text'" class="flex flex-col gap-2">
                <label :for="`${formField.name}-${index}`">
                  <div class="flex flex-row gap-2">
                    <div>{{ formField.name }}</div>
                    <div v-if="formField.mandatory" class="text-red-500">*</div>
                  </div>
                </label>
                <InputText
                  :class="`${formField.mandatory && formField.state.trim().length === 0 ? 'border-red-700' : ''}`"
                  v-model="formField.state" :id="`${formField.name}-${index}`" />
                <small v-if="formField.mandatory && formField.state.trim().length === 0" class="text-red-600">This
                  Field is required</small>
              </div>
  
              <div v-else-if="formField.type === 'multiline-text'" class="flex flex-col gap-2">
                <label :for="`${formField.name}-${index}`">
                  <div class="flex flex-row gap-2">
                    <div>{{ formField.name }}</div>
                    <div v-if="formField.mandatory" class="text-red-500">*</div>
                  </div>
                </label>
                <Textarea
                  :class="`${formField.mandatory && formField.state.trim().length === 0 ? 'border-red-700' : ''}`"
                  :id="`${formField.name}-${index}`" v-model="formField.state" rows="4" cols="30" />
                <small v-if="formField.mandatory && formField.state.trim().length === 0" class="text-red-600">This
                  Field is required</small>
              </div>
  
              <div v-else-if="formField.type === 'number'" class="flex flex-col gap-2">
                <label :for="`${formField.name}-${index}`">
                  <div class="flex flex-row gap-2">
                    <div>{{ formField.name }}</div>
                    <div v-if="formField.mandatory" class="text-red-500">*</div>
                  </div>
                </label>
                <InputNumber incrementButtonClass="bg-none" v-model="formField.state"
                  :input-id="`${formField.name}-${index}`" mode="decimal" showButtons />
                <small v-if="formField.mandatory && formField.state === 0" class="text-red-600">This Field is
                  required</small>
              </div>
  
              <div v-else-if="formField.type === 'date'" class="flex flex-col gap-2">
                <label :for="`${formField.name}-${index}`">
                  <div class="flex flex-row gap-2">
                    <div>{{ formField.name }}</div>
                    <div v-if="formField.mandatory" class="text-red-500">*</div>
                  </div>
                </label>
                <Calendar v-model="formField.state" showIcon iconDisplay="input"
                  :inputId="`${formField.name}-${index}`" />
              </div>
  
              <div v-else-if="formField.type === 'time'" class="flex flex-col gap-2">
                <label :for="`${formField.name}-${index}`">
                  <div class="flex flex-row gap-2">
                    <div>{{ formField.name }}</div>
                    <div v-if="formField.mandatory" class="text-red-500">*</div>
                  </div>
                </label>
                <Calendar :id="`${formField.name}-${index}`" timeOnly hourFormat="12" showIcon iconDisplay="input"
                  v-model="formField.state" icon="pi pi-clock" />
              </div>
  
              <div v-else-if="formField.type === 'email'" class="flex flex-col gap-2">
                <label :for="`${formField.name}-${index}`">
                  <div class="flex flex-row gap-2">
                    <div>{{ formField.name }}</div>
                    <div v-if="formField.mandatory" class="text-red-500">*</div>
                  </div>
                </label>
                <InputText
                  :class="`${formField.mandatory && formField.state.trim().length === 0 ? 'border-red-700' : ''}`"
                  v-model="formField.state" :id="`${formField.name}-${index}`" class="border-red-500" />
                <small v-if="formField.mandatory && formField.state.trim().length === 0" class="text-red-600">This
                  Field is required</small>
              </div>
  
              <div v-else-if="formField.type === 'image'" class="flex flex-col gap-2">
                <label :for="`${formField.name}-${index}`">
                  <div class="flex flex-row gap-2">
                    <div>{{ formField.name }}</div>
                    <div v-if="formField.mandatory" class="text-red-500">*</div>
                  </div>
                </label>
                <FileUpload mode="basic" name="demo[]" accept="image/*" @upload="onUpload"
                  :id="`${formField.name}-${index}`" v-model="formField.state" />
              </div>
  
              <div v-else-if="formField.type === 'list'" class="flex flex-col gap-2">
                <label :for="`${formField.name}-${index}`">
                  <div class="flex flex-row gap-2">
                    <div>{{ formField.name }}</div>
                    <div v-if="formField.mandatory" class="text-red-500">*</div>
                  </div>
                </label>
                <InputText
                  :class="`${formField.mandatory && formField.state.trim().length === 0 ? 'border-red-700' : ''}`"
                  :id="`${formField.name}-${index}`" class="border-red-500" v-model="formField.state" />
                <small v-if="formField.mandatory && formField.state.trim().length === 0" class="text-red-600">This
                  Field is required</small>
              </div>
  
              <div v-else-if="formField.type === 'checkbox'" class="flex flex-col gap-2">
                <label :for="`${formField.name}-${index}`">
                  <div class="flex flex-row gap-2">
                    <div>{{ formField.name }}</div>
                    <div v-if="formField.mandatory" class="text-red-500">*</div>
                  </div>
                </label>
                <InputText
                  :class="`${formField.mandatory && formField.state.trim().length === 0 ? 'border-red-700' : ''}`"
                  :id="`${formField.name}-${index}`" class="border-red-500" v-model="formField.state" />
                <small v-if="formField.mandatory && formField.state.trim().length === 0" class="text-red-600">This
                  Field is required</small>
              </div>
  
              <div v-else-if="formField.type === 'signature'" class="flex flex-col gap-2">
                <label :for="`${formField.name}-${index}`">
                  <div class="flex flex-row gap-2">
                    <div>{{ formField.name }}</div>
                    <div v-if="formField.mandatory" class="text-red-500">*</div>
                  </div>
                </label>
                <InputText :id="`${formField.name}-${index}`" class="border-red-500" v-model="formField.state" />
              </div>
  
            </div>
          </div>
  
        </div>
      </template>
      <template #footer>
        <div :class="`w-full flex ${mobile ? 'justify-center' : 'justify-start pl-16'} mt-5`"><Button label="Save"
            @click="saveForm" autofocus /></div>
      </template>
    </Dialog>
  </template>
  
  <script setup>
import { ref } from 'vue';
import { FormFieldsData } from '../../../services/sampleData';

const props = defineProps({
  formTitle: {
    type: Object,
    required: true,
  },
  formDescription: {
    type: Object,
    required: true,
  },
  previewFieldStates: {
    type: Array,
    required: true,
  }
});

const visible = ref();
const formFields = ref();
// const isDraggedOver = ref({});

onMounted(() => {
    // formFieldservice.getformFieldsMini().then((data) => (formFields.value = data));
  formFields.value = FormFieldsData;
//   for (let i = 0; i < formFields.value.length; i++) {
//     isDraggedOver.value[i] = false
//   }

  formFields.value.forEach(field => {
    if (field.type === 'text') {
     field.state = ref('')
    } else if (field.type === 'multiline-text') {
      field.state = ref('');
    } else if (field.type === 'number') {
      field.state = ref(0);
    } else if (field.type === 'date') {
      field.state = ref(new Date());
    } else if (field.type === 'time') {
      field.state = ref(new Date());
    } else if (field.type === 'email') {
      field.state = ref('');
    } else if (field.type === 'image') {
      field.state = ref('');
    } else if (field.type === 'list') {
      field.state = ref('');
    } else if (field.type === 'checkbox') {
      field.state = ref('');
    } else if (field.type === 'signature') {
      field.state = ref('');
    }
  });
});

const emit = defineEmits(['upload', 'save']);

const onUpload = (event) => {
  // Handle file upload
  emit('upload', event);
};

const saveForm = () => {
  // Save form data
  emit('save');
};
</script>
  
  <style scoped>
  /* Add your component-specific styles here */
  </style>
  