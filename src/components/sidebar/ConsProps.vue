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
                    <TextInput :input-value="consumer.nameOfPlane" @focusout="consumer.nameOfPlane = $event.target.value"
                        :can-edite="true" />

                </div>
            </td>
        </tr>

        <tr>
            <td>
                <div class="name-prop">Руст.</div>
            </td>
            <td>
                <div class="prop-value-input"><NumberInput :input-value="consumer.installPower"
                    @focusout="setInstallPower($event.target.value)" :can-edite="true" /></div>
            </td>
        </tr>
        <tr>
            <td>
                <div class="name-prop">Кол. фаз</div>
            </td>
            <td>
                <div class="prop-value-input"><Select :selected-value="consumer.colPhase" :display-path="'0'" :options="ColPhases" @change="setColPhase" /></div>
            </td>
        </tr>
        <tr>
            <td>
                <div class="name-prop">Cos f</div>
            </td>
            <td>
                <div class="prop-value-input"><NumberInput :input-value="consumer.cosf" @focusout="setCosf($event.target.value)"
                    :can-edite="true" /></div>
            </td>
        </tr>


        <tr>
            <td>
                <div class="name-prop">Iрасч.</div>
            </td>
            <td>
                <div class="prop-value">{{ consumer.current.toFixed(3) }}</div>
            </td>
        </tr>
    </table>

    
</template>

<script setup lang="ts">
import { ColPhases, TypesBySP } from '@/models/normativs';
import { Cables } from '@/models/bd/cables';

import Select from './UI/Select.vue'
import { Consumer } from "@/models/consumer";
import TextInput from "./UI/TextInput.vue";
import NumberInput from "./UI/NumberInput.vue";

const props = defineProps({
    consumer: {
        type: Consumer,
        required: true
    }
})

function setColPhase(n: number) {
    props.consumer.colPhase = n
    props.consumer.supplyPanels.forEach(p=>p.calc())

}

function setInstallPower(n: any) {
    props.consumer.installPower = parseFloat(n)
    props.consumer.supplyPanels.forEach(p => p.calc())
}
function setCosf(n: any) {
    props.consumer.cosf = parseFloat(n)
    props.consumer.supplyPanels.forEach(p => p.calc())
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