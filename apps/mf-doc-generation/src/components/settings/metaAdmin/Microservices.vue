<template>
    <div class="mb-16">
        <div class="ml-4 mt-5">
            <p class="text-lg font-semibold text-surface-700">PDF generation</p>
            <!-- section 1 -->
            <div class="mt-5 ">
                <div class="border border-gray-100 shadow flex justify-between p-3 rounded w-3/5 cursor-pointer" @click="handleOpen(1)">
                    <p class="text-lg font-poppins">Service 1</p>
                    <i :class="service1 ? 'pi pi-caret-up' : 'pi pi-caret-down'" class=" text-xl cursor-pointer" ></i>
                </div>
                <div v-if="service1" class="mt-5 ml-2 w-3/5">
                    <div class="mt-5">
                        <div class="flex flex-col mb-2">
                            <label for="fullname" class="sm:text-base md:text-base text-surface-500 font-poppins">Test</label>
                            <div class="flex justify-between">
                                <InputText id="test" aria-describedby="username-help"
                                    class="text-surface-900 h-12 w-4/5 text-base " placeholder="Test" />
                                <Button :icon="lock ? 'pi pi-lock' : 'pi pi-lock-open'" outlined class="h-12" @click="handleLock" />
                            </div>
                        </div>
    
                        <div class="rounded mt-8">
                            <pre class=" bg-black p-5 rounded ">
                                <code class="language-javascript">{{ codeSnippet }}</code>
                            </pre>
                        </div>
                    </div>
    
                </div>
            </div>
            <!-- section 2 -->
            <div class="mt-5 ">
                <div class="border border-gray-100 shadow flex justify-between p-3 rounded w-3/5 cursor-pointer" @click="handleOpen(2)">
                    <p class="text-lg font-poppins">Service 2</p>
                    <i :class="service2 ? 'pi pi-caret-up' : 'pi pi-caret-down'"  class="text-xl cursor-pointer" ></i>
                </div>
    
                <div v-if="service2" class="mt-5 ml-2 w-3/5">
                    <div class="mt-5">
                        <div class="flex flex-col mb-2">
                            <label for="fullname" class="text-base text-surface-500 font-poppins">Test</label>
                            <div class="flex justify-between">
                                <InputText id="test" aria-describedby="username-help"
                                    class="text-surface-900 h-12 w-4/5 text-base font-poppins" placeholder="Test" />
                                <Button :icon="lock ? 'pi pi-lock' : 'pi pi-lock-open'" outlined class="h-12" @click="handleLock" />
                            </div>
                        </div>
    
                        <div class="rounded mt-8">
                            <pre class=" bg-black p-5 rounded ">
                                <code class="language-javascript">{{ codeSnippet2 }}</code>
                            </pre>
                        </div>
                    </div>
    
                </div>
            </div>
        </div>

        <!-- section 3 -->
        <p class="mt-7 ml-4 text-lg font-semibold text-surface-700">Document sending</p>
        <div class="mt-5 ml-4">
            <div class="border border-gray-100 shadow flex justify-between p-3 rounded w-3/5 cursor-pointer" @click="handleOpen(3)">
                <p class="text-lg font-poppins">Service 3</p>
                <i :class="service3 ? 'pi pi-caret-up' : 'pi pi-caret-down'"  class="text-xl cursor-pointer" ></i>
            </div>

            <div v-if="service3" class="mt-5 w-3/5">
                <div class="mt-5">
                    <div class="flex flex-col gap-3 ml-2">
                        <div class="flex align-items-center">
                            <Checkbox name="Send via Email" :checked="true" value="Send via Email" />
                            <label class="ml-2 text-base text-surface-500 font-poppins">Send via Email</label>

                        </div>
                        <div class="flex align-items-center mt-2">
                            <Checkbox name="Send via Email" value="Send via Email" />
                            <label class="ml-2 text-base text-surface-500 font-poppins">Send to FTP</label>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';

const codeSnippet = ref(`
    function helloWorld() {
        service1.value = !service1.value;
        console.log('Hello, world!');
    }
`);

const codeSnippet2 = ref(`
    <?php
    // Function to generate a random number between 1 and 4
    function generateRandomNumber() {
        return rand(1, 4);
    }

    // Generate a random number and print it
    $randomNumber = generateRandom
`);

onMounted(() => {
    Prism.highlightAll();
});


const lock = ref(true);
const service1 = ref(true);
const service2 = ref(false)
const service3 = ref(false)

const handleOpen = (service) => {

    if (service === 1) {
        service1.value = !service1.value;
    } else if (service === 2) {
        service2.value = !service2.value;
    } else if (service === 3) {
        service3.value = !service3.value;
    }

};

const handleLock = () =>{
    lock.value = !lock.value;
}
</script>
