<script setup>
import generateMessages from '../../../test_helpers/generateMessages';
import generateUsers from '../../../test_helpers/generateUsers'

import ChatMessage from './components/ChatMessage.vue';
import ChatInput from './components/ChatInput.vue';

import useChannels from '../../../stores/channel';
import { computed } from 'vue';

const channels = useChannels();

if (!channels.currentChannel) {
    channels.setCurrentChannel(channels.channelList[0]);
}

const channelName = computed(() => {
    return channels.currentChannel && channels.currentChannel.channelName;
});

let users = generateUsers(5);
console.log(users);
let messages = generateMessages(5, users);




</script>

<template>
    <div class="ChatArea">
        <h1 class="ChannelWelcome">Welcome to <span class="font-medium italic">{{ channelName }} </span> channel</h1>
        <h6 class=" text-white py-5 opacity-80"> This is the start of this channel. </h6>
        <div class="ChatMessages">
            <ChatMessage v-for="message in messages" :key="message.id" :user="message.user" :content="message.content"
                :time="message.timestamp" />
        </div>

        <div class="ChatBox">
            <ChatInput />
        </div>
    </div>
</template>

<style scoped>

.ChatArea {
    @apply relative md:content-width-if-desktop md:ml-64 mt-12 pt-8 pb-14 px-6 overflow-y-auto;
    /* change height depending on the navbar's height */
    height: calc(100% - 48px)
}

.ChannelWelcome {
    @apply text-white text-3xl;
}

.ChatBox {
    @apply fixed left-0 md:left-64 md:content-width-if-desktop bottom-0 py-4 px-5 md:px-8 w-full text-white;
    background-color: var(--primary-color);
}




</style>