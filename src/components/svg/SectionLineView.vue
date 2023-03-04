<template>
    <text contenteditable="true" :class="{ hover_text: hov }" :x="x + length / 2" :y="y - 2">h2-ВВГнг-(А)-LS 3x2.5 - 52м
        <tspan :x="x + length/2" :y="y + 4">т1-ПГ16 - 48м</tspan>

    </text>
    <line :class="{ hover: hov }" :x1="x" :y1="y" :x2="x + length" :y2="y" />

    <rect :x="x" :y="y - 10" :width="x + length" height="18" class="outline" @mouseenter="menter" @mouseleave="meleave"
        @click="$emit('mclick')" />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

const props = defineProps(['x', 'y', 'length'])
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
    text-anchor: middle;
}

.fuse {
    stroke: black;
    fill: transparent;
    stroke-width: 0.5;
}

.hover {
    stroke: blue;


}

line {
    stroke: black;
    stroke-width: 1;
    pointer-events: none;
}
</style>