<script setup>
import ChatMessage from "./components/ChatMessage.vue";
import ChatInput from "./components/ChatInput.vue";

import useChannels from "../../../stores/channel.store";
import { ref, computed, watch } from "vue";
import client from "../../../modules/client/ChatClientInstance";

const STORE_channel = useChannels();

if (!STORE_channel.currentChannel) {
  console.log(STORE_channel.channelList[0]);
  client.joinRoom(STORE_channel.channelList[0]);
}

const channelName = computed(() => {
  return (
    STORE_channel.currentChannel && STORE_channel.currentChannel.channelName
  );
});

function isMutationAMessageAppend(mutation) {
  return (
    mutation.events.newValue && mutation.events.newValue.hasOwnProperty("id")
  );
}

function checkScrollOffsetFromBottom(element, offset) {
  return (
    element.scrollHeight - element.scrollTop - element.clientHeight <= offset
  );
}

function scrollToBottom(element) {
  setTimeout(() => {
    element.scrollBy({
      top: element.scrollHeight,
      behavior: "smooth",
    });
  }, 0);
}

function newMessageNotification() {}

/**
 * if there's a new message, scroll to the bottom if user is scrolled not far from the bottom,
 * else show a notification
 */

STORE_channel.$subscribe((mutation, state) => {
  if (isMutationAMessageAppend(mutation)) {
    let chatArea = document.getElementById("chat-area");
    if (checkScrollOffsetFromBottom(chatArea, 300)) {
      scrollToBottom(chatArea);
    } else {
      newMessageNotification();
    }
  }
});
</script>

<template>
  <div class="ChatArea" id="chat-area">
    <h1 class="ChannelWelcome">
      Welcome to
      <span class="font-medium italic">{{ channelName }} </span> channel
    </h1>
    <h6 class="text-white py-5 opacity-80">
      This is the start of this channel.
    </h6>
    <div class="ChatMessages">
      <ChatMessage
        v-for="message in STORE_channel.currentChannelMessages"
        :key="message.id"
        :user="message.user"
        :message="message.message"
        :time="message.timestamp"
      />
    </div>

    <div class="ChatBox">
      <ChatInput />
    </div>
  </div>
</template>

<style scoped>
.ChatArea {
  @apply relative md:content-width-if-desktop md:ml-64 mt-12 pt-8 px-6 overflow-y-auto;
  /* change height to accomodate navbar and chatbox */
  height: calc(100vh - 124px);
}

.ChannelWelcome {
  @apply text-white text-3xl;
}

.ChatBox {
  @apply fixed left-0 md:left-64 md:content-width-if-desktop bottom-0 py-4 px-5 md:px-8 w-full text-white;
  background-color: var(--primary-color);
}
</style>
