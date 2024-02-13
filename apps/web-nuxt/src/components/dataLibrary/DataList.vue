<script setup>
import { onMounted, ref } from 'vue'
import { FilterMatchMode, FilterOperator } from 'primevue/api'
import { CustomerService } from '@/services/sampleData'

const filters = ref()

function initFilters() {
  filters.value = {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    date: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
    },
    image: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    },
    textField: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    },
  }
}

initFilters()

function clearFilter() {
  initFilters()
}
</script>

<template>
  <div class="card">
    <DataTable
      v-model:filters="filters"
      :value="CustomerService"
      paginator
      responsive-layout="scroll"
      show-gridlines
      :rows="10"
      data-key="id"
      filter-display="menu"
      :global-filter-fields="[
        'name',
        'country.name',
        'representative.name',
        'balance',
        'status',
      ]"
    >
      <template #header>
        <div class="flex justify-between">
          <Button
            type="button"
            icon="pi pi-filter-slash"
            label="Clear"
            outlined
            class="p-3 rounded-lg"
            @click="clearFilter()"
          />
          <span class="relative">
            <i
              class="pi pi-search absolute top-2/4 -mt-2 left-3 text-surface-400 dark:text-surface-600"
            />
            <InputText
              v-model="filters.global.value"
              placeholder="Keyword Search"
              class="pl-10 font-normal rounded-lg"
            />
          </span>
        </div>
      </template>
      <template #empty>
        No data found.
      </template>
      <template #loading>
        Loading data. Please wait.
      </template>
      <Column
        header="Filled On"
        filter-field="date"
        data-type="date"
        style="min-width: 10rem"
      >
        <template #body="{ data }">
          {{ data.date }}
        </template>
        <template #filter="{ filterModel }">
          <Calendar
            v-model="filterModel.value"
            date-format="mm/dd/yy"
            placeholder="mm/dd/yyyy"
            mask="99/99/9999"
          />
        </template>
      </Column>
      <Column
        header="Image"
        filter-field="balance"
        data-type="numeric"
        style="min-width: 10rem"
      >
        <template #body>
          <p class="italic">
            https://i0.wp.com/statisticsbyjim.com/wp-content/uploads/2021/11/discrete_data_ex.png?fit=576%2C384&ssl=1
          </p>
        </template>
      </Column>
      <Column
        header="Text Filed"
        filter-field="textField"
        data-type="text"
        style="min-width: 10rem"
      >
        <template #body>
          <p>
            Text field
          </p>
        </template>
        <template #filter="{ filterModel }">
          <InputNumber
            v-model="filterModel.value"
            mode="currency"
            currency="USD"
            locale="en-US"
          />
        </template>
      </Column>
    </DataTable>
  </div>
</template>
