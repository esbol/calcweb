<template>
    
 
    <div class="s">

        <div class="section-container" v-if="!section.isInPanel" @click="store.selectedObject = section"
            :class="{ selected: hover }">
            <div class="text_left" :class="{ hover_text: hover }">
                {{ section.nameOfPlane }}-{{ section.cable.mark }} - {{ section.cable.colCores }}x{{ section.cable.square }}
                -
                {{ section.cable.length }}м
            </div>
            <div class="line" :class="{ hover_bg: hover }" />
            <div class="text_rigth" :class="{ hover_text: hover }">
                лоток Л1-500x200 - 15м
            </div>
            <div class="section" :class="{ hover_border: hover }">

            </div>

            <div class="label" :class="{ label_hover: labelHover }" @mouseenter="labelHover = true"
                @mouseleave="labelHover = false" v-if="labelShow" @click="showPopup($event)">
                <span class="material-symbols-outlined">
                    add
                </span>


            </div>


        </div>

        <BreakerV :breaker="breaker" :showPhases="true" v-if="breakerShow" />
        <ConsV :consumer="consumer" v-if="consumerShow" />
        <ContactorV :contactor="contactor" v-if="contactorShow" />
    </div>
    
</template>

<script setup lang="ts">

import ContactorV from './ContactorV.vue';
import BreakerV from './BreakerV.vue';
import ConsV from './ConsV.vue';
import { Consumer } from '@/models/consumer';
import { SectionLine } from '@/models/sectionline';
import { useStore } from 'vuex';
import { reactive, ref, watch, watchEffect, computed } from 'vue';
import { Breaker } from '@/models/breaker';
import { Contactor } from '@/models/contactor';
import { CommutateApparate } from '@/models/commutateApparate';
import { Panel } from '@/models/panel';


const store = useStore().state
const labelHover = ref(false)
const labelShow = ref(false)
const hover = ref(false)


let breaker: Breaker
let consumer: Consumer
let contactor: Contactor

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

const breakerShow = computed(() => {
    if (props.section.endContact != null) {
        if (props.section.endContact.ownDevice instanceof Breaker) {
            breaker = props.section.endContact.ownDevice as Breaker
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

// const height = computed(() => {
//     if (props.section.startContact != null && props.section.endContact != null) {
//         //--без автомата
//         if (props.section.startContact.ownDevice instanceof Panel) {
//             //--контактор
//             if(props.section.endContact.ownDevice instanceof CommutateApparate) return 226 + 'px'
//             //--если консюмер или панель на конце
//             else return 452 + 'px'
//         } 
//         //--автомат
//         else if (props.section.startContact.ownDevice instanceof CommutateApparate) {
//             //--контактор
//             if (props.section.endContact.ownDevice instanceof CommutateApparate) return 226 + 'px'
//             //--если консюмер или панель на конце
//             else return 452 + 'px'
//         }
        
//     } else return 0 + 'px'
// })



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
})

</script>

<style scoped>





.s{
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



span {
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
    color: var(--scheme-line-hover-color) !important;
}

.hover_bg {
    background-color: var(--scheme-line-hover-color) !important;
}

.hover_border {
    border-color: var(--scheme-line-hover-color) !important;
}
</style>