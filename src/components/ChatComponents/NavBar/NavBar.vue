<script setup>
import useChannels from '../../../stores/channel';
import useSideBarStore from '../../../stores/sidebar';

// stores
const channelsStore = useChannels();
const sideBarStore = useSideBarStore();


const eventHandlers = {
    eventKebabClick() {
        sideBarStore.toggleSideBar();
    }
}

</script>

<template>
    <div class="NavBarContainer">
        <div class="KebabMenuContainer">
            <svg xmlns="http://www.w3.org/2000/svg" @click="eventHandlers.eventKebabClick" width="28" height="28" viewBox="0 0 18 18">
                <path d="M2 13.5h14V12H2v1.5zm0-4h14V8H2v1.5zM2 4v1.5h14V4H2z" />
            </svg>
        </div>

        <div class="ChannelNameContainer">
            <span class="ChannelName">
                {{ channelsStore.currentChannel && channelsStore.currentChannel.channelName }}
            </span>

        </div>

    </div>
</template>

<style scoped>
.NavBarContainer {
    @apply fixed top-0 w-screen h-12 z-40;
    @apply flex items-center;
    @apply px-2 space-x-4 shadow;
    @apply md:content-width-if-desktop md:ml-64;
    background-color: #252329;

}
/* @media (min-width: 768px) {
    .NavBarContainer {
        margin-left: 256px;
        width: calc(100% - 256px);
    }
} */

.KebabMenuContainer {
    color: #e0e0e0;
    fill: currentColor;
    @apply cursor-pointer;
    @apply md:hidden;
}

.ChannelName {
    @apply md:text-lg font-medium;
    color: #e0e0e0;
}
</style>

