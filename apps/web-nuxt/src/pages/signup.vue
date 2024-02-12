<template>
  <div class="h-[calc(100vh-86px)] w-full grid place-items-center">
    <div class="flex gap-4 items-end">
      <Card
        v-if="show === 'enterEmail'"
        style="width: 30em; padding: 0px"
        class="shadow-2xl rounded-xl p-0"
      >
        <template #title>
          <h1 class="text-center mt-8 text-3xl font-extrabold">Let's go !</h1>
        </template>
        <template #content>
          <div class="flex flex-col px-8 w-full gap-2 justify-between">
            <div class="flex flex-col gap-1">
              <label for="name4" class="block text-sm font-medium">Name</label>
              <div class="relative">
                <i
                  class="pi pi-user absolute text-stone-400 top-2/4 -mt-2 left-3"
                />
                <InputText placeholder="John Doe" class="pl-10 w-full" />
              </div>
            </div>
            <div class="flex flex-col gap-1">
              <label for="email4" class="block text-sm font-medium"
                >Email</label
              >
              <div class="relative">
                <i
                  class="pi pi-envelope absolute text-stone-400 top-2/4 -mt-2 left-3"
                />
                <InputText
                  placeholder="user@example.com"
                  class="pl-10 w-full"
                />
              </div>
            </div>
            <div class="flex flex-col gap-1">
              <label for="password4" class="block text-sm font-medium"
                >Password</label
              >
              <div class="relative">
                <i
                  class="pi pi-lock absolute text-stone-400 top-2/4 -mt-2 left-3"
                />
                <InputText
                  type="password"
                  placeholder="Password"
                  class="pl-10 w-full"
                />
              </div>
            </div>
            <Button
              label="Sign up"
              @click="show = 'verifyEmail'"
              severity="primary"
              class="bg-primaryBlue mt-2 text-white"
            />
          </div>
        </template>

        <template #footer>
          <div class="border-t-[1px] w-full">
            <p class="text-stone-500 text-center mt-3 text-[8px]">
              By clicking on the button above,you agree to our
              <span class="underline font-bold text-stone-500 cursor-pointer"
                >'usage conditions</span
              >
              and our
              <span class="underline font-bold text-stone-500 cursor-pointer"
                >privacy policy.</span
              >
            </p>
          </div>
        </template>
      </Card>

      <Card v-if="show === 'verifyEmail'">
        style="width: 30em; padding: 0px" class="shadow-2xl rounded-xl p-0" >
        <template #title>
          <h1 class="text-center mt-8 text-3xl font-extrabold">Let's go !</h1>
        </template>
        <template #content>
          <div class="flex flex-col px-8 w-full gap-2 justify-between">
            <img
              src="../assets/envlop.png"
              class="w-32 mt-5 mb-10 self-center h-auto"
            />

            <p class="text-2xl">We have just sent you an email.</p>
            <p class="text-stone-400 mt-5 text-base">
              Please enter the code we sent you.
              <span class="text-base text-black">user@example.com</span>
            </p>
            <p class="text-sm mt-5">confirmation code</p>
            <Button
              label="Confirm"
              @click="confirmAndNavigate"
              severity="primary"
              class="bg-primaryBlue mt-2 text-white"
            />
          </div>
        </template>

        <template #footer>
          <p class="text-primaryBlue text-center mt-3 text-[10px]">
            <span class="underline font-bold text-primaryBlue cursor-pointer"
              >Resend Code</span
            >
            or
            <span class="underline font-bold text-primaryBlue cursor-pointer"
              >Log Out</span
            >
          </p>
        </template>
      </Card>

      <div
        class="py-3 px-5 shadow-2xl hover:bg-white cursor-pointer bg-[#ffffff2f] backdrop-blur-3xl flex flex-col items-center justify-center gap-1 rounded-xl"
      >
        <i
          class="pi pi-question text-sm"
          style="color: &quot;rgb(var(--primary-500))&quot;"
        ></i>
        <p class="text-sm">Help</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const show = ref("enterEmail");
const confirmAndNavigate = () => {
  router.push("/");
};
</script>

<style scoped></style>
