<script setup>
import NavBar from './components/ChatComponents/NavBar/NavBar.vue';
import SideBar from './components/ChatComponents/SideBar/SideBar.vue';

import {ref} from 'vue';

const sideBarOpen = ref(false);  

function toggleSideBar(){
  sideBarOpen.value = !sideBarOpen.value;
}

</script>

<template>
  <div>
    <NavBar @kebabClick="toggleSideBar"/>
    <SideBar @toggleSideBar="toggleSideBar" v-bind:isSideBarOpen="sideBarOpen" />
  </div>
</template>

<style>

.notest {
  @apply text-red-500;
}
</style>
