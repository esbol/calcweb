

<template>
    <div class="side-container" :class="{ show: show }">
        <div class="wrapper" v-if="show">
            <PanelBrowser />
             <SectionProps :section="selectedFeeder.sConsumer === null ? new SectionLine() : selectedFeeder.sConsumer" />
        </div>
       
    </div>
</template>

<script setup lang="ts">

import { Feeder } from "@/models/feeder";
import { Panel } from "@/models/panel";
import { SectionLine } from "@/models/sectionline";
import { inject, watch, ref, computed } from "vue";
import PanelBrowser from "./PanelBrowser.vue";
import SectionProps from "./SectionProps.vue";

const panels: Array<Panel> = inject('panels', new Array<Panel>())
// const selectedPanel = inject('selectedPanel', 0)
const selectedFeeder: Feeder = inject('selectedFeeder', new Feeder())

// let selectedFeeder = computed(() => {
//     const selPan = panels.find(p=> p.id===selectedPanelId)
//     return selPan?.feeders.find(f=> f.id === selectedFeederId)
// })


const props = defineProps({
    show: Boolean,
   
})


</script>



<style scoped>
.wrapper{
    margin: 5px;
    height: 100%;
}
.side-container {
    width: 50px;
    height: 100%;
    color: var(--sidebar-text-color);
    background: var(--sidebar-bg-color);
   
}

.show {
    width: 250px;
}
</style>