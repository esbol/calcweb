<template>
  <div class="header">header</div>
  <div class="main" :class="{ sidehidden: sideShow === false, sideshow: sideShow === true }">
    <SideBar :show="sideShow"/>
    <DivScheme v-if="store.selectedPanel != null"
     />
  </div>
  <div class="footer">footer</div>
</template>

<script setup lang="ts">
import DivScheme from '@/components/DivScheme.vue';
import { ref, provide, watch } from 'vue'
import { Panel } from '@/models/panel'
import SideBar from '@/components/sidebar/SideBar.vue';
import { store } from '@/store/store';
import { Breaker } from '@/models/breaker';



const panel1 = new Panel()
const panel2 = new Panel()
panel1.nameOfPlane = 'ШР-1'
panel2.nameOfPlane = 'ШР-2'
panel1.addFeeder()
panel1.calc()
panel2.calc()
panel1.inApparate = new Breaker('VSG')
panel2.inApparate = new Breaker('gkd')

store.panels.push(panel1)
store.panels.push(panel2)

const sideShow = ref(true)

store.selectedPanel = panel1





</script>

<style>
:root {
  --sidebar-title-bg-color: #e6e6e6;
  --sidebar-bg-color: #fbfbfb;
  --sidebar-text-color: #383838;
  --body-bg-color: rgb(206, 202, 202);
  --sidebar-selected-color: #1a73e8;
  --main-border-color: rgb(223, 223, 223);
  --main-accent-color: #1a73e8;
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