<template>
    <div >
        <svg id="svg1" width="600px" height="800px" viewBox="0 0 150 200">

            <rect class="shina" width="3" :height="shinaHeight" :x="shinaPosX" :y="shinaPosY" />

            <g v-for="(feeder, index) in refpan.feeders" :key="feeder.id">
                <fuse :x="shinaPosX + 3" :y="shinaPosY + 10 + index * marginTop" />
                <SectionLineView 
                :x="shinaPosX + 23" 
                :y="shinaPosY + 10 + index * marginTop"
                :length="50"
                />

                <Cons :x="shinaPosX + 73" 
                    :y="shinaPosY + 10 + index * marginTop"
                 
                    />
            </g>


            <g>
                
                <plus 
                @menter="hov = true" 
                @mleave="hov = false" 
                @mclick="addLine" 
                :x="shinaPosX + 3" :y="shinaPosY + 10 + refpan.feeders.length * marginTop" />
            </g>

        </svg>

    </div>
</template>

<script setup lang="ts">
//#region import
import { reactive, ref, computed } from 'vue';
import plus from './svg/plus.vue';
import fuse from './svg/fuse.vue';
import SectionLineView from './svg/SectionLineView.vue'
import { Panel } from '@/models/panel';
import { SectionLine } from '@/models/sectionline';
import { Feeder } from '@/models/feeder';
import Cons from './svg/Cons.vue';
//#endregion

const props = defineProps({
    panel: {
        type: Panel,
        required: true
    }
})


const selectedElement = ref({})
const refpan = reactive(props.panel)
const marginTop = 20
const hov = ref(false)
const shinaPosX = 5
const shinaPosY = 20
const shinaHeight = computed(()=> refpan.feeders.length > 3 ? refpan.feeders.length * 20 + 20 : 100)


addLine()

addLine()



function addLine() {
    refpan.addFeeder()
    console.log('click=' + props.panel.feeders.length);
    
}



//#region drag
let selectedEl: SVGElement | null = null
let offset: {
    x: number,
    y: number
} = { x: 0, y: 0 }



function startDrag(evt: MouseEvent) {

    evt.preventDefault()
    selectedEl = evt.target as SVGElement

    const mousepos = getMousePosition('svg1', evt)

    if (mousepos != undefined) {
        const x = selectedEl.getAttributeNS(null, "x")


        const y = selectedEl.getAttributeNS(null, "y")
        if (x != null && y != null) {
            offset.x = mousepos.x - parseFloat(x)
            offset.y = mousepos.y - parseFloat(y)
        }
    }



}



function endDrag(evt: MouseEvent) {
    selectedEl = null
    offset = { x: 0, y: 0 }
}

function getMousePosition(svgTagId: string, evt: MouseEvent) {
    let svg = document.getElementById(svgTagId) as unknown as SVGGraphicsElement
    let CTM = svg.getScreenCTM()

    if (CTM != null)
        return {
            x: (evt.clientX - CTM.e) / CTM.a,
            y: (evt.clientY - CTM.f) / CTM.d
        }
}
//#endregion
</script>

<style scoped>
#svg1 {
    background: #b6b6b6;

}

.shina {
    fill: transparent;
    stroke: black;
    stroke-width: 1;
}

.r1 {
    fill: rgb(82, 38, 154);

    stroke: rgb(255, 255, 0);
    stroke-width: 3;
}



.hover {
    stroke: blue;
    stroke-width: 0.5;

}

* {
    --color-stroke-dashed: rgb(43, 43, 43);
}
</style>