<template>
    <div class="main-container">
        <PanelProps />
        <TableScheme :panel="panel" />
        
    </div>
</template>

<script setup lang="ts">
import { Panel } from '@/models/panel';
import { inject } from 'vue';
import TableScheme from '../tablescheme/TableScheme.vue';
import PanelProps from '../mainsection/PanelProps/PanelProps.vue'
import { Feeder } from '@/models/feeder';

const props = defineProps({
    panel: {
        type: Panel,
        required: true
    }
})




</script>

<style >

.main-container {

    display: grid;
    grid-template-rows: auto 1fr;

    overflow-x: scroll;
    overflow-y: hidden;
    box-sizing: border-box;
}
</style>