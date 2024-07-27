<template>
  <Dialog v-model:visible="visible" modal :draggable="false" :style="{ width: '40rem' }">
    <template #header>
      <div class="flex justify-center items-center ml-7">
        <p class="font-semibold text-xl flex justify-center text-center">
          List options
        </p>
      </div>
    </template>
    <div class="px-7 mb-5">
      <div class="flex flex-col align-items-center gap-3 mb-5">
        <label for="listname" class="font-semibold w-6rem text-lg">List name <span class="text-red-400">*</span></label>
        <InputText id="listname" v-model="listName" class="flex-auto" placeholder="List name" autocomplete="off" />
      </div>
    </div>

    <div class="px-7 mb-5">
      <p class="text-lg font-medium">
        Used in
      </p>
      <div class="ml-2 py-2">
        <p v-for="list in listOptions" class=" text-lg">
          <i class="mr-2 pi pi-minus"></i> {{ list.option }}
        </p>
      </div>
      <div>
      </div>
    </div>

    <div class="flex justify-center mt-10 mr-5">
      <Button
        v-tooltip.top="{
          value: 'Upcoming functionality',
        }"

        label="Syncing options"

        class="bg-gray-400 hover:bg-gray-400 hover:border-gray-300 text-white w-40 cursor-default" @click=""
      />
      <Button label="Save" icon="pi pi-check" class="bg-success text-white hover:bg-success hover:border-success w-28 ml-2" @click="handleAdd" />
      <Button
        label="Delete"
        icon="pi pi-trash"
        class="bg-danger text-white hover:bg-danger hover:border-danger w-28 ml-2"
        @click="deleteList"
      />
    </div>
  </Dialog>
</template>

<script setup>
import { ref } from 'vue'
import { useToast } from 'primevue/usetoast'

const props = defineProps({
  tableData: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['deleteList'])

const toast = useToast()

const visible = ref(false)
const listName = ref(props.tableData.title)

function handleAdd() {
  emit('cancel')
}
function deleteList() {
  console.log('deleting', props.tableData)
  emit('deleteList', props?.tableData?.id)
}

const listOptions = [
  { option: 'Form to doc' },
  { option: 'Table to doc' },
]
</script>
