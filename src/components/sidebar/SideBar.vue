

<template>
    <div class="side-container" :class="{ show: show }">
        <div class="wrapper" v-if="show">
            <Logo />
            <Settings />
            <!-- <PropsContainer title="Проекты">
                <ProjectsBrowser />
            </PropsContainer> -->
            <PropsContainer title="Панели" v-if="store.selectedPanel != null">
                <PanelBrowser />
            </PropsContainer>
            <PropsContainer :title="store.selectedPanel.nameOfPlane" v-if="(store.selectedObject instanceof Panel)">
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
            <PropsContainer title="Предохранитель" v-if="(store.selectedObject instanceof Fuse)">
                <FuseProps :fuse="store.selectedObject" />
            </PropsContainer>
            <PropsContainer title="Дифф Автомат" v-if="(store.selectedObject instanceof DiffBreaker)">
                <DiffBreakerProps :diff-breaker="store.selectedObject" />
            </PropsContainer>
            <PropsContainer title="Выключатель нагрузки" v-if="(store.selectedObject instanceof BreakerPower)">
                <BreakerPowerProps :breaker-power="store.selectedObject" />
            </PropsContainer>

            <PropsContainer title="Пусковое устройство" v-if="(store.selectedObject instanceof Contactor)">
                <ContactorProps :contactor="store.selectedObject" />
            </PropsContainer>

            <PropsContainer title="Лист" v-if="(store.selectedObject instanceof Format)">
                <StampProps :stamp="store.selectedPanel.format.stamp" />
            </PropsContainer>



        </div>
        <div class="splitter">
            <div class="spl_btn">
                <div class="spl_line"></div>
                <div class="spl_line"></div>
            </div>


        </div>
        <div class="tools">
            <Tools />
        </div>

    </div>
</template>

<script setup lang="ts">

import { Log, LogType } from "@/firebase/Logger"
import Logo from "./Logo.vue";
import Settings from "./Settings.vue";
import Tools from "./Tools.vue";
import ProjectsBrowser from "./ProjectsBrowser.vue";
import BreakerPowerProps from "./BreakerPowerProps.vue";
import DiffBreakerProps from "./DiffBreakerProps.vue";
import FuseProps from "./FuseProps.vue";
import StampProps from "./StampProps.vue";
import PanelProps from "./PanelProps.vue";
import ContactorProps from "./ContactorProps.vue";
import PropsContainer from "./PropsContainer.vue";
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
import { Fuse } from "@/models/fuse";
import { DiffBreaker } from "@/models/diffBreaker";
import { BreakerPower } from "@/models/breakerPower";
import { Panel } from "@/models/panel";
import { Format } from "@/models/settings/format";



const store = useStore().state




const props = defineProps({
    show: Boolean,
})



</script>



<style scoped>
.tools {
    width: 100%;

    grid-row: 2;
    grid-column: 1;

}

.wrapper {
    grid-row: 1;
    grid-column: 1;
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
    grid-row: 1 / span 2;
    grid-column: 2;
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
    grid-template-rows: 1fr auto;
    width: 50px;
    height: 100%;
    color: var(--sidebar-text-color);
    background: var(--sidebar-bg-color);
    overflow: visible;
}

.show {
    width: 300px;
}
</style>