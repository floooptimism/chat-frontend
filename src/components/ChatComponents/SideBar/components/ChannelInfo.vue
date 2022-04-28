<script setup>

const props = defineProps({
    channelName: {
        type: String,
        default: "Unkown Channel"
    },
    channelDescription: {
        type: String,
        default: "Channel has no description"
    },

    channelMembersList: {
        type: Array,
        default() {
            return []
        }
    }
})

</script>

<template>
    <div class="ChannelName">
        {{props.channelName}}
    </div>

    <div class="ChannelDescription">
        {{ props.channelDescription }}
    </div>

    <div>
        <span>Members</span>

        <!-- members list here -->
        <p>Members list here</p>
    </div>

</template>