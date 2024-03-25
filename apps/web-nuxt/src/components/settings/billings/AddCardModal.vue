<template>
    <!-- modal -->
        <Dialog v-model:visible="visible" modal header="Add card " :style="{ width: '40rem' }">
            <div class="ml-5 mb-10">

                <BillingsForm />
            </div>
        </Dialog>

</template>

<script setup>
import { ref } from "vue";
import BillingsForm from "./BillingsForm.vue";

const visible = ref(false);
</script>
