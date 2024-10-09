<template>
  <div class="h-full w-full ml-4 bg-white overflow-scroll no-scrollbar rounded-lg">
    <div class="px-8 py-8 ">
      <div class="py-2 mx-3">
        <p class="font-semibold text-surface-600 font-poppins text-2xl mb-2">
          Workspace
        </p>
        <!-- <p class="text-surface-500 font-poppins text-lg">Customize the format and design of elements within DocSpawn. </p> -->

        <div id="members">
          <p class="font-medium text-surface-600 font-poppins text-xl mt-5">
            Members
          </p>
          <div id="users">
            <Users />
          </div>

          <div id="user-groups">
            <UserGroups />
          </div>
        </div>

        <div id="field-options" class="">
          <p class="font-medium text-surface-600 font-poppins text-xl mb-2">
            Custom formatting
          </p>
          <p class="text-surface-500 font-poppins text-lg">
            Customize the format and design of elements within DocSpawn.
          </p>

          <CoustomFormatting />
        </div>

        <div id="checkbox-formats" class="mt-20">
          <CheckboxFormats />
        </div>

        <div id="billing" class="mt-20">
          <Billing />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import CheckboxFormats from '~/components/settings/formattingOptions/CheckboxFormats.vue'
import CoustomFormatting from '~/components/settings/formattingOptions/CoustomFormatting.vue'
import UserGroups from '~/components/settings/userManagement/user_groups.vue'
import Users from '~/components/settings/userManagement/users.vue'
import Billing from '~/components/settings/billings/Billing.vue'
</script>
