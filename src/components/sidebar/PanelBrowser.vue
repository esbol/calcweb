<template>
    <div @click="clickPanel(panel)" class="row-panel" :class="{ selected: store.selectedPanel === panel }"
        v-for="panel in store.panels" :key="panel.id">
        <div class="name-panel">{{ panel.nameOfPlane }}</div>
    </div>
    <div class="btns">
        <button class="btn" @click="addNewPanel">+ Добавить панель</button>
        <button class="btn" @click="removePanel">+ Удалить панель</button>
    </div>
    
</template>

<script setup lang="ts">


import { Panel } from "@/models/panel";
import { useStore } from "vuex";

const store = useStore().state

function clickPanel(panel: Panel){
    store.selectedPanel = panel
    store.selectedObject = null
}

function addNewPanel() {
    const panel1 = new Panel()
    store.panels.push(panel1)

    panel1.nameOfPlane = 'ШР' + store.panels.length
}
function removePanel() {
    const panel1 = store.selectedPanel
    const panels = store.panels as Array<Panel>
    const indx =    panels.indexOf(panel1)
    panels.splice(indx, 1)

    store.selectedPanel = panels[0]
}


</script>

<style scoped>
* {
    font-family: Arial, Helvetica, sans-serif
}




.name-panel {
    margin-left: 20px;
    font-size: 15px;
}

.row-panel {
    display: flex;
    height: 30px;
    width: 100%;
    justify-content: flex-start;
    align-items: center;
    cursor: pointer;


}

.selected {
    font-weight: bold;
    color: var(--main-accent-color);
}
</style>