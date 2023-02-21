<template>
    <div class="gprops-container">
        <h3>{{ panel.nameOfPlane }}</h3>

    </div>
</template>

<script setup lang="ts">
import { Panel } from '@/models/panel';
import { inject } from 'vue';
import TableScheme from '../tablescheme/TableScheme.vue';

const panels = inject('panels', new Array<Panel>())
const panel = inject('selectedPanel', new Panel())

</script>

<style scoped>
.gprops-container {
    height: 200px;
    width: 300px;
    background-color: white;
    box-shadow: 0 0 5px gray;
}
</style>