<template>
  <div class="header">header</div>
  <div class="main" :class="{sidehidden: sideShow===false, sideshow : sideShow===true}">
    <SideBar :show="sideShow" />
    <MainSection :panel="selectedPanel" /> 
  </div>
  <div class="footer">footer</div>
</template>

<script setup lang="ts">
import { ref, provide, watch } from 'vue'
import { Panel } from '@/models/panel'
import { Feeder } from '@/models/feeder'
import { reactive } from '@vue/reactivity';

import SideBar from '@/components/sidebar/SideBar.vue';
import MainSection from '@/components/mainsection/MainSection.vue';

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

const selectedFeeder= ref(undefined)
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


.main {
  display: grid;
  width: 100%;
  background: #f6f7f9;
}
.sidehidden {
    grid-template-columns: 50px auto;
}
.sideshow {
    grid-template-columns: 250px auto;
}

.footer {
  height: 50px;
}
</style>