<template>
  <div class="card flex justify-center">
    <Toast />
    <SplitButton label="Save" :model="items" @click="save" />
  </div>
</template>

<script setup>
import { useToast } from 'primevue/usetoast'

const toast = useToast()

const items = [
  {
    label: 'Update',
    command: () => {
      this.$toast.add({ severity: 'success', summary: 'Updated', detail: 'Data Updated', life: 3000 })
    },
  },
  {
    label: 'Delete',
    command: () => {
      this.$toast.add({ severity: 'warn', summary: 'Delete', detail: 'Data Deleted', life: 3000 })
    },
  },
  {
    separator: true,
  },
  {
    label: 'Quit',
    command: () => {
      window.location.href = 'https://vuejs.org/'
    },
  },
]

function save() {
  toast.add({ severity: 'success', summary: 'Success', detail: 'Data Saved', life: 3000 })
}
</script>
