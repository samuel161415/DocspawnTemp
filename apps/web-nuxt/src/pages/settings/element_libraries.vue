<template>
  <div class="w-full h-full ml-4 bg-white overflow-scroll no-scrollbar">
    <div class="px-8 py-8 rounded-lg">
      <!-- <div id="lists">
        <List />
      </div>
      <div id="databases">
        <DataSources />
      </div>
      <div id="integration">
        <Integration />
      </div> -->

      <Accordion v-model:activeIndex="activeIndex">
        <AccordionTab header="List">
          <List />
        </AccordionTab>
        <AccordionTab header="Databases">
          <DataSources />
        </AccordionTab>
        <AccordionTab header="Integration">
          <Integration />
        </AccordionTab>
      </Accordion>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import DataSources from './data_sources'
import List from '~/components/settings/list/list.vue'
import Integration from '~/components/settings/integration/Integration.vue'

const activeIndex = ref(0)

onMounted(() => {
  window.addEventListener('set-active-index', (event) => {
    const targetId = event.detail
    switch (targetId) {
      case 'lists':
        activeIndex.value = 0
        break
      case 'databases':
        activeIndex.value = 1
        break
      case 'integration':
        activeIndex.value = 2
        break
      // Add more cases if you have more sections
    }
  })
})
</script>

<style scoped>
.highlight {
    background-color: yellow;
    color: black;
}
</style>
