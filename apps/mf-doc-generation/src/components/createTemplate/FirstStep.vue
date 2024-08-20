<template>
  <Dialog v-model:visible="visible" :draggable="false" modal header="" :style="{ width: '60rem' }">
    <template #header>
      <div class="inline-flex align-items-center justify-content-center gap-2">
        <span class="text-lg text-surface-600 font-poppins font-normal"></span>
      </div>
    </template>
    <div class="flex justify-center items-center">
      <div class="rounded-lg px-6 pb-1">
        <p class="font-semibold text-surface-600 text-2xl mb-7 flex text-center justify-center">
          {{ $t('Cp_createTemplate_firstStep.proceed_question') }}
        </p>
        <div class="flex w-[50rem] h-[40rem] space-x-4">
          <!-- left -->
          <div
            class="flex justify-center items-center w-1/2 h-11/12 border rounded-lg transition-transform duration-300 hover:scale-x-105 hover:border-primaryBlue hover:border-2 cursor-pointer"
            @click="router.push('/templates/create')"
          >
            <p class="font-normal text-surface-500 text-xl mb-5 flex text-center justify-center font-poppins px-4">
              {{ $t('Cp_createTemplate_firstStep.create_own_template') }}
            </p>
          </div>

          <!-- right -->
          <div class="flex justify-center items-center w-1/2 h-11/12 border rounded-lg bg-surface-50 relative z-50 overflow-hidden">
            <p class="font-normal text-surface-400 text-xl mb-5 flex text-center justify-center font-poppins px-4">
              {{ $t('Cp_createTemplate_firstStep.select_model_from_library') }}
            </p>

            <div class="absolute flex justify-center pr-6 items-center overflow-hidden bottom-6 right-14 bg-primaryBlue h-14 w-80 text-white text-lg font-bold transform translate-x-1/2 -translate-y-1/2 -rotate-45">
              {{ $t('Cp_createTemplate_firstStep.coming_soon') }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </Dialog>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const emit = defineEmits()
const router = useRouter()
const visible = ref(false)

function handleTemplateChoice() {
  emit('updateCreateNewTemplate', true)
}
</script>
