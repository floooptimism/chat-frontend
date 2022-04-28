<script setup>

const emit = defineEmits(["eventChannelAddButtonClick"])

</script>


<template>
  <h1>Channels</h1>
  <div class="ChannelAddButton" @click="emit('eventChannelAddButtonClick')">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
    </svg>
  </div>
</template>


<style scoped>
.ChannelAddButton {
  @apply ml-auto;
  @apply rounded;
  @apply p-1;
  background-color: #252329;

}
.ChannelAddButton svg{
    @apply fill-current;
    text: #e0e0e0;
}
</style>