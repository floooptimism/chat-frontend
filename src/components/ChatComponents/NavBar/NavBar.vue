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

const emit = defineEmits(["eventKebabClick"])

</script>

<template>
    <div class="NavBarContainer">
        <div class="KebabMenuContainer">
            <svg xmlns="http://www.w3.org/2000/svg" @click="emit('eventKebabClick')" width="28" height="28" viewBox="0 0 18 18">
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
    @apply flex items-center;
    @apply px-2 space-x-4 shadow;
    background-color: #252329;

}

.KebabMenuContainer {
    color: #e0e0e0;
    fill: currentColor;
}

.ChannelName {
    @apply font-medium;
    color: #e0e0e0;
}
</style>

