<template>
    <table>
        <col width="50%" />
        <col width="50%" />
        <tr>
            <td>
                <div class="name-prop">Обозначение</div>
            </td>
            <td>
                <div class="prop-value-input">
                    <TextInput :input-value="breaker.nameOfPlane" @focusout="breaker.nameOfPlane = $event.target.value"
                        :can-edite="true" />

                </div>
            </td>
        </tr>

        <tr>
            <td>
                <div class="name-prop">Марка</div>
            </td>
            <td>
                <div class="prop-value-input"><Select :selected-value="breaker" :options="Breakers" :display-path="'mark'"
                    @change="setBreakerMark" /></div>
            </td>
        </tr>
        <tr>
            <td>
                <div class="name-prop">Кол. фаз</div>
            </td>
            <td>
                <div class="prop-value">{{ breaker.colPhase }}</div>
            </td>
        </tr>
        <tr>
            <td>
                <div class="name-prop">Iрасч.</div>
            </td>
            <td>
                <div class="prop-value">{{ breaker.innerSection.modeMax.current.toFixed(3) }}</div>
            </td>
        </tr>


        <tr>
            <td>
                <div class="name-prop">Номинальный ток</div>
            </td>
            <td>
                <div class="prop-value">{{ breaker.nominalCurrent }}</div>
            </td>
        </tr>
    </table>
</template>

<script setup lang="ts">

import TextInput from './UI/TextInput.vue';
import Select from './UI/Select.vue'

import { Breakers } from '@/models/bd/breakers';
import { Breaker } from '@/models/breaker';

import { useStore } from 'vuex';

const breaker = useStore().state.selectedObject as Breaker


function setBreakerMark(option: any) {
    breaker.mark = option.mark
}
</script>

<style scoped>
* {
    font-family: Arial, Helvetica, sans-serif
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