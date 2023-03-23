<template>
    <div class="b">
        <div class="breaker-container" @click="store.selectedObject = breaker">

            <div class="text">
                <div class="error" v-if="error">
                    <div class="error_text">Нет номинала автомата</div>
                </div>
                <div class="text-name" :class="{ hover_text: hover }">{{ breaker.nameOfPlane }}</div>
                <div class="text-mark" :class="{ hover_text: hover }">{{ breaker.mark }}</div>
                <div class="text-current" :class="{ hover_text: hover }">Iн={{ breaker.nominalCurrent }}A</div>
            </div>


            <div class="line-before" :class="{ hover_bg: hover }"></div>

            <div class="boxe">
                <div class="line" :class="{ hover_bg: hover }" />
                <div class="lineA" :class="{ hover_border: hover }"></div>
            </div>



            <div class="line-after" :class="{ hover_bg: hover }"></div>

            <div class="line_0">
                <div class="line_0_angle"></div>
            </div>

            <div class="line_pe_angle"></div>
            <div class="contact_0"></div>
            <div class="contact_f"></div>
            <div class="contact_pe"></div>

            <div class="fases" v-if="showPhases">
                <div class="phaseLine" v-if="breaker.colPhase === 3" :class="{ hover_bg: hover }"></div>
                <div class="phaseLine" :class="{ hover_bg: hover }"></div>
                <div class="phaseLine" v-if="breaker.colPhase === 3" :class="{ hover_bg: hover }"></div>
            </div>
        </div>
        <SectionV v-for="section in breaker.outContact.getSlaveSections()" :section="section" />
    </div>
</template>

<script setup lang="ts">

import { Breaker } from '@/models/breaker';
import { Contactor } from '@/models/contactor';
import { SectionLine } from '@/models/sectionline';
import { useStore } from 'vuex';
import { ref, watchEffect } from 'vue';
import SectionV from './SectionV.vue';

const store = useStore().state
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
const error = ref(false)

watchEffect(() => {
    if (store.selectedObject === props.breaker) {
        hover.value = true
    } else {
        hover.value = false
    }
    if (props.breaker.nominalCurrent == -1) {
        error.value = true
    } else {
        error.value = false
    }
})


</script>

<style scoped>
.error {
    position: absolute;
    left: -5px;
    top: -5px;
    width: 50px;
    height: 60px;
    border: 2px dashed red;

}

.error:hover .error_text {
    visibility: visible;
}

.error_text {
    visibility: hidden;
    width: 120px;
    background-color: black;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;
    position: absolute;
    z-index: 1;
    top: 110%;
    left: 50%;
    margin-left: -60px;
}

.error_text::after {
    content: "";
    position: absolute;
    bottom: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent black transparent;
}

.contact_pe {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--scheme-line-color);
    position: absolute;
    right: 17px;
    top: 154px;
}

.contact_f {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--scheme-line-color);
    position: absolute;
    right: 31px;
    top: -5px;
}

.contact_0 {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--scheme-line-color);
    position: absolute;
    right: 17px;
    top: 8px;
}

.line_pe_angle {
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 2px;
    height: 25px;
    transform: rotate(30deg);
    transform-origin: bottom;
    background: var(--scheme-line-color);
}



.line_0_angle {
    position: absolute;
    top: 100%;
    right: 0;
    width: 2px;
    height: 25px;
    transform: rotate(30deg);
    transform-origin: top;
    background: var(--scheme-line-color);
}

.line_0 {
    position: absolute;
    top: 16px;
    right: 20px;
    width: 2px;
    height: 110px;
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
    top: 40px;
    left: calc(50% -10px);
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
    left: 60px;
    top: 40px;
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
    height: 180px;
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
    height: 80px;
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