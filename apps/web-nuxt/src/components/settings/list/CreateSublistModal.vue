<template>
  <Dialog
    v-model:visible="visible"
    modal
    :draggable="false"
    class="shadow-none w-[50vw] md:ww-[60vw]"
    :style="{ height: '90vh', overflow: 'hidden' }"
  >
    <template #header>
      <div class="flex justify-center items-center ml-5">
        <p class="font-semibold text-xl flex justify-center text-center">
          Create sublist
        </p>
      </div>
    </template>

    <div class="h-full overflow-hidden">
      <!-- Add option to choose between simple list and data source -->
      <div class="flex flex-col align-items-center gap-3 px-5 mb-5 mt-2">
        <label class="font-semibold w-6rem text-lg">List type</label>
        <div class="flex gap-2">
          <button
            :class="[
              listType === 'simple'
                ? 'bg-success text-white hover:bg-success hover:border-success'
                : 'border border-success text-success hover:bg-primary-50  transition-all transform duration-200 ease-in-out ',
              'px-4 py-2 rounded-lg border ',
            ]"
            @click="listType = 'simple'"
          >
            Simple list
          </button>

          <button
            :class="[
              listType === 'dataSource'
                ? 'bg-success text-white hover:bg-success hover:border-success'
                : 'border border-success text-success hover:bg-primary-50  transition-all transform duration-200 ease-in-out ',
              'px-4 py-2 rounded-lg border ',
            ]"
            @click="listType = 'dataSource'"
          >
            Data source
          </button>
        </div>
      </div>

      <!-- Conditional rendering based on listType -->
      <div v-if="listType === 'simple'" class="h-[50vh] overflow-auto px-5">
        <!-- Simple list input fields -->
        <div class="flex flex-col align-items-center gap-2 mb-3">
          <label for="sublistitems" class="font-semibold w-6rem text-lg"
            >Sublist items <span class="text-red-400">*</span></label
          >
          <span class="text-sm text-surface-500"
            >Multiple entries are allowed <br />(Comma separated entries)</span
          >
          <span
            v-if="addClicked && sublistItems.length === 0"
            class="text-sm text-error"
          >
            <font-awesome-icon
              :icon="['fas', 'exclamation-triangle']"
              class="text-error mr-2"
            ></font-awesome-icon>
            You should add items
          </span>
          <Textarea
            id="sublistItems"
            v-model="sublistItem"
            rows="10"
            cols="30"
            placeholder="List item"
            :invalid="addClicked && sublistItem.trim() === ''"
          />
        </div>
        <Button
          label="Add"
          icon="pi pi-plus"
          @click="handleAdd"
          class="bg-success text-white hover:bg-success hover:border-success my-2"
        />
        <DataTable
          :value="sublistItems"
          striped-rows
          show-gridlines
          scrollable
          scrollHeight="400px"
          :reorderableColumns="true"
          @rowReorder="onRowReorder"
          tableStyle="min-width: 30rem"
        >
          <Column
            field="index"
            :body-style="{ margin: '0rem', padding: '0rem' }"
            rowReorder
            style="width: 3%"
          >
            <template #rowreordericon>
              <font-awesome-icon
                :icon="['fas', 'bars']"
                class="cursor-move p-6"
                data-pc-section="rowreordericon"
              ></font-awesome-icon>
            </template>
          </Column>
          <Column
            field="name"
            header="Name"
            :body-style="{ margin: '0rem', padding: '0rem' }"
          >
            <template #body="{ data }">
              <p class="ml-2">{{ data["name"] }}</p>
            </template>
          </Column>
          <Column field="action" header="Actions" style="width: 3%">
            <template #body="{ data }">
              <div class="flex justify-center">
                <font-awesome-icon
                  :icon="['fas', 'trash-alt']"
                  class="text-error cursor-pointer"
                  @click="deleteItem(data)"
                ></font-awesome-icon>
              </div>
            </template>
          </Column>
        </DataTable>
      </div>

      <div class="py-2 h-[60vh] overflow-auto px-5" v-else>
        <!-- Data source input fields -->
        <div class="flex flex-col gap-2 mb-6">
          <label for="tableName" class="font-semibold w-6rem text-lg">
            Table name <span class="text-red-400">*</span>
          </label>
          <span
            v-if="addClicked && tableName === ''"
            class="text-sm text-error"
          >
            <i class="pi pi-exclamation-triangle text-error mr-2"></i>
            Table name should not be empty!
          </span>
          <InputText
            id="tableName"
            v-model="tableName"
            placeholder="Enter table name"
            :invalid="addClicked && tableName === ''"
          />
        </div>
        <label for="tableName" class="font-semibold w-6rem text-lg">
          Upload a file <span class="text-red-400">*</span>
        </label>
        <!-- <span
          v-if="addClicked && selectedFiles.length === 0"
          class="text-sm text-error"
        >
          <i class="pi pi-exclamation-triangle text-error mr-2"></i>
          You should select a file
        </span> -->
        <div
          v-if="selectedFiles.length === 0"
          class="custom-file-upload mt-2"
          :class="{ 'error-border': hasError }"
          @dragover.prevent
          @dragenter.prevent="handleDragEnter"
          @dragleave.prevent="handleDragLeave"
          @drop.prevent="handleDrop"
        >
          <FileUpload
            ref="fileupload"
            mode="basic"
            name="demo[]"
            :multiple="false"
            accept=".csv, .xlsx"
            :max-file-size="100000000"
            choose-label="Browse"
            class="hidden-input"
            @select="onFileSelect"
          />
          <div class="drop-zone py-6">
            <!-- <p class="font-semibold text-lg">{{ title }}</p> -->

            <span v-if="!hasError" class="font-poppins p-4"
              >Drag and drop csv or xlsx files here to upload or</span
            >
            <span v-else class="bg-red-50 p-4 text-red-400 font-poppins">{{
              fileErrorText
            }}</span>
            <Button
              label="Browse"
              icon="pi pi-plus"
              class="font-poppins mt-4"
              @click="triggerFileInput"
            />
          </div>
        </div>

        <div
          v-else
          class="file-list custom-file-upload flex flex-col gap-6 items-center justify-center"
        >
          <ul>
            <li
              v-for="file in selectedFiles"
              :key="file.name"
              class="font-poppins p-4"
            >
              {{ file.name }}
            </li>
          </ul>
          <Button
            severity="danger"
            outlined
            label="Remove"
            icon="pi pi-times"
            class="mt-4 font-poppins"
            @click="removeFiles"
          />
        </div>

        <!-- Table for Data Source Edit -->
        <TableForDataSourceEdit
          v-if="dataSourceFileCompleteJSON?.length > 0"
          :data-source-file-complete-j-s-o-n="dataSourceFileCompleteJSON"
          :data-source-column-names="dataSourceColumnNames"
          :data-source-selected-columns="dataSourceSelectedColumns"
          :data-source-selected-rows="dataSourceSelectedRows"
          @change-selected-columns="handleChangeSelectedColumns"
          @change-selected-rows="handleChangeSelectedRows"
        />
      </div>
    </div>

    <template #footer>
      <div class="flex justify-center items-center mt-6 h-full w-full">
        <Button
          label="Create sublist"
          icon="pi pi-check"
          :class="[
            'flex justify-center text-center',
            {
              'bg-success text-white hover:bg-success hover:border-success':
                (listType === 'simple' && sublistItems.length > 0) ||
                (listType === 'dataSource' &&
                  selectedFiles.length > 0 &&
                  tableName),
              'bg-gray-300 text-gray-500 disable':
                (listType === 'simple' && sublistItems.length === 0) ||
                (listType === 'dataSource' &&
                  (selectedFiles.length === 0 || !tableName)),
            },
          ]"
          @click="handleCreateList"
          v-tooltip.top.html="{
            value: getTooltipMessage(),
            disabled: isTooltipDisabled(),
            escape: false,
          }"
        />
      </div>
    </template>
  </Dialog>
