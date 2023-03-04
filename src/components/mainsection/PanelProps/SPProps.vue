<template>
    <div class="spprops-container">
        <h3>Нагрузки по СП</h3>
        <div class="row" 
        
        v-for="group in panel.uniteSection.calculationModes[0].groupsBySPList" >{{ group.groupName }}</div>
    </div>
</template>

<script setup lang="ts">
import { Panel } from '@/models/panel';

const props = defineProps({
    panel: {
        type: Panel,
        required: true
    }
})
</script>

<style scoped>
.spprops-container {
    height: 100%;
    width: 300px;
    background-color: white;
    box-shadow: 0 0 5px gray;
}
</style>