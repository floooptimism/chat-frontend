<script setup>
import NavBar from './components/ChatComponents/NavBar/NavBar.vue';
import SideBar from './components/ChatComponents/SideBar/SideBar.vue';

import { ref } from 'vue';
import ChatArea from './components/ChatComponents/ChatArea/ChatArea.vue';

</script>

<template>
  <div>
    <SideBar/>
    <NavBar />
    <ChatArea />
  </div>
</template>

<style>
.notest {
  @apply text-red-500;
}
</style>
