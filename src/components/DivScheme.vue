<template>
    <div class="main-wrap" id="mainWrap">
        <div id="divContainer" class="scheme-container">
        <A3 />
            <div class="inApparate">
                <breaker />
            </div>

            <div class="shinaDiv">
                <ShinaV :width="shinaWidth"/>
            </div>

            <div class="feeders">
                <div class="rows-container" v-for="feeder in pan.feeders" :key="feeder.id">
                    <Fuse />
                    <sectionLine />
                    <contactor />
                    <sectionLine />
                    <Cons />
                </div>
                <Plus @mclick="addFeeder" />
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
//#region import
import ShinaV from './DivsScheme/verticals/ShinaV.vue'
import A3 from './DivsScheme/A3.vue';
import breaker from './DivsScheme/Breaker.vue';
import Cons from './DivsScheme/Cons.vue';
import Plus from './DivsScheme/Plus.vue';
import contactor from './DivsScheme/Contactor.vue';
import sectionLine from './DivsScheme/SectionLine.vue';
import Shina from './DivsScheme/Shina.vue';
import Fuse from './DivsScheme/Fuse.vue';
import { reactive, ref, computed, onMounted, toRefs } from 'vue';
import plus from './svg/plus.vue';
import fuse from './svg/fuse.vue';
import SectionLineView from './svg/SectionLineView.vue'
import { Panel } from '@/models/panel';
import { SectionLine } from '@/models/sectionline';
import { Feeder } from '@/models/feeder';
import { addScale } from './DivsScheme/pan.js'
//#endregion

onMounted(() => { addScale('mainWrap') })

const props = defineProps({
    panel: {
        type: Panel,
        required: true
    }
})
const pan = ref(props.panel)

const shinaWidth = computed(() => {
    if (pan.value.feeders.length > 3) {
        return pan.value.feeders.length * 80 + 50 + 'px'
    } else {
        return '300px'
    }
})


function addFeeder() {
    pan.value.addFeeder()

}

</script>

<style>
.shinaDiv{
   
}
.inApparate {
    margin-top: 50px;
}

::selection {
    user-select: none;
}

.rows-container {
    display: flex;
    align-items: center;
    height: 80px;
    border: 0px dashed gray;
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
    padding-top: 50px;
    padding-left: 50px;

}

.main-wrap {
    width: 100%;
    height: 100%;
    overflow: auto;
}
</style>