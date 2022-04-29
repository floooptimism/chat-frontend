<script setup>
import NavBar from './components/ChatComponents/NavBar/NavBar.vue';
import SideBar from './components/ChatComponents/SideBar/SideBar.vue';

import {ref} from 'vue';

const sideBarOpen = ref(false);

const eventHandlers = {
  toggleSideBar(){
    sideBarOpen.value = !sideBarOpen.value;
  }
}

function toggleSideBar(){
  
}

</script>

<template>
  <div>
    <NavBar @eventKebabClick="eventHandlers.toggleSideBar()"/>
    <SideBar @eventToggleSideBar="eventHandlers.toggleSideBar()" v-bind:isSideBarOpen="sideBarOpen" />
  </div>
</template>

<style>

.notest {
  @apply text-red-500;
}
</style>
