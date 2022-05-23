<script setup>
import NavBarVue from '../components/ChatComponents/NavBar/NavBar.vue';
import SideBarVue from '../components/ChatComponents/SideBar/SideBar.vue';
import ChatAreaVue from '../components/ChatComponents/ChatArea/ChatArea.vue';
import { useRouter } from 'vue-router';
import {connectIfNotConnected, setupClient} from '../modules/client/ChatClientInstance';
import { watchEffect } from 'vue';

//* Stores
import useAuthStore from '../stores/auth.store';
import useChatClientStateStore from '../stores/chatClient.store';
const chatClientStore = useChatClientStateStore();
const authStore = useAuthStore();


const router = useRouter();

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