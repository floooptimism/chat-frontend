<template>
  <h1
    @click="loginWithGithub"
    class="text-white"
    v-if="!authStore.authenticated"
  >
    Login using github
  </h1>
  <h1
    @click="loginWithGoogle"
    class="text-white"
    v-if="!authStore.authenticated"
  >
    Login using google
  </h1>
  <h1 v-else>Logged In</h1>
</template>

<script setup>
import { useRouter } from "vue-router";
import { watchEffect } from "vue";
import supabase from "../modules/supabase/supabase";

//* Stores
import useAuthStore from "../stores/auth.store";
const authStore = useAuthStore();

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
  const { user, session, error } = await supabase.auth.signIn(
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
  const { user, session, error } = await supabase.auth.signIn(
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
