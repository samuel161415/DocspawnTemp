<template>
    <div v-for="data in cardInfo">

        <div class="flex flex-col gap-4">
           <div class="flex flex-col md:flex-row  md:space-x-6">
               <div class="flex flex-col gap-1 mb-2">
                   <label for="fullname" class="text-sm">Name on your card</label>
                   <InputText id="fullname" v-model="data.fullName" aria-describedby="username-help" class="text-surface-900 w-64 h-10 text-base" placeholder="Mayad Ahmed"/>
                   
               </div>
               <div class="flex flex-col gap-1">
                   <label for="expiry" class="text-sm">Expiry</label>
                   <InputText id="expiry" v-model="data.expirationDate" class="text-surface-700  w-64 h-10 text-base"  placeholder="02 / 2028" />
                   
               </div>
           </div>
           <div class="flex flex-col md:flex-row  md:space-x-6 mt-4">
               <div class="flex flex-col gap-1 mb-2">
                   <label for="cardnumber" class="text-sm">Card Number</label>
                   
                   <span class="relative flex">
                       <img src="../../../assets/card.png" alt="" class="absolute top-2/4 -mt-2 pl-2 w-7 h-5">
                       <InputText id="cardnumber" v-model="data.cardNumber" class="text-surface-500 w-64 pl-10 h-10 text-base" placeholder="8269 9620 9292 2538"  aria-describedby="username-help" />
                   
                   </span>
               </div>
               <div class="flex flex-col gap-1 ">
                   <label for="username" class="text-sm">cvv</label>
                  
                   <InputText id="cardnumber" type="password" v-model="data.cvv" class="text-surface-500 w-64  h-10 text-base" aria-describedby="username-help" />
                   
               </div>
           </div>
       </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import {cardInfo}  from '../../../services/billingCardData';

</script>