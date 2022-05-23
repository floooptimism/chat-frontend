<script setup>
import moment from "moment";

const props = defineProps({
  user: {
    type: Object,
    default() {
      return {};
    },
  },
  message: {
    type: String,
    default: "",
  },
  time: {
    type: Date,
    default: "",
  },
  content: {
    type: String,
    default: "",
  },
});

const timeFromNow = props.time ? moment(props.time).fromNow() : "";
</script>

<template>
  <div class="Message">
    <div class="ProfileImage">
      <img :src="user.profileImage" alt="Profile Image" />
    </div>

    <div class="Content">
      <div class="MessageHeader">
        <span class="font-medium UserName">{{ props.user.username }}</span>
        <div class="Time">
          {{ timeFromNow }}
        </div>
      </div>
      <div class="MessageBody">
        {{ props.content }}
      </div>
    </div>
  </div>
</template>

<style scoped>
span {
  padding: 0;
  margin: 0;
}
.Message {
  @apply flex md:p-4 md:px-2 text-white my-6 md:my-3;
}

.ProfileImage {
  @apply flex items-start md:px-2 md:py-1 justify-center;
}

.ProfileImage img {
  @apply object-cover rounded-md;
  min-width: 40px;
  min-height: 40px;
  max-width: 40px;
  max-height: 40px;
}

.Content {
  @apply flex flex-col pl-4;
}

.MessageHeader {
  @apply flex items-center     px-1;
}

.UserName {
  @apply font-medium;
  color: white;
}

.Time {
  @apply text-gray-300 text-opacity-50 text-xs ml-6;
}

.MessageBody {
  @apply px-1 py-2;
  font-family: "Overpass", sans-serif;
  color: #dcddde;
}
</style>
