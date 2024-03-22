<template>
    <div class="h-full w-full flex overflow-scroll">
       
       <div class="mx-2 mt-4 px-8 py-5  rounded-md bg-white  w-full">
           
            <Breadcrumb class="border-none rounded-none" :home="home" :model="items">
                <template #item="{ item, props }">
                    <router-link
                    v-if="item.route"
                    v-slot="{ href, navigate }"
                    :to="item.route"
                    custom
                    >
                    <a :href="href" v-bind="props.action" @click="navigate">
                        <span class="text-color" :class="[item.icon]" />
                        
                        <span
                        class="text-lg text-primary-500 dark:text-primary-400 font-normal"
                        >{{ item.label }}</span>
                    </a>
                    </router-link>
                    <a v-else :href="item.url" :target="item.target" v-bind="props.action">
                    <span class="text-surface-700 dark:text-surface-0/80">{{
                        item.label
                    }}</span>
                    </a>
                </template>
           </Breadcrumb>

           <div class="mt-5 mr-12 ml-3">
                <div class="space-y-2 mb-4">
                    <p class="font-semibold text-surface-700 text-base">Payment Method</p>
                    <p class="text-surface-500 text-sm">Update your billing details and address</p>
                </div>
                <hr class="text-surface-400 mt-5"/>

                <div class="mt-8 flex justify-between">
                    <div class="">
                        <p class="font-semibold text-surface-700 text-base">Card Details</p>
                        <p class="text-surface-500 text-sm mt-2">Update your billing details and address</p>

                        <Button 
                            type="button"
                            label="Add another card"
                            icon="pi pi-plus"
                            severity="surface-100" 
                            class="bg-surface-50 text-surface-600 text-sm mt-7 p-button-label font-thin"
                          />
                          
                    </div>

                    <div class="flex flex-col gap-4">
                        <div class="flex space-x-6">
                            <div class="flex flex-col gap-1">
                                <label for="username" class="text-sm">Name on your card</label>
                                <InputText id="username" v-model="value" aria-describedby="username-help" class="text-surface-900 w-60 h-10 text-base" placeholder="Mayad Ahmed"/>
                              
                            </div>
                            <div class="flex flex-col gap-1">
                                <label for="expiry" class="text-sm">Expiry</label>
                                <InputText id="expiry" v-model="value" class="text-surface-700  h-10 text-base"  placeholder="02 / 2028" />
                              
                            </div>
                        </div>
                        <div class="flex space-x-6 mt-4">
                            <div class="flex flex-col gap-1">
                                <label for="username" class="text-sm">Card Number</label>
                                <InputText id="username" v-model="value" class="text-surface-500 w-60 h-10 text-base" placeholder="8269 9620 9292 2538"  aria-describedby="username-help" />
                              
                            </div>
                            <div class="flex flex-col gap-1">
                                <label for="username" class="text-sm">cvv</label>
                                <Password v-model="value" class="text-surface-700 h-10 " placeholder="..." :feedback="false" />
                              
                            </div>
                        </div>
                    </div>
                </div>

                <hr class="text-surface-100 mt-10"/>

                <div class="mt-8 flex justify-between">
                    <div class="space-y-2 ">
                        <p class="font-semibold text-surface-700 text-base">Contact email</p>
                        <p class="text-surface-500 text-sm">Where should invoices be sent?</p>
                    </div>
                    <div class="flex flex-col">
                        <div class="flex text-sm">
                            <RadioButton v-model="checked"  :value="checked" />
                            <p class="text-base text-surface-700 font-medium">Send to the existing email</p>
                        </div>
                        <p class="text-xs font-extralight ml-7">mayaahmed@ofspace.com</p>
                        <div class="flex text-sm mt-5">
                            <RadioButton v-model="checked" disabled :value="checked" />
                            <p class="text-base text-surface-700 font-medium">Add another email address</p>
                        </div>
                    </div>
                </div>

                <hr class="text-surface-100 bg-surface-100 mt-10"/>

                <div class="mt-7 flex ">
                    <div class="space-y-2 ">
                        <p class="font-semibold text-surface-700 text-base">Billing History</p>
                        <p class="text-surface-500 text-sm">See the transaction you made</p>
                    </div>
                </div>
            </div>
       </div>
       
   </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const home = ref({
  icon: "pi pi-home",
  route: "/",
});

const items = ref([{label: "Settings", route: "/settings" }, {label: "Billings", route: "/settings/billings"}]);
</script>

<style scoped>
</style>
