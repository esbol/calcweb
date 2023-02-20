<template>
    <div class="container-broser">
        <div class="browser-header">
            <div class="header-title">Панели</div>
        </div>
        <div @click="selectedPanel = panel" class="row-panel" :class="{ selected: selectedPanel === panel }"
            v-for="panel in panels" :key="panel.id">
            <div class="name-panel">{{ panel.nameOfPlane }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">

import { Panel } from "@/models/panel";
import { inject } from 'vue';

const panels = inject('panels', new Array<Panel>())
const selectedPanel = inject('selectedPanel', new Panel())
</script>

<style scoped>
*{
    font-family:Arial, Helvetica, sans-serif
}
.header-title{
    margin-left: 15px;
    font-weight: bold;
}
.browser-header {
    display: flex;
    height: 50px;
    align-items: center;
}

.name-panel {
    margin-left: 50px;
     font-size: 15px;
}

.row-panel {
    display: flex;
    height: 50px;
    width: 100%;
    justify-content: flex-start;
    align-items: center;
    cursor: pointer;
    border-radius: 5px;
   
}

.selected {
    background: var(--sidebar-selected-color);
    color: white;
}

.container-broser {
    width: 100%;
    min-height: 200px;
    background: rgb(242, 242, 242);
    border-radius: 8px;
}
</style>