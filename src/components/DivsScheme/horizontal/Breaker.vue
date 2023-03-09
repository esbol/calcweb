<template>
    <div class="breaker-container" @mouseenter="hov" @mouseleave="hover = false">
        <div class="text-name" :class="{ hover_text: hover }">SF19</div>

        <div class="text-drob" >
            <div class="text-mark" :class="{ hover_text: hover }">ВА47-29М</div>
            <div class="line_under" :class="{ hover_bg: hover }"></div>
            <div class="text-current" :class="{ hover_text: hover }">Iн=10A</div>
        </div>


        <div class="line-before" :class="{ hover_bg: hover }"></div>

        <div class="boxe">
            <div class="line" :class="{ hover_bg: hover }" />
            <div class="lineA" :class="{ hover_border: hover }"></div>
        </div>



        <div class="line-after" :class="{ hover_bg: hover }"></div>

    </div>
</template>

<script setup lang="ts">

import { ref } from 'vue';

const hover = ref(false)

function hov() {
    hover.value = true
}

</script>

<style scoped>
.boxe {
    width: 30px;
    border: 0px dashed gray;
    overflow: visible;
    position: relative;
    height: 25px;
}
.text-drob{
    top: -18px;
    left: 40px;
    min-width: 40px;
    position: absolute;
    border: 0px dashed gray
}
.text-name {
    top: -10px;
    right: 62px;
    width: auto;
    position: absolute;
    color: var(--scheme-line-color);
}

.text-mark {
   width: auto;
   white-space: nowrap;
    color: var(--scheme-line-color);
}

.line_under {
    width: 100%;
    height: 1px;
    background: var(--scheme-line-color);
}

.text-current {
    color: var(--scheme-line-color);
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

.breaker-container {
    cursor: pointer;
    position: relative;
    width: 100px;
    height: 70px;
    border: 0px dashed gray;
    display: flex;
    justify-content: center;
    align-items: center;

}

.line-before {
    width: 20px;
    height: 3px;
    background-color: var(--scheme-line-color);
}
.line-after {
    flex-grow: 1;
    height: 3px;
    background-color: var(--scheme-line-color);
}

.line {
    position: absolute;
    top: calc(50% - 1px);
    right: 0;
    width: 35px;
    height: 3px;
    background-color: var(--scheme-line-color);
    transform: rotate(30deg);
    transform-origin: right;
}

.lineA {
    position: absolute;
    left: 7px;
    top: -4px;
    width: 15px;
    height: 7px;
    border-left: 3px solid var(--scheme-line-color);
    border-top: 3px solid var(--scheme-line-color);
    border-right: 3px solid var(--scheme-line-color);
    transform: rotate(30deg);
}</style>