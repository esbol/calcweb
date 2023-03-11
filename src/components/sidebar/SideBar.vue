

<template>
    <div class="side-container" :class="{ show: show }">
        <div class="wrapper" v-if="show">
            <PanelBrowser />
            <PropsContainer title="Участок сети" v-if="(store.selectedObject instanceof SectionLine)">
                <SectionProps :section="store.selectedObject" />
            </PropsContainer>

            <PropsContainer title="Электроприемник" v-if="(store.selectedObject instanceof Consumer)">
                <ConsProps :consumer="store.selectedObject" />
            </PropsContainer>
            <PropsContainer title="Автомат" v-if="(store.selectedObject instanceof Breaker)">
                <BreakerProps :breaker="store.selectedObject" />
            </PropsContainer>

            <BusProps v-if="(store.selectedObject instanceof Bus)" :bus="store.selectedObject" />
        </div>
        <div class="splitter"></div>
    </div>
</template>

<script setup lang="ts">
import PropsContainer from "./PropsContainer.vue";
import { Bus } from "@/models/bus";
import BusProps from "./BusProps.vue";
import BreakerProps from "./BreakerProps.vue";
import ConsProps from "./ConsProps.vue";
import { SectionLine } from "@/models/sectionline";
import { inject, watch, ref, computed } from "vue";
import PanelBrowser from "./PanelBrowser.vue";
import SectionProps from "./SectionProps.vue";
import { store } from "@/store/store";
import { Consumer } from "@/models/consumer";
import { Breaker } from "@/models/breaker";




// let selectedFeeder = computed(() => {
//     const selPan = panels.find(p=> p.id===selectedPanelId)
//     return selPan?.feeders.find(f=> f.id === selectedFeederId)
// })


const props = defineProps({
    show: Boolean,
})


</script>



<style scoped>
.wrapper {

    height: 100%;
}
.splitter {
    width: 100%;
    height: 100%;
    border-left: 1px solid var(--main-border-color);
    border-right: 1px solid var(--main-border-color);
    cursor: col-resize;
}
.side-container {
    display: grid;
    grid-template-columns: auto 8px;
    width: 50px;
    height: 100%;
    color: var(--sidebar-text-color);
    background: var(--sidebar-bg-color);
    overflow: auto;
}

.show {
    width: 250px;
}
</style>