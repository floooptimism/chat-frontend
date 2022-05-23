<script setup>
const emit = defineEmits(["eventGoBack"]);
</script>

<template>
  <div class="cursor-pointer flex items-center" @click="emit('eventGoBack')">
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        viewBox="0 0 512 512"
      >
        <title>ionicons-v5-a</title>
        <polyline
          points="328 112 184 256 328 400"
          style="
            fill: none;
            stroke: #fff;
            stroke-linecap: round;
            stroke-linejoin: round;
            stroke-width: 48px;
          "
        />
      </svg>
    </div>
    <h1 class="ml-2">All Channels</h1>
  </div>
</template>
