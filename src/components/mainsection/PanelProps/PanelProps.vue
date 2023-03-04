<template>
    <div class="pprops-container">
        <GeneralProps :panel="panel" />
        <SPProps :panel="panel" class="sp" />
    </div>
</template>

<script setup lang="ts">
import { Panel } from '@/models/panel';
import { inject } from 'vue';
import TableScheme from '../tablescheme/TableScheme.vue';
import GeneralProps from './GeneralProps.vue';
import SPProps from './SPProps.vue';

const props = defineProps({
    panel: {
        type: Panel,
        required: true
    }
})
</script>

<style scoped>
.pprops-container{
    display: flex;
box-sizing: border-box;
    height: 200px;
    background-color: wite;
        margin-top: 5px;
}
.sp {
    margin-left: 5px;
}

</style>