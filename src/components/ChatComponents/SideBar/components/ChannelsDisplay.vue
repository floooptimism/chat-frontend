<script setup>
import { ref, computed } from "vue";
import EntityLabel from "../../../EntityLabel/EntityLabel.vue";
import stringSimilarity from "string-compare";

//* Stores
import useChannelStore from "../../../../stores/channel.store";
import useSideBarStore from "../../../../stores/sidebar.store";
const channels = useChannelStore();
const sideBarStore = useSideBarStore();

//* local states
const searchChannelInput = ref("");

//* Event Handlers
const eventHandler = {
  channelClicked(channel) {
    channels.setCurrentChannel(channel);
    sideBarStore.setIsDisplayingChannels(false);
  },
};
</script>

<template>
  <div class="Channels">
    <input
      class="InputSearch"
      placeholder="Search"
      v-model="searchChannelInput"
    />

    <div class="ChannelsList">
      <EntityLabel
        v-for="channel in channels.searchChannel(searchChannelInput)"
        :imageSrc="channel.channelImage"
        :entityName="channel.channelName"
        :key="channel.channelId"
        :entityObject="channel"
        classProp="cursor-pointer"
        :entityEventParam="{ ...channel }"
        @eventEntityClicked="eventHandler.channelClicked"
      />
      <div v-if="channels.searchChannel(searchChannelInput).length == 0">
        No results for "{{ searchChannelInput.trim() }}." :(
      </div>
    </div>
  </div>
</template>

<style scoped>
.Channels {
  @apply flex flex-col px-2 pt-4;
  color: #e0e0e0;
}

.InputSearch {
  background-color: #3c393f;
  @apply transition-all duration-150 ease-linear;
  @apply outline-none border-2 border-transparent focus:border-gray-600;
  @apply p-2 rounded-md;
}

.ChannelsList {
  @apply flex flex-col mt-4;
}
</style>
