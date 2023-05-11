<template>
    <div class="popup-container">
        <div class="popup">
            <div class="title">Создать проект</div>
            <table>
                <col width="180px" />
                <col width="350px" />
                <tr>
                    <td>
                        <div class="name-prop">Название</div>
                    </td>
                    <td>
                        <div class="prop-value-input">
                            <TextInput :input-value="name" @focusout="name = $event.target.value" :can-edite="true" />
                        </div>
                    </td>
                </tr>


            </table>
            <button @click="addNewProject">Создать</button>
            <button @click="$emit('clcClose')">Отменить</button>
        </div>
        <div class="back" @click="$emit('clcClose')"></div>
    </div>
</template>

<script setup lang="ts">
import SelectSimple from '../sidebar/UI/SelectSimple.vue';
import TextInput from '../sidebar/UI/TextInput.vue';
import { useStore } from 'vuex';
import { ref, defineEmits, computed, onMounted } from 'vue';
import { Fuses, IFuse } from '@/models/bd/fuses';
import { IProject, IState } from '@/store';
import { Panel } from '@/models/panel';

const store = useStore().state as IState
const name = ref('Навзание')
const emits = defineEmits(['clcClose'])

function addNewProject() {
    const panel = new Panel()
    panel.nameOfPlane = 'ШР1'
    panel.addFeeder()

    const project: IProject = {
        name: name.value,
        id: Math.random(),
        panels: [panel]
    }
    store.projects.push(project)
    store.selectedProject = project
    store.panels = project.panels
    store.selectedPanel = panel
    store.selectedObject = null
    emits('clcClose')
}

</script>

<style scoped>
button {
    margin-right: 10px;
}

label {
    margin-right: 4px;
    color: var(--main-text-color);
}

.check[type="text"] {
    border: 1px solid black;
    padding: 5px;
    font-size: 16px;
}

button {
    margin-top: 20px;
}

.title {
    font-size: 15px;
    font-weight: bold;
    margin-bottom: 20px;
}

.popup {
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    z-index: 3;
}

.back {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-color: #1b202b;
    opacity: .5;
    z-index: 1;
}

.popup-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    box-shadow: 2px 2px 2px gray;
    border: 1px solid rgb(201, 201, 201);

    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
}

table {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0px;
}

tr {
    height: 25px;
    border-bottom: 1px solid var(--main-border-color);
    border-left: 1px solid var(--main-border-color);
    box-sizing: border-box;
    padding: 0;

}

td {
    border-left: 1px solid var(--main-border-color);
    padding: 0;

}

.name-prop {
    height: 100%;
    margin-left: 5px;
    display: flex;
    align-items: center;
}

.prop-value {
    display: flex;
    align-items: center;
    height: 100%;
    padding-left: 5px;
    color: var(--main-text-disabled-color);
}

.prop-value-input {
    display: flex;
    align-items: center;
    height: 100%;
    width: 100%;
    border-left: 1px solid var(--main-border-color);

}
</style>