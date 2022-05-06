<script setup>
import { ref, computed } from "vue";
import ChannelListTopBar from "./components/ChannelListTopBar.vue";
import ChannelTopBar from "./components/ChannelTopBar.vue";
import ChannelsDisplay from "./components/ChannelsDisplay.vue";
import ChannelInfo from "./components/ChannelInfo.vue";
import useChannels from "../../../stores/channel";
import useSideBarStore from "../../../stores/sidebar";

const sideBarStore = useSideBarStore();

// Event Handlers
const eventHandlers = {
  goBack() {
    sideBarStore.setIsDisplayingChannels(true);
  },
  channelAddButton() {
    alert("Adding new channel");
  }

}

// Computed values
const SideBarClasses = computed(() => {
  return {
    Open: sideBarStore.isOpen,
    Close: !sideBarStore.isOpen,
  };
});

</script>


<template>
  <div class="SideBarContainer" :class="SideBarClasses">
    <div class="TopBar">
      <ChannelListTopBar v-if="sideBarStore.isDisplayingChannels" @eventChannelAddButtonClick="eventHandlers.channelAddButton"/>
      <ChannelTopBar v-else @eventGoBack="eventHandlers.goBack" />

      <div class="SideBarClose"  @click="sideBarStore.toggleSideBar()">
            <svg
            class="fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            >
            <path
                d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
            />
            </svg>
      </div>
    </div>

    <div class="SideBar" >
      <ChannelsDisplay v-if="sideBarStore.isDisplayingChannels" />
      <ChannelInfo v-else />
    </div>
  </div>
</template>


<style scoped>
.SideBarContainer {
  @apply fixed top-0 w-64 h-screen;
  @apply transition-all duration-200 ease-linear;
  @apply pointer-events-none z-50;
}

.Open {
  transform: translateX(0);
}

.Close {
  transform: translateX(-160%);
  @apply md:translate-x-0;
}

.TopBar {
  @apply fixed top-0 left-0 w-64 h-12 px-4;
  @apply flex items-center;
  @apply shadow;
  @apply z-50;
  @apply font-medium;
  @apply pointer-events-auto;
  background-color: #120f13;
  color: #e0e0e0;
}

.SideBar {
  @apply pointer-events-auto;
  @apply relative top-0 left-0 w-64 h-screen;
  @apply pt-12 px-4;
  @apply shadow;
  background-color: #120f13;
  @apply overflow-y-auto;
  overscroll-behavior:  contain;
}

.SideBarClose {
  @apply cursor-pointer;
  @apply md:hidden;
  @apply absolute top-1/2 right-0;
  @apply p-2 rounded-lg shadow-lg;
  transform: translate(120%, -50%);
  color: #e0e0e0;
  background-color: #120f13;
}
</style>