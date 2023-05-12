<template>
    <div class="b">
        <div class="breakerIn-container" @click="store.selectedObject = fuse">
            <div class="text">
                <div class="text-name" :class="{ hover_text: hover }">{{ fuse.nameOfPlane }}</div>
                <div class="text-mark" :class="{ hover_text: hover }">{{ fuse.mark }}</div>
                <div class="text-current" :class="{ hover_text: hover }">Iн={{ fuse.nominalCurrent }}A</div>
            </div>


            <div class="line-before" :class="{ hover_bg: hover }"></div>

            <div class="boxe" :class="{ hover_border: hover }">
            </div>


            <div class="inCable"></div>
            <div class="line-after" :class="{ hover_bg: hover }"></div>

            <div class="line_0" :class="{ hover_bg: hover }">

            </div>
            <div class="line_0_angle" :class="{ hover_bg: hover }"></div>
            <div class="line_pe" :class="{ line_pe_hover: hover }"></div>
            <div class="contact_0"></div>
            <div class="contact_f"></div>
            <div class="contact_pe"></div>

            <div class="fases" v-if="showPhases">
                <div class="phaseLine" v-if="fuse.colPhase === 3" :class="{ hover_bg: hover }"></div>
                <div class="phaseLine" :class="{ hover_bg: hover }"></div>
                <div class="phaseLine" v-if="fuse.colPhase === 3" :class="{ hover_bg: hover }"></div>
            </div>
        </div>
        <SectionV v-for="section in fuse.outContact.getSlaveSections()" :section="section" />
    </div>
</template>

<script setup lang="ts">

import { Breaker } from '@/models/breaker';
import { Contactor } from '@/models/contactor';
import { SectionLine } from '@/models/sectionline';
import { useStore } from 'vuex';
import { ref, watchEffect } from 'vue';
import SectionV from './SectionV.vue';
import { Fuse } from '@/models/fuse';

const store = useStore().state
const props = defineProps({
    fuse: {
        type: Fuse,
        required: true
    },
    showPhases: {
        type: Boolean,
        required: true
    }
})

const hover = ref(false)

watchEffect(() => {
    if (store.selectedObject === props.fuse) {
        hover.value = true
    } else {
        hover.value = false
    }
})


</script>

<style scoped>
.inCable{
    width: 200px;
    height: 20px;
    position: absolute;
    left: 34px;
    top: -10px;
    border-left: 3px solid var(--scheme-line-color);
    border-top: 3px solid var(--scheme-line-color);
}
.contact_pe {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--scheme-line-color);
    position: absolute;
    right: 1px;
    bottom: -32px;
}

.contact_f {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--scheme-line-color);
    position: absolute;
    right: 30px;
    bottom: -6px;
}

.contact_0 {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--scheme-line-color);
    position: absolute;
    right: 15px;
    bottom: -20px;
}

.line_pe {
    position: absolute;
    bottom: -28px;
    right: 4px;
    width: 2px;
    height: 88px;
    background-image: linear-gradient(to bottom, var(--scheme-line-color) 80%, rgba(255, 255, 255, 0) 0%);
    background-size: 25px 25px;

}
.line_pe_hover{
    background-image: linear-gradient(to bottom, var(--scheme-line-hover-color) 80%, rgba(255, 255, 255, 0) 0%);
}


.line_0_angle {
    position: absolute;
    top: 0;
    left: 36px;
    width: 57px;
    height: 2px;
    transform: rotate(60deg);
    transform-origin: left;
    background: var(--scheme-line-color);
}

.line_0 {
    position: absolute;
    top: 26px;
    right: 18px;
    width: 2px;
    height: 97px;
    background: var(--scheme-line-color);
}

.b {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
}

.fases {
    width: 15px;
    height: 13px;
    border: 0px solid red;
    position: absolute;
    top: 12px;
    /* left: calc(50% -10px); */
    display: flex;
    justify-content: space-around;
    flex-direction: column;
}

.phaseLine {
    width: 100%;
    height: 1px;
    background: var(--scheme-line-color);
    transform: rotate(40deg);
}

.text {
    position: absolute;
    left: -35px;
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

.breakerIn-container {
    cursor: pointer;
    position: relative;
    width: 70px;
    height: 110px;
    border: 0px dashed gray;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

}

.line-before {
    width: 3px;
    height: 70px;
    background-color: var(--scheme-line-color);
}

.line-after {
    height: 40px;
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
    width: 18px;
    border: 2px solid var(--scheme-line-color);
    overflow: visible;
    position: absolute;
    height: 32px;
}
</style>