<script setup>
import { ref } from "vue";
import { faker } from "@faker-js/faker";
import EntityLabel from "../../../EntityLabel/EntityLabel.vue";

//* Store
import useChannelStore from "../../../../stores/channel.store";
const channelsStore = useChannelStore();


</script>

<template>
  <div class="ChannelInfo">
    <h1 class="ChannelName">
      {{ channelsStore.currentChannel && channelsStore.currentChannel.name }}
    </h1>

    <p class="ChannelDescription">
      {{ channelsStore.currentChannel && channelsStore.currentChannel.description }}
    </p>

    <div class="MembersContainer">
      <h1 class="MembersHeader">Members</h1>
      <!-- <EntityLabel
        v-for="member in channelMembersList"
        :entityName="member.name"
        :key="member.id"
        :entityIdentifier="member.id"
      /> -->
    </div>
  </div>
</template>

<style scoped>
.ChannelInfo {
  color: var(--text-color);
  @apply flex flex-col;
  @apply mt-4;
}

.ChannelName {
}

.MembersHeader {
}

.ChannelName, .MembersHeader{
  @apply text-lg font-medium tracking-wide;
}

.ChannelDescription {
  @apply mt-3;
  font-family: 'Overpass', sans-serif;
}

.MembersContainer {
  @apply mt-6;
}

</style>