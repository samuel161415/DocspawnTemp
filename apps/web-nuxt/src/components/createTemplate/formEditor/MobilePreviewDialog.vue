<template>
    <!-- TODO: Mobile Preview Dialog -->

    <Dialog v-model:visible="props.showPreview" modal :draggable="false" :style="{ width: '1300px' }" :pt="{
          header: {
            class: ['flex items-center justify-between',
              'shrink-0', 'p-6', 'pb-0', 'border-t-0', 'rounded-tl-lg', 'rounded-tr-lg', 'bg-surface-0 dark:bg-surface-800',
              'text-surface-700 dark:text-surface-0/80']
          }
        }">
        <template #header>
          <div></div>
        </template>
        <template #default>
          <div class="flex flex-col gap-4">
            <p class="place-self-center text-xl font-semibold">{{ props.formTitle }}</p>
            <div class="w-80 place-self-center text-justify mb-4">
              {{ props.formDescription }}
            </div>

            <div class="w-80 place-self-center flex flex-col gap-5">
              <div v-for="(formField, index) in props.formFields" :key="formField.id">


                <div v-if="formField.type === 'text'" class="flex flex-col gap-2">
                  <label :for="`${formField.name}-${index}`">
                    <div class="flex flex-row gap-2">
                      <div>{{ formField.name }}</div>
                      <div v-if="formField.mandatory" class="text-red-500">*</div>
                    </div>
                  </label>
                  <InputText v-model="props.previewFieldStates[index]" :id="`${formField.name}-${index}`" class="border-red-500" :pt="{}" />
                </div>

                <div v-else-if="formField.type === 'multiline-text'" class="flex flex-col gap-2">
                  <label :for="`${formField.name}-${index}`">
                    <div class="flex flex-row gap-2">
                      <div>{{ formField.name }}</div>
                      <div v-if="formField.mandatory" class="text-red-500">*</div>
                    </div>
                  </label>
                  <Textarea :id="`${formField.name}-${index}`" v-model="props.previewFieldStates[index]" rows="4" cols="30" />
                </div>

                <div v-else-if="formField.type === 'number'" class="flex flex-col gap-2">
                  <label :for="`${formField.name}-${index}`">
                    <div class="flex flex-row gap-2">
                      <div>{{ formField.name }}</div>
                      <div v-if="formField.mandatory" class="text-red-500">*</div>
                    </div>
                  </label>
                  <InputNumber :id="`${formField.name}-${index}`" incrementButtonClass="bg-none" v-model="props.previewFieldStates[index]"
                    mode="decimal" showButtons />
                </div>

                <div v-else-if="formField.type === 'date'" class="flex flex-col gap-2">

                  <label :for="`${formField.name}-${index}`">
                    <div class="flex flex-row gap-2">
                      <div>{{ formField.name }}</div>
                      <div v-if="formField.mandatory" class="text-red-500">*</div>
                    </div>
                  </label>
                  <Calendar v-model="props.previewFieldStates[index]" showIcon iconDisplay="input" :inputId="`${formField.name}-${index}`" />
                </div>

                <div v-else-if="formField.type === 'time'" class="flex flex-col gap-2">
                  <label :for="`${formField.name}-${index}`">
                    <div class="flex flex-row gap-2">
                      <div>{{ formField.name }}</div>
                      <div v-if="formField.mandatory" class="text-red-500">*</div>
                    </div>
                  </label>
                  <Calendar :id="`${formField.name}-${index}`" v-model="props.previewFieldStates[index]" timeOnly hourFormat="12" showIcon iconDisplay="input"
                    icon="pi pi-clock" />
                </div>

                <div v-else-if="formField.type === 'email'" class="flex flex-col gap-2">
                  <label :for="`${formField.name}-${index}`">
                    <div class="flex flex-row gap-2">
                      <div>{{ formField.name }}</div>
                      <div v-if="formField.mandatory" class="text-red-500">*</div>
                    </div>
                  </label>
                  <InputText :id="`${formField.name}-${index}`" class="border-red-500" v-model="props.previewFieldStates[index]"/>
                </div>

                <div v-else-if="formField.type === 'image'" class="flex flex-col gap-2">
                  <label :for="`${formField.name}-${index}`">
                    <div class="flex flex-row gap-2">
                      <div>{{ formField.name }}</div>
                      <div v-if="formField.mandatory" class="text-red-500">*</div>
                    </div>
                  </label>
                  <FileUpload mode="basic" name="demo[]" accept="image/*" @upload="onUpload" v-model="props.previewFieldStates[index]"
                    :id="`${formField.name}-${index}`" />
                </div>


                <div v-else-if="formField.type === 'list'" class="flex flex-col gap-2">
                  <label :for="`${formField.name}-${index}`">
                    <div class="flex flex-row gap-2">
                      <div>{{ formField.name }}</div>
                      <div v-if="formField.mandatory" class="text-red-500">*</div>
                    </div>
                  </label>
                  <InputText :id="`${formField.name}-${index}`" class="border-red-500" v-model="props.previewFieldStates[index]" />
                </div>

                <div v-else-if="formField.type === 'checkbox'" class="flex flex-col gap-2">
                  <label :for="`${formField.name}-${index}`">
                    <div class="flex flex-row gap-2">
                      <div>{{ formField.name }}</div>
                      <div v-if="formField.mandatory" class="text-red-500">*</div>
                    </div>
                  </label>
                  <InputText :id="`${formField.name}-${index}`" class="border-red-500" v-model="props.previewFieldStates[index]" />
                </div>

                <div v-else-if="formField.type === 'signature'" class="flex flex-col gap-2">
                  <label :for="`${formField.name}-${index}`">
                    <div class="flex flex-row gap-2">
                      <div>{{ formField.name }}</div>
                      <div v-if="formField.mandatory" class="text-red-500">*</div>
                    </div>
                  </label>
                  <InputText :id="`${formField.name}-${index}`" class="border-red-500" v-model="props.previewFieldStates[index]" />
                </div>


              </div>
            </div>

          </div>
        </template>
        <template #footer>
          <div class="w-full flex justify-center mt-5"><Button label="Save" @click=""
              autofocus /></div>
        </template>
      </Dialog>

</template>

<script setup>
import { defineProps } from 'vue';


const props = defineProps({
  formTitle: {
    type: Object,
    required: true,
  },
  formDescription: {
    type: Object,
    required: true,
  },
  formFields: {
    type: Object,
    required: true,
  },
  previewFieldStates: {
    type: Array,
    required: true,
  },
  showPreview: {
    type: Boolean,
    required: true,
  },
});


const onUpload = () => {
    toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
};

</script>