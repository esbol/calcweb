<template>
    <div class="container-bus" @click="store.selectedObject = bus">
        <div class="bus-header">
            <div class="header-title">Шина</div>
        </div>
        <div class="row-panel">
            <div class="name-prop">{{ bus.nameOfPlane }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">

import { Breaker } from "@/models/breaker";
import { Bus } from "@/models/bus";

import { useStore } from "vuex";

const store = useStore().state
const props = defineProps({
    bus: {
        type: Bus,
        required: true
    }
})

</script>

<style scoped>
* {
    font-family: Arial, Helvetica, sans-serif
}

.header-title {
    margin-left: 15px;
    font-weight: bold;
}

.bus-header {
    display: flex;
    height: 35px;
    align-items: center;
    border-bottom: 1px solid var(--main-border-color);
}

.name-prop {
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


.container-bus {
    width: 100%;
    min-height: 200px;
    border: 1px solid var(--main-border-color);
    border-top: none;
    background: white;
}
</style>