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
                <div class="name-prop"><strong>Руст.</strong></div>
            </td>
            <td>
                <div class="prop-value-input">
                    <NumberInput :input-value="consumer.installPower" @focusout="setInstallPower($event.target.value)"
                        :can-edite="true" />
                </div>
            </td>
        </tr>
        <tr>
            <td>
                <div class="name-prop">Кол. фаз</div>
            </td>
            <td>
                <div class="prop-value-input"><Select :selected-value="consumer.colPhase" :display-path="'0'"
                        :options="ColPhases" @change="setColPhase" /></div>
            </td>
        </tr>
        <tr>
            <td>
                <div class="name-prop">Cos f</div>
            </td>
            <td>
                <div class="prop-value-input">
                    <NumberInput :input-value="consumer.cosf" @focusout="setCosf($event.target.value)" :can-edite="true" />
                </div>
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
        <tr>
            <td>
                <div class="name-prop">Потеря напряжеия</div>
            </td>
            <td>
                <div class="prop-value" :class="{ color_text_warn: deltaUHi }">{{ consumer.deltaU.toFixed(3) }}</div>
            </td>
        </tr>
        <tr>
            <td>
                <div class="name-prop">Допустимая потеря</div>
            </td>
            <td>
                <div class="prop-value-input">
                    <NumberInput :input-value="consumer.allowDeltaU" @focusout="setAllowDeltaU($event.target.value)"
                        :can-edite="true" />
                </div>
            </td>
        </tr>
        <tr>
            <td>
                <div class="name-prop">Назначение</div>
            </td>
            <td>
                <div class="prop-value-input"><Select :selected-value="consumer.groupNameBySP" :display-path="'0'"
                        :options="TypesBySP" @change="setTypeBySP" /></div>
            </td>
        </tr>
        <tr>
            <td>
                <div class="name-prop">Режим</div>
            </td>
            <td>
                <div class="prop-value"><span v-for="name in consumer.calculationModesNames">{{ name }}</span></div>
            </td>
        </tr>
        <tr>
            <td>
                <div class="name-prop">Подключен к</div>
            </td>
            <td>
                <div class="prop-value">{{ consumer.getSupplyPanels().length > 0 ? consumer.getSupplyPanels()[0].nameOfPlane
                    : '' }}</div>
            </td>
        </tr>
        <tr>
            <td>
                <div class="name-prop">Наименование</div>
            </td>
            <td>
                <div class="prop-value-input">
                    <TextInput :input-value="consumer.description" @focusout="consumer.description = $event.target.value"
                        :can-edite="true" />

                </div>
            </td>
        </tr>
        <tr>
            <td>
                <div class="name-prop">Резервный</div>
            </td>
            <td>
                <div class="prop-value-input"><Select :selected-value="isReserve" :display-path="'0'" :options="booleans"
                        @change="setIsReserve" /></div>
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
import { ref, watchEffect } from 'vue';
import { useStore } from 'vuex';
import { IState } from '@/store';
import { Log } from '@/firebase/Logger';

const store = useStore().state as IState
//#region isReserve
const booleans = ['Да', 'Нет']
const isReserve = ref('Нет')
const deltaUHi = ref(false)
watchEffect(() => {
    if (props.consumer.isReserve == true) isReserve.value = 'Да'
    else isReserve.value = 'Нет'
    if (props.consumer.deltaU > props.consumer.allowDeltaU) deltaUHi.value = true
    else deltaUHi.value = false
})
function setIsReserve(opt: any) {
    if (opt == 'Да') props.consumer.isReserve = true
    else props.consumer.isReserve = false
    store.panels.forEach(p => p.calc())
}
//#endregion

const props = defineProps({
    consumer: {
        type: Consumer,
        required: true
    }
})
function setTypeBySP(t: string) {
    props.consumer.groupNameBySP = t
    props.consumer.getSupplyPanels().forEach(p => {
        p.calc()

    })
}

function setAllowDeltaU(n: any) {
    props.consumer.allowDeltaU = parseFloat(n)
    props.consumer.getSupplyPanels().forEach(p => p.calc())

}
function setColPhase(n: number) {
    props.consumer.colPhase = n
    props.consumer.getSupplyPanels().forEach(p => p.calc())

}

function setInstallPower(n: any) {
    Log(1, 'setInstallPower')
    props.consumer.installPower = parseFloat(n)
    props.consumer.getSupplyPanels().forEach(p => p.calc())
}
function setCosf(n: any) {
    Log(1, 'setCosf')
    props.consumer.cosf = parseFloat(n)
    props.consumer.getSupplyPanels().forEach(p => p.calc())
}


</script>

<style scoped>
* {
    font-family: Arial, Helvetica, sans-serif
}

.color_text_warn {
    color: red !important;
    ;
    font-weight: bold;
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