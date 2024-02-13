<script setup>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { ref } from 'vue'

const data = ref(
  [
    {
      id: '1000',
      filledDate: '12/02/2024',
      image: 'bamboo-watch.jpg',
      textfiled: 'textfiled',

    },
    {
      id: '1001',
      filledDate: '12/02/2024',
      image: 'bamboo-watch.jpg',
      textfiled: 'textfiled',

    },
  ],
)
</script>

<template>
  <div class="card">
    <DataTable :value="data" table-style="min-width: 50rem">
      <Column field="filledDate" icon="pi pi-calendar" header="Filled On" header-style="fontSize: 18px; color: #009EE2;" body-style="font-style: italic;" />
      <Column header="Image" header-style="fontSize: 18px; color: #009EE2;">
        <template #body="slotProps">
          <img :src="`https://primefaces.org/cdn/primevue/images/product/${slotProps.data.image}`" :alt="slotProps.data.image" class="w-36 h-18 rounded-md">
        </template>
      </Column>

      <Column field="textfiled" header="Text Filled" header-style="fontSize: 18px; color: #009EE2;" />
      <template #footer>
        <p class="text-sm md:text-base lg:text-base xl:text-lg font-normal text-gray-500 text-right">
          In total there are {{ data ? data.length : 0 }} data.
        </p>
      </template>
    </DataTable>
  </div>
</template>

<style scoped>
.card {
    background: var(--surface-card);
    padding: 2rem;
    border-radius: 20px;
    margin-bottom: 1rem;
}

p {
    line-height: 1.75;
}
</style>
