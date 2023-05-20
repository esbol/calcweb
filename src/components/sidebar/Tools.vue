<template>
    <!-- <div class="test-btns">

        <button @click="savePanelsToFile">
            <div class="text">Сохранить файл</div>
        </button>
        <input ref="fileInput" type="file" style="display: none" @change="handleFileChange">

        <button @click="openFileDialog">
            <div class="text">Открыть файл</div>
        </button>
    </div> -->
    <div class="tools_container no-select">


        <input ref="fileInput" type="file" style="display: none" @change="handleFileChange">
        <div class="header">
            <img src="@/assets/icons8-ex-50.png" alt="" class="exp">
            <div class="text">Экспортировать схему </div>
            <div class="buttons">
                <button class="btn" @click="print">
                    <img src="@/assets/icons8-pdf-2-50.png" alt="" class="pdf">
                    
                </button>
                <button class="btn" @click="savePanelsToFile">
                    <img src="@/assets/icons8-dwg-50.png" alt="" class="dwg">
                    
                </button>
            </div>

        </div>

    </div>
</template>

<script setup lang="ts">
import FormatProps from './FormatProps.vue';

import { useStore } from 'vuex';
import { computed, ref, watchEffect } from 'vue';
import { IState } from '@/store';
import { getJSON, getJSONRecurcy } from '@/models/serialize/serialize';
import { Panel } from '@/models/panel';
import { Contact } from '@/models/contact';
import 'reflect-metadata'
import { HasId } from '@/models/hasid';
import { getPanelsRecurcy } from '@/models/serialize/deserialize';

const state = useStore().state as IState
const store = useStore()
const color = computed(() => {
    if (state.showGrid) {
        return 'var(--main-text-color)'
    } else {
        return 'gray'
    }
})

//#region open and save
const fileInput = ref<HTMLInputElement | null>(null)

function openFileDialog() {
    fileInput.value?.click()
}


function handleFileChange(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0]
    if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
            const fileContent = e.target?.result as string
            // Делайте что-то с содержимым файла

            const panels = getPanelsRecurcy(fileContent)
            console.log(panels)
            store.commit('setPanels', panels)
        }
        reader.readAsText(file)
    }
}

const savePanelsToFile = () => {
    const data = getJSONRecurcy(state.panels)

    const blob = new Blob([data], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'panels.json';
    link.click();

    // Освобождение памяти, используемой URL
    URL.revokeObjectURL(url);
    console.log(data);

};
//#endregion

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

.buttons{
    display: flex;
    align-items: center;
    
}
.text{
    margin-left: 10px;
    width: 100px;
    font-size: 14px;
}

.tools_container {
    display: flex;
    flex-direction: column;
    border: 0px solid red;
    width: 100%;
    
}

.pdf {
    height: 42px;
    
}
.exp{
    height: 25px;
    margin-left: 25px;
}
.dwg {
    height: 45px;
    
}

.btn {
    border: 0px solid red;
    display: flex;
    align-items: center;
    background-color: transparent;
    margin-left: 0px;
    margin-bottom: 5px;
    cursor: pointer;
    height: 55px;
    width: 50%;

}
.btn:hover{
    box-shadow: 0px 0px 1px gray;
}
.header {
    position: relative;
    display: flex;
    height: 70px;
    align-items: center;
    align-content: center;
    justify-content: space-between;
    border-top: 1px solid var(--main-border-color);
    background-color: var(--sidebar-title-bg-color);
  
}
</style>