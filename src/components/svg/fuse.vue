<template>
    
      <text :class="{ hover_text: hov }" :x="x + 6" :y="y - 12">QF
        <tspan :x="x + 6" :y="y - 8">ВА47-29</tspan>
        <tspan  :x="x + 6" :y="y - 4">Iн=63А</tspan>
        </text>
        <rect :class="{ hover: hov }" :x="x + 5" :y="y - 2.5" 
        width="10"
        height="5"
        class="fuse" 
         />
        <line
        :class="{ hover: hov }"
         :x1="x" :y1="y" :x2="x + 20" :y2="y" />

         <rect :x="x+3" :y="y-15" 
            width="17"
            height="19"
            class="outline"
            
            @mouseenter="menter"
            @mouseleave="meleave"
            @click="$emit('mclick')"
             />
  
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

const props = defineProps(['x', 'y'])
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
.hover_text{
    fill:blue;
}
.outline{
    stroke-width: 0;
    fill: transparent;
}
text, tspan {
    font-size: 3.5px;
  
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