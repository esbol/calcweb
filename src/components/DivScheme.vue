<template>
    <div class="main-wrap" @click="clearSelect" id="mainWrap">
        <div id="divContainer"
        
        v-on:keydown="handleKeyDown" tabindex="0"
         class="divContainer" v-if="store.selectedPanel != null">
   
            <A3 />
            <div class="inApparate">
                <BreakerInV :showPhases="true" v-if="store.selectedPanel.inApparate != null"
                    :breaker=store.selectedPanel.inApparate />
            </div>


            <div class="shinaDiv"  >
                <BusV :bus="store.selectedPanel.bus" />



                <div id="rows" class="rows-container">

                    <TransitionGroup name="slide-fade">
                        <div class="feeders" v-for="section in store.selectedPanel.outContact.getSlaveSections()"
                            :key="section.id">

                            <SectionV :section="section" />

                        </div>
                    </TransitionGroup>
                    <div class="plus">
                        <PlusV />
                    </div>

                </div>
            </div>
        </div>
        <Popup />
    </div>
</template>

<script setup lang="ts">
//#region import
import BreakerInV from './DivsScheme/verticals/BreakerInV.vue'
import Popup from './DivsScheme/Popup.vue'
import BusV from './DivsScheme/verticals/BusV.vue'
import ConsV from './DivsScheme/verticals/ConsV.vue'
import ContactorV from './DivsScheme/verticals/ContactorV.vue'
import SectionV from './DivsScheme/verticals/SectionV.vue'
import PlusV from './DivsScheme/verticals/PlusV.vue'
import BreakerV from './DivsScheme/verticals/BreakerV.vue'

import A3 from './DivsScheme/A3.vue';
import { reactive, ref, computed, onMounted, toRefs } from 'vue';

import { addScale } from './DivsScheme/pan'
import { useStore } from 'vuex'
import { deleteObject } from '@/models/schemeActions/schemeactions'
//#endregion

const store = useStore().state


function handleKeyDown(event: KeyboardEvent){
      console.log(event.code);
    
    if (event.code === "Delete" || event.keyCode === 46) {
        deleteObject(store.selectedObject)
     
        
    }
}


onMounted(() => {
    addScale('mainWrap')
})



function clearSelect(event: MouseEvent) {
    const target = event.target as Element
    if (target.className == 'innerFrame' || target.className == 'main-wrap') {
        store.selectedObject = null
    }
}

</script>

<style>
.cells{
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 0;
    background: green;
}
.plus {
    margin-left: 20px;
    margin-right: 20px;
    margin-top: 28px;
}

.rows-container {
    display: flex;
    height: 100%;
    box-sizing: border-box;
    flex-direction: row;
    align-items: stretch;
}

.shinaDiv {
    margin-left: 100px;
    height: 786px;
}

.inApparate {
    margin-top: 30px;
    margin-left: 280px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
}

/* ::selection {
    user-select: none;
} */

.feeders {


    display: flex;
    flex-direction: column;

    width: auto;
    height: auto;
    border: 0px dashed rgb(134, 73, 73);

}

:root {

    --scheme-line-color: rgb(70, 70, 70);
    --scheme-line-hover-color: blue;

}


.divContainer {
    background-color: rgb(255, 255, 255);
    background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0OCIgaGVpZ2h0PSI0OCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEyIEwgNDggMTIgTSAxMiAwIEwgMTIgNDggTSAwIDI0IEwgNDggMjQgTSAyNCAwIEwgMjQgNDggTSAwIDM2IEwgNDggMzYgTSAzNiAwIEwgMzYgNDgiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2QwZDBkMCIgb3BhY2l0eT0iMC4yIiBzdHJva2Utd2lkdGg9IjEiLz48cGF0aCBkPSJNIDQ4IDAgTCAwIDAgMCA0OCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZDBkMGQwIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=);
    background-position: -1px -1px;

    display: flex;
    flex-direction: column;
    align-items: start;
    width: 1680px;
    height: 1188px;
    position: relative;
    padding-top: 20px;
    padding-left: 50px;
    box-shadow: 0px 0px 2px 1px #d1d1d1;
}
.divContainer:focus{
    outline: none;
}

.main-wrap {
    width: 100%;
    height: 100%;
    overflow: auto;
}

.slide-fade-enter-active {
    transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateX(-20px);
    opacity: 0;
}
</style>