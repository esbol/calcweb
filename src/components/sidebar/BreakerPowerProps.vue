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
                    <TextInput :input-value="breakerPower.nameOfPlane" @focusout="breakerPower.nameOfPlane = $event.target.value"
                        :can-edite="true" />

                </div>
            </td>
        </tr>

        <tr>
            <td>
                <div class="name-prop">Марка</div>
            </td>
            <td>
                <div class="prop-value-input"><Select :selected-value="breakerPower" :options="Breakers" :display-path="'mark'"
                    @change="setBreakerMark" /></div>
            </td>
        </tr>
        <tr>
            <td>
                <div class="name-prop">Кол. фаз</div>
            </td>
            <td>
                <div class="prop-value">{{ breakerPower.colPhase }}</div>
            </td>
        </tr>
        <tr>
            <td>
                <div class="name-prop">Iрасч.</div>
            </td>
            <td>
                <div class="prop-value">{{ breakerPower.innerSection.modeMax.current.toFixed(3) }}</div>
            </td>
        </tr>


        <tr>
            <td>
                <div class="name-prop">Номинальный ток</div>
            </td>
            <td>
                <div class="prop-value">{{ breakerPower.nominalCurrent }}</div>
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
import { DiffBreakers } from '@/models/bd/diffbreakers';
import { DiffBreaker } from '@/models/diffBreaker';
import { BreakerPower } from '@/models/breakerPower';
import { BreakersPower } from '@/models/bd/breakersPower';

const props = defineProps({
    breakerPower: {
        type: BreakerPower,
        required: true
    }
})

const store = useStore().state

const appType = ref( {type: 'Выключатель нагрузки'})
const appTypes: Array<object> = [{type:'Дифф. автомат' }, {type: 'Предохранитель'}, {type:'Автоматический выключатель' }]

function changeAppType(option: any){
    
    
    if(option.type == appType.value.type) return
    console.log(option);
    if(option.type == 'Предохранитель'){
        const fuse = new Fuse(Fuses[0].mark)
        const indx = props.breakerPower.nameOfPlane.match(/\d+/)?.[0] || ""
        fuse.nameOfPlane = 'FU' + indx
        replaceCommApparate(props.breakerPower, fuse)
        store.selectedObject = fuse
        console.log(fuse);
        
    }else if(option.type == 'Дифф. автомат'){
        const diffBreaker = new DiffBreaker(DiffBreakers[0].mark)
        const indx = props.breakerPower.nameOfPlane.match(/\d+/)?.[0] || ""
        diffBreaker.nameOfPlane = 'QFD' + indx
        replaceCommApparate(props.breakerPower, diffBreaker)
        store.selectedObject = diffBreaker
    }else if(option.type == 'Автоматический выключатель'){
        const breaker = new Breaker(Breakers[0].mark)
        const indx = props.breakerPower.nameOfPlane.match(/\d+/)?.[0] || ""
        breaker.nameOfPlane = 'QW' + indx
        

        
        replaceCommApparate(props.breakerPower, breaker)
        store.selectedObject = breaker
    }
}


function setBreakerMark(option: any) {
    props.breakerPower.mark = option.mark
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
    user-select: none;
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