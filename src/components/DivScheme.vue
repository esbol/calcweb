<template>
    <div class="main-wrap" @click="clearSelect" id="mainWrap">
        <div ref="content" id="divContainer" v-on:keydown="handleKeyDown" tabindex="0"
            :class="{ show_grid: store.showGrid }" class="divContainer" v-if="store.selectedPanel != null">

            <Format />

            <div class="bokovic">
                <Bokovic />
            </div>

            <div class="cablesTable" v-if="store.selectedPanel != null">
                <CablesTable :cables="store.selectedPanel.cables" />
            </div>
            <div class="pipesTable" v-if="store.selectedPanel != null">
                <PipesTable :pipes="store.selectedPanel.pipes" />
            </div>

            <div class="inApparate">
                <BreakerInV :showPhases="true" v-if="store.selectedPanel.inApparate instanceof Breaker"
                    :breaker=store.selectedPanel.inApparate />
                <FuseInV :showPhases="true" v-if="store.selectedPanel.inApparate instanceof Fuse"
                    :fuse="store.selectedPanel.inApparate" />
                <DiffBreakerInV :showPhases="true" v-if="store.selectedPanel.inApparate instanceof DiffBreaker"
                    :diffBreaker="store.selectedPanel.inApparate" />
                    <BreakerInPower :show-phases="true" v-if="store.selectedPanel.inApparate instanceof BreakerPower"
                    :breaker-power="store.selectedPanel.inApparate"/>
            </div>


            <div class="shinaDiv">
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
import BreakerInPower from './DivsScheme/verticals/BreakerInPower.vue'
import Bokovic from './DivsScheme/formats/Bokovic.vue'
import PipesTable from './DivsScheme/verticals/PipesTable.vue'
import CablesTable from './DivsScheme/verticals/CablesTable.vue'
import BreakerInV from './DivsScheme/verticals/BreakerInV.vue'
import FuseInV from './DivsScheme/verticals/FuseInV.vue'
import DiffBreakerInV from './DivsScheme/verticals/DiffBreakerInV.vue'
import Popup from './DivsScheme/Popup.vue'
import BusV from './DivsScheme/verticals/BusV.vue'

import SectionV from './DivsScheme/verticals/SectionV.vue'
import PlusV from './DivsScheme/verticals/PlusV.vue'



import Format from './DivsScheme/formats/Format.vue';
import { reactive, ref, computed, onMounted, toRefs } from 'vue';

import { addScale } from './DivsScheme/pan'
import { useStore } from 'vuex'
import { deleteObject } from '@/models/schemeActions/schemeactions'
import { Panel } from '@/models/panel'
import { Cable } from '@/models/cable'
import { Fuse } from '@/models/fuse'
import { Breaker } from '@/models/breaker'

import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { DiffBreaker } from '@/models/diffBreaker'
import { BreakerPower } from '@/models/breakerPower'

//#endregion

const store = useStore().state
const cables = new Array<Cable>()



function handleKeyDown(event: KeyboardEvent) {
    console.log(event.code);

    if (event.code === "Delete" || event.keyCode === 46) {
        deleteObject(store.selectedObject)
    }
    // printToPDF()
}


onMounted(() => {
    addScale('mainWrap')
})

const width = computed(() => {
    const scale = store.selectedPanel.format.pixelScale
    return store.selectedPanel.format.width * scale + 'px'
})

const height = computed(() => {
    const scale = store.selectedPanel.format.pixelScale
    return store.selectedPanel.format.height * scale + 'px'
})

function clearSelect(event: MouseEvent) {
    const target = event.target as Element
    if (target.className == 'innerFrame' || target.className == 'main-wrap') {
        store.selectedObject = null
    }

}

const content = ref<HTMLDivElement | null>(null);

async function printToPDF() {
    if (!content.value) return;

    // Создайте изображение с помощью html2canvas
    const canvas = await html2canvas(content.value, {
        scale: 2,
        useCORS: true,
    });

    // Создайте новый экземпляр jsPDF
    const pdf = new jsPDF({
        orientation: "l",
        unit: "mm",
        format: "a3",
    });

    // Рассчитайте соотношение сторон изображения
    const imgWidth = pdf.internal.pageSize.getWidth();
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // Добавьте изображение на страницу PDF
    pdf.addImage(canvas.toDataURL("image/jpeg", 1.0), "JPEG", 0, 0, imgWidth, imgHeight);

    // Сохраните PDF-файл
    pdf.save("output.pdf");
}

</script>

<style>
.bokovic {
    position: absolute;
    left: 80px;
    top: 20px
}

.cablesTable {
    position: absolute;
    left: 80px;
    bottom: 50px
}

.pipesTable {
    position: absolute;
    left: 530px;
    bottom: 50px
}

.cells {
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
    margin-left: 300px;
    height: 786px;
}

.inApparate {
    margin-top: 30px;
    margin-left: 480px;
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


    display: flex;
    flex-direction: column;
    align-items: start;
    width: v-bind(width);
    height: v-bind(height);
    position: relative;
    padding-top: 20px;
    padding-left: 50px;
    box-shadow: 0px 0px 2px 1px #d1d1d1;
    margin-left: auto;
    margin-right: auto;
}

.show_grid {
    background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0OCIgaGVpZ2h0PSI0OCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEyIEwgNDggMTIgTSAxMiAwIEwgMTIgNDggTSAwIDI0IEwgNDggMjQgTSAyNCAwIEwgMjQgNDggTSAwIDM2IEwgNDggMzYgTSAzNiAwIEwgMzYgNDgiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2QwZDBkMCIgb3BhY2l0eT0iMC4yIiBzdHJva2Utd2lkdGg9IjEiLz48cGF0aCBkPSJNIDQ4IDAgTCAwIDAgMCA0OCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZDBkMGQwIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=);
    background-position: -1px -1px;
}

.divContainer:focus {
    outline: none;
}

.main-wrap {
    width: 100%;
    height: 100%;
    overflow: auto;
    padding-left: 10px;
    padding-top: 5px;
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