<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import DataListView from '~/components/dataLibrary/DataListView.vue'

// const router = useRouter()
const home = ref({
  icon: 'pi pi-home',
  route: '/',
})

const selectedUsecase = ref()
const selectedTemplate = ref()

const use_cases = ref([
  { name: 'From to Doc' },
  { name: 'Data to Doc' },

])
const templates = ref([
  { name: 'Template 1' },
  { name: 'Template 2' },
])

const items = ref([{ label: 'Data Library', route: '/data-library' }])
</script>

<template>
  <div class="h-full w-full bg-stone-100 overflow-scroll">
    <Breadcrumb class="border-none rounded-none" :home="home" :model="items">
      <template #item="{ item, props }">
        <router-link
          v-if="item.route"
          v-slot="{ href, navigate }"
          :to="item.route"
          custom
        >
          <a :href="href" v-bind="props.action" @click="navigate">
            <span class="text-color" :class="[item.icon]" />
            <span
              class="text-primary-500 dark:text-primary-400 font-semibold"
            >{{ item.label }}</span>
          </a>
        </router-link>
        <a v-else :href="item.url" :target="item.target" v-bind="props.action">
          <span class="text-surface-700 dark:text-surface-0/80">{{
            item.label
          }}</span>
        </a>
      </template>
    </Breadcrumb>

    <div class="mx-4 px-8 py-5 shadow rounded-md bg-white">
      <div class="font-semibold text-2xl mb-7 mt-5">
        Data Library
      </div>

      <div class="flex flex-wrap flex-column md:flex-row md:align-items-center gap-2 py-5">
        <div>
          <label for="use_case" class="block text-lg font-medium leading-6 sr-only">Select Use case</label>
          <Dropdown
            v-model="selectedUsecase"
            :options="use_cases" option-label="name"
            placeholder="Select Use case"
            class="w-full h-14 md:w-[14rem] bg-white flex justify-between z-50 rounded pr-2"
          />
        </div>

        <div class="mr-5">
          <label for="location" class="block text-lg font-medium leading-6 sr-only">Select template</label>
          <Dropdown
            v-model="selectedTemplate"
            :options="templates"
            option-label="name"
            placeholder="Select template"
            class=" w-full h-14 md:w-[14rem] flex justify-between rounded pr-2"
          />
        </div>

        <Button label="Preview" outlined class="w-28 h-14 text-primaryBlue justify-center items-center shadow-sm" />
        <Button label="Show data" severity="secondary" class="w-44 text-center bg-primaryBlue h-14 shadow-sm" />
      </div>

      <div class="flex flex-col justify-center text-center mt-10 space-y-2 ">
        <div class="flex flex-wrap flex-column md:flex-row justify-between mx-10 mb-5">
          <div class="text-left">
            <p class="text-lg md:text-xl lg:text-2xl xl:text-2xl font-medium text-left">
              All data related to form
            </p>
            <p class="text-sm md:text-base lg:text-base xl:text-lg font-normal text-gray-500">
              Here you have data of every time the form is filled.
            </p>
          </div>
          <Button label="Export " severity="secondary" class="w-28 rounded-md text-center bg-primaryBlue h-14 shadow" icon="pi pi-download" />
        </div>

        <div class=" shadow-md p-2 mt-5">
          <DataListView />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
