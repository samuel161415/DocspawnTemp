<template>
  <div class="h-screen w-screen">
    <div class="grid grid-cols-2 w-full h-full">
      <div class="h-full w-full py-10 px-16 bg-blue-50">
        <NuxtLink to="/">
          <img
            src="../assets/Logo.png"
            alt="Image"
            height="35"
            class="w-40 h-auto"
          />
        </NuxtLink>
        <div class="flex h-full w-full items-center justify-center">
          <Carousel :value="features">
            <template #item="slotProps">
              <div class="text-center flex flex-col items-center gap-5 mb-8">
                <img
                  :src="slotProps.data.image"
                  alt="Image"
                  class="h-50 w-auto"
                />
                <div class="mx-auto font-medium text-xl mb-4 text-blue-900">
                  {{ slotProps.data.title }}
                </div>
                <p class="m-0 text-blue-700 line-height-3">
                  {{ slotProps.data.text }}
                </p>
              </div>
            </template>
          </Carousel>
        </div>
      </div>

      <div class="bg-white h-full flex flex-col gap-5 w-full py-10 px-16">
        <div class="flex items-center mb-10 justify-between">
          <h1 class="text-2xl font-medium text-900">Login to DocSpawn</h1>
          <Button
            link
            class="text-[#009ee2] text-sm"
            label="Sign up"
            @click="visible = true"
          />
        </div>
        <div class="flex items-center w-full gap-3 justify-between">
          <Button
            class="bg-stone-100 flex w-[280px] items-center justify-center text-center px-4 py-3 rounded"
          >
            <i class="pi pi-facebook text-indigo-500 mr-2"></i>
            <span class="text-black">Sign in With Facebook</span>
          </Button>
          <Button
            class="bg-stone-100 w-[280px] flex items-center justify-center px-4 py-3 rounded"
          >
            <i class="pi pi-google text-red-500 mr-2"></i>
            <span class="text-black">Sign in With Google</span>
          </Button>
        </div>
        <div class="w-full flex my-10 items-center gap-3">
          <span class="border-t-[1px] w-full border-stone-400" />
          <p class="text-600 font-normal text-stone-400 text-sm">OR</p>
          <span class="border-t-[1px] w-full border-stone-400" />
        </div>
        <div class="flex flex-col w-full gap-3 justify-between">
          <label for="email4" class="block text-900 font-medium mb-2"
            >Email</label
          >
          <InputText
            id="email4"
            type="text"
            placeholder="Email address"
            class="w-full mb-3 p-3 border"
            :value="email"
          />

          <label for="password4" class="block text-900 font-medium mb-2"
            >Password</label
          >
          <InputText
            id="password4"
            type="password"
            placeholder="Password"
            class="w-full mb-3 p-3 border"
            :value="password"
          />
        </div>
        <div class="flex mb-10 items-center justify-between">
          <div>
            <Checkbox
              v-model="rememberMe"
              inputId="rememberMe"
              name="rememberMe"
              value="rememberMe"
              class="border rounded-lg"
            />
            <label for="ingredient1" class="ml-2"> Remember me </label>
          </div>
          <Button
            link
            class="text-[#009ee2] text-sm"
            label="Forgot password?"
          />
        </div>
        <Button
          label="Submit"
          @click="router.push('/')"
          severity="primary"
          class="bg-primaryBlue text-white"
        />
      </div>
    </div>
  </div>
  <Dialog
    v-model:visible="visible"
    modal
    :pt="{
      mask: {
        style: 'backdrop-filter: blur(2px)',
      },
      content: {
        style: 'border-radius: 7.5rem;',
      },
    }"
  >
    <template #container="{ closeCallback }">
      <div class="bg-white flex flex-col rounded-3xl items-center">
        <Button
          icon="pi pi-times"
          @click="closeCallback"
          severity="secondary"
          text
          class="self-end mt-5 mr-5"
          rounded
          aria-label="Cancel"
        />
        <div class="flex flex-col pt-0 p-10 items-center">
          <h1 class="text-4xl text-center font-extrabold">Sign up for FREE</h1>
          <p class="text-xl font-bold text-center">
            and start using DocSpawn in seconds!
          </p>
          <InputText
            id="email4"
            type="text"
            placeholder="Email address"
            class="w-full mt-5 mb-3 p-3 border"
            :value="email"
          />
          <Button
            label="Next"
            severity="primary"
            @click="router.push('/signup')"
            class="bg-primaryBlue mb-3 w-full text-white"
          />
        </div>
      </div>
    </template>
  </Dialog>
</template>

<script setup>
import { ref } from "vue";
import demoImage from "../assets/Logo.png";
import { useRouter } from "vue-router";

const router = useRouter();
const visible = ref(false);
const rememberMe = ref(false);
const email = ref(null);
const password = ref(null);
const features = [
  {
    image: demoImage,
    title: "Feature 1",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, ut voluptates? Eum, iure  cum soluta velit doloribus.",
  },
  {
    image: demoImage,
    title: "Feature 2",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, ut voluptates? Eum, iure  cum soluta velit doloribus.",
  },
  {
    image: demoImage,
    title: "Feature 3",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, ut voluptates? Eum, iure  cum soluta velit doloribus.",
  },
];
</script>
<style>
/* Your CSS here */
</style>
