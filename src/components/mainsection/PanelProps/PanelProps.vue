<template>
    <div class="pprops-container">
        <GeneralProps />
        <SPProps class="sp" />
    </div>
</template>

<script setup lang="ts">
import { Panel } from '@/models/panel';
import { inject } from 'vue';
import TableScheme from '../tablescheme/TableScheme.vue';
import GeneralProps from './GeneralProps.vue';
import SPProps from './SPProps.vue';

const panels = inject('panels', new Array<Panel>())
const selectedPanel = inject('selectedPanel', new Panel())

</script>

<style scoped>
.pprops-container{
    display: flex;

    height: 200px;
    background-color: wite;
    padding: 5px;
}
.sp {
    margin-left: 5px;
}

</style>