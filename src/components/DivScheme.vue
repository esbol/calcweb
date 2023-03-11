<template>
    <div class="main-wrap"      @click="clearSelect" id="mainWrap">
        <div id="divContainer"
    
         class="scheme-container" v-if="store.selectedPanel != null">
            <A3 />
            <div class="inApparate">
                <BreakerV v-if="store.selectedPanel.inApparate != null" :breaker=store.selectedPanel.inApparate />
            </div>

            <div class="shinaDiv">
                <BusV :width="shinaWidth" :bus="store.selectedPanel.bus" />
            </div>

            <div class="rows-container">
                <div class="feeders" v-for="feeder in store.selectedPanel.feeders" :key="feeder.id">
                    <BreakerV v-if="feeder.breaker != null" :breaker="feeder.breaker" />
                    <SectionV @clk="popup" :length="'200px'" v-if="feeder.sContactor != null" :section="feeder.sContactor" />
                    <SectionV @clk="popup" :length="'500px'" v-else :section="feeder.sConsumer" />
                    <ContactorV v-if="feeder.contactor != null" :contactor="feeder.contactor" />
                    <SectionV :length="'200px'" v-if="feeder.contactor != null" :section="feeder.sConsumer" />
                    <ConsV :consumer="feeder.consumer" />
                </div>
                <div class="plus">
                    <PlusV />
                </div>

            </div>

        </div>
    </div>
<Popup @close="showPopup=false" :indexSlot="indexSlot" v-if="showPopup" :left="popupCoords.x + 'px'" :top="popupCoords.y + 'px'"></Popup>
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
import { store } from '@/store/store'
//#endregion

onMounted(() => { addScale('mainWrap') })

const shinaWidth = computed(() => {
    if (store.selectedPanel != null) {
        if (store.selectedPanel.feeders.length > 2) {
            return store.selectedPanel.feeders.length * 110 + 90 + 'px'
        } else {
            return '300px'
        }
    } else {
        return '300px'
    }

})

const popupCoords = ref({x:0, y:0})
const showPopup = ref(false)
const indexSlot = ref(0)

function popup(event: MouseEvent, index: number){
    showPopup.value = true
    indexSlot.value = index
    popupCoords.value = {x:event.clientX, y:event.clientY}
    
}

function clearSelect(event: MouseEvent){
    const target = event.target as Element
    if(target.className == 'innerFrame' || target.className == 'main-wrap' ){
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
    margin-left: 100px;
}

.shinaDiv {
    margin-left: 100px;
}

.inApparate {
    margin-top: 50px;
    margin-left: 150px;
}

/* ::selection {
    user-select: none;
} */

.feeders {
    flex-grow: 0;

    display: flex;
    flex-direction: column;
    align-items: center;
    width: 110px;
    height: auto;
    border: 0px dashed rgb(134, 73, 73);
}

:root {

    --scheme-line-color: rgb(70, 70, 70);
    --scheme-line-hover-color: blue;

}


.scheme-container {
    background: white;
    display: flex;
    flex-direction: column;
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