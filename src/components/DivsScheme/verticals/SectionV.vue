<template>
    <div class="section-container" @click="store.selectedObject = section" :class="{ selected: hover }">
        <div class="text_left" :class="{ hover_text: hover }">
            {{ section.nameOfPlane }} гр.1-ВВГнг-(А)LS 3x16 - 20м
        </div>
        <div class="line" :class="{ hover_bg: hover }" />
        <div class="text_rigth" :class="{ hover_text: hover }">
            лоток Л1-500x200 - 15м
        </div>
        <div class="section" :class="{ hover_border: hover }">

        </div>

        <div class="label" :class="{ label_hover: labelHover }" @mouseenter="labelHover = true" @mouseleave="labelHover = false"
            v-if="hover" @click="$emit('clk', $event, 0)">
            <span class="material-symbols-outlined">
                add
            </span>


        </div>
    
    </div>
</template>

<script setup lang="ts">


import { SectionLine } from '@/models/sectionline';
import { store } from '@/store/store';
import { inject, ref, watch, watchEffect } from 'vue';

const labelHover = ref(false)
const hover = ref(false)

const props = defineProps({
    section: {
        type: SectionLine,
        required: true
    },
    length: {
        type: String,
        required: true
    }
})



watchEffect(() => {
    if (store.selectedObject === props.section) {
        hover.value = true
    } else {
        hover.value = false
    }
})

</script>

<style scoped>
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
    height: v-bind(length);
    border: 0px dashed gray;

}

.selected {
    border: 1px dashed var(--scheme-line-hover-color) !important;
    ;
}

.text_left {
    position: absolute;
    top: 200px;
    left: 0;
    margin-left: 20px;
    transform: rotate(-90deg);
    transform-origin: left;
    width: auto;
    white-space: nowrap;
}

.text_rigth {
    position: absolute;
    top: 200px;
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