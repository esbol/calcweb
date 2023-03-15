<template>
    <div class="main-wrap" @click="clearSelect" id="mainWrap">
        <div id="divContainer" class="divContainer" v-if="store.selectedPanel != null">
            <A3 />
            <div class="inApparate">
                <BreakerV :showPhases="true" v-if="store.selectedPanel.inApparate != null"
                    :breaker=store.selectedPanel.inApparate />
            </div>


            <div class="shinaDiv">
                <BusV :bus="store.selectedPanel.bus" />
            
          

            <div id="rows" class="rows-container">


                <div class="feeders" v-for="section in store.selectedPanel.outContact.getSlaveSections()" :key="section.id">
                    <SectionV :section="section" />
                </div>

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
//#endregion

const store = useStore().state

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
.plus {
    margin-left: 20px;
}

.rows-container {
    display: flex;
    height: 750px;
    box-sizing: border-box;
}

.shinaDiv {
    margin-left: 100px;
}

.inApparate {
    margin-top: 50px;
    margin-left: 150px;
    height: 100px;
}

/* ::selection {
    user-select: none;
} */

.feeders {


    display: flex;
    flex-direction: column;
   
    width: auto;
    height: 100%;
    border: 0px dashed rgb(134, 73, 73);

}

:root {

    --scheme-line-color: rgb(70, 70, 70);
    --scheme-line-hover-color: blue;

}


.divContainer {
    background: white;
    display: flex;
    flex-direction: column;
    align-items: start;
    width: 1680px;
    height: 1188px;
    position: relative;
    padding-top: 10px;
    padding-left: 50px;

}

.main-wrap {
    width: 100%;
    height: 100%;
    overflow: auto;
}
</style>