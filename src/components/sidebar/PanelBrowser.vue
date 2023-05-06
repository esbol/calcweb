<template>
    <div  class="row-panel no-select" :class="{ selected: store.selectedPanel.id == panel.id }"
        v-for="panel in store.panels" :key="panel.id">
        <div class="name-panel" @click="clickPanel(panel)">{{ panel.nameOfPlane }}-{{ Number(panel.uniteSection.modeMax.ratedPower.toFixed(2)) }}кВт</div>
        <div class="btn_del">
            <span @click="removePanel(panel)" class="material-symbols-outlined">
                delete_forever
            </span>
        </div>


    </div>

    <div class="btns">
        <button class="btn_add" @click="addNewPanel">+ Добавить панель</button>
    </div>
   
</template>

<script setup lang="ts">


import { Panel } from "@/models/panel";
import { ref, watchEffect } from "vue";
import { useStore } from "vuex";



const store = useStore().state



function clickPanel(panel: Panel) {
    store.selectedPanel = panel
    store.selectedObject = null
}

function addNewPanel() {
    const panel1 = new Panel()
    store.panels.push(panel1)

    panel1.nameOfPlane = 'ШР' + store.panels.length
}
function removePanel(panel: Panel) {
    
    if(store.panels.length < 2) return
  
    const indx = store.panels.indexOf(panel)
    
    store.panels.splice(indx, 1)

    store.selectedPanel = store.panels[0]
    store.selectedObject = null
  
}


</script>

<style scoped>
.btns{
    width: 100%;
    border: 0px solid red;
    padding-left: 17px;
    padding-right: 5px;
    margin-top: 10px;
    margin-bottom: 10px;
}
.btn_add {
    width: 100%;
    height: 30px;
    background-color: transparent;
    border: 1px dashed var(--main-accent-color);
    color: var(--main-accent-color);
    cursor: pointer;
}
.btn_del{
    margin-right: 5px;
    color: var(--main-text-disabled-color);
}
.btn_del:hover{
    color: red;
}
span{
    font-size: 18px;
}

.name-panel {
    margin-left: 20px;
    font-size: 15px;
    border: 0px solid red;
    width: 100%;
}

.row-panel {
    display: flex;
    height: 30px;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;


}

.selected {
    font-weight: bold;
    color: var(--main-accent-color);
}


.material-symbols-outlined {
    font-variation-settings:
        'FILL' 0,
        'wght' 400,
        'GRAD' 0,
        'opsz' 48
}
</style>