<template>
    <div class="bg-white w-full z-10 sm:mr-10 md:mr-2">
        <Menubar class="menubar bg-white border-b border-surface-100 rounded-none ">
            <template #end>
                <div v-if="$route.path == '/signup'" class="flex items-center gap-4">
                        <p>Already have an account?</p>
                        <Button
                        link
                        class="text-[#009ee2] text-sm"
                        label="Sign in"
                        @click="router.push('/signin')"
                        />
                    </div>
                <div v-else class="flex items-center text-center justify-center gap-2 py-2 mr-3 space-x-2 ">
                    <LanguageDropDown />

                    <NuxtLink to="/signin">
                        <span class="relative inline-block cursor-pointer">
                            <img class="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                            <span class="absolute right-0 top-0 block h-2.5 w-2.5 rounded-full bg-green-400 ring-2 ring-white" />
                        </span>
                    </NuxtLink>                 
                </div>
            </template>
        </Menubar>
    </div>
</template>

<script setup>
import LanguageDropDown from './LanguageDropDown.vue';
import { useRouter } from "vue-router";
const router = useRouter();

</script>

