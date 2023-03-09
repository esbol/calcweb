<template>
    <div class="row">
        <div class="name-prop">Обозначение</div>
        <div class="prop-value">{{ breaker.nameOfPlane }}</div>
    </div>
    <div class="row">
        <div class="name-prop">Марка</div>
        <div class="prop-value">{{ breaker.mark }}</div>
    </div>
    <div class="row">
        <div class="name-prop">Кол. фаз</div>
        <div class="prop-value">{{ breaker.colPhase }}</div>
    </div>
   
    <div class="row">
        <div class="name-prop">Iрасч.</div>
        <div class="prop-value">{{ breaker.nominalCurrent }}</div>
    </div>
    <div class="row">
        <div class="name-prop">Iрасч.линии</div>
        <div class="prop-value">0</div>
    </div>
    <div class="row">
        <div class="name-prop">Токовая хар-ка</div>
        <div class="prop-value">С</div>
    </div>
 
</template>

<script setup lang="ts">

import { Breaker } from "@/models/breaker";


const props = defineProps({
    breaker: {
        type: Breaker,
        required: true
    }
})

</script>

<style scoped>
* {
    font-family: Arial, Helvetica, sans-serif
}

.row {
    width: 100%;
    height: 25px;
    display: flex;
    align-items: center;

    border-bottom: 1px solid var(--main-border-color);
    border-left: 1px solid var(--main-border-color);
}

.name-prop {
    height: 100%;
    width: 50%;
    margin-left: 5px;
    display: flex;
    align-items: center;
}

.prop-value {
    display: flex;
    align-items: center;
    height: 100%;
    width: 50%;
    border-left: 1px solid var(--main-border-color);
    padding-left: 5px;
}
</style>