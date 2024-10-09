<template>
  <Dialog
    v-model:visible="visible" :draggable="false" modal :style="{ width: '35rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
  >
    <template #header>
      <p class="text-2xl">
        <span class="font-bold">
          Group edition
        </span>
      </p>
    </template>
    <div class="flex flex-col gap-6">
      <Panel header="General information">
        <div class="flex flex-col gap-4">
          <label for="groupname"><span><i class="pi pi-users mr-1"></i></span>Group name <span class="text-error">*</span></label>
          <InputText id="groupname" v-model="groupName" class="w-full" aria-describedby="groupname-help" required />
        </div>
      </Panel>
      <Panel header="Edit users">
        <div class="flex flex-col gap-3">
          <p class="font-semibold">
            <span><i class="pi pi-users mr-1"></i></span> Members<span class="text-error">*</span>
          </p>
          <MultiSelect
            v-model="selectedUsers" display="chip" :options="users" :option-label="optionLabelGetter" filter :filter-fields="['firstName', 'lastName']"
            placeholder="Select users" :max-selected-labels="10" class="w-full"
          />
        </div>
      </Panel>
      <Panel header="Template permissions">
        <div class="flex flex-col gap-3">
          <p class="font-semibold">
            <span><i class="pi pi-file mr-1"></i></span> Users who can fill the following templates:
          </p>
          <div class="flex flex-col gap-2">
            <MultiSelect
              v-model="selectedTemplateFills" display="chip" :options="templates" option-label="name" filter
              placeholder="Choose templates" :max-selected-labels="5" class="w-full"
            />
          </div>

          <p class="font-semibold mt-3">
            <span><i class="pi pi-file-edit mr-1"></i></span> Users who can edit the following templates:
          </p>
          <div class="flex flex-col gap-2">
            <MultiSelect
              v-model="selectedTemplateEdits" display="chip" :options="templates" option-label="name" filter
              placeholder="Choose templates" :max-selected-labels="5" class="w-full"
            />
          </div>
        </div>
      </Panel>
    </div>
    <template #footer>
      <div class="w-full">
        <Button class="w-full" label="Save changes" @click="handleEditGroup" />
      </div>
    </template>
  </Dialog>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  users: {
    type: Object,
    required: true,
  },
  templates: {
    type: Object,
    required: true,
  },
  group: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits()

const saveChanges = ref(false)
const groupName = ref(props.group.name || '')
const selectedUsers = ref([])
const selectedTemplateFills = ref([])
const selectedTemplateEdits = ref([])

function handleEditGroup() {
  //
}

function optionLabelGetter(option) {
  return `${option.firstName} ${option.lastName[0]}.`
}
</script>
