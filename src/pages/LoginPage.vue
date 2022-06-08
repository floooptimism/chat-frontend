<script setup>
import { useRouter } from "vue-router";
import { watchEffect } from "vue";
import supabase from "../modules/supabase/supabase";

//* Stores
import useAuthStore from "../stores/auth.store";
const authStore = useAuthStore();

document.title = "Login";
const router = useRouter();

//* redirect if authenticated
watchEffect(() => {
  if (authStore.authenticated) {
    router.push({
      name: "chat",
    });
  }
});

async function loginWithGithub() {
  await supabase.auth.signIn(
    {
      // provider can be 'github', 'google', 'gitlab', and more
      provider: "github",
    },
    {
      redirectTo: import.meta.env.VITE_LOGINREDIRECT,
    }
  );
}

async function loginWithGoogle() {
  await supabase.auth.signIn(
    {
      // provider can be 'github', 'google', 'gitlab', and more
      provider: "google",
    },
    {
      redirectTo: import.meta.env.VITE_LOGINREDIRECT,
    }
  );
}
</script>

<template>
  <div class="w-screen h-screen relative">
    <div class="Container">
      <h1>Login using one of these methods</h1>

      <div class="LoginMethodsContainer">
        <button class="LoginButton" @click="loginWithGithub">
          <div class="IconContainer">
            <svg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_4_35)">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M14.999 0C6.71623 0 0 6.74192 0 15.0604C0 21.7129 4.29749 27.3574 10.2591 29.349C11.0091 29.4874 11.2828 29.0224 11.2828 28.6233C11.2828 28.2657 11.2697 27.3188 11.2622 26.0623C7.08936 26.9724 6.20907 24.0434 6.20907 24.0434C5.52751 22.304 4.54407 21.8409 4.54407 21.8409C3.18188 20.9063 4.64718 20.9251 4.64718 20.9251C6.15187 21.0315 6.94405 22.4772 6.94405 22.4772C8.2828 24.7785 10.455 24.114 11.31 23.7281C11.4459 22.7548 11.8341 22.0913 12.2625 21.7148C8.93156 21.3346 5.42999 20.0432 5.42999 14.2726C5.42999 12.6283 6.01407 11.2842 6.97407 10.231C6.81938 9.84983 6.3047 8.31942 7.12032 6.24592C7.12032 6.24592 8.38031 5.84118 11.2453 7.7895C12.4425 7.45537 13.725 7.28877 15.001 7.28218C16.275 7.28877 17.5584 7.45537 18.7566 7.7895C21.6197 5.84118 22.8769 6.24592 22.8769 6.24592C23.6953 8.31942 23.1806 9.84983 23.0259 10.231C23.9878 11.2842 24.5681 12.6283 24.5681 14.2726C24.5681 20.0573 21.0609 21.3308 17.7197 21.7035C18.2578 22.1685 18.7378 23.0871 18.7378 24.4923C18.7378 26.5056 18.7191 28.1292 18.7191 28.6233C18.7191 29.0262 18.9891 29.4949 19.7503 29.3471C25.7063 27.3517 30 21.711 30 15.0604C30 6.74192 23.2837 0 14.999 0Z"
                  fill="#3E75C3"
                />
              </g>
              <defs>
                <clipPath id="clip0_4_35">
                  <rect width="30" height="29.375" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>

          Login using <span class="font-medium">Github</span>
        </button>
        <button class="LoginButton" @click="loginWithGoogle">
          <div class="IconContainer">
            <svg
              width="30"
              height="32"
              viewBox="0 0 30 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M6.27272 15.5555C6.27272 14.5676 6.43431 13.6204 6.72272 12.732L1.67453 8.81757C0.690671 10.846 0.136353 13.1316 0.136353 15.5555C0.136353 17.9774 0.689989 20.2616 1.67249 22.2887L6.71794 18.3666C6.43226 17.4824 6.27272 16.5387 6.27272 15.5555Z"
                fill="#FBBC05"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M15.1364 6.56789C17.25 6.56789 19.1591 7.32839 20.6591 8.57283L25.0227 4.14814C22.3636 1.79752 18.9545 0.345673 15.1364 0.345673C9.20863 0.345673 4.11408 3.78794 1.67454 8.81757L6.72272 12.732C7.8859 9.14666 11.2016 6.56789 15.1364 6.56789Z"
                fill="#EB4335"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M15.1364 24.5432C11.2016 24.5432 7.8859 21.9644 6.72272 18.3791L1.67454 22.2928C4.11408 27.3232 9.20863 30.7654 15.1364 30.7654C18.795 30.7654 22.2879 29.4463 24.9095 26.9747L20.1177 23.213C18.7657 24.0779 17.0632 24.5432 15.1364 24.5432Z"
                fill="#34A853"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M29.4545 15.5555C29.4545 14.6568 29.3182 13.6889 29.1136 12.7901H15.1364V18.6667H23.1818C22.7795 20.6702 21.6845 22.2106 20.1177 23.213L24.9095 26.9747C27.6634 24.3793 29.4545 20.5133 29.4545 15.5555Z"
                fill="#4285F4"
              />
            </svg>
          </div>

          Login using <span class="font-medium">Google</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.Container {
  @apply flex flex-col justify-center  md:px-10 md:py-14 rounded-md;
  @apply md:absolute w-screen h-screen md:w-auto md:h-auto;
  @apply md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2;
  background-color: var(--sidebar-color);
}

.Container h1 {
  @apply text-2xl text-center;
  color: var(--text-color);
}

.LoginMethodsContainer {
  @apply flex flex-col items-center mt-8 space-y-4;
}

.LoginButton {
  @apply transition-transform ease-in duration-100 hover:scale-105;
  @apply flex items-center whitespace-pre p-2 pr-3 rounded-md;
  background-color: var(--primary-color);
  color: var(--text-color);
}

.IconContainer {
  @apply w-10 flex justify-center;
}
</style>
