<template>
  <Dialog v-model:visible="visible" modal :draggable="false" :style="{ width: '40rem' }">
    <template #header>
      <div class="flex justify-center items-center ml-5">
        <p class="font-semibold text-xl flex justify-center text-center">
          Create sublist
        </p>
      </div>
    </template>

    <div class="px-5">
      <div class="flex flex-col align-items-center gap-2 mb-3">
        <label for="sublistitems" class="font-semibold w-6rem text-lg">Sublist items <span class="text-red-400">*</span></label>
        <span class="text-sm text-surface-500">Multiple entries are allowed <br /> (Comma separated entries)</span>

        <Textarea id="sublistItems" v-model="sublistItem" rows="10" cols="30" placeholder="List item" :invalid="isInvalid && sublistItem === ''" />
      </div>

      <Button
        label="Add"
        icon="pi pi-plus"
        class="bg-success text-white hover:bg-success hover:border-success  my-2"
        @click="handleAdd"
      />

      <DataTable
        :value="sublistItems"
        striped-rows
        show-gridlines
        :reorderable-columns="true"
        table-style="min-width: 30rem"
        @row-reorder="onRowReorder"
      >
        <Column field="index" :body-style="{ margin: '0rem', padding: '0rem' }" row-reorder style="width: 3%">
          <template #rowreordericon>
            <i class="pi pi-align-justify cursor-move p-6" data-pc-section="rowreordericon"></i>
          </template>
        </Column>
        <Column field="name" header="Name" :body-style="{ margin: '0rem', padding: '0rem' }">
          <template #body="{ data }">
            <p class="ml-2">
              {{ data.name }}
            </p>
          </template>
        </Column>
        <Column field="action" header="Actions" style="width: 3%">
          <template #body="{ data }">
            <div class="flex justify-center">
              <i class="pi pi-trash text-error cursor-pointer" @click="deleteItem(data)"></i>
            </div>
          </template>
        </Column>
      </DataTable>
    </div>

    <div class="flex justify-center mt-5">
      <Button label="Create sublist" icon="pi pi-check" class="bg-success text-white hover:bg-success hover:border-success flex justify-center text-center" @click="handleCreateList" />
    </div>
  </Dialog>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  level: {
    type: Number,
    required: true,
  },
})
const emit = defineEmits(['createList', 'cancel', 'error', 'success'])
const visible = ref(false)
const sublistName = ref('')
const sublistItem = ref('')
const sublistItems = ref([])

const isInvalid = ref(false)

function handleAdd() {
  const items = sublistItem.value.split(/[\n,]+/)
    .map(item => item.trim())
    .filter(item => item !== '')
    .map(item => ({ name: item }))

  sublistItems.value = sublistItems.value.concat(items)
}

function handleCreateList() {
  isInvalid.value = sublistName.value === '' || sublistItems.value.length === 0
  if (sublistItems.value.length > 0) {
    sublistItems.value = sublistItems.value.map((item, index) => {
      return {
        id: index,
        title: item.name,
        isHovered: false,
        level: props.level + 1,
      }
    })
    emit('createSubSubList', { sublistItems: sublistItems.value })

    sublistItem.value = ''
    sublistItems.value = []

    emit('success')
    emit('cancel')
  }
}

function deleteItem(data) {
  sublistItems.value = sublistItems.value.filter(item => item.name !== data.name)
}

// data table
const columns = ref([
  { field: 'name', header: 'Name' },
  { field: 'action', header: 'Action' },
])

function onRowReorder(event) {
  sublistItems.value = event.value
}
</script>
