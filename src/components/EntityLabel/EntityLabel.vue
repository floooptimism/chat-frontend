<script setup>

const props = defineProps({
    imageSrc: String,
    entityName: {
        type: String,
        default: "Unknown entity"
    },
    entityIdentifier: String,
    entityEventParam: {
        type: Object,
        default() {
            return null
        }
    },
    classProp: {
        type: String,
        default: ""
    }
})

const emit = defineEmits(["eventEntityClicked"]);

</script>

<template>
    <div :class="`Entity ${props.classProp}`" @click="emit('eventEntityClicked', props.entityEventParam)">
        <div class="ImageContainer">
            <img :src="props.imageSrc" alt="Channel Image" />
        </div>

        <div class="ml-4 font-medium">
            {{ props.entityName }}
        </div>
    </div>
</template>

<style scoped>
    .Entity {
        @apply flex items-center;
        @apply py-3 px-2 rounded;
        @apply transition-colors ease-linear duration-200;
    }


    .Entity:hover {
        background-color: #373538;
    }

    .ImageContainer {
        @apply w-8 h-8;
        @apply overflow-hidden;
        @apply rounded-md;
    }

    .ImageContainer img {
        width: 100%;
        height: 100%;
    }

</style>