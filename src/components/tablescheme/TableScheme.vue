
<template>
    <div class="tablewrapper">
        <div class="table-container">
            <PanelPowers :panel="panel" class="panelPowers" />
            <div class="table-header">
                <table>
                    <col width="40px">
                    <col width="80px">
                    <col width="40px">
                    <col width="100px">
                    <col width="80px">
                    <col width="40px">
                    <col width="40px">
                    <col width="80px">
                    <col width="40px">
                    <col width="80px">
                    <col width="80px">
                    <col width="40px">
                    <col width="50px">
                    <col width="40px">
                    <col width="40px">
                    <col width="50px">
                    <col width="150px">
                    <thead>
                        <tr class="trh1">
                            <th colspan="3">Аппарат отходящей линии</th>
                            <th colspan="3">Участок сети 1<br />Кабель, провод</th>
                            <th colspan="3">Пусковой аппарат</th>
                            <th colspan="3">Участок сети 2<br />Кабель, провод</th>
                            <th colspan="5">Электроприемник</th>
                        </tr>
                        <tr class="trh2">
                            <th>№</th>
                            <th>Тип</th>
                            <th>Iном, А</th>
                            <th>Марка</th>
                            <th>Количество<br />жил и<br />сечение</th>
                            <th>Длина, м</th>
                            <th>Обозн. на плане</th>
                            <th>Тип</th>
                            <th>Iном, А</th>
                            <th>Марка</th>
                            <th>Количество<br />жил и<br />сечение</th>
                            <th>Длина, м</th>
                            <th>Руст, кВт</th>
                            <th>Кол. фаз</th>
                            <th>cos f</th>
                            <th>Iр, А</th>
                            <th>Наименование</th>
                        </tr>
                    </thead>
                </table>
            </div>

            <div class="table-body">
                <table>

                    <col width="40px">
                    <col width="80px">
                    <col width="40px">
                    <col width="100px">
                    <col width="80px">
                    <col width="40px">
                    <col width="40px">
                    <col width="80px">
                    <col width="40px">
                    <col width="80px">
                    <col width="80px">
                    <col width="40px">
                    <col width="50px">
                    <col width="40px">
                    <col width="40px">
                    <col width="50px">
                    <col width="150px">
                    <tbody>
                        <tr class="b_bottom" v-for="feeder in panel.feeders" :key="feeder.id"
                            :class="{ selected: selectedFeeder === feeder }" @click="selectedFeeder = feeder">

                            <td>{{ feeder.breaker?.nameOfPlane }}</td>
                            <td><select v-if="feeder.breaker !== null" class="my-select" v-model="feeder.breaker.mark">
                                    <option v-for="breaker in Breakers">{{ breaker.mark }}</option>
                                </select></td>
                            <td>
                                <div v-if="feeder.breaker !== null">{{ feeder.breaker.nominalCurrent }}</div>
                            </td>

                            <CablePipeCells :section="feeder.sContactor == null ? feeder.sConsumer : feeder.sContactor" />


                            <td>1</td>
                            <td>1</td>
                            <td>1</td>
                            <CablePipeCells v-if="feeder.sContactor != null" :section="feeder.sConsumer" />
                            <td v-else></td>
                            <td></td>
                            <td></td>


                            <td>
                                <NumberInput :input-value="feeder.consumer.installPower" :can-edite="true"
                                    @focusout="feeder.consumer.installPower = parseFloat($event.target.value)" />
                            </td>
                            <td><select class="my-select" v-model="feeder.consumer.colPhase">
                                    <option v-for="colPhase in ColPhases">{{ colPhase }}</option>

                                </select></td>
                            <td>
                                <NumberInput :input-value="feeder.consumer.cosf" :can-edite="true"
                                    @focusout="feeder.consumer.cosf = parseFloat($event.target.value)" />
                            </td>
                            <td>{{ feeder.consumer.current.toFixed(2).toString() }}</td>
                            <td>
                                <DecriptionCell :consumer="feeder.consumer" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
       <ButtonsRow :panel="panel" />
    </div>
</template>

<script setup lang="ts">
import ButtonsRow from './ButtonsRow.vue';
import MyButton from '@/components/tablescheme/UI/MyButton.vue'
import { Feeder } from '@/models/feeder'
import { Panel } from "@/models/panel"
import { inject, ref, provide } from 'vue';
import { TypesBySP, ColPhases } from '@/models/normativs';
import TextInput from './UI/TextInput.vue';
import NumberInput from './UI/NumberInput.vue';
import PanelPowers from './PanelPowers.vue';
import { Breakers } from '@/models/bd/breakers'
import DecriptionCell from './cells/DecriptionCell.vue';
import { Cables, ICable } from '@/models/bd/cables'
import CablePipeCells from './cells/CablePipeCells.vue';

//#region setupdata
const props = defineProps({
    panel: {
        type: Panel,
        required: true
    }
})


const selectedFeeder: Feeder | undefined = inject('selectedFeeder')
provide('typesBySP', TypesBySP)
//#endregion




</script>

<style scoped>
.my-select {
    table-layout: fixed;
    width: 100%;
    border: none;
    background: transparent;
    outline: none;
    color: var(--row-text-color);

}

.my-select:active {
    outline: none;
}

.b_bottom {
    border-bottom: 2px solid gray;
}

.trh1 {
    height: 50px;

}

.trh2 {

    height: 80px;
}

td {

    height: 50px;
    vertical-align: bottom !important;
    ;
    padding-bottom: 5px;
}

table {
    width: 1200px;
    border-collapse: collapse;
    font-size: .8rem;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    table-layout: fixed;

}

tr,
td,
th {
    border: 1px solid rgb(219, 219, 219);
    font-weight: normal;

}

td,
th {

    color: var(--row-text-color);
}

.tablewrapper {
    display: grid;
    height: 100%;
    grid-template-rows: 1fr auto;
    background-color: #f6f7f9;
    overflow: hidden;
    padding-right: 15px;
    width: 100%;
}

.table-container {
    display: grid;
    grid-row: 1;
    width: 100%;
    max-width: 1300px;
    grid-template-rows: auto 1fr auto;
    grid-template-columns: auto 1fr;
    background-color: white;
    box-shadow: 0 0 15px rgb(226, 226, 226);
    margin: 5px;
   overflow-x: scroll;
    box-sizing: border-box;
    
    position: relative;
    height: 100%;
}

.panelPowers {
    height: 100%;
    grid-column: 1;
    grid-row-start: 1;
    grid-row-end: 4;

}

.table-header {
    width: min-content;
    grid-column: 2;
    grid-row: 1;
    background: #fafafa;
}


.table-body {
    display: block;
    width: 1200px;
    overflow-y: auto;
    overflow-x: hidden;
    background: transparent;
}



* {
    --row-text-color: rgb(76, 76, 76);
    --row-bg-color: transparent;
    --row-bg-selected-color: #eeeeee;
    --row-bg-hover-color: #f5f5f5;
    --row-border-vertical-color: rgb(179, 179, 179);
    --row-border-color: 1px solid rgb(219, 219, 219);
}

table>tbody>tr:hover {
    background: var(--row-bg-hover-color);

}

.selected {
    background: var(--row-bg-selected-color) !important;

    font-size: 20px;
}

option {}
</style>