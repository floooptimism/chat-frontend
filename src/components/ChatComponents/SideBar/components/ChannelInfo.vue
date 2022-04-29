<script setup>
import { ref } from "vue";
import { faker } from "@faker-js/faker";
import EntityLabel from "../../../EntityLabel/EntityLabel.vue";

const props = defineProps({
  channelName: {
    type: String,
    default: "Unkown Channel",
  },
  channelDescription: {
    type: String,
    default: "Channel has no description",
  },

  channelMembersList: {
    type: Array,
    default() {
      return [];
    },
  },
});

const channelMembersList = ref(props.channelMembersList);
</script>

<template>
  <div class="ChannelInfo">
    <h1 class="ChannelName">
      {{ props.channelName }}
    </h1>

    <p class="ChannelDescription">
      {{ props.channelDescription }}
    </p>

    <div class="MembersContainer">
      <h1 class="MembersHeader">Members</h1>
      <EntityLabel
        v-for="member in channelMembersList"
        :entityName="member.name"
        :key="member.id"
        :entityIdentifier="member.id"
      />
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
  @apply text-xl font-medium tracking-wide;
}

.ChannelDescription {
  @apply mt-3;
}

.MembersContainer {
  @apply mt-6;
}

.MembersHeader {
  @apply text-xl font-medium tracking-wide;
}
</style>