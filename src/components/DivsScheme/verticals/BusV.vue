<template>
    <div @click="store.selectedObject = panel" class="bus-container" :class="{ hover_border: hover }">
        <div class="l_f" :class="{ hover_bg: hover }"></div>
        <div class="l_n" :class="{ hover_bg: hover }"></div>
        <div class="l_pe" :class="{ hover_bg_l_pe: hover }"></div>
        <div class="text" :class="{ text_hover: hover }">
            <span>L<br></span>
            <span>N<br></span>
            <span>PE</span>
        </div>
        <div class="fases">
            <div class="phaseLine" :class="{ hover_bg: hover }" v-if="store.selectedPanel.colPhase == 3"></div>
            <div class="phaseLine" :class="{ hover_bg: hover }"></div>
            <div class="phaseLine" :class="{ hover_bg: hover }" v-if="store.selectedPanel.colPhase == 3"></div>
        </div>
        <div class="l_end1" :class="{ hover_bg: hover }"></div>
        <div class="l_end2" :class="{ hover_bg: hover }"></div>
        <div class="l_end3" :class="{ hover_bg: hover }"></div>
        <div class="l_end4" :class="{ hover_bg: hover }"></div>
        <div class="l_end5" :class="{ hover_bg: hover }"></div>
        <div class="l_end6" :class="{ hover_bg: hover }"></div>
        <div class="pe_left" :class="{ pe_left_hover: hover }"></div>
        <div class="pe_bottom" :class="{ hover_bg_l_pe: hover }"></div>
        <div class="pe_rigth" :class="{ pe_left_hover: hover }"></div>
        <div class="contact"></div>
        <div class="contact2"></div>
        <PanelPowers :panel="panel" />
    </div>
</template>

<script setup lang="ts">


import PanelPowers from './PanelPowers.vue';
import { useStore } from 'vuex';
import { ref, watchEffect } from 'vue';
import { Panel } from '@/models/panel';

const store = useStore().state
const props = defineProps({
    panel: {
        type: Panel,
        required: true
    }
})
const hover = ref(false)

watchEffect(() => {

    if (store.selectedObject === props.panel) {
        hover.value = true
        
    } else {
        hover.value = false
    }
})




</script>

<style scoped>

.contact {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--scheme-line-color);
    position: absolute;
    left: 7px;
    top: 24px;
}

.contact2 {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--scheme-line-color);
    position: absolute;
    right: 5px;
    top: 24px;
}

.pe_left {
    width: 2px;
    height: 127px;
    position: absolute;
    left: 10px;
    top: 25px;
    background-image: linear-gradient(to bottom, var(--scheme-line-color) 80%, rgba(255, 255, 255, 0) 0%);
    background-size: 20px 20px;
}
.pe_left_hover{
    background-image: linear-gradient(to bottom, var(--scheme-line-hover-color) 80%, rgba(255, 255, 255, 0) 0%) !important;
}

.pe_rigth {
    width: 2px;
    height: 127px;
    position: absolute;
    left: calc(100% - 10px);
    top: 25px;
    background-image: linear-gradient(to bottom, var(--scheme-line-color) 80%, rgba(255, 255, 255, 0) 0%);
    background-size: 20px 20px;
}

.pe_bottom {
    width: calc(100% - 18px);
    height: 2px;
    position: absolute;
    left: 10px;
    top: 151px;
    background-image: linear-gradient(to right, var(--scheme-line-color) 80%, rgba(255, 255, 255, 0) 0%);
    background-size: 20px 20px;
}

.l_end1,
.l_end2,
.l_end3,
.l_end4,
.l_end5,
.l_end6 {
    width: 1px;
    height: 13px;
    background: var(--scheme-line-color);
    position: absolute;
}

.l_end1 {
    left: 0;
    top: -4px;
}

.l_end2 {
    left: 0;
    top: 11px;
    height: 10px;
}

.l_end3 {
    left: 0;
    top: 23px;
    height: 10px;
}

.l_end4 {
    left: 100%;
    top: -4px;
}

.l_end5 {
    left: 100%;
    top: 11px;
    height: 10px;
}

.l_end6 {
    left: 100%;
    top: 23px;
    height: 10px;
}

.fases {
    width: 15px;
    height: 15px;
    border: 0px solid red;
    position: absolute;
    top: -5px;
    left: 10px;
    display: flex;
    justify-content: space-around;
    flex-direction: row;
}

.phaseLine {
    width: 1px;
    height: 100%;
    background: var(--scheme-line-color);
    transform: rotate(40deg);
}

.text {
    position: absolute;
    left: -20px;
    top: -8px;
    color: var(--scheme-line-color);
}
.text_hover{
    color: var(--scheme-line-hover-color);
}
.l_f {
    height: 4px;
    width: 100%;
    background: var(--scheme-line-color);
}

.l_n {
    height: 2px;
    width: 100%;
    background: var(--scheme-line-color);
    margin-top: 10px;
}

.l_pe {
    height: 2px;
    width: 100%;

    background-image: linear-gradient(to right, var(--scheme-line-color) 80%, rgba(255, 255, 255, 0) 0%);
    background-size: 25px 1px;
    margin-top: 10px;
}
.hover_bg_l_pe {
    background-image: linear-gradient(to right, var(--scheme-line-hover-color) 80%, rgba(255, 255, 255, 0) 0%) !important;
}


.hover_border {
    border-color: var(--scheme-line-hover-color) !important;
    z-index: 1000 !important;
}
.hover_bg {
    background-color: var(--scheme-line-hover-color) !important;
}

.bus-container {
    cursor: pointer;
    position: relative;
    width: 100%;
    min-width: 300px;

    border: 0px solid var(--scheme-line-color);

    display: flex;
    justify-content: left;
    flex-direction: column;
    align-items: center;
    margin-top: 0px;
    margin-bottom: -25px;
}</style>