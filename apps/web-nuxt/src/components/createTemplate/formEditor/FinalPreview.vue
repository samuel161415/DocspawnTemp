<template>
  <Dialog
    v-model:visible="showPreview" modal :draggable="false"
    :style="mobile ? { width: '25rem' } : { width: '100rem' }" :pt="{
      header: {
        class: ['flex items-center justify-between',
                'shrink-0', 'p-6', `pb-${mobile ? '0' : ''}`, 'border-t-0', 'rounded-tl-lg', 'rounded-tr-lg', 'bg-surface-0 dark:bg-surface-800',
                'text-surface-700 dark:text-surface-0/80'],
      },
    }"
  >
    <template #header>
      <div :class="`${mobile ? '' : 'pl-16'}`" class="flex flex-row gap-3 w-full">
        <div class="flex flex-col">
          <i class="pi pi-mobile"></i>
          <RadioButton v-model="mobile" class="pl-0.5" input-id="mobile1" name="pizza" :value="true" />
        </div>
        <div class="flex flex-col">
          <i class="pi pi-desktop"></i>
          <RadioButton v-model="mobile" class="pl-0.5" input-id="desktop1" name="pizza" :value="false" />
        </div>
        <div class="mx-auto place-self-center flex flex-row">
          <img src="../../../assets/icons/LogoMark.svg" class="w-12 h-auto " />
          <img v-if="!isCollapsed" src="../../../assets/icons/logotext.svg" class="w-36 ml-1 h-auto" />
        </div>
      </div>
    </template>
    <template #default>
      <div :class="`flex flex-col gap-4 ${mobile ? '' : 'pl-16'}`">
        <p :class="` place-self-${mobile ? 'center' : 'start'} text-xl font-semibold form-title-preview`">
          {{
            formTitle }}
        </p>
        <div class="w-80 place-self-center text-justify mb-4">
          {{ formDescription }}
        </div>

        <div :class="`${mobile ? 'w-80' : 'w-full pr-96'} place-self-start flex flex-col gap-5`">
          <div v-for="(formField, index) in fields" :key="formField.id">
            <div v-if="formField.fieldType === 'Form text'" class="flex flex-col gap-2">
              <label :for="`${formField.name}-${index}`">
                <div class="flex flex-row gap-2">
                  <div>{{ formField.name }}</div>
                  <div v-if="formField.mandatory" class="text-red-500">*</div>
                </div>
              </label>
              <InputText
                :id="`${formField.name}-${index}`"
                v-model="formField.state" :class="`${formField.mandatory && formField.state.trim().length === 0 ? 'border-red-700' : ''}`"
              />
              <small v-if="formField.mandatory && formField.state.trim().length === 0" class="text-red-600">This
                Field is required</small>
            </div>

            <div v-else-if="formField.fieldType === 'Form long text'" class="flex flex-col gap-2">
              <label :for="`${formField.name}-${index}`">
                <div class="flex flex-row gap-2">
                  <div>{{ formField.name }}</div>
                  <div v-if="formField.mandatory" class="text-red-500">*</div>
                </div>
              </label>
              <Textarea
                :id="`${formField.name}-${index}`"
                v-model="formField.state" :class="`${formField.mandatory && formField.state.trim().length === 0 ? 'border-red-700' : ''}`" rows="4" cols="30"
              />
              <small v-if="formField.mandatory && formField.state.trim().length === 0" class="text-red-600">This
                Field is required</small>
            </div>

            <div v-else-if="formField.fieldType === 'Form date'" class="flex flex-col gap-2">
              <label :for="`${formField.name}-${index}`">
                <div class="flex flex-row gap-2">
                  <div>{{ formField.name }}</div>
                  <div v-if="formField.mandatory" class="text-red-500">*</div>
                </div>
              </label>
              <Calendar
                v-model="formField.state" show-icon icon-display="input"
                :input-id="`${formField.name}-${index}`"
              />
            </div>

            <div v-else-if="formField.fieldType === 'Form time'" class="flex flex-col gap-2">
              <label :for="`${formField.name}-${index}`">
                <div class="flex flex-row gap-2">
                  <div>{{ formField.name }}</div>
                  <div v-if="formField.mandatory" class="text-red-500">*</div>
                </div>
              </label>
              <Calendar
                :id="`${formField.name}-${index}`" v-model="formField.state" time-only hour-format="12" show-icon
                icon-display="input" icon="pi pi-clock"
              />
            </div>

            <div v-else-if="formField.fieldType === 'Form image'" class="flex flex-col gap-2">
              <label :for="`${formField.name}-${index}`">
                <div class="flex flex-row gap-2">
                  <div>{{ formField.name }}</div>
                  <div v-if="formField.mandatory" class="text-red-500">*</div>
                </div>
              </label>
              <FileUpload
                :id="`${formField.name}-${index}`" v-model="formField.state" mode="basic" name="demo[]"
                accept="image/*" @upload="onUpload"
              />
            </div>

            <div v-else-if="formField.fieldType === 'Form list'" class="flex flex-col gap-2">
              <label :for="`${formField.name}-${index}`">
                <div class="flex flex-row gap-2">
                  <div>{{ formField.name }}</div>
                  <div v-if="formField.mandatory" class="text-red-500">*</div>
                </div>
              </label>
              <InputText
                :id="`${formField.name}-${index}`"
                v-model="formField.state" :class="`${formField.mandatory && formField.state.trim().length === 0 ? 'border-red-700' : ''}`" class="border-red-500"
              />
              <small v-if="formField.mandatory && formField.state.trim().length === 0" class="text-red-600">This
                Field is required</small>
            </div>

            <div v-else-if="formField.fieldType === 'Form checkbox group' " class="flex flex-col gap-2">
              <label :for="`${formField.name}-${index}`">
                <div class="flex flex-row gap-2">
                  <div>{{ formField.name }}</div>
                  <div v-if="formField.mandatory" class="text-red-500">*</div>
                </div>
              </label>
              <InputText
                :id="`${formField.name}-${index}`"
                v-model="formField.state" :class="`${formField.mandatory && formField.state.trim().length === 0 ? 'border-red-700' : ''}`" class="border-red-500"
              />
              <small v-if="formField.mandatory && formField.state.trim().length === 0" class="text-red-600">This
                Field is required</small>
            </div>

            <div v-else-if="formField.fieldType === 'signature'" class="flex flex-col gap-2">
              <label :for="`${formField.name}-${index}`">
                <div class="flex flex-row gap-2">
                  <div>{{ formField.name }}</div>
                  <div v-if="formField.mandatory" class="text-red-500">*</div>
                </div>
              </label>
              <InputText :id="`${formField.name}-${index}`" v-model="formField.state" class="border-red-500" />
            </div>
          </div>
        </div>
      </div>
    </template>
    <template #footer>
      <div :class="`w-full flex ${mobile ? 'justify-center' : 'justify-start pl-16'} mt-5`">
        <Button
          label="Save"
          autofocus @click=""
        />
      </div>
    </template>
  </Dialog>
</template>

<script setup>
const props = defineProps(['showPreview', 'mobile', 'allFormFields'])
const emit = defineEmits(['changePreview'])
const fields = ref()
const showPreview = ref()
const mobile = ref()
onMounted(() => {
  showPreview.value = props.showPreview
  mobile.value = props.mobile
  fields.value = props?.allFormFields
})
watch(() => props?.showPreview, (newVal, oldVal) => {
  if (newVal === oldVal)
    return
  showPreview.value = newVal
})
watch(() => props?.allFormFields, (newVal, oldVal) => {
  if (newVal === oldVal)
    return
  fields.value = newVal
})
watch(showPreview, (newVal) => {
  emit('changePreview', newVal)
})
</script>
