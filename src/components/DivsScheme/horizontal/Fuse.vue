<template>
    <div class="fuse-container" @mouseenter="hov" @mouseleave="hover = false">
       <div class="text" :class="{hover_text: hover}">
       <span>QF2<br></span>
       <span>AVDT32<br></span>
       <span>In=10A<br></span>
       </div>
        <div class="line-before" :class="{ hover_bg: hover }"></div>
        <div class="fuse" :class="{ hover_border: hover }">
            <div class="line" :class="{ hover_bg: hover }" />
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
.text{
    top: -22px;
    left: 15px;
    position: absolute;
    
}
span {
   
    line-height: 1.2;
}
.hover_text{
    color: var(--scheme-line-hover-color) !important;
}
.hover_bg {
    background-color: var(--scheme-line-hover-color) !important;
}

.hover_border {
    border-color: var(--scheme-line-hover-color) !important;
}

.fuse-container {
    cursor: pointer;
    position: relative;
    width: 70px;
    height: 70px;
    border: 0px dashed gray;
    display: flex;
    justify-content: center;
    align-items: center;

}

.line-before,
.line-after {
    flex-grow: 1;
    height: 3px;
    background-color: var(--scheme-line-color);
}

.fuse {
    flex-grow: 0;
    width: 40px;
    height: 18px;
    border: 3px solid var(--scheme-line-color);
    display: flex;
    align-items: center;
}

.line {
    width: 100%;
    height: 3px;
    background-color: var(--scheme-line-color);
}
</style>