
<template>
    <div class="table-container">
        <div class="table-header">
            <table>
                <col width="150px">
                <col width="40px">
                <col width="80px">
                <col width="40px">
                <col width="80px">
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
                        <th rowspan="2">Распределительное<br />устройство</th>
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
                <col width="150px">
                <col width="40px">
                <col width="80px">
                <col width="40px">
                <col width="80px">
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
                        <td></td>
                        <td>1</td>
                        <td><select class="my-select" v-model="feeder.consumer.colPhase">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                            </select></td>
                        <td>1</td>
                        <td>1</td>
                        <td>1</td>
                        <td>1</td>
                        <td>1</td>
                        <td>1</td>
                        <td>1</td>
                        <td>1</td>
                        <td>1</td>
                        <td>1</td>

                        <td>
                            <NumberInput :input-value="feeder.consumer.installPower" :can-edite="true"
                                @focusout="feeder.consumer.installPower = parseFloat($event.target.value)" />
                        </td>
                        <td>1</td>
                        <td><select class="my-select" v-model="feeder.consumer.colPhase">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                            </select>
                        </td>
                        <td>{{ feeder.consumer.current.toFixed(2).toString() }}</td>
                        <td>
                            <TextInput :input-value="feeder.consumer.description"
                                @focusout="feeder.consumer.description = $event.target.value" :can-edite="true" />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="buttons-row">

            <MyButton @click="addFeeder">add Feeder</MyButton>
            <MyButton @click="panel.calc()">Calc</MyButton>

        </div>
    </div>
</template>

<script setup lang="ts">

import MyButton from '@/components/tablescheme/UI/MyButton.vue'
import { Feeder } from '@/models/feeder'
import { Panel } from "@/models/panel"
import { inject, ref, provide } from 'vue';
import { TypesBySP } from '@/models/normativs';
import TextInput from './UI/TextInput.vue';
import NumberInput from './UI/NumberInput.vue';

//#region setupdata
const props = defineProps({
    panel: {
        type: Panel,
        required: true
    }
})


function addFeeder(): void {
    const feeder = new Feeder()
    props.panel.feeders.push(feeder)
}

const hoverFeederId = ref(0)
const selectedFeeder = inject('selectedFeeder', new Feeder())
provide('typesBySP', TypesBySP)
//#endregion




</script>

<style >
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

    height: 100px;
}

td {

    height: 50px;
    vertical-align: bottom;
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



.table-container {
    display: grid;
    width: 1200px;
    grid-template-rows: auto 1fr auto;
    /* background: white; */
    box-shadow: 0 0 15px rgb(226, 226, 226);
    margin: 5px;
    padding: 0;
}

.table-header {
    width: min-content;
}

.table-body {
    width: 1200px;
    height: 400px;
    overflow-y: auto;
    overflow-x: hidden;
 background: white;
}

.buttons-row {
    height: 50px;

  margin-top: 5px;
}

* {
    --row-text-color: rgb(76, 76, 76);
    --row-bg-color: transparent;
    --row-bg-selected-color: rgb(177, 227, 246);
    --row-bg-hover-color: rgb(227, 242, 249);
    --row-border-vertical-color: rgb(179, 179, 179);
    --row-border-color: 1px solid rgb(219, 219, 219);
}

table>tbody>tr:hover {
    background: var(--row-bg-hover-color);
}

.selected {
    background: var(--row-bg-selected-color);
}
</style>