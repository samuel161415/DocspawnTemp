<template>
    <div class="h-full w-full flex overflow-scroll ">
       
       <div class="px-8 py-5 rounded-r-md bg-white  w-full">

           <div class="mt-5 mr-12 ml-3">
            <p class="font-semibold text-surface-700 text-xl mb-5">Billing</p>
                <div class="space-y-2 mb-4">
                    <p class="font-semibold text-surface-700 text-base">Payment method</p>
                    <p class="text-sm text-surface-500 font-poppins">Update your billing details and address</p>
                </div>
                <hr class="text-surface-400 mt-5"/>

                <div class="mt-8 flex flex-col lg:flex-row justify-between">
                    <div class="">
                        <p class="font-semibold text-surface-700 text-base">Card details</p>
                        <p class="text-sm text-surface-500 font-poppins mt-2">Update your billing details and address</p>

                        <Button 
                            type="button"
                            label="Add another card"
                            icon="pi pi-plus"
                            severity="surface-100" 
                            class="bg-surface-50 text-surface-500 text-sm mt-7 mb-5 font-poppins"
                            @click="visible = true" 
                        />
                            
                    </div>
                    <!-- Billings card form -->
                    <BillingsForm />
                </div>

                <hr class="text-surface-100 mt-10"/>

                <div class="mt-8 flex flex-col md:flex-row  justify-between">
                    <div class="space-y-2 mb-2">
                        <p class="font-semibold text-surface-700 text-base">Contact email</p>
                        <p class="text-sm text-surface-500 font-poppins">Where should invoices be sent?</p>
                    </div>
                    <div class="flex flex-col">
                        <div class="flex text-sm">
                            <RadioButton v-model="checked"  :value="checked" />
                            <p class="text-sm text-surface-500 font-poppins ml-1">Send to the existing email</p>
                        </div>
                        <p class="text-xs text-surface-500 font-poppins ml-8">mayaahmed@ofspace.com</p>
                        <div class="flex text-sm mt-5">
                            <RadioButton v-model="checked" disabled :value="checked" />
                            <p class="text-sm text-surface-500 font-poppins ml-1">Add another email address</p>
                        </div>
                    </div>
                </div>
           

                <hr class="text-surface-100 bg-surface-100 mt-10"/>

                <div class="mt-7 flex ">
                    <div class="space-y-2 ">
                        <p class="font-semibold text-surface-700 text-base">Billing history</p>
                        <p class="text-surface-500 text-sm font-poppins">See the transaction you made</p>
                    </div>
                </div>
         
            <!--billings table -->
            </div>
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

