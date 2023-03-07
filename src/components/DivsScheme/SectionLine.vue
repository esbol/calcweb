<template>
    <div class="section-container" @mouseenter="hov" @mouseleave="hover = false">
        <div class="text" :class="{ hover_text: hover }">
            гр.1-ВВГнг-(А)LS 3x16 - 20м
        </div>
        <div class="line" :class="{ hover_bg: hover }" />
        <div class="text" :class="{ hover_text: hover }">
                лоток Л1-500x200 - 15м
            </div>
        <div class="section" :class="{ hover_border: hover }">
            
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
::selection {
  user-select: none;
}
.text {
  margin-top: 3px;
  margin-bottom: 2px;

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

.section-container {
    cursor: pointer;
    position: relative;
    width: 200px;
    height: 70px;
    border: 0px dashed gray;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

}





.line {
    width: 100%;
    height: 3px;
    background-color: var(--scheme-line-color);
}
</style>