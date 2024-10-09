<template>
  <!-- Groups Table -->
  <Card id="user-groups" class="shadow-none -ml-5">
    <template #title>
      <p class="text-surface-600 font-poppins text-xl font-medium">
        Groups
      </p>
    </template>
    <template #subtitle>
      <div class="mt-5">
        <Button class="text-success border-success hover:bg-green-50" severity="success" label="Create group" icon="pi pi-plus" outlined @click="openCreateGroup = true" />
      </div>
    </template>
    <template #content>
      <DataTable
        :value="groups" table-style="min-width: 50rem;" data-key="id" striped-rows show-gridlines
        paginator :rows="5" :rows-per-page-options="[5, 10]"
      >
        <Column field="name" header="Group name" style="width: 13%;" />

        <Column field="users" header="Users" style="width: 27%;">
          <template #body="{ data, field }">
            <template v-for="(userName, index) in data[field]" :key="index">
              <Chip v-if="index < 2" :label="`${userName.firstName} ${userName.lastName[0]}.`" class="my-1 mr-1" />
            </template>
            <Chip
              class="cursor-pointer"
              @click="(event) => { toggle(event); setHoveredGroups(data[field]); }"
              @mouseenter="(event) => { toggle(event); setHoveredGroups(data[field]); }"
              @mouseleave="(event) => { handleMouseLeave(event) }"
            >
              <template #default>
                <i class="pi pi-ellipsis-h my-2 mx-2 pb-0.5 text-lg"></i>
              </template>
            </Chip>
          </template>
        </Column>

        <Column field="template_fill" header="Template fill" style="width: 27%;">
          <template #body="{ data, field }">
            <template v-for="(templateName, index) in data[field]" :key="data[id]">
              <Chip v-if="index < 2" :label="templateName" class="my-1 mr-1" />
            </template>
            <Chip
              class="cursor-pointer"
              @click="(event) => { toggle(event); setHoveredGroups(data[field]); }"
              @mouseenter="(event) => { toggle(event); setHoveredGroups(data[field]); }"
              @mouseleave="(event) => { handleMouseLeave(event) }"
            >
              <template #default>
                <i class="pi pi-ellipsis-h my-2 mx-2 pb-0.5 text-lg"></i>
              </template>
            </Chip>
          </template>
        </Column>

        <Column field="template_edit" header="Template edit" style="width: 27%;">
          <template #body="{ data, field }" style="max-height: 1rem;">
            <template v-for="(templateName, index) in data[field]" :key="data[id]">
              <Chip v-if="index < 2" :key="data[id]" :label="templateName" class="my-1 mr-1" />
            </template>
            <Chip
              class="cursor-pointer "
              @click="(event) => { toggle(event); setHoveredGroups(data[field]); }"
              @mouseenter="(event) => { toggle(event); setHoveredGroups(data[field]); }"
              @mouseleave="(event) => { handleMouseLeave(event) }"
            >
              <template #default>
                <i class="pi pi-ellipsis-h my-2 mx-1 pb-0.5 text-lg"></i>
              </template>
            </Chip>
          </template>
        </Column>

        <Column header="Edit" style="width: 4%;" body-style="text-align:center" header-style="text-center">
          <template #body="{ data }">
            <Button
              icon="pi pi-pencil text-lg hover:bg-none" text rounded aria-label="Cancel"
              @click="handleEdit(data)"
            />
          </template>
        </Column>
      </DataTable>
    </template>
  </Card>

  <!-- hover overlays -->
  <OverlayPanel ref="op" :style="{ width: '25rem', display: 'flex', flexWrap: 'wrap', backgroundColor: '#fff' }">
    <div class="flex flex-wrap w-25rem overflow-scroll">
      <div v-for="(userName, index) in hoveredGroups" :key="index">
        <Chip :label="userName.firstName ? optionLabelGetter(userName) : userName" class="my-1 mr-1" />
      </div>
    </div>
  </OverlayPanel>

  <!-- Group Edit Dialog -->
  <GroupEditModal v-if="editDialogData" v-model:visible="editDialogVisible" :users="users" :group="editDialogData" :templates="templates" />
  <GroupCreateModal v-model:visible="openCreateGroup" :users="users" :templates="templates" />
</template>

<script setup>
import { Groups, Templates, Users } from '../../../services/sampleData'
import GroupEditModal from './GroupEditModal.vue'
import { TagRootClass } from '~/utils/index'
import GroupCreateModal from '~/components/settings/userManagement/GroupCreateModal.vue'

const groups = ref()
const users = ref()
const templates = ref()
const editDialogData = ref()
const editDialogVisible = ref(false)
const openCreateGroup = ref(false)
const showOverlay = ref(false)

const groupName = ref('')
const hoveredGroups = ref([])

onMounted(() => {
  groups.value = Groups
  users.value = Users
  templates.value = Templates
})

function handleEdit(data) {
  editDialogData.value = data
  editDialogVisible.value = true
  groupName.value = editDialogData.value.name
}

const op = ref()

function toggle(event) {
  op.value.toggle(event)
}

function handleMouseLeave(event) {
  op.value.hide(event)
}
function setHoveredGroups(data) {
  showOverlay.value = true
  hoveredGroups.value = data
}

function optionLabelGetter(option) {
  return `${option.firstName} ${option.lastName[0]}.`
}
</script>

<style scoped>
:deep(.p-datatable-table > thead > tr:first-of-type > th:first-of-type) {
  border-radius: 0.5rem 0 0 0 !important;
}

/* Top Right */
:deep(.p-datatable-table > thead > tr:first-of-type > th:last-of-type) {
  border-radius: 0 0.5rem 0 0 !important;
}

/* Bottom Left */
:deep(.p-datatable-table > tbody > tr:last-of-type > td:first-of-type) {
  border-radius: 0 0 0 0.5rem !important;
}

/* Bottom Right */
:deep(.p-datatable-table > tbody > tr:last-of-type > td:last-of-type) {
  border-radius: 0 0 0.5rem 0 !important;
}
</style>
