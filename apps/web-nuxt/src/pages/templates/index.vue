<template>
  <div class="h-full w-full bg-white rounded-lg overflow-scroll no-scrollbar">
    <div class="px-8 py-8 flex flex-col gap-2 ">
      <div class="px-3 py-2">
        <h2 class="font-semibold text-surface-600 text-2xl">
          Templates
        </h2>

        <div class="mt-14">
          <div class="flex w-full items-center justify-between mb-4">
            <div v-tooltip="'Total custom template availbale in your plan: 4'" class="px-5 py-4 rounded-lg shadow-sm w-80 border font-poppins text-surface-500 cursor-pointer transition-transform duration-300 hover:scale-105 border-success hover:bg-green-50" @click="visible = true">
              <p class="font-poppins text-success text-lg text-center">
                Create new template
              </p>
            </div>
          </div>

          <TemplateDataView :templates="templateData" />
        </div>
      </div>

      <FirstStep v-model:visible="visible" @cancel="visible = false" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { templateData } from '~/services/templates.js'
import FirstStep from '~/components/createTemplate/FirstStep.vue'
import TemplateDataView from '~/components/template/TemplateDataView.vue'

const visible = ref(false)
</script>
