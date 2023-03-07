<template>
    <div class="a3-container" >
        <div class="innerFrame" >
            N2
        </div>
        <div class="stamp"></div>
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
.stamp {
    width: 740px;
    height: 220px;
    position: absolute;
    right: 20px;
    bottom: 20px;
    border-top: 2px solid var(--scheme-line-color);
    border-left: 2px solid var(--scheme-line-color);
}
.innerFrame{
    position: absolute;
    left: 80px;
    top: 20px;
    width: 1580px;
    height: 1148px;
    border: 2px solid var(--scheme-line-color);
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

.a3-container {
    cursor: pointer;
   
    width: 1680px;
    height: 1188px;
    border: 1px solid var(--scheme-line-color);

    position: absolute;
    top: 0;
    left: 0;
}
</style>