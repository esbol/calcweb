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
                    <NumberInput :input-value="section.cable.length"
                        @focusout="section.cable.length = parseFloat($event.target.value)" :can-edite="true" />
                </div>
            </td>
        </tr>
        <tr>
            <td>
                <div class="name-prop">Кол. фаз</div>
            </td>
            <td>
                <div class="prop-value-input"><Select :selected-value="section.colPhase" :display-path="'0'" :options="ColPhases" @change="setColPhase" /></div>
            </td>
        </tr>
        <tr>
            <td>
                <div class="name-prop">Iрасч.</div>
            </td>
            <td>
                <div class="prop-value">{{ section.modeMax.current.toFixed(3) }}</div>
            </td>
        </tr>
        <tr>
            <td>
                <div class="name-prop">Кол. фаз</div>
            </td>
            <td>
                <div class="prop-value">{{ section.colPhase }}</div>
            </td>
        </tr>
        <tr>
            <td>
                <div class="name-prop"><strong>Кабель</strong></div>
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
                <div class="prop-value">{{ section.cable.square }}</div>
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
    </table>
</template>

<script setup lang="ts">
import TextInput from './UI/TextInput.vue';
import Select from './UI/Select.vue'
import { Cables } from "@/models/bd/cables";
import { SectionLine } from "@/models/sectionline";
import NumberInput from './UI/NumberInput.vue';
import { ColPhases } from '@/models/normativs';


function setCableMark(option: any) {
    props.section.cable.mark = option.mark
}
function setColPhase(option: any) {
    props.section.colPhase= option
}

const props = defineProps({
    section: {
        type: SectionLine,
        required: true
    }
})

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

}</style>