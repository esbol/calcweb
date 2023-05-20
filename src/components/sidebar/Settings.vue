<template>
    <div class="container-props ">
        <div class="header no-select">
            <div class="row">
                <input ref="fileInput" type="file" style="display: none" @change="handleFileChange">
                <div class="btn btn-open" @click="openFileDialog">
                    <img src="@/assets/open-folder.png" alt="" class="openimg" />
                    <div class="text">Открыть</div>
                </div>
                <div class="btn btn-save" @click="savePanelsToFile">
                    <img src="@/assets/diskette.png" alt="" class="saveimg" />
                    <div class="text">Сохранить</div>
                </div>
                <div class="btn btn-settings">
                    <div class="material-symbols-outlined settings">
                        settings
                    </div>
                </div>
            </div>
            <div class="splitter"></div>
        </div>

    </div>
</template>

<script setup lang="ts">
import { getPanelsRecurcy } from '@/models/serialize/deserialize';
import { getJSONRecurcy } from '@/models/serialize/serialize';
import { IState } from '@/store';
import { ref } from 'vue';
import { useStore } from 'vuex';

const state = useStore().state as IState
const store = useStore()

const show = ref(true)

//#region open and save
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
//#endregion

</script>

<style scoped>
.btn-open{
    width: 100px;
}
.btn-save{
    width: 100px;
    margin-left: 10px;
}
.row{
    padding-left: 15px;
    display: flex;
    

}
.btn {
    display: flex;
    align-items: center;
    height: 40px;
    cursor: pointer;
}

.btn:hover {
    box-shadow: 0 0 1px gray;
}

.splitter {
    position: absolute;
    height: 100%;
    width: 1px;
    right: 50px;
    background-color: rgb(212, 212, 212);
}

.settings {
    position: absolute;
    right: 10px;
    font-size: 28px;
    color: rgb(65, 65, 65);
}

.text {
    margin-left: 5px;
    font-weight: normal;

}

.openimg {
    height: 25px;
    display: block;
    margin-left: 5px;
}

.saveimg {
    height: 20px;
    display: block;
    margin-left: 5px;
}

.header {
    position: relative;
    display: flex;
    height: 50px;
    align-items: center;
    align-content: center;
    justify-content: start;
    border-bottom: 1px solid var(--main-border-color);
    background-color: var(--sidebar-title-bg-color);
 
}




.container-props {
    width: 100%;
    height: auto;
    border-bottom: 1px solid var(--main-border-color);
    background: white;
}

.material-symbols-outlined {
    font-variation-settings:
        'FILL' 0,
        'wght' 400,
        'GRAD' 0,
        'opsz' 48
}
</style>