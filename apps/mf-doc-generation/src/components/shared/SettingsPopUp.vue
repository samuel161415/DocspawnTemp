<template>
    <div>
        <div class="flex bottom-0 justify-end mb-0 z-50 fixed">
            <Toast />
            <SpeedDial :model="items" direction="up" :transitionDelay="80"  showIcon="pi pi-cog" buttonClass="p-button-outlined" />
        </div>
    </div>

</template>

<script setup>
import { ref } from 'vue';
import { useToast } from 'primevue/usetoast';
import { useRouter } from 'vue-router';

const toast = useToast();
const router = useRouter();

const items = ref([
  {
      label: 'Add',
      icon: 'pi pi-cog',
      ariaLabel:"Settings",
      command: () => {
          toast.add({ severity: 'info', summary: 'Add', detail: 'Data Added' });
      }
  },
  {
      label: 'Update',
      icon: 'pi pi-refresh',
      ariaLabel:"Settings",
      command: () => {
          toast.add({ severity: 'success', summary: 'Update', detail: 'Data Updated' });
      }
  },
  {
      label: 'Vue Website',
      icon: 'pi pi-external-link',
      ariaLabel:"Settings",
      command: () => {
          window.location.href = 'https://vuejs.org/'
      }
  }
])
</script>