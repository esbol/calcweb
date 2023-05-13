<template>
    <div class="tools_container no-select">

        <div class="tools-row">

            <button class="btn" @click="print">
                <div class="text">Экспорт в PDF</div><img src="@/assets/pdf.svg" alt="" class="pdf">
            </button>
            <button class="btn" @click="savePanelsToFile">
                <div class="text">Экспорт в DWG</div><img src="@/assets/dwg.png" alt="" class="dwg">
            </button>

        </div>

    </div>
</template>

<script setup lang="ts">
import FormatProps from './FormatProps.vue';

import { useStore } from 'vuex';
import { computed, ref, watchEffect } from 'vue';
import { IState } from '@/store';
import { getJSON } from '@/models/serialize/serialize';


const state = useStore().state as IState
const store = useStore()
const color = computed(() => {
    if (state.showGrid) {
        return 'var(--main-text-color)'
    } else {
        return 'gray'
    }
})

const savePanelsToFile = () => {
    const data = getJSON(state.panels)
    const blob = new Blob([data], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'panels.json';
    link.click();

    // Освобождение памяти, используемой URL
    URL.revokeObjectURL(url);
};

const savePanels = () => {
    store.dispatch('savePanels', store.state.panels);

};


const getPanels = () => {

    store.dispatch('fetchPanels');
}


async function print() {


    state.isModePrint = true
    state.showGrid = false

    console.log('print');

}




</script>

<style scoped>
.tools_container {
    display: flex;
    width: 100%;
}

.pdf {
    height: 50px;
}

.dwg {
    height: 50px;
    padding: 7px;
}

.btn {
    border: 1px dashed var(--main-accent-color);
    display: flex;
    vertical-align: middle;
    align-items: center;
    justify-content: space-between;
    padding-left: 20px;
    width: 100%;
    margin-left: 5px;
    cursor: pointer;
    color: var(--main-accent-color);
}



.tools-row {
    display: flex;
    justify-self: start;
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
}
</style>