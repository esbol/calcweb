<template>
    <div class="container-broser">
        <div class="browser-header">
            <div class="header-title">Панели</div>
        </div>
        <div @click="store.selectedPanel = panel" class="row-panel" :class="{ selected: store.selectedPanel === panel }"
            v-for="panel in store.panels" :key="panel.id">
            <div class="name-panel">{{ panel.nameOfPlane }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">


import { useStore } from "vuex";

const store = useStore().state

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
    height: 35px;
    align-items: center;
    border-bottom: 1px solid var(--main-border-color);
    background-color: var(--sidebar-title-bg-color);
    cursor: pointer;
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

.container-broser {
    width: 100%;
    min-height: 200px;
    border-bottom: 1px solid var(--main-border-color);

    background: white;
}
</style>