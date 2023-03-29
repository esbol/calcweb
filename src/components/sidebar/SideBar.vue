

<template>
    <div class="side-container" :class="{ show: show }">
        <div class="wrapper" v-if="show">
            <PropsContainer title="Панели">
                <PanelBrowser />
            </PropsContainer>

            <PropsContainer :title="store.selectedPanel.nameOfPlane" v-if="(store.selectedPanel != null)">
                <PanelProps />
            </PropsContainer>
          
            <PropsContainer title="Участок сети" v-if="(store.selectedObject instanceof SectionLine)">
                <SectionProps :section="store.selectedObject" />
            </PropsContainer>

            <PropsContainer title="Электроприемник" v-if="(store.selectedObject instanceof Consumer)">
                <ConsProps :consumer="store.selectedObject" />
            </PropsContainer>
            <PropsContainer title="Автомат" v-if="(store.selectedObject instanceof Breaker)">
                <BreakerProps :breaker="store.selectedObject" />
            </PropsContainer>

            <PropsContainer title="Пусковое устройство" v-if="(store.selectedObject instanceof Contactor)">
                <ContactorProps :contactor="store.selectedObject" />
            </PropsContainer>

            <PropsContainer title="Штамп" v-if="(store.selectedObject instanceof Stamp)">
                <StampProps :stamp="store.selectedObject" />
            </PropsContainer>



            <BusProps v-if="(store.selectedObject instanceof Bus)" :bus="store.selectedObject" />

        </div>
        <div class="splitter">
            <div class="spl_btn">
                <div class="spl_line"></div>
                <div class="spl_line"></div>
            </div>


        </div>
    </div>
</template>

<script setup lang="ts">

import StampProps from "./StampProps.vue";
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
import { Stamp } from "@/models/settings/stamp";


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
    display: flex;
    justify-content: center;
    vertical-align: center;
    flex-direction: column;
    align-items: center;
}

.spl_btn {
    display: flex;
    width: 4px;
    justify-content: space-between;
}

.spl_line {
    width: 1px;
    height: 15px;
    background-color: var(--main-border-color);
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
    width: 300px;
}
</style>