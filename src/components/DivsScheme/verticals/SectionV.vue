<template>
    <div class="s">
        <NoApparateV :section="section" :show-phases="true" v-if="noApparateShow" />

        <div class="section-container" v-if="!section.isInPanel" @click="store.selectedObject = section">
            <div class="text_left" :class="{ hover_text: hover }">
                {{ section.nameOfPlane }}-{{ Number(section.modeMax.ratedPower.toFixed(2)).toString().replace('.', ',')
                }}-{{ section.modeMax.cosf.toFixed(2).replace('.', ',') }}-{{
    Number(section.modeMax.current.toFixed(1)).toString().replace('.', ',') }}-{{ section.cable.length }}-<span
                    :class="{ hover_text: hover, color_text_warn: deltaUHi }">{{
                        Number(section.cable.deltaU.toFixed(1)).toString().replace('.', ',') }}%</span>
            </div>
            <div class="line" :class="{ hover_bg: hover }" />
            <div class="text_rigth" :class="{ hover_text: hover }">
                {{ section.cable.mark }}-<span :class="{ color_text_warn: squareHi }">{{ section.cable.colCores }}x{{
                    section.cable.square.toString().replace('.', ',') }}</span>-{{ section.pipe.mark }}.{{
        section.pipe.diametr }}-{{ section.pipe.length }}
            </div>
            <div class="section" :class="{ hover_border: hover }">

            </div>

            <div class="label" :class="{ label_hover: labelHover }" @mouseenter="labelHover = true"
                @mouseleave="labelHover = false" v-if="labelShow" @click="showPopup($event)">
                <span class="material-symbols-outlined span-plus">
                    add
                </span>


            </div>


        </div>
        <BreakerPowerV :breaker-power="breakerPower" :show-phases="true" v-if="breakerPowerShow" />
        <DiffBreakerV :diff-breaker="diffBreaker" :show-phases="true" v-if="diffBreakerShow" />
        <FuseV :fuse="fuse" :showPhases="true" v-if="fuseShow" />
        <BreakerV :breaker="breaker" :showPhases="true" v-if="breakerShow" />
        <ConsV :consumer="consumer" v-if="consumerShow" />
        <ContactorV :contactor="contactor" v-if="contactorShow" />
    </div>
    
</template>

<script setup lang="ts">

import BreakerPowerV from './BreakerPowerV.vue';
import NoApparateV from './NoApparateV.vue';
import ContactorV from './ContactorV.vue';
import BreakerV from './BreakerV.vue';
import ConsV from './ConsV.vue';
import { Consumer } from '@/models/consumer';
import { SectionLine } from '@/models/sectionline';
import { useStore } from 'vuex';
import { reactive, ref, watch, watchEffect, computed } from 'vue';
import { Breaker } from '@/models/breaker';
import { Contactor } from '@/models/contactor';
import FuseV from './FuseV.vue';
import DiffBreakerV from './DiffBreakerV.vue';
import { Fuse } from '@/models/fuse';
import { DiffBreaker } from '@/models/diffBreaker';
import { Panel } from '@/models/panel';
import { Contact } from '@/models/contact';
import { BreakerPower } from '@/models/breakerPower';



const store = useStore().state
const labelHover = ref(false)
const labelShow = ref(false)
const hover = ref(false)


let breaker: Breaker
let breakerPower: BreakerPower
let consumer: Consumer
let contactor: Contactor
let fuse: Fuse
let diffBreaker: DiffBreaker

function showPopup(event: MouseEvent) {
    store.showPopup.x = event.clientX,
        store.showPopup.y = event.clientY
    store.showPopup.componentIndx = 0
    store.showPopup.args = props.section
    store.showPopup.show = true
}

const props = defineProps({
    section: {
        type: SectionLine,
        required: true
    }
})

//#region ApparatShow

const noApparateShow = computed(() => {
    if (props.section.startContact != null) {
        if (props.section.startContact.ownDevice instanceof Panel) {
            if (!props.section.isInPanel)
                return true
        } else return false
    } else return false
})

