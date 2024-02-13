<script setup>
import { onMounted, ref } from 'vue'
import { FilterMatchMode, FilterOperator } from 'primevue/api'
import { CustomerService } from '@/services/sampleData'

const filters = ref()
const representatives = ref([
  { name: 'Amy Elsner', image: 'amyelsner.png' },
  { name: 'Anna Fali', image: 'annafali.png' },
  { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
  { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
  { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
  { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
  { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
  { name: 'Onyama Limba', image: 'onyamalimba.png' },
  { name: 'Stephen Shaw', image: 'stephenshaw.png' },
  { name: 'XuXue Feng', image: 'xuxuefeng.png' },
])
const statuses = ref([
  'unqualified',
  'qualified',
  'new',
  'negotiation',
  'renewal',
  'proposal',
])

function initFilters() {
  filters.value = {
    'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
    'name': {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    'country.name': {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    'representative': { value: null, matchMode: FilterMatchMode.IN },
    'date': {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
    },
    'balance': {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    },
    'status': {
      operator: FilterOperator.OR,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    },
  }
}

initFilters()

function formatCurrency(value) {
  return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
}
function clearFilter() {
  initFilters()
}

function getSeverity(status) {
  switch (status) {
    case 'unqualified':
      return 'danger'

    case 'qualified':
      return 'success'

    case 'new':
      return 'info'

    case 'negotiation':
      return 'warning'

    case 'renewal':
      return null
  }
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
        No customers found.
      </template>
      <template #loading>
        Loading customers data. Please wait.
      </template>
      <Column field="name" header="Name" style="min-width: 12rem">
        <template #body="{ data }">
          {{ data.name }}
        </template>
        <template #filter="{ filterModel }">
          <InputText
            v-model="filterModel.value"
            type="text"
            class="p-column-filter"
            placeholder="Search by name"
          />
        </template>
      </Column>
      <Column
        header="Country"
        filter-field="country.name"
        style="min-width: 12rem"
      >
        <template #body="{ data }">
          <div class="flex items-center gap-2">
            <img
              alt="flag"
              src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png"
              :class="`flag flag-${data.country.code}`"
              style="width: 24px"
            >
            <span>{{ data.country.name }}</span>
          </div>
        </template>
        <template #filter="{ filterModel }">
          <InputText
            v-model="filterModel.value"
            type="text"
            class="p-column-filter"
            placeholder="Search by country"
          />
        </template>
        <template #filterclear="{ filterCallback }">
          <Button
            type="button"
            icon="pi pi-times"
            severity="secondary"
            @click="filterCallback()"
          />
        </template>
        <template #filterapply="{ filterCallback }">
          <Button
            type="button"
            icon="pi pi-check"
            severity="success"
            @click="filterCallback()"
          />
        </template>
        <template #filterfooter>
          <div class="px-3 pt-0 pb-3 text-center">
            Customized Buttons
          </div>
        </template>
      </Column>
      <Column
        header="Agent"
        filter-field="representative"
        :show-filter-match-modes="false"
        :filter-menu-style="{ width: '14rem' }"
        style="min-width: 14rem"
      >
        <template #body="{ data }">
          <div class="flex items-center gap-2">
            <img
              :alt="data.representative.name"
              :src="`https://primefaces.org/cdn/primevue/images/avatar/${data.representative.image}`"
              style="width: 32px"
            >
            <span>{{ data.representative.name }}</span>
          </div>
        </template>
        <template #filter="{ filterModel }">
          <MultiSelect
            v-model="filterModel.value"
            :options="representatives"
            option-label="name"
            placeholder="Any"
            class="p-column-filter"
          >
            <template #option="slotProps">
              <div class="flex items-center gap-2">
                <img
                  :alt="slotProps.option.name"
                  :src="`https://primefaces.org/cdn/primevue/images/avatar/${slotProps.option.image}`"
                  style="width: 32px"
                >
                <span>{{ slotProps.option.name }}</span>
              </div>
            </template>
          </MultiSelect>
        </template>
      </Column>
      <Column
        header="Date"
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
        header="Balance"
        filter-field="balance"
        data-type="numeric"
        style="min-width: 10rem"
      >
        <template #body="{ data }">
          {{ formatCurrency(data.balance) }}
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
      <Column
        header="Status"
        field="status"
        :filter-menu-style="{ width: '14rem' }"
        style="min-width: 12rem"
      >
        <template #body="{ data }">
          <Tag :value="data.status" :severity="getSeverity(data.status)" />
        </template>
        <template #filter="{ filterModel }">
          <Dropdown
            v-model="filterModel.value"
            :options="statuses"
            placeholder="Select One"
            class="p-column-filter"
            show-clear
          >
            <template #option="slotProps">
              <Tag
                :value="slotProps.option"
                :severity="getSeverity(slotProps.option)"
              />
            </template>
          </Dropdown>
        </template>
      </Column>

      <!-- Actions Column -->
      <Column header="Actions">
        <template #body>
          <Button
            rounded
            text
            icon="pi pi-pencil"
            class="p-button-rounded border-none p-button-success p-mr-2"
          />
          <Button
            rounded
            icon="pi pi-trash"
            text
            class="p-button-rounded border-none p-button-warning"
          />
        </template>
      </Column>
    </DataTable>
  </div>
</template>
