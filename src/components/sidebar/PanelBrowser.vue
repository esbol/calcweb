<template>
    <div @click="store.selectedPanel = panel" class="row-panel" :class="{ selected: store.selectedPanel === panel }"
        v-for="panel in store.panels" :key="panel.id">
        <div class="name-panel">{{ panel.nameOfPlane }}</div>
    </div>
</template>

<script setup lang="ts">


import { useStore } from "vuex";

const store = useStore().state

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