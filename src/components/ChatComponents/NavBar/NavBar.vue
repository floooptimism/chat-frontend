<script setup>
const props = defineProps({
    channelName: {
        type: String,
        default: 'Unknown Channel'
    },
    kebabMenuClick: {
        type: Function,
        default() {
            console.log('kebab menu click');
        }
    }
})

</script>

<template>
    <div class="NavBarContainer">
        <div class="KebabMenuContainer">
            <svg xmlns="http://www.w3.org/2000/svg" @click="$emit('kebabClick')" width="28" height="28" viewBox="0 0 18 18">
                <path d="M2 13.5h14V12H2v1.5zm0-4h14V8H2v1.5zM2 4v1.5h14V4H2z" />
            </svg>
        </div>

        <div class="ChannelNameContainer">
            <span class="ChannelName">
                {{ channelName }}
            </span>

        </div>

    </div>
</template>

<style scoped>
.NavBarContainer {
    @apply fixed top-0 w-screen h-12;
    @apply bg-gray-600;
    @apply flex items-center;
    @apply px-2 space-x-4;
}

.KebabMenuContainer {
    color: white;
    fill: currentColor;
}

.ChannelName {
    @apply text-white font-bold;
}
</style>

