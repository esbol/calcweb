<template>
    <div class="contactor-container" @click="store.selectedObject = contactor">
        <div class="text" :class="{ hover_text: hover }">
            <span>{{ contactor.nameOfPlane }}<br></span>
            <span>{{ contactor.mark }}<br></span>
            <span>In={{ contactor.nominalCurrent }}A<br></span>
        </div>
        <div class="line-before" :class="{ hover_bg: hover }"></div>
        <div class="contactor" :class="{ hover_border: hover }">
            <div class="line" :class="{ hover_bg: hover }" />
        </div>

        <div class="line-after" :class="{ hover_bg: hover }"></div>

        <div class="label" :class="{ label_hover: labelHover }" @mouseenter="labelHover = true"
            @mouseleave="labelHover = false" v-if="labelShow" @click="$emit('clk', $event, 1, contactor)">
            <span  class="material-symbols-outlined plus_span">
                add
            </span>


        </div>
    </div>
</template>

<script setup lang="ts">

import { Contactor } from '@/models/contactor';
import { store } from '@/store/store';

import { ref, watchEffect } from 'vue';

const props = defineProps({
    contactor: {
        type: Contactor,
        required: true
    }
})
const labelHover = ref(false)
const labelShow = ref(false)
const hover = ref(false)


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
    top: 70%;
    right: calc(50% - 10px);
    border-radius: 50%;
    border: 2px solid var(--scheme-line-hover-color);
    background-color: white;
}



.plus_span {
    font-size: 18px;
    color: var(--scheme-line-hover-color);
}
.text {
    top: 10px;
    left: calc(100% - 15px);
    position: absolute;

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
    width: 70px;
    height: 70px;
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