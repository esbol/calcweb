<template>
    <div class="tools_container no-select" >
      
        <div class="tools-row">
           
            <button class="btn" @click="print" ><div class="text">Экспорт в PDF</div><img src="@/assets/pdf.svg" alt="" class="pdf"></button>
            
        </div>

    </div>
</template>

<script setup lang="ts">
import FormatProps from './FormatProps.vue';

import { useStore } from 'vuex';
import { computed, ref, watchEffect } from 'vue';
import { IState } from '@/store';


const state = useStore().state as IState
const store = useStore()
const color = computed(() => {
    if (state.showGrid) {
        return 'var(--main-text-color)'
    } else {
        return 'gray'
    }
})


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

.tools_container{
    display: flex;
    width: 100%;
}
.pdf{
    height: 50px;
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