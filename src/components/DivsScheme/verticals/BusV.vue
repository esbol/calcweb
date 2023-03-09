<template>
    <div @click="store.selectedObject = bus" class="bus-container" :class="{ hover_border: hover }">
       
    </div>
</template>

<script setup lang="ts">

import { Bus } from '@/models/bus';
import { Consumer } from '@/models/consumer';
import { store } from '@/store/store';
import { ref, watchEffect } from 'vue';

const props = defineProps({
    bus: {
        type: Bus,
        required: true
    },
    width: {
        type: String,
        required: true
    }
})
const hover = ref(false)

watchEffect(() => {

    if (store.selectedObject === props.bus) {
        hover.value = true
    } else {
        hover.value = false
    }
})




</script>

<style scoped>
.frame-description {
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: left;
    align-items: center;

    padding-left: 5px;
}





.hover_border {
    border-color: var(--scheme-line-hover-color) !important;
    z-index: 1000 !important;
}

.bus-container {
    cursor: pointer;
    position: relative;
    width: v-bind(width);
    height: 12px;
    border: 3px solid var(--scheme-line-color);

    display: flex;
    justify-content: left;
    flex-direction: column;
    align-items: center;
    margin-top: 0px;
}
</style>