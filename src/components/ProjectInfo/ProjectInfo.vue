<script setup>
import { ref } from "vue";

const showModal = ref(true);

const eventHandlers = {
  closeModal() {
    showModal.value = false;
  },
};
</script>

<template>
  <vue-final-modal v-model="showModal" :click-to-close="false">
    <div class="Notify">
      <h1 class="text-2xl mb-4 font-medium">
        Current project limitations / WIP
      </h1>
      <ul class="list-disc pl-8 text-sm flex flex-col space-y-2">
        <li>Current iteration doesn't have data persistence.</li>
        <li>
          Max messages you can view is 100 messages, old messages get replaced
          by new once limit goes past 100.
        </li>
        <li>You can't see active users in a channel.</li>
      </ul>
      <div class="text-center">
        <button class="hideModalButton" @click="eventHandlers.closeModal">
          Gotcha
        </button>
      </div>
    </div>
  </vue-final-modal>
</template>

<style scoped>
.Notify {
  @apply absolute -translate-x-1/2 py-8 px-8 top-24 left-1/2;
  @apply break-words;
  background-color: var(--primary-color);
  color: var(--text-color);
}

.hideModalButton {
  @apply mt-8 px-2 py-1 rounded;
  @apply mx-auto;
  background-color: #42b883;
  color: black;
}

.Notify h1 {
  color: #42b883;
}
</style>
