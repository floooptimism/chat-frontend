


<template>
    <h1 @click="login" v-if="!authStore.authenticated">Login</h1>
    <h1 v-else>Logged In</h1>

</template>

<script setup>
import { useRouter } from 'vue-router';
import { watchEffect } from 'vue';
import supabase from '../modules/supabase/supabase';

//* Stores
import useAuthStore from '../stores/auth.store';
const authStore = useAuthStore();

const router = useRouter();


//* redirect if authenticated
watchEffect( () => {
    if(authStore.authenticated){
        router.push({
            name: 'chat'
        })
    }
})




async function login(){
    const { user, session, error } = await supabase.auth.signIn({
    // provider can be 'github', 'google', 'gitlab', and more
    provider: 'github',
  }, {
      redirectTo: 'http://localhost:3000/login'
  })

}

</script>