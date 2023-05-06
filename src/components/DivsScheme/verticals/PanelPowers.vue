<template>
    <div class="pp-container"  @click="store.selectedObject = panel" >
        <div class="text"  >
        <div class="row" :class="{ text_hover: hover }">{{ store.selectedPanel.nameOfPlane }}</div>
            <div class="row" :class="{ text_hover: hover }">Р<div class="under">уст </div> = {{ parseFloat(store.selectedPanel.uniteSection.modeMax.installPower.toFixed(2)) }} кВт</div>
            <div class="row" :class="{ text_hover: hover }">Р<div class="under">р </div> = {{ parseFloat(store.selectedPanel.uniteSection.modeMax.ratedPower.toFixed(2)) }} кВт</div>
            <div class="row" :class="{ text_hover: hover }">cosf = {{ parseFloat(store.selectedPanel.uniteSection.modeMax.cosf.toFixed(2)) }}</div>
            <div class="row" :class="{ text_hover: hover }">I<div class="under">р </div>  = {{ parseFloat(store.selectedPanel.uniteSection.modeMax.current.toFixed(2)) }} A</div>
        </div>
    </div>
</template>

<script setup lang="ts">

import { Panel } from '@/models/panel';
import { ref, watchEffect } from 'vue';
import { useStore } from 'vuex';

const store = useStore().state
const props = defineProps({
    panel: {
        type: Panel,
        required: true
    }
})
const hover = ref(false)

watchEffect(() => {

    if (store.selectedObject == props.panel) {
        hover.value = true
    } else {
        hover.value = false
    }
})


</script>

<style scoped>
.text_hover{
    color: var(--scheme-line-hover-color) !important;
}
.row {
    color: var(--scheme-line-color);
    font-size: 14px;
    margin-top: 2px;
    display: flex;
}
.under{
    font-size: 12px;
    margin-top: 5px;
    margin-right: 2px;
}
.pp-container {
    position: absolute;
    left: 20px;
    top: -120px;
}
</style>