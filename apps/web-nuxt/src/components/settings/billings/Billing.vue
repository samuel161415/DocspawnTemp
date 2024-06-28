<template>
    <div class="w-full">

        <div class="py-2 mx-3">
            <p class="text-surface-600 font-poppins text-xl font-medium mb-2">Billing</p>
            <div class="space-y-2 mb-4">
                <p class="text-surface-600 font-poppins text-xl font-medium mb-1">Payment method</p>
                <p class="text-surface-500 font-poppins text-lg mb-2">Update your billing details and address</p>
            </div>
            <hr class="text-surface-400 mt-5"/>

            <div class="mt-8 flex flex-col lg:flex-row justify-between">
                <div class="">
                    <p class="text-surface-600 font-poppins text-xl font-medium mb-1">Card details</p>
                    <p class="text-surface-500 font-poppins text-lg mb-2">Update your billing details and address</p>

                    <Button 
                        type="button"
                        label="Add another card"
                        icon="pi pi-plus"
                        severity="surface-100" 
                        class="bg-surface-50 text-surface-500 text-base mt-7 mb-5 font-poppins"
                        @click="visible = true" 
                    />
                        
                </div>
                <!-- Billings card form -->
                <BillingsForm />
            </div>

            <hr class="text-surface-100 mt-10"/>

            <div class="mt-8 flex flex-col md:flex-row  justify-between">
                <div class="space-y-2 mb-2">
                    <p class="text-surface-600 font-poppins text-xl font-medium mb-1">Contact email</p>
                    <p class="text-surface-500 font-poppins text-lg mb-2">Where should invoices be sent?</p>
                </div>
                <div class="flex flex-col">
                    <div class="flex text-base">
                        <RadioButton v-model="checked"  :value="checked" />
                        <p class="text-surface-500 font-poppins text-lg">Send to the existing email</p>
                    </div>
                    <p class="text-base text-surface-500 font-poppins ml-8">mayaahmed@ofspace.com</p>
                    <div class="flex text-base mt-5">
                        <RadioButton v-model="checked" disabled :value="checked" />
                        <p class="text-surface-500 font-poppins text-lg mb-2 ml-1">Add another email address</p>
                    </div>
                </div>
            </div>
        

            <hr class="text-surface-100 bg-surface-100 mt-10"/>

            <div class="mt-7 flex ">
                <div class="space-y-2 ">
                    <p class="text-surface-600 font-poppins text-xl font-medium mb-1">Billing history</p>
                    <p class="text-surface-500 font-poppins text-lg mb-2">See the transaction you made</p>
                </div>
            </div>
        
        <!--billings table -->
        </div>
        <!-- billings card add modal modal -->
        <AddCardModal v-model:visible="visible" />
    </div>

</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import AddCardModal from "~/components/settings/billings/AddCardModal.vue";
import BillingsForm from "~/components/settings/billings/BillingsForm.vue";

const router = useRouter();

const visible = ref(false);

const checked = ref(true);

</script>

<style scoped>
.custom-button-label .p-button-label {
    font-weight: 100!important;
}
</style>

