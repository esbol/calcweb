<template>
    <div class="header_container no-select" >
        <!-- <div class="menu-row">
            <Menu />
        </div> -->
        <div class="tools-row">
            <div @click="openFileDialog" class="material-symbols-outlined btn">
                folder_open
            </div>
            <input ref="fileInput" type="file" style="display: none" @change="handleFileChange">

            <div @click="savePanelsToFile" class="material-symbols-outlined btn">
                save
            </div>

            <div class="grid" @click="state.showGrid = !state.showGrid">
                <span class="material-symbols-outlined">
                    grid_4x4
                </span>
            </div>
            <img src="@/assets/pdf.svg" alt="" @click="print" class="pdf">
            <img src="@/assets/dwg.png" alt="" @click="print" class="dwg">
        </div>

    </div>
</template>

<script setup lang="ts">
import FormatProps from './FormatProps.vue';

import { useStore } from 'vuex';
import { computed, ref, watchEffect } from 'vue';
import { IState } from '@/store';
import { getJSONRecurcy } from '@/models/serialize/serialize';
import { getPanelsRecurcy } from '@/models/serialize/deserialize';


const state = useStore().state as IState
const store = useStore()
const color = computed(() => {
    if (state.showGrid) {
        return 'var(--main-text-color)'
    } else {
        return 'gray'
    }
})

const fileInput = ref<HTMLInputElement | null>(null)

function openFileDialog() {
  fileInput.value?.click()
}


function handleFileChange(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      const fileContent = e.target?.result as string
      // Делайте что-то с содержимым файла
      
      const panels = getPanelsRecurcy(fileContent)
      console.log(panels)
      store.commit('setPanels', panels)
    }
    reader.readAsText(file)
  }
}



const savePanelsToFile = () => {
    const data = getJSONRecurcy(state.panels)
    
    const blob = new Blob([data], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'panels.json';
    link.click();

    // Освобождение памяти, используемой URL
    URL.revokeObjectURL(url);
    console.log(data);
    
};


async function print() {

    state.selectedObject = null
    state.isModePrint = true
    state.showGrid = false

    console.log('print');

}


</script>

<style scoped>
.dwg{
    height: 25px;
}
.pdf{
    height: 30px;
}
.btn {
    margin-left: 5px;
}

.grid {
    color: v-bind(color);
    cursor: pointer;
}

.tools-row {
    height: 40px;
    display: flex;
    align-items: center;
}
</style>