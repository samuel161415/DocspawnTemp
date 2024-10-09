<template>
  <Card id="users" class="shadow-none -ml-5">
    <template #title>
      <div>
        <p class="text-surface-600 font-poppins text-xl font-medium">
          Users
        </p>
      </div>
    </template>
    <template #subtitle>
      <div class="flex flex-col gap-5">
        <div class="flex flex-row gap-3">
          <p class="place-self-center font-poppins">
            Available users 10/200
          </p>
          <Tag class="place-self-center bg-success" severity="success" value="Upgrade" />
        </div>
        <div>
          <Button
            class="text-success border-success  hover:bg-green-50 rounded-lg" severity="success" label="Invite users" icon="pi pi-plus" outlined
            @click="inviteDialogVisible = true"
          />
        </div>
      </div>
    </template>
    <template #content>
      <DataTable
        :value="users"
        table-style="min-width: 50rem;"
        data-key="id"
        striped-rows
        show-gridlines
        paginator
        :rows="5"
        :rows-per-page-options="[5, 10, 50]"
      >
        <Column field="name" header="User name" style="width: 20%;">
          <template #body="{ data }">
            {{ data.firstName }} {{ data.lastName }}
          </template>
        </Column>
        <Column field="groups" header="User group">
          <template #body="{ data, field }">
            <Chip v-for="groupName in data[field]" :key="data[id]" :label="groupName.name" class="mr-1.5" />
          </template>
        </Column>
        <Column header="Edit" style="width: 4%;" body-style="text-align:center" header-style="text-center">
          <template #body="{ data }">
            <Button
              size="small" icon="pi pi-pencil text-lg hover:bg-none" text rounded aria-label="Cancel"
              @click="handleEdit(data)"
            />
          </template>
        </Column>
      </DataTable>
    </template>
  </Card>

  <!-- User Edit Dialog -->
  <UserEditModal
    v-if="editDialogData"
    v-model:visible="editDialogVisible"
    :data="editDialogData"
    :groups-data="Groups"
    @cancel="editDialogVisible = false"
    @delete-account="handleOpenDeleteDialog"
    @freeze-account="handleFreezeAccount"
    @edit-user="handleEditData"
  />

  <!-- Delete confirmation Dialog -->
  <Dialog v-model:visible="isDeleteVisible" :draggable="false" header="Delete" modal :style="{ width: '35rem' }">
    <span class="p-text-secondary block mb-5">
      <i class="pi pi-exclamation-triangle text-error mr-2"></i>
      Delete permanently: {{ editDialogData.email }}
    </span>
    <span>
      This account will be deleted permanently. This templates, documents and data generated for this account will also be deleted permanently.
    </span>
    <span class="block mt-5 mb-2 font-bold">Type account email to proceed:</span>
    <InputText v-model="emailToDelete" type="text" class="w-full mr-2 mb-10" :invalid="isInvalid" />
    <div class="flex justify-end gap-2">
      <Button type="button" label="Cancel" outlined @click="isDeleteVisible = false" />
      <Button
        type="button" label="Delete" severity="error" class="bg-error hover:bg-red-500 hover:border-error text-white"
        @click="() => { handleDeleteAccount() }"
      />
    </div>
  </Dialog>

  <!-- Freeze confirmation Dialog -->
  <Dialog v-model:visible="isFreezeVisible" :draggable="false" header="Freeze" modal :style="{ width: '30rem' }">
    <span class="p-text-secondary block mb-5"><i class="pi pi-exclamation-triangle text-warning w-7"></i>
      Freeze  Account: {{ editDialogData.email }}
    </span>

    <div class="flex justify-end gap-2">
      <Button type="button" label="Cancel" outlined @click="isFreezeVisible = false" />
      <Button
        type="button" label="Freeze" severity="warning" class="bg-warning hover:bg-warning hover:border-warning text-white"
        @click="() => { isFreezeVisible = false; }"
      />
    </div>
  </Dialog>

  <!-- Invite users Dialog -->
  <InviteUserModal v-model:visible="inviteDialogVisible" />
</template>

<script setup>
import { Groups } from '../../../services/sampleData'
import UserEditModal from '~/components/settings/userManagement/UserEditModal.vue'
import InviteUserModal from '~/components/settings/userManagement/InviteUserModal.vue'
import { useUsersData } from '~/composables/useUsersData.js'

const { Users } = useUsersData()
const users = ref()
const groups = ref()
// const toast = useToast();
const editDialogData = ref()
const editDialogVisible = ref(false)
const isDeleteVisible = ref(false)
const isFreezeVisible = ref(false)
const inviteDialogVisible = ref(false)
const isInvalid = ref(false)
const emailToDelete = ref('')

onMounted(() => {
  users.value = Users.value
  groups.value = Groups
})

function handleEdit(data) {
  editDialogVisible.value = true
  editDialogData.value = data
}

function handleEditData(data) {
  // find user in users array and update it
  const index = users.value.findIndex(user => user.id === data.id)
  users.value[index] = data
  editDialogVisible.value = false
}

function handleFreezeAccount() {
  isFreezeVisible.value = true
}

function handleOpenDeleteDialog() {
  isDeleteVisible.value = true
}

function handleDeleteAccount() {
  if (emailToDelete.value !== editDialogData.value.email || emailToDelete === '') {
    isInvalid.value = true
  }
  else {
    isInvalid.value = false
    // find user in users array and delete it
    const index = users.value.findIndex(user => user.id === editDialogData.value.id)
    users.value.splice(index, 1)
    isDeleteVisible.value = false
    editDialogVisible.value = false
  }
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
