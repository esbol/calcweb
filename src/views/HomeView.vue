<template>
  <!-- <div class="header" >
   <Header />
  </div> -->
  <div class="main"  :class="{ sidehidden: sideShow === false, sideshow: sideShow === true }">
    <SideBar :show="sideShow" />
    <DivScheme v-if="store.selectedPanel != null" />

  </div>
  <!-- <div class="footer" >footer</div> -->
</template>

<script setup lang="ts">

import Header from '@/components/Header/Header.vue';
import DivScheme from '@/components/DivScheme.vue';
import { ref, provide, watch, onMounted, onBeforeUnmount } from 'vue'
import { Panel } from '@/models/panel'
import SideBar from '@/components/sidebar/SideBar.vue';
import SideRigth from '@/components/sidebar/SideRigth.vue';
import { Breaker } from '@/models/breaker';
import { Breakers } from '@/models/bd/breakers';

import { useStore } from 'vuex';
import { IProject, IState } from '@/store';
import { Log, SendLeave, SendOnline } from '@/firebase/Logger';

const store = useStore().state as IState
const st = useStore()

const onBeforeUnload = (event: BeforeUnloadEvent) => {
  // localStorage.setItem('myData', myData.value);
  Log(1, "Выход onBeforeUnload")
  SendLeave()
  st.dispatch('savePanels', store.panels);
};


// Добавить обработчик событий для 'beforeunload'
window.addEventListener('beforeunload', onBeforeUnload);

// Удалить обработчик событий при размонтировании компонента
onBeforeUnmount(() => {
  window.removeEventListener('beforeunload', onBeforeUnload);
});

onMounted(() => {
  st.dispatch('fetchPanels');
  Log(1, "Загрузился onMounted")
  SendOnline()
})

if(store.projects.length == 0){
  const proj: IProject = {id: Math.random(), name: 'Новый проект', panels: []}
  store.selectedProject = proj
  store.projects.push(proj)
  store.panels = proj.panels
}

if (store.panels.length == 0) {
  const panel1 = new Panel()
  store.panels.push(panel1)
  panel1.addFeeder()

  
  
  panel1.nameOfPlane = 'ШР1'
}


store.selectedPanel = store.panels[0]

const sideShow = ref(true)






</script>

<style>
.no-select {
  user-select: none;
}

@font-face {

  font-family: "isocpeur";

  src: url("@/assets/isocpeui.ttf") format("truetype");
  font-style: normal;
  font-weight: normal;
}

:root {
  --sidebar-title-bg-color: #e6e6e6e0;
  --sidebar-bg-color: #fbfbfb;
  --sidebar-text-color: #383838;
  --body-bg-color: rgb(206, 202, 202);
  --sidebar-selected-color: #1a73e8;
  --main-border-color: rgb(223, 223, 223);
  --main-accent-color: #1a73e8;
  --main-text-disabled-color: rgb(140, 140, 140);
  --main-text-color: #383838;
}

.header {

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
  grid-template-columns: 300px auto;
}

.material-symbols-outlined {
  font-variation-settings:
    'FILL' 0,
    'wght' 400,
    'GRAD' 0,
    'opsz' 48
}
</style>