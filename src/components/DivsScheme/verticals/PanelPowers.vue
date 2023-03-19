<template>
    <div class="pp-container">
        <div class="text">
        <div class="row">{{ store.selectedPanel.nameOfPlane }}</div>
            <div class="row">Р<div class="under">уст </div> = {{ parseFloat(store.selectedPanel.uniteSection.modeMax.installPower.toFixed(2)) }} кВт</div>
            <div class="row">Р<div class="under">р </div> = {{ parseFloat(store.selectedPanel.uniteSection.modeMax.ratedPower.toFixed(2)) }} кВт</div>
            <div class="row">cosf = {{ parseFloat(store.selectedPanel.uniteSection.modeMax.cosf.toFixed(2)) }}</div>
            <div class="row">I<div class="under">р </div>  = {{ parseFloat(store.selectedPanel.uniteSection.modeMax.current.toFixed(2)) }} A</div>
        </div>
    </div>
</template>

<script setup lang="ts">

import { useStore } from 'vuex';


const store = useStore().state




</script>

<style scoped>
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