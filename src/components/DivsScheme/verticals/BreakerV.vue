<template>
    <div class="breaker-container" @click="store.selectedObject = breaker">
        <div class="text">
            <div class="text-name" :class="{ hover_text: hover }">{{ breaker.nameOfPlane }}</div>
            <div class="text-mark" :class="{ hover_text: hover }">{{ breaker.mark }}</div>
            <div class="text-current" :class="{ hover_text: hover }">Iн={{breaker.nominalCurrent}}A</div>
        </div>


        <div class="line-before" :class="{ hover_bg: hover }"></div>

        <div class="boxe">
            <div class="line" :class="{ hover_bg: hover }" />
            <div class="lineA" :class="{ hover_border: hover }"></div>
        </div>



        <div class="line-after" :class="{ hover_bg: hover }"></div>

        <div class="fases" v-if="showPhases">
            <div class="phaseLine" v-if="breaker.colPhase = 3" :class="{ hover_bg: hover }"></div>
            <div class="phaseLine"  :class="{ hover_bg: hover }"></div>
            <div class="phaseLine" v-if="breaker.colPhase = 3" :class="{ hover_bg: hover }"></div>
        </div>
    </div>
</template>

<script setup lang="ts">

import { Breaker } from '@/models/breaker';
import { Contactor } from '@/models/contactor';
import { store } from '@/store/store';
import { ref, watchEffect } from 'vue';



const props = defineProps({
    breaker: {
        type: Breaker,
        required: true
    },
    showPhases: {
        type: Boolean,
        required: true
    }
})

const hover = ref(false)

watchEffect(() => {
    if (store.selectedObject === props.breaker) {
        hover.value = true
    } else {
        hover.value = false
    }
})


</script>

<style scoped>
.fases {
    width: 15px;
    height: 13px;
    border: 0px solid red;
    position: absolute;
    top: 10px;
    left: calc(50% -10px);
    display: flex;
    justify-content: space-around;
    flex-direction: column;
}
.phaseLine{
    width: 100%;
    height: 1px;
    background: var(--scheme-line-color);
    transform: rotate(40deg);
}

.text {
    position: absolute;
    left: 50px;
    top: 30px;
}

.text-name {

    color: var(--scheme-line-color);
}

.text-mark {
    width: auto;
    white-space: nowrap;
    color: var(--scheme-line-color);
}



.text-current {
    color: var(--scheme-line-color);
}



.hover_text {
    color: var(--scheme-line-hover-color) !important;
}

.hover_bg {
    background-color: var(--scheme-line-hover-color) !important;
}

.hover_border {
    border-color: var(--scheme-line-hover-color) !important;
}

.breaker-container {
    cursor: pointer;
    position: relative;
    width: 70px;
    height: 100px;
    border: 0px dashed gray;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

}

.line-before {
    width: 3px;
    height: 40px;
    background-color: var(--scheme-line-color);
}

.line-after {
    flex-grow: 1;
    width: 3px;
    background-color: var(--scheme-line-color);
}

.line {
    position: absolute;
    left: calc(50% - 1px);
    right: 0;
    bottom: 0;
    width: 3px;
    height: 35px;
    background-color: var(--scheme-line-color);
    transform: rotate(-30deg);
    transform-origin: bottom;
}

.lineA {
    position: absolute;
    left: -6px;
    top: 11px;
    width: 15px;
    height: 7px;
    border-left: 3px solid var(--scheme-line-color);
    border-top: 3px solid var(--scheme-line-color);
    border-right: 3px solid var(--scheme-line-color);
    transform: rotate(-120deg);
}

.boxe {
    width: 30px;
    border: 0px dashed gray;
    overflow: visible;
    position: relative;
    height: 30px;
}
</style>