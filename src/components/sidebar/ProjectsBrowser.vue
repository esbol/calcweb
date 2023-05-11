<template>
    <div class="row_sum" v-for="project in store.projects">
        <div class="row-panel no-select" :class="{ selected: store.selectedProject?.id == project.id }"
            v-for="project in store.projects" :key="project.id">
            <div class="name-panel" @click="clickProject(project)">{{ project.name }}</div>
            <div class="btn_del" @click="removeParoject(project)">
                <span class="material-symbols-outlined">
                    delete_forever
                </span>
            </div>


        </div>
        
        <div  class="row-panel no-select" 
        v-for="panel in project.panels" :key="panel.id">
        <div class="name-panel" >{{ panel.nameOfPlane }}-{{ Number(panel.uniteSection.modeMax.ratedPower.toFixed(2)) }}кВт</div>
        <div class="btn_del">
            <span  class="material-symbols-outlined">
                delete_forever
            </span>
        </div>


    </div>

    </div>
    <div class="btns">
        <button class="btn_add" @click="newShow = true">+ Создать проект</button>
    </div>
    <NewProjectWindow v-if="newShow" @clcClose="newShow = false" />
</template>

<script setup lang="ts">

import { Panel } from "@/models/panel";
import { IProject, IState } from "@/store";

import { ref, watchEffect } from "vue";
import { useStore } from "vuex";
import NewProjectWindow from "../Windows/NewProjectWindow.vue";



const store = useStore().state as IState
const newShow = ref(false)


function clickProject(project: IProject) {
    store.panels = project.panels
    store.selectedPanel = project.panels[0]
    store.selectedProject = project
}


function removeParoject(project: IProject) {

    if (store.projects.length < 2) return

    const indx = store.projects.indexOf(project)

    store.projects.splice(indx, 1)

    clickProject(store.projects[0])

}


</script>

<style scoped>
.row_sum{
    width: 100%;
}
.btns {
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

.btn_del {
    margin-right: 5px;
    color: var(--main-text-disabled-color);
}

.btn_del:hover {
    color: red;
}

span {
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
}</style>