<template>
    <g  stroke="green" @mouseenter="menter" @mouseleave="meleave" @click="$emit('mclick')">
        <line :class="{ hover: hov }" :x1="x" :y1="y" :x2="x + 8" :y2="y" class="l1" />

        <circle :class="{ hover: hov }" :cx="x + 12" :cy="y" :r="4"  />
        <line :class="{ hover: hov }"  :x1="x + 10" :y1="y" :x2="x + 14" :y2="y"  class="l-plus"/>
        <line :class="{ hover: hov }" :x1="x + 12" :y1="y - 2" :x2="x + 12" :y2="y + 2" class="l-plus"/>
    </g>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

const props = defineProps(['x', 'y'])
const emit = defineEmits(['menter', 'mleave', 'mclick'])

const hov = ref(false)

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
.l1 {
    stroke: var(--color-stroke-dashed);
    stroke-width: 0.5;
    stroke-dasharray: 3 1;
}
circle {
    stroke: rgb(43, 43, 43);
    fill: transparent;
    stroke-dasharray: 3 1;
    stroke-width: 0.5;
}

.l-plus {
    stroke: rgb(43, 43, 43);
    stroke-width: 0.5;
    pointer-events: none;
}

.hover {
    stroke: blue;
}

</style>