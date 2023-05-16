<template>
    <div class="contactor-container" @click="store.selectedObject = contactor">
        <div class="text" v-if="contactor.outContact.getSlaveSections().length === 1" :class="{ hover_text: hover }">
            <span>{{ contactor.nameOfPlane }}<br></span>
            <span>{{ contactor.mark }}<br></span>
            <span v-if="contactor.mark != 'Комплектно'">In={{ contactor.nominalCurrent }}A<br></span>
        </div>
        <div v-else class="text_w" :class="{ hover_text: hover }">
            <span>{{ contactor.nameOfPlane }}<br></span>
            <span>{{ contactor.mark }}<br></span>
            <span v-if="contactor.mark != 'Комплектно'">In={{ contactor.nominalCurrent }}A<br></span>
        </div>
        <div class="line-before" :class="{ hover_bg: hover }"></div>

        <div v-if="contactor.outContact.getSlaveSections().length === 1" class="contactor" :class="{ hover_border: hover }">
            <div class="line" :class="{ hover_bg: hover }" />
        </div>

        <div v-else class="contactor_w" :class="{ hover_border: hover }">
            <div class="line_w" :class="{ hover_bg: hover }" />
        </div>
        <div class="line-after" v-if="contactor.outContact.getSlaveSections().length === 1" :class="{ hover_bg: hover }">
        </div>

        <div class="label" :class="{ label_hover: labelHover }" @mouseenter="labelHover = true"
            @mouseleave="labelHover = false" v-if="labelShow" @click="showPopup($event)">
            <span class="material-symbols-outlined plus_span">
                add
            </span>


        </div>
    </div>

    <div class="c">
        
      <SectionV v-for="section in contactor.outContact.getSlaveSections()" :section="section" />
 
    </div>
</template>

<script setup lang="ts">

import { Contactor } from '@/models/contactor';
import { useStore } from 'vuex';
import SectionV from './SectionV.vue';
import { ref, watchEffect } from 'vue';

const props = defineProps({
    contactor: {
        type: Contactor,
        required: true
    }
})
const store = useStore().state
const labelHover = ref(false)
const labelShow = ref(false)
const hover = ref(false)

function showPopup(event: MouseEvent) {
    store.showPopup.x = event.clientX,
        store.showPopup.y = event.clientY
    store.showPopup.componentIndx = 1
    store.showPopup.args = props.contactor
    store.showPopup.show = true
}


watchEffect(() => {


    if (store.selectedObject === props.contactor) {
        hover.value = true
        labelShow.value = true
    } else {
        hover.value = false
        labelShow.value = false
    }
})

</script>

<style scoped>


.c {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.label_hover {
    transform: scale(1.2);
}

.label {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    top: 90%;
    right: calc(50% - 10px);
    border-radius: 50%;
    border: 2px solid var(--scheme-line-hover-color);
    background-color: white;
    z-index: 100;
}



.plus_span {
    font-size: 18px;
    color: var(--scheme-line-hover-color);
}

.text {
    top: -10px;
    left: calc(100% - 3px);
    position: absolute;
}

.text_w {
    bottom: 25px;
    position: absolute;
    left: 0;
}

span {

    line-height: 1.2;
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

.contactor-container {
    cursor: pointer;
    position: relative;
    width: calc(100% - 70px);
   
    border: 0px dashed gray;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

}

.line-before,
.line-after {
    flex-grow: 1;
    width: 3px;
    background-color: var(--scheme-line-color);
}

.contactor {
    flex-grow: 0;
    width: 22px;
    height: 22px;
    border: 3px solid var(--scheme-line-color);
    display: flex;
    align-items: center;
    position: relative;
    overflow: hidden;
}

.contactor_w {
    flex-grow: 0;
    width: 100%;
    height: 22px;
    border: 3px solid var(--scheme-line-color);
    display: flex;
    align-items: center;
    position: relative;
    overflow: hidden;
}

.line_w {
    position: absolute;
    top: 5px;
    width: 100%;
    height: 1px;
    background-color: var(--scheme-line-color);


}

.line {
    position: absolute;
    top: 0;
    width: 30px;
    height: 1px;
    background-color: var(--scheme-line-color);
    transform: rotate(45deg);
    transform-origin: left;
}
</style>