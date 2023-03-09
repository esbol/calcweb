<template>
    <div class="plus-container" 
    >

        <div class="line" :class="{ hover_border: hover }" />

        <div class="plus"
        @click="$emit('mclick')"
        @mouseenter="hov"
         @mouseleave="hover = false"
         :class="{ hover_border: hover }">
            <div class="circle" :class="{ hover_border: hover }">
                <div class="plus_g" :class="{ hover_border: hover }"></div>
                <div class="plus_v" :class="{ hover_border: hover }"></div>
            </div>
        </div>


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
.plus_g {
    position: absolute;
    top: calc(50% - 3px);
    left: calc(50% - 9px);
    width: 18px;
    height: 4px;
    border-bottom: 2px solid var(--scheme-line-color);
}
.plus_v {
     position: absolute;
    top: calc(50% - 2px);
    left: calc(50% - 8px);
    width: 18px;
    height: 4px;
    border-bottom: 2px solid var(--scheme-line-color);
    transform: rotate(90deg);
}
.circle {
    position: relative;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 2px dashed var(--scheme-line-color);
}

.plus {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 500px;
    height: 40px;
    border: 2px dashed var(--scheme-line-color);
    border-radius: 5px;
}


.hover_border {
    border-color: var(--scheme-line-hover-color) !important;
}

.plus-container {
    cursor: pointer;
    position: relative;
    width: 540px;
    height: 70px;
    border: 0px dashed gray;
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: center;

}


.line {
    width: 20px;
    height: 3px;
    border-bottom: 2px dashed var(--scheme-line-color);
}
</style>