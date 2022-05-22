


<template>
    <h1 @click="login" v-if="!authStore.authenticated">Login</h1>
    <h1 v-else>Logged In</h1>

</template>

<script setup>
import { useRouter } from 'vue-router';
import useAuth from '../stores/auth';
import supabase from '../modules/supabase/supabase';
import { watchEffect } from 'vue';

const router = useRouter();

const authStore = useAuth();

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