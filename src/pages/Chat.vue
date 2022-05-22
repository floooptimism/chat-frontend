<script setup>
import NavBarVue from '../components/ChatComponents/NavBar/NavBar.vue';
import SideBarVue from '../components/ChatComponents/SideBar/SideBar.vue';
import ChatAreaVue from '../components/ChatComponents/ChatArea/ChatArea.vue';
import useAuth from '../stores/auth';
import useChatClientState from '../stores/chatClient';
import { useRouter } from 'vue-router';
import {connectIfNotConnected, setupClient} from '../modules/client/ChatClientInstance';
import { watchEffect } from 'vue';

const authStore = useAuth();
const router = useRouter();
const chatClientStore = useChatClientState();

watchEffect(() => {
    if(!authStore.authenticated){
        router.push({
            name: 'login'
        })
    }
});


setupClient(authStore.token, "testUser");
connectIfNotConnected();

</script>

<template>
    <div>
        <SideBarVue/>
        <NavBarVue />
        <ChatAreaVue />
    </div>
</template>