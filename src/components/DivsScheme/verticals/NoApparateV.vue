<template>
    
        <div class="breaker-container" @click="store.selectedObject = section">

            
            <div class="line-before" :class="{ hover_bg: hover }"></div>

          


      

            <div class="line_0" :class="{ hover_bg: hover }">
                <div class="line_0_angle" :class="{ hover_bg: hover }"></div>
            </div>

            <div class="line_pe_angle"></div>
            <div class="contact_0"></div>
            <div class="contact_f"></div>
            <div class="contact_pe"></div>

            <div class="fases" v-if="showPhases">
                <div class="phaseLine" v-if="section.colPhase === 3" :class="{ hover_bg: hover }"></div>
                <div class="phaseLine" :class="{ hover_bg: hover }"></div>
                <div class="phaseLine" v-if="section.colPhase === 3" :class="{ hover_bg: hover }"></div>
            </div>

        </div>

</template>

<script setup lang="ts">



import { useStore } from 'vuex';
import { ref, watchEffect } from 'vue';
import SectionV from './SectionV.vue';
import { SectionLine } from '@/models/sectionline';
import { Contact } from '@/models/contact';

const store = useStore().state
const props = defineProps({
    section: {
        type: SectionLine,
        required: true
    },
    showPhases: {
        type: Boolean,
        required: true
    }
})

const hover = ref(false)

watchEffect(() => {
    if (store.selectedObject === props.section) {
        hover.value = true
    } else {
        hover.value = false
    }
})


</script>

<style scoped>

.contact_pe {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--scheme-line-color);
    position: absolute;
    right: 17px;
    top: 145px;
}

.contact_f {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--scheme-line-color);
    position: absolute;
    right: 31px;
    top: -5px;
}

.contact_0 {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--scheme-line-color);
    position: absolute;
    right: 17px;
    top: 8px;
}

.line_pe_angle {
    position: absolute;
    bottom: -20px;
    left: 50%;
    width: 2px;
    height: 25px;
    transform: rotate(30deg);
    transform-origin: bottom;
    background: var(--scheme-line-color);
}



.line_0_angle {
    position: absolute;
    top: 95px;
    right: 0;
    width: 2px;
    height: 25px;
    transform: rotate(30deg);
    transform-origin: top;
    background: var(--scheme-line-color);
}

.line_0 {
    position: absolute;
    top: 16px;
    right: 20px;
    width: 2px;
    height: 95px;
    background: var(--scheme-line-color);
}



.fases {
    width: 15px;
    height: 13px;
    border: 0px solid red;
    position: absolute;
    top: 40px;
    left: calc(50% -10px);
    display: flex;
    justify-content: space-around;
    flex-direction: column;
}

.phaseLine {
    width: 100%;
    height: 1px;
    background: var(--scheme-line-color);
    transform: rotate(40deg);
}






.hover_text {
    color: var(--scheme-line-hover-color) !important;
}

.hover_bg {
    background-color: var(--scheme-line-hover-color) !important;
}

.hover_border {
    border-color: var(--scheme-line-hover-color) !important;
}

.breaker-container {
    cursor: pointer;
    position: relative;
    width: 70px;
    height: 160px;
    border: 0px dashed gray;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
}

.line-before {
    width: 3px;
    height: 150px;
    background-color: var(--scheme-line-color);
}




</style>