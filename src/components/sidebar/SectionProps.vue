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
                    <TextInput :input-value="section.nameOfPlane" @focusout="section.nameOfPlane = $event.target.value"
                        :can-edite="true" />
                </div>
            </td>
        </tr>

        <tr>
            <td>
                <div class="name-prop">Длина</div>
            </td>
            <td>
                <div class="prop-value-input">
                    <NumberInput :input-value="section.cable.length" @focusout="setCableLenght($event.target.value)"
                        :can-edite="true" />
                </div>
            </td>
        </tr>
        <tr>
            <td>
                <div class="name-prop">Потеря напряжения</div>
            </td>
            <td>
                <div class="prop-value">{{ section.cable.deltaU.toFixed(3) }}</div>
            </td>
        </tr>
        <!-- <tr>
            <td>
                <div class="name-prop">Кол. фаз</div>
            </td>
            <td>
                <div class="prop-value-input"><Select :selected-value="section.colPhase" :display-path="'0'" :options="ColPhases" @change="setColPhase" /></div>
            </td>
        </tr> -->
        <tr>
            <td>
                <div class="name-prop">Iрасч.</div>
            </td>
            <td>
                <div class="prop-value">{{ section.modeMax.current.toFixed(3) }}</div>
            </td>
        </tr>

        <tr class="subTitle">
            <td>
                <div class="name-prop"><strong>Кабель</strong></div>
            </td>
            <td>
                
            </td>
        </tr>
        <tr>
            <td>
                <div class="name-prop">Марка</div>
            </td>
            <td>
                <Select :selected-value="section.cable" :display-path="'mark'" :options="Cables" @change="setCableMark" />
            </td>
        </tr>
        <tr>
            <td>
                <div class="name-prop">Кол. жил</div>
            </td>
            <td>
                <div class="prop-value">{{ section.cable.colCores }}</div>
            </td>
        </tr>
        <tr>
            <td>
                <div class="name-prop">Сечение</div>
            </td>
            <td>
                <SelectSimple :options="section.cable.possibleSquares" :selected-value="section.cable.square.toString()" @change="setCableSquare" />
            </td>
        </tr>

        <tr>
            <td>
                <div class="name-prop">Допустимый ток</div>
            </td>
            <td>
                <div class="prop-value">{{ section.cable.maxCurrent }}</div>
            </td>
        </tr>


        <tr class="subTitle">
            <td >
                <div class="name-prop "><strong>Труба</strong></div>
            </td><td></td>
        </tr>
        <tr>
            <td>
                <div class="name-prop">Марка</div>
            </td>
            <td>
                <Select :selected-value="section.pipe" :display-path="'mark'" :options="Pipes" @change="setPipeMark" />
            </td>
        </tr>
        <tr>
            <td>
                <div class="name-prop">Диаметр</div>
            </td>
            <td>
                <div class="prop-value">{{ section.pipe.diametr }}</div>
            </td>
        </tr>
        <tr>
            <td>
                <div class="name-prop">Длина</div>
            </td>
            <td>
                <div class="prop-value-input">
                    <NumberInput :input-value="section.pipe.length" @focusout="setPipeLenght($event.target.value)"
                        :can-edite="true" />
                </div>
            </td>
        </tr>

    </table>
</template>

<script setup lang="ts">
import SelectSimple from './UI/SelectSimple.vue';
import TextInput from './UI/TextInput.vue';
import Select from './UI/Select.vue'
import { Cables } from "@/models/bd/cables";
import { SectionLine } from "@/models/sectionline";
import NumberInput from './UI/NumberInput.vue';
import { ColPhases } from '@/models/normativs';
import { Pipes } from '@/models/bd/pipes';

const props = defineProps({
    section: {
        type: SectionLine,
        required: true
    }
})
function setCableSquare(option: any) {
    props.section.cable.square = parseFloat(option)
    props.section.getSupplyPanels().forEach(p => p.calc())
    console.log(props.section.cable.square);
    
}
function setCableLenght(option: any) {
    props.section.cable.length = parseFloat(option)
    props.section.getSupplyPanels().forEach(p => p.calc())
}
function setPipeLenght(option: any) {
    props.section.pipe.length = parseFloat(option)
    props.section.getSupplyPanels().forEach(p => p.calc())
}
function setCableMark(option: any) {
    props.section.cable.mark = option.mark
    props.section.getSupplyPanels().forEach(p => p.calc())
}
function setPipeMark(option: any) {
    props.section.pipe.mark = option.mark
    props.section.getSupplyPanels().forEach(p => p.calc())
}
// function setColPhase(option: any) {
//     props.section.colPhase= option
//     props.section.getSupplyPanels().forEach(p=>p.calc())
// }



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

.subTitle {
    background: var(--sidebar-title-bg-color);
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

}</style>