</template>

<script setup>
import { ref, watch } from "vue";
import FileUpload from "primevue/fileupload";
import Button from "primevue/button";
import Textarea from "primevue/textarea";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { useToast } from "primevue/usetoast";
import ExcelJS from "exceljs";
import TableForDataSourceEdit from "../data_source/TableForDataSourceEdit.vue";

const emit = defineEmits(["createSubSubList", "cancel", "error", "success"]);
const props = defineProps({
  level: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

const visible = ref(false);
const listType = ref("simple"); // New state for list type
const sublistItem = ref("");
const sublistItems = ref([]);
const addClicked = ref(false);
const selectedFiles = ref([]);
const hasError = ref(false);
const fileErrorText = ref("");
const toast = useToast();
const dataSourceFileCompleteJSON = ref([]);
const dataSourceColumnNames = ref([]);
const dataSourceSelectedColumns = ref([]);
const dataSourceSelectedRows = ref([]);
const fileName = ref();
const fileupload = ref(null); // Define the fileupload reference
const isSublistSimple = ref(true);
const tableName = ref();

const handleAdd = () => {
  if (sublistItem.value.trim() === "") {
    addClicked.value = true;
    return;
  }

  addClicked.value = false;
  const items = sublistItem.value
    .split(/[\n,]+/)
    .map((item) => item.trim())
    .filter((item) => item !== "")
    .map((item) => ({ name: item }));

  sublistItems.value = sublistItems.value.concat(items);
  if (sublistItems.value.length > 0) {
    sublistItem.value = ""; // Clear the textarea
  }
};

const onFileSelect = (event) => {
  const files = event.files;
  if (files.length > 1) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Only one file allowed",
      life: 3000,
    });
    fileErrorText.value = "Only one file is allowed";
    hasError.value = true;
    setTimeout(() => {
      hasError.value = false;
    }, 3000);
    return;
  }
  const invalidFiles = files.filter((file) => !isValidFileType(file));

  if (invalidFiles.length > 0) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Only CSV or XLSX files are allowed",
      life: 3000,
    });

    fileErrorText.value = "Only CSV or XLSX files are allowed";
    hasError.value = true;
    setTimeout(() => {
      hasError.value = false;
    }, 3000);
    return;
  }

  selectedFiles.value = files;
};

const handleDrop = (event) => {
  const files = Array.from(event.dataTransfer.files);
  if (files.length > 1) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Only one file allowed",
      life: 3000,
    });
    fileErrorText.value = "Only one file is allowed";
    hasError.value = true;
    setTimeout(() => {
      hasError.value = false;
    }, 3000);
    return;
  }
  const invalidFiles = files.filter((file) => !isValidFileType(file));

  if (invalidFiles.length > 0) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Only CSV or XLSX files are allowed",
      life: 3000,
    });
    hasError.value = true;
    setTimeout(() => {
      hasError.value = false;
    }, 3000);
    return;
  }

  selectedFiles.value = files;
};

const triggerFileInput = () => {
  fileupload.value.choose();
};

const removeFiles = () => {
  selectedFiles.value = [];
};

const handleDragEnter = () => {
  hasError.value = false;
};

const handleDragLeave = () => {
  hasError.value = false;
};

const validFileTypes = [".csv", ".xlsx"];

function isValidFileType(file) {
  const fileExtension = file.name.split(".").pop().toLowerCase();
  return validFileTypes.includes(`.${fileExtension}`);
}

function isObjectEmpty(obj) {
  for (const key in obj) {
    if (obj[key] !== "") return false;
  }
  return true;
}

async function processFiles(data, fileType, file) {
  fileName.value = file?.name
    ? file?.name
    : file?.fileName
    ? file?.fileName
    : " ";
  if (data && fileType) {
    if (fileType === "csv") {
      // Dynamically import xlsx
      const Papa = await import("papaparse");
      // Parse CSV file using PapaParse
      const csvText = new TextDecoder().decode(data);

      Papa.parse(csvText, {
        complete: (results) => {
          const parsedData = results.data;
          const filteredData = parsedData.filter(
            (entry) => !isObjectEmpty(entry)
          );

          dataSourceFileCompleteJSON.value = filteredData?.map((f, i) => {
            // return { ...f, auto_index_by_docspawn: i + 1 };
            return { ...f };
          });
          // setCSVFileJSON(filteredData)
        },
        header: true,
      });
    } else if (["xls", "xlsx"].includes(fileType)) {
      try {
        // Read the file as an ArrayBuffer
        const arrayBuffer = await file.arrayBuffer();

        // Create a new workbook and read the file
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(arrayBuffer);

        // Get the first worksheet
        const worksheet = workbook.worksheets[0];

        // Convert worksheet to JSON
        const jsonData = [];
        const headers = [];
        worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
          if (rowNumber === 1) {
            // Assuming the first row contains headers
            row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
              headers.push(cell.text);
            });
          } else {
            const rowData = {};
            row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
              rowData[headers[colNumber - 1]] = cell.text;
            });
            jsonData.push(rowData);
          }
        });

        // return jsonData
        dataSourceFileCompleteJSON.value = jsonData?.map((f, i) => {
          // return { ...f, auto_index_by_docspawn: i + 1 };
          return { ...f };
        });
      } catch (error) {
        console.error("Error processing file:", error);
        throw error;
      }
    }
  }
}

