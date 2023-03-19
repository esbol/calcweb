

<template>
    <div class="side-container" :class="{ show: show }">
        <div class="wrapper" v-if="show">
            <PanelBrowser />
             <PropsContainer title="Панель" v-if="(store.selectedPanel != null)">
                    <PanelProps/>
                </PropsContainer>

            <PropsContainer title="Участок сети" v-if="(store.selectedObject instanceof SectionLine)">
                <SectionProps />
            </PropsContainer>

            <PropsContainer title="Электроприемник" v-if="(store.selectedObject instanceof Consumer)">
                <ConsProps :consumer="store.selectedObject" />
            </PropsContainer>
            <PropsContainer title="Автомат" v-if="(store.selectedObject instanceof Breaker)">
                <BreakerProps />
            </PropsContainer>

            <PropsContainer title="Пусковое устройство" v-if="(store.selectedObject instanceof Contactor)">
                    <ContactorProps  />
                </PropsContainer>

            <BusProps v-if="(store.selectedObject instanceof Bus)" :bus="store.selectedObject" />
        </div>
        <div class="splitter"></div>
    </div>
</template>

<script setup lang="ts">
import PanelProps from "./PanelProps.vue";
import ContactorProps from "./ContactorProps.vue";
import PropsContainer from "./PropsContainer.vue";
import { Bus } from "@/models/bus";
import BusProps from "./BusProps.vue";
import BreakerProps from "./BreakerProps.vue";
import ConsProps from "./ConsProps.vue";
import { SectionLine } from "@/models/sectionline";
import PanelBrowser from "./PanelBrowser.vue";
import SectionProps from "./SectionProps.vue";
import { Consumer } from "@/models/consumer";
import { Breaker } from "@/models/breaker";
import { Contactor } from "@/models/contactor";
import { useStore } from "vuex";


const store = useStore().state




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