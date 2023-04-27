<template>
    <table>
        <col width="50%" />
        <col width="50%" />
        <tr>
            <td>
                <div class="name-prop">Тип устройства</div>
            </td>
            <td>
                <div class="prop-value-input"><Select :selected-value="appType" :options="appTypes" :display-path="'type'"
                    @change="changeAppType" /></div>
            </td>
        </tr>
        <tr>
            <td>
                <div class="name-prop">Обозначение</div>
            </td>
            <td>
                <div class="prop-value-input">
                    <TextInput :input-value="fuse.nameOfPlane" @focusout="fuse.nameOfPlane = $event.target.value"
                        :can-edite="true" />

                </div>
            </td>
        </tr>

        <tr>
            <td>
                <div class="name-prop">Марка</div>
            </td>
            <td>
                <div class="prop-value-input"><Select :selected-value="fuse" :options="Fuses" :display-path="'mark'"
                    @change="setFuseMark" /></div>
            </td>
        </tr>
        <tr>
            <td>
                <div class="name-prop">Кол. фаз</div>
            </td>
            <td>
                <div class="prop-value">{{ fuse.colPhase }}</div>
            </td>
        </tr>
        <tr>
            <td>
                <div class="name-prop">Iрасч.</div>
            </td>
            <td>
                <div class="prop-value">{{ fuse.innerSection.modeMax.current.toFixed(3) }}</div>
            </td>
        </tr>


        <tr>
            <td>
                <div class="name-prop">Номинальный ток</div>
            </td>
            <td>
                <div class="prop-value">{{ fuse.nominalCurrent }}</div>
            </td>
        </tr>
    </table>
</template>

<script setup lang="ts">

import TextInput from './UI/TextInput.vue';
import Select from './UI/Select.vue'

import { Breakers } from '@/models/bd/breakers';
import { Fuses } from '@/models/bd/fuses';
import { Breaker } from '@/models/breaker';
import { Fuse } from '@/models/fuse';
import { ref } from 'vue';
import { replaceCommApparate } from '@/models/schemeActions/schemeactions';
import { useStore } from 'vuex';
import { DiffBreaker } from '@/models/diffBreaker';
import { DiffBreakers } from '@/models/bd/diffbreakers';

const props = defineProps({
    fuse: {
        type: Fuse,
        required: true
    }
})

const store = useStore().state

const appType = ref({type:'Предохранитель' })
const appTypes: Array<object> = [{type:'Автоматический выключатель' }, {type:'Дифф. автомат' }, {type: 'Предохранитель'}]

function changeAppType(option: any){
    console.log(option);
    
    if(option.type == appType.value.type) return
    if(option.type == 'Автоматический выключатель'){
        const breaker = new Breaker(Breakers[0].mark)
        const indx = props.fuse.nameOfPlane.match(/\d+/)?.[0] || ""
        breaker.nameOfPlane = 'QF' + indx
        replaceCommApparate(props.fuse, breaker)
        store.selectedObject = breaker
        
    }else if(option.type == 'Дифф. автомат'){
        const diffBreaker = new DiffBreaker(DiffBreakers[0].mark)
        const indx = props.fuse.nameOfPlane.match(/\d+/)?.[0] || ""
        diffBreaker.nameOfPlane = 'QFD' + indx
        replaceCommApparate(props.fuse, diffBreaker)
        store.selectedObject = diffBreaker
    }
}


function setFuseMark(option: any) {
    props.fuse.mark = option.mark
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