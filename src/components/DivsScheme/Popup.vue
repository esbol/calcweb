<template>
    <div>
        <div class="popup-container">

            <component :arg="arg" :is="data[indexSlot]" @close="$emit('close')"></component>
        </div>
        <div class="back" @click="$emit('close')"></div>
    </div>
</template>

<script setup lang="ts">

import { store } from '@/store/store';
import { ref } from 'vue';
import AddContactor from './popups/AddContactor.vue';
import AddConsumer from './popups/AddConsumer.vue';

const data = [
    AddContactor,
    AddConsumer
]



const props = defineProps({
    indexSlot: {
        type: Number,
        required: true
    },
    left: {
        type: String,
        required: true
    },
    top: {
        type: String,
        required: true
    },
    arg: {}
})


</script>

<style scoped>
.back {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-color: transparent;
    z-index: 1000;
}

.popup-container {
    position: fixed;
    left: v-bind(left);
    top: v-bind(top);
    box-shadow: 2px 2px 2px gray;
    border: 1px solid rgb(201, 201, 201);
    background-color: white;

    z-index: 2000;
}
</style>