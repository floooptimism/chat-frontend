<script setup>
import { ref, computed } from "vue";
import fakerGenerateChannels from "../../../../test_helpers/generateChannels";
import EntityLabel from "../../../EntityLabel/EntityLabel.vue";
import stringSimilarity  from 'string-compare';

// local states
const searchChannelInput = ref("");

// faker
const channels = fakerGenerateChannels(10);

// Computed values
const filteredChannels = computed(() => {
  if (searchChannelInput.value.trim() === "") {
    return channels;
  }
  return channels.filter(channel => stringSimilarity(channel.channelName, searchChannelInput.value) >= 0.6);
});

// event handlers
const eventHandler = {
  entityClicked() {
    alert("clicked");
  }
}

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
        v-for="channel in filteredChannels"
        :imageSrc="channel.channelImage"
        :entityName="channel.channelName"
        :key="channel.channelId"
        @eventEntityClicked="eventHandler.entityClicked()"
      />
      <div v-if="filteredChannels.length == 0">
          No results for "{{ searchChannelInput.trim() }}." :(
      </div>
    </div>
  </div>
</template>

<style scoped>
.Channels {
  @apply flex flex-col px-4 pt-4;
  color: #e0e0e0;
}

.InputSearch {
  background-color: #3c393f;
  @apply p-2 rounded-md;
}

.ChannelsList {
  @apply flex flex-col mt-4;
}
</style>