watch(selectedFiles, () => {
  if (selectedFiles?.value?.length > 0) {
    const file = selectedFiles.value[0];
    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const fileType = file.name.split(".").pop().toLowerCase();

        processFiles(data, fileType, file);
      };
      reader.readAsArrayBuffer(file);
    } catch (err) {
      // console.log('err', err)
    }
  } else {
    dataSourceColumnNames.value = [];
    dataSourceFileCompleteJSON.value = [];
    dataSourceSelectedColumns.value = [];
  }
  
});

watch(dataSourceFileCompleteJSON, () => {
  if (dataSourceFileCompleteJSON?.value?.length > 0) {
    const JSON = dataSourceFileCompleteJSON?.value;
    dataSourceColumnNames.value = Object.keys(JSON[0]);
    dataSourceSelectedColumns.value = Object.keys(JSON[0]);
  }
});

const handleCreateList = () => {
  addClicked.value = true;
  if (listType.value === "simple" && sublistItems.value.length > 0) {
    isSublistSimple.value = true;
    sublistItems.value = sublistItems.value.map((item, index) => {
      return {
        id: index,
        title: item.name,
        isHovered: false,
        level: props.level + 1,
        isSublistSimple: false,
        sublists: [],
      };
    });
    emit("createSubSubList", {
      sublistItems: sublistItems.value,
      isSublistSimple: isSublistSimple.value,
    });
    emit("success"); // Emit success event
  } else if (
    listType.value === "dataSource" &&
    selectedFiles.value.length > 0 &&
    tableName.value !== ""
  ) {
    isSublistSimple.value = false;
    // Handle data source creation
    emit("createSubSubList", {
      sublistItems: dataSourceFileCompleteJSON.value,
      isSublistSimple: isSublistSimple.value,
      name: tableName.value,
    });
    emit("success"); // Emit success event
  } else if (listType.value === "dataSource" && !tableName.value) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Table name is required",
      life: 3000,
    });
  }
};

const deleteItem = (data) => {
  sublistItems.value = sublistItems.value.filter(
    (item) => item.name !== data.name
  );
};

// data table
const columns = ref([
  { field: "name", header: "Name" },
  { field: "action", header: "Action" },
]);

const onRowReorder = (event) => {
  sublistItems.value = event.value;
};

const handleChangeSelectedColumns = (data) => {
  dataSourceSelectedColumns.value = data;
};

const handleChangeSelectedRows = (data) => {
  dataSourceSelectedRows.value = data;
};

const getTooltipMessage = () => {
  let messages = [];

  if (listType.value === "simple" && sublistItems.value.length === 0) {
    messages.push("Please enter items in the text area");
  } else if (listType.value === "dataSource") {
    if (selectedFiles.value.length === 0 && !tableName.value) {
      messages.push("Enter table name", "Upload a file");
    } else if (selectedFiles.value.length === 0) {
      messages.push("Please upload a file.");
    } else if (!tableName.value) {
      messages.push("Please provide a table name.");
    }
  }

  if (messages.length === 1) {
    return messages[0];
  } else if (messages.length > 1) {
    return `<ul style="list-style-type: disc; padding-left: 20px;">
              ${messages.map((msg) => `<li style="margin-bottom: 5px;">${msg}</li>`).join("")}
            </ul>`;
  }

  return "";
};

const isTooltipDisabled = () => {
  if (listType.value === "simple" && sublistItems.value.length === 0) {
    return false;
  } else if (
    listType.value === "dataSource" &&
    (selectedFiles.value.length === 0 || !tableName.value)
  ) {
    return false;
  }
  return true;
};
</script>

<style scoped>
.p-dialog {
  padding: 0px !important;
  overflow: hidden !important;
  height: 60vh;
  border: solid blue 1.5px;
}

:deep(.disable) {
  background-color: rgb(169, 167, 167);
  cursor: not-allowed;
  border: none;
}
:deep(.p-dialog-content) {
  overflow-y: hidden !important;
}
</style>
