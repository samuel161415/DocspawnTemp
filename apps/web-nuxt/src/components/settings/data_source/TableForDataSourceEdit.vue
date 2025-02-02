<template>
  <div class="card p-fluid mt-8">
    <DataTable
      v-if="props?.tableViewType === 'Editable View'"
      ref="dt"
      v-model:selection="selectedRows"
      :value="completeData?.slice(1)"
      :frozenValue="completeData?.length ? [completeData[0]] : []"
      lazy
      :paginator="selectedRows?.length > 0"
      :rows="10"
      :rowsPerPageOptions="[10, 25, 50]"
      paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
      currentPageReportTemplate="{first} to {last} of {totalRecords}"
      :first="first"
      data-key="auto_index_by_docspawn"
      :total-records="totalRecords"
      :loading="loading"
      :select-all="selectAll"
      table-style="min-width: 75rem"
      @page="onPage($event)"
      @sort="onSort($event)"
      @select-all-change="onSelectAllChange"
      @row-select="onRowSelect"
      @row-unselect="onRowUnselect"
      scrollable
      scrollHeight="400px"
    >
      <Column selection-mode="multiple" header-style="width: 3rem" />

      <Column
        v-for="(columnName, index) in props?.dataSourceColumnNames"
        :key="index"
        :field="columnName"
        class="mx-2"
      >
        <template #header>
          <div class="flex flex-col items-center gap-2">
            <input
              type="checkbox"
              :value="selectedColumns?.includes(columnName)"
              :checked="selectedColumns?.includes(columnName)"
              binary
              variant="filled"
              @change="toggleColumnSelection(columnName)"
            />
            <p class="font-poppins whitespace-nowrap">
              {{ columnName }}
            </p>
          </div>
        </template>
        <template #body="{ data, field, frozenRow }">
          <p
            class="font-poppins whitespace-nowrap"
            :class="{ 'font-bold': frozenRow }"
          >
            {{ data[field] }}
          </p>
        </template>
      </Column>
    </DataTable>
    <DataTable
      v-else
      ref="dt"
      :value="selectedRows?.slice(1)"
      :frozenValue="selectedRows?.length ? [selectedRows[0]] : []"
      lazy
      :paginator="selectedRows?.length > 0"
      :rows="5"
      :rowsPerPageOptions="[5, 10, 25]"
      paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
      currentPageReportTemplate="{first} to {last} of {totalRecords}"
      :first="first"
      data-key="auto_index_by_docspawn"
      :total-records="totalRecords"
      :loading="loading"
      :select-all="selectAll"
      table-style="min-width: 75rem"
      scrollable
      scrollHeight="300px"
      @page="onPage($event)"
      @sort="onSort($event)"
      class=""
    >
      <Column
        v-for="(columnName, index) in selectedColumns"
        :key="index"
        :field="columnName"
      >
        <template #header>
          <div class="flex flex-col items-center gap-2">
            <p class="font-poppins whitespace-nowrap">
              {{ columnName }}
            </p>
          </div>
        </template>
        <template #body="{ data, field, frozenRow }">
          <p
            class="font-poppins whitespace-nowrap"
            :class="{ 'font-bold': frozenRow }"
          >
            {{ data[field] }}
          </p>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

const props = defineProps([
  "dataSourceFileCompleteJSON",
  "dataSourceColumnNames",
  "dataSourceSelectedColumns",
  "dataSourceSelectedRows",
  "tableViewType",
]);
const emit = defineEmits(["changeSelectedColumns", "changeSelectedRows"]);

const selectedColumns = ref(
  props?.dataSourceSelectedColumns ? props?.dataSourceSelectedColumns : []
);

const dt = ref();
const loading = ref(false);
const totalRecords = ref(0);
const completeData = ref();
const selectedRows = ref();
const selectAll = ref(false);
const first = ref(0);

const lazyParams = ref({});

watch(selectedColumns, (newVal) => {
  emit("changeSelectedColumns", newVal);
});
watch(selectedRows, (newVal) => {
  emit("changeSelectedRows", newVal);
});

onMounted(() => {
  loading.value = true;

  lazyParams.value = {
    first: 0,
    rows: 10,
    sortField: null,
    sortOrder: null,
  };

  loadLazyData();

  completeData.value = props?.dataSourceFileCompleteJSON;
  selectedRows.value =
    props?.dataSourceSelectedRows?.length > 0
      ? props?.dataSourceSelectedRows
      : props?.dataSourceFileCompleteJSON;
  selectedColumns.value = props?.dataSourceSelectedColumns;
});
const showPaginator = computed(() => {
  return props.selectedRows?.length > 5;
});

function loadLazyData(event) {
  loading.value = true;
  lazyParams.value = {
    ...lazyParams.value,
    first: event?.first || first.value,
  };

  setTimeout(() => {
    completeData.value = props?.dataSourceFileCompleteJSON;
    totalRecords.value = props?.dataSourceColumnNames?.length;
    loading.value = false;
  }, Math.random() * 1000 + 250);
}
function onPage(event) {
  lazyParams.value = event;
  loadLazyData(event);
}
function onSort(event) {
  lazyParams.value = event;
  loadLazyData(event);
}

function onSelectAllChange(event) {
  const cData = JSON.parse(JSON.stringify(completeData?.value));
  if (event.checked) {
    selectedRows.value = cData;
    selectAll.value = true;
  } else {
    selectedRows.value = [];
    selectAll.value = false;
  }
}

function onRowSelect(event) {
  // single row selection {data}=event
}

function onRowUnselect(event) {
  // single row unselection {data}=event
}

function toggleColumnSelection(columnName) {
  const index = selectedColumns.value.indexOf(columnName);
  if (index > -1) selectedColumns.value.splice(index, 1); // Remove column
  else selectedColumns.value.push(columnName); // Add column
}
</script>
