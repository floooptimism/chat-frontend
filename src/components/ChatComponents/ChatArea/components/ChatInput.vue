<script setup>
import {ref, computed} from 'vue';
import chatClient from '../../../../modules/client/ChatClientInstance';

const chatMessage = ref("");
const chatInputElementRef = ref(null);

const hasMessage = computed(() => {
    return chatMessage.value;
});

const eventHandler = {
    ctrlShiftNewLine(e) {
    },
    sendMessage(e) {
        e.preventDefault();
        let message = chatMessage.value;

        chatClient.sendMessage(message);

        chatMessage.value = '';
        chatInputElementRef.value.innerText = '';
    },
    focusOnInput() {
        chatInputElementRef.value.focus();
    }
};
</script>

<template>
    <div class="ChatInputContainer" @click="eventHandler.focusOnInput">

        <div class="absolute left-4 cursor-text text-gray-400 opacity-80 select-none"
            @click="eventHandler.focusOnInput" 
            :class="{'hidden':hasMessage}">Enter message here.</div>

        <div class="ChatInput"
            ref="chatInputElementRef"
            @input="e => chatMessage = e.target.innerText"
            @keydown.shift.enter="eventHandler.ctrlShiftNewLine"
            @keydown.enter.exact="eventHandler.sendMessage"
            contenteditable></div>

        <div class="ChatSendButton" @click="eventHandler.sendMessage">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
        </div>

    </div>
</template>


<style scoped>

.ChatInput::-webkit-scrollbar {
    width: 7px;
}
.ChatInput::-webkit-scrollbar-thumb {
    background-color: #5c5860;
    border: 0;
}

.ChatInput::-webkit-scrollbar-track {
    border-radius: 10px;
    background: hsl(280deg 5% 19%);
}
.ChatInputContainer {
    @apply flex relative items-end py-2 rounded-md;
    background-color: #3c393f;
}

.ChatInput {
    @apply px-4 w-full rounded-md;
    @apply outline-none text-gray-300;
    @apply overflow-y-auto;
    max-height: 200px;
    background-color: #3c393f;
    overscroll-behavior: contain;
    /* overscroll-behavior: contain; */
}

.ChatSendButton {
    @apply flex-shrink-0 px-4;
    @apply transition-colors duration-150 ease-linear;
    @apply text-blue-500 active:text-blue-400;
    @apply fill-current cursor-pointer select-none;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    -webkit-tap-highlight-color: transparent;

}

</style>