const fuseShow = computed(() => {
    if (props.section.endContact != null) {
        if (props.section.endContact.ownDevice instanceof Fuse) {
            fuse = props.section.endContact.ownDevice as Fuse
            return true
        } else return false
    } else return false
})

const diffBreakerShow = computed(() => {
    if (props.section.endContact != null) {
        if (props.section.endContact.ownDevice instanceof DiffBreaker) {
            diffBreaker = props.section.endContact.ownDevice as DiffBreaker
            return true
        } else return false
    } else return false
})

const breakerShow = computed(() => {
    if (props.section.endContact != null) {
        if (props.section.endContact.ownDevice instanceof Breaker) {
            breaker = props.section.endContact.ownDevice as Breaker
            return true
        } else return false
    } else return false
})

const breakerPowerShow = computed(() => {
    if (props.section.endContact != null) {
        if (props.section.endContact.ownDevice instanceof BreakerPower) {
            breakerPower = props.section.endContact.ownDevice as BreakerPower
            return true
        } else return false
    } else return false
})


const contactorShow = computed(() => {
    if (props.section.endContact != null) {
        if (props.section.endContact.ownDevice instanceof Contactor) {
            contactor = props.section.endContact.ownDevice as Contactor
            return true
        } else return false
    } else return false
})

const consumerShow = computed(() => {
    if (props.section.endContact != null) {
        if (props.section.endContact.ownDevice instanceof Consumer) {
            consumer = props.section.endContact.ownDevice as Consumer
            return true
        } else return false
    } else return false
})
//#endregion
const squareHi = ref(false)
const deltaUHi = ref(false)
watchEffect(() => {
    if (store.selectedObject === props.section) {
        hover.value = true
        if (props.section.startContact?.ownDevice instanceof Contactor || props.section.endContact?.ownDevice instanceof Contactor) {
            labelShow.value = false
        } else {
            labelShow.value = true
        }
    } else {
        hover.value = false
        labelShow.value = false
    }
    if ((props.section.cable.maxCurrent / props.section.modeMax.current) > 1.5 && props.section.cable.square > 2.5
    && props.section.cable.deltaU < 2) {
        squareHi.value = true
    } else {
        squareHi.value = false
    }
    if (props.section.cable.deltaU > 5) deltaUHi.value = true
    else deltaUHi.value = false
})

</script>

<style scoped>

.color_text_warn {
    color: red !important;
    ;
    font-weight: bold;
}

.s {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-grow: 1;
    height: 100%;
}

.label_hover {
    transform: scale(1.5);
}

.label {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    top: 50%;
    left: calc(50% - 9px);
    border-radius: 50%;
    border: 2px solid var(--scheme-line-hover-color);
    background-color: white;
}



.span-plus {
    font-size: 18px;
    color: var(--scheme-line-hover-color);
}

::selection {
    user-select: none;
}

.section-container {
    cursor: pointer;
    position: relative;
    width: 70px;
    border: 0px dashed gray;
    min-height: 212px;
    height: 100%;

}

.selected {
    border: 1px dashed var(--scheme-line-hover-color) !important;
    ;
}

.text_left {
    position: absolute;
    top: 190px;
    left: 0;
    margin-left: 20px;
    transform: rotate(-90deg);
    transform-origin: left;
    width: auto;
    white-space: nowrap;

}

.text_rigth {
    position: absolute;
    top: 190px;
    left: 50%;
    margin-left: 12px;
    transform: rotate(-90deg);
    transform-origin: left;
    width: auto;
    white-space: nowrap;
}

.line {
    position: absolute;
    top: 0;
    left: calc(50% - 1px);
    width: 3px;
    height: 100%;

    background-color: var(--scheme-line-color);
}

.hover_text {
    color: var(--scheme-line-hover-color);
}

.hover_bg {
    background-color: var(--scheme-line-hover-color) !important;
}

.hover_border {
    border-color: var(--scheme-line-hover-color) !important;
}</style>