<template>
    <text class="table-text" :class="{ hover_text: hov }" :x="x + 5" :y="y + 1">N1
        <tspan :x="x + 15" :y="y + 1 ">5.5</tspan>
        <tspan :x="x + 25" :y="y + 1">18.3</tspan>
    </text>
    <text  text-anchor="start" :x="x + 31" :y="y + 1">Насос водопров</text>
    <rect :x="x" :y="y - 10" width="60" height="20" class="table-lines" :class="{ hover: hov }"/> 
    <line class="table-lines" :class="{ hover: hov }" :x1="x" :y1="y + 10" :x2="x " :y2="y -10" />
    <line class="table-lines" :class="{ hover: hov }" :x1="x + 10" :y1="y + 10" :x2="x + 10" :y2="y - 10" />
    <line class="table-lines" :class="{ hover: hov }" :x1="x + 20" :y1="y + 10" :x2="x + 20" :y2="y - 10" />
    <line class="table-lines" :class="{ hover: hov }" :x1="x + 30" :y1="y + 10" :x2="x + 30" :y2="y - 10" />


    <rect :x="x" :y="y - 10" width="50" height="20" class="outline" 
    @mouseenter="menter()" 
    @mouseleave="meleave"
    @click="$emit('mclick')"
          
        />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

const props = defineProps(['x', 'y', 'text'])
const hov = ref(false)
const emit = defineEmits(['menter', 'mleave', 'mclick'])

function menter() {
    emit('menter')
    hov.value = true
}
function meleave() {
    emit('mleave')
    hov.value = false
}

</script>

<style scoped>
.table-text {
    text-anchor: middle;
}
.table-lines{
    stroke: black;
    stroke-width: 0.3;
    fill: transparent;
}
.hover_text {
    fill: blue;
}

.outline {
    stroke-width: 0;
    fill: transparent;
}

text,
tspan {
    font-size: 3.5px;

}

.fuse {
    stroke: black;
    fill: transparent;
    stroke-width: 0.5;
}

.hover {
    stroke: blue;
    z-index: 100;

}

line {
    stroke: black;
    stroke-width: 1;
    pointer-events: none;
}
</style>