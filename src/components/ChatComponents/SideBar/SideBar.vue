<script setup>
import { computed } from 'vue';
import ChannelsTopBar from '../NavBar/components/ChannelsTopBar.vue';
import ChannelTopBar from '../NavBar/components/ChannelTopBar.vue';
import ChannelsDisplay from '../NavBar/components/ChannelsDisplay.vue';

const props = defineProps({
    isSideBarOpen: {
        type: Boolean,
        default: false
    },
    isDisplayingChannels: {
        type: Boolean,
        default: false
    },
})

const SideBarClasses = computed(() => {
    return {
        Open: props.isSideBarOpen,
        Close: !props.isSideBarOpen
    }
})



</script>


<template>
    <div class="SideBarContainer" :class="SideBarClasses">
        <div class="TopBar">
            <ChannelsTopBar v-if="isDisplayingChannels" />
            <ChannelTopBar v-else />

            <div class="SideBarClose" @click="$emit('toggleSideBar')">
                <span>Close</span>
            </div>
        </div>
        
        <div class="SideBar">
            <ChannelsDisplay v-if="isDisplayingChannels" />
            <ChannelInfo v-else />
        </div>

    </div>
</template>


<style scoped>
.SideBarContainer {
    @apply fixed top-0 w-screen h-screen;
    @apply transition-all duration-200 ease-linear;
}

.Open {
    transform: translateX(0);
}

.Close {
    transform: translateX(-100%);
}

.TopBar {
    @apply fixed top-0 left-0 w-64 h-12 px-2;
    @apply bg-gray-800;
    @apply text-white;
    @apply flex items-center;
    @apply shadow-2xl;
    @apply z-50;
}

.SideBar{
    @apply relative top-0 left-0 w-64 h-screen;
    @apply pt-12;
    @apply bg-gray-700;
    @apply overflow-y-scroll;
    
}

.SideBarClose {
    @apply absolute top-1/2 right-0;
    transform: translate(120%, -50%);
}



</style>