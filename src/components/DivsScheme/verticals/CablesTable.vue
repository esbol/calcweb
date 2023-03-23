<template>
    <div @click="select" class="cables_container" @mousedown="startDragging" :style="{ top: position.y + 'px', left: position.x + 'px' }" >

        <table>
            <col width="188px" />
            <col width="150px" />
            <col width="100px" />
            <tr class="header">
                <td>Число и сечение жил, напряжение</td>
                <td>Марка</td>
                <td>Длина, м</td>
            </tr>

            <tr v-for="cable in cables">
                <td>{{ cable.colCores }}x{{ cable.square }} - 0.66</td>
                <td>{{ cable.mark }}</td>
                <td>{{ cable.length }}</td>
            </tr>


        </table>

    </div>
</template>

<script setup lang="ts">

import { Bus } from '@/models/bus';
import PanelPowers from './PanelPowers.vue';
import { useStore } from 'vuex';
import { ref, watchEffect, computed, PropType, onUnmounted } from 'vue';
import { Cable } from '@/models/cable';
import { Panel } from '@/models/panel';

const store = useStore().state


const color = ref('var(--scheme-line-hover-color)')

const props = defineProps({
    cables: {
        type: Array as PropType<Cable[]>,
        required: true
    }
})

function select(){
    store.selectedObject = props.cables
    
}
watchEffect(() => {
    
    if (store.selectedObject == props.cables) {
        
        color.value = 'var(--scheme-line-hover-color)'

    } else {

        color.value = 'var(--scheme-line-color)'
    }
})

const isDragging = ref(false)
const startPosition = ref({ x: 0, y: 0 })
const position = ref({ x: 0, y: 0 })

function startDragging(event: MouseEvent) {
    isDragging.value = true
    startPosition.value.x = event.clientX
    startPosition.value.y = event.clientY
    document.addEventListener('mousemove', drag)
    document.addEventListener('mouseup', stopDragging)
}

function drag(event: MouseEvent) {
    if (isDragging.value) {
        const deltaX = event.clientX - startPosition.value.x
        const deltaY = event.clientY - startPosition.value.y
        position.value.x += deltaX
        position.value.y += deltaY
        startPosition.value.x = event.clientX
        startPosition.value.y = event.clientY
    }
}

function stopDragging() {
    isDragging.value = false
    document.removeEventListener('mousemove', drag)
    document.removeEventListener('mouseup', stopDragging)
}

onUnmounted(() => {
    document.removeEventListener('mousemove', drag)
    document.removeEventListener('mouseup', stopDragging)
})







</script>

<style scoped>
.header{
    height: 50px;
}
td {
    text-align: center;
    vertical-align: center;
    border-right: 1px solid v-bind(color);
}

tr {
    border-bottom: 1px solid v-bind(color);
    height: 32px;
    color: v-bind(color);
}

.cables_container {
    position: relative;
    border: 1px solid v-bind(color);
    border-bottom: none;
    border-right: none;
    cursor: pointer;
    
}

table {
    border-collapse: collapse;
    border-spacing: 0px;
}</style>