<template>
  <Dialog v-model:visible="visible" modal :draggable="false" :style="{ width: '45rem' }">
    <template #container="{ closeCallback }">
      <div class="bg-white w-[45rem] rounded-lg min-h-64 py-5 px-3 overflow-scroll no-scrollbar">
        <div class="flex bg-white sticky justify-between items-center ml-5 mb-3">
          <p class="font-semibold text-xl flex justify-center text-center">
            Item options
          </p>
          <i class="pi pi-times cursor-pointer p-dialog-header-icon mr-4" @click="handleCancel($event)"></i>
        </div>

        <div class="px-5 my-5">
          <div class="flex flex-col align-items-center gap-3 mb-5">
            <label for="listname" class="font-semibold w-6rem text-lg">Item name <span class="text-red-400">*</span></label>
            <InputText id="listname" v-model="listItemName" class="flex-auto" placeholder="list Item Name" autocomplete="off" />
          </div>
        </div>

        <div v-if="props.editableItem?.level != 3" class="flex align-items-center px-5 mt-5 ">
          <Checkbox v-model="containsublist" input-id="containsublist" name="sublist" value="sublist" :binary="true" />
          <label for="containsublist" class="ml-2">Contains sublist</label>
        </div>

        <!--  -->
        <div v-if="containsublist" class="mt-5">
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
        </div>

        <!--  -->
        <div class="flex justify-center mt-5 mr-5">
          <Button label="Save" icon="pi pi-check" class="bg-success text-white hover:bg-success hover:border-success w-28" @click="handleEditItem" />
        </div>
      </div>

      <Toast />
      <ConfirmPopup group="headless">
        <template #container="{ message, acceptCallback, rejectCallback }">
          <div class="rounded px-6 mt-5 py-8 ">
            <span>{{ message.message }}</span>
            <div class="flex justify-end gap-2 mt-4">
              <Button label="Save" severity="success" lick="acceptCallback" size="small" @click="handleEditItem" />
              <Button label="Close" outlined lick="rejectCallback" severity="secondary" size="small" text @click="cancelButton" />
            </div>
          </div>
        </template>
      </ConfirmPopup>
    </template>
  </Dialog>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'

const props = defineProps({
  editableItem: {
    type: Object,
    required: true,
  },
  containsublist: {
    type: Boolean,
    required: true,
  },
})
const emit = defineEmits()
const confirm = useConfirm()
const toast = useToast()
const sublistName = ref('')
const sublistItem = ref('')
const sublistItems = ref([])
const isInvalid = ref(false)

const containsublist = ref(props.containsublist)
const visible = ref(false)
const listItemName = ref(props.editableItem.title)

watch(() => props.editableItem, (newVal) => {
  listItemName.value = newVal.title
})

function handleAdd() {
  isInvalid.value = sublistItem.value === ''
  const items = sublistItem.value.split(/[\n,]+/)
    .map(item => item.trim())
    .filter(item => item !== '')
    .map(item => ({ name: item }))

  sublistItems.value = sublistItems.value.concat(items)
}

function handleEditItem() {
  isInvalid.value = listItemName.value === '' || (containsublist.value && sublistItems.value.length === 0)
  if (sublistItems.value.length > 0 && props.editableItem?.level != 3) {
    sublistItems.value = sublistItems.value.map((item, index) => {
      return {
        id: index,
        title: item.name,
        isHovered: false,
        level: props.editableItem?.level + 1,
        sublists: [],
      }
    })

    const editedData = {
      id: props.editableItem.id,
      title: listItemName.value,
      sublists: props.editableItem.sublists.concat(sublistItems.value),
    }

    emit('editItem', editedData)

    listItemName.value = ''
    sublistItem.value = ''
    sublistItems.value = []
    containsublist.value = false

    emit('cancel')
  }
  else if (props.editableItem?.level === 3) {
    const editedData = {
      id: props.editableItem.id,
      title: listItemName.value,
      sublists: [],
    }
    emit('editItem', editedData)

    listItemName.value = ''

    emit('cancel')
  }
  else if (!containsublist.value && props.editableItem?.level != 3) {
    const editedData = {
      id: props.editableItem.id,
      title: listItemName.value,
      sublists: props.editableItem.sublists,
    }
    emit('editItem', editedData)

    listItemName.value = ''

    emit('cancel')
  }
}

function cancelButton() {
  listItemName.value = ''
  sublistItem.value = ''
  sublistItems.value = []
  containsublist.value = false
  emit('cancel')
}

function requireConfirmation(event) {
  confirm.require({
    target: event.currentTarget,
    group: 'headless',
    header: '',
    message: 'Are you sure you want to close the modal? Unsaved changes will be lost.',
    accept: () => {
      toast.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 })
    },
    reject: () => {
      toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 })
    },
  })
}

function handleCancel(event) {
  if (listItemName.value !== '' || sublistItem.value !== '' || sublistItems.value.length > 0)
    requireConfirmation(event)
  else
    emit('cancel')
}

function deleteItem(data) {
  sublistItems.value = sublistItems.value.filter(item => item.name !== data.name)
}

function emitOpenCreateListModal() {
  containsublist.value = false
  emit('openCreateListModal', props.editableItem)
}

function onRowReorder(event) {
  sublistItems.value = event.value
}
</script>
