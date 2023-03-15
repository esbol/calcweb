<template>
  <div class="header">{{ store.state.panels.length }}</div>
  <div class="main" :class="{ sidehidden: sideShow === false, sideshow: sideShow === true }">
    <SideBar :show="sideShow"/>
    <DivScheme v-if="store.state.selectedPanel != null"
     />
  </div>
  <div class="footer">footer</div>
</template>

<script setup lang="ts">
import DivScheme from '@/components/DivScheme.vue';
import { ref, provide, watch } from 'vue'
import { Panel } from '@/models/panel'
import SideBar from '@/components/sidebar/SideBar.vue';

import { Breaker } from '@/models/breaker';
import { Breakers } from '@/models/bd/breakers';

import { useStore } from 'vuex';

const store = useStore()

const panel1 = new Panel()
panel1.inApparate = new Breaker(Breakers[0].mark)

store.state.panels.push(panel1)
store.state.selectedPanel = store.state.panels[0]
panel1.nameOfPlane='ШР1'

const sideShow = ref(true)







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
  --main-text-disabled-color: rgb(140, 140, 140);
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