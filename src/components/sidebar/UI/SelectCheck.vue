<template>
    <div class="back" @click="open=false" v-if="open"></div>
    <div class="select-container no-select">

        <div class="selected-item" @click="open = !open"> {{ selectedValue }}</div>
        <div class="btn no-select" @click="open = !open">
            <span v-if="!open" class="material-symbols-outlined">
                expand_more
            </span>
            <span v-else class="material-symbols-outlined">
                expand_less
            </span>
        </div>
        <div class="select-window" v-if="open">

            <div style="white-space: nowrap;" class="item" v-for="option in options" @click="selectedChange(option)">
                {{ option }}
            </div>
        </div>


    </div>
</template>

<script setup lang="ts">
import { Consumer } from '@/models/consumer';
import { ref } from 'vue';


const emits = defineEmits(['change'])
const props = defineProps({

    options: {
        type: Array,
        required: true,
    },
    selectedValue:{
        type: String,
        required: true
    }
})

const open = ref(false)


function selectedChange(option: any) {
    emits('change', option)
    open.value = false
}






</script>

<style scoped>
.select-container {
    display: grid;
    grid-template-columns: 1fr 24px;
    width: 100%;
    height: 24px;
    position: relative;
    background-color: transparent;
    box-sizing: border-box;

}

.btn {
    cursor: pointer;
    width: 100%;
    height: 100%;
    border-left: 1px solid var(--main-border-color);
    display: flex;
}

.select-window {
    position: absolute;
    top: 100%;
    left: 0;
    min-width: 100%;
    border: 1px solid var(--main-border-color);
    background: red;
    box-shadow: 2px 2px 1px gray;
    z-index: 5000;
}

.selected-item {
    display: flex;
    align-items: center;
    padding-left: 5px;
    cursor: pointer;
    white-space: nowrap;
    overflow: hidden;
    box-sizing: border-box;
    box-shadow: -1px -1px 1px gray;
}

.item {
    width: 100%;
    height: 25px;
    background: white;
    display: flex;
    align-items: center;
    padding-left: 5px;
    cursor: pointer;
}

.item:hover {

    background: var(--main-accent-color) !important;
    color: white !important;
}

.material-symbols-outlined {
    font-variation-settings:
        'FILL' 0,
        'wght' 400,
        'GRAD' 0,
        'opsz' 48
}

span {
    font-size: 22px;
}
.back {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-color: transparent;
    z-index: 1000;
}
</style>