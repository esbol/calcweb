<template>
  <div class="header">header</div>
  <div class="main" :class="{ sidehidden: sideShow === false, sideshow: sideShow === true }">
    <SideBar :show="sideShow" />
    <DivScheme :panel="panel1" />
  </div>
  <div class="footer">footer</div>
</template>

<script setup lang="ts">
import DivScheme from '@/components/DivScheme.vue';
import { ref, provide, watch } from 'vue'
import { Panel } from '@/models/panel'
import { Feeder } from '@/models/feeder'
import { reactive } from '@vue/reactivity';
import SVGScheme from '@/components/SVGScheme.vue';
import SideBar from '@/components/sidebar/SideBar.vue';

const panelsArray: Array<Panel> = []
const panel1 = new Panel()
const panel2 = new Panel()
panel1.nameOfPlane = 'ШР-1'
panel2.nameOfPlane = 'ШР-2'

panel1.addFeeder()
panelsArray.push(panel1)
panelsArray.push(panel2)

const sideShow = ref(true)


const panels = reactive(panelsArray)

const selectedFeeder = ref(undefined)
const selectedPanel = ref(panel1)
provide('panels', panels)

provide('selectedFeeder', selectedFeeder)
provide('selectedPanel', selectedPanel)




</script>

<style>
:root {

  --sidebar-bg-color: white;
  --sidebar-text-color: #383838;
  --body-bg-color: rgb(206, 202, 202);
  --sidebar-selected-color: #1a73e8;

}

.header {
  height: 50px;
  border-bottom: 1px solid rgb(198, 196, 196);
}

.footer {
  height: 40px;
  background: white;
  border-top: 1px solid rgb(219, 219, 219);
}
.main {
  display: grid;
  width: 100%;
  max-height: 100%;
  background: #f6f7f9;
  overflow: hidden;
  margin: 0;
  padding: 0;

}

.sidehidden {
  grid-template-columns: 50px auto;
}

.sideshow {
  grid-template-columns: 250px auto;
}
</style>