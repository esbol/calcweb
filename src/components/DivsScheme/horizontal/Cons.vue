<template>
    <div class="cons-container" 
    :class="{ hover_border: hover }"
    @mouseenter="hov" @mouseleave="hover = false">
        <div class="frame-name" :class="{ hover_text: hover }">
            N2
        </div>
        <div class="frame-power" :class="{ hover_text: hover }">
            15.6
        </div>
        <div class="frame-current" :class="{ hover_text: hover }">
            26.9
        </div>
         <div class="frame-description"
       
          :class="{ hover_text: hover }">
                Насос водопроводный на отм +25,7
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
.frame-description {
    width: 50px;
    height: 100%;
    display: flex;
    justify-content: left;
    align-items: center;
 
    padding-left: 5px;
}
.frame-current {
    width: 50px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-right: 1px solid;
    border-color: var(--scheme-line-color);
}

.frame-power {
    width: 50px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-right: 1px solid;
    border-color: var(--scheme-line-color);
}

.frame-name {
    width: 50px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-right: 1px solid;
    border-color: var(--scheme-line-color);
}

.text {
    top: -22px;
    left: 15px;
    position: absolute;

}


.hover_text {
    color: var(--scheme-line-hover-color) !important;
}


.hover_border {
    border-color: var(--scheme-line-hover-color) !important;
}

.cons-container {
    cursor: pointer;
    position: relative;
    width: 300px;
    height: 70px;
    border: 2px solid var(--scheme-line-color);

    display: flex;
    justify-content: left;
    align-items: center;
    margin-top: 0px;
}
</style>