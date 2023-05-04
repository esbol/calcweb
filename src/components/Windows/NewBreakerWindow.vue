<template>
    <div v-if="store.showPopup.show">
        <div class="popup-container">

            <component :is="components[store.showPopup.componentIndx]" @close="store.showPopup.show=false"></component>
        </div>
        <div class="back" @click="store.showPopup.show = false"></div>
    </div>
</template>

<script setup lang="ts">

import AddConsumer from './popups/AddConsumer.vue';
import AddContactor from './popups/AddContactor.vue';
import { useStore } from 'vuex';
import { ref, computed } from 'vue';

const components = [
    AddContactor,
    AddConsumer
]
const store = useStore().state
const x = computed(()=> store.showPopup.x + 'px')
const y = computed(() => store.showPopup.y + 'px')


</script>

<style scoped>
.back {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-color: transparent;
    z-index: 4000;
}

.popup-container {
    position: fixed;
    left: v-bind(x);
    top: v-bind(y);
    box-shadow: 2px 2px 2px gray;
    border: 1px solid rgb(201, 201, 201);
    background-color: white;
 
    z-index: 5000;
}
</style>