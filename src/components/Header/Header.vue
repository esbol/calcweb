<template>
    <div class="header_container no-select">
        <!-- <div class="menu-row">
            <Menu />
        </div> -->
        <div class="tools-row">
            <FormatProps />
            <div class="grid" @click="state.showGrid = !state.showGrid">
                <span class="material-symbols-outlined">
                    grid_4x4
                </span>

            </div>
            <div @click="savePanels" class="material-symbols-outlined">
                save
            </div>
            <div @click="getPanels" class="material-symbols-outlined">
                folder_open
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import FormatProps from './FormatProps.vue';

import { useStore } from 'vuex';
import { computed, ref, watchEffect } from 'vue';
import { IState } from '@/store';


const state = useStore().state as IState
const store = useStore()
const color = computed(() => {
    if (state.showGrid) {
        return 'var(--main-text-color)'
    } else {
        return 'gray'
    }
})


const savePanels = () => {
    store.dispatch('savePanels', store.state.panels);
 

};


const getPanels = () => {

    store.dispatch('fetchPanels');
}


</script>

<style scoped>
.grid {
    color: v-bind(color);
    cursor: pointer;
}

.tools-row {
    height: 40px;
    display: flex;
    align-items: center;
}
</style>