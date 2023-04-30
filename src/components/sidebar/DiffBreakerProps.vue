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
                    <TextInput :input-value="diffBreaker.nameOfPlane" @focusout="diffBreaker.nameOfPlane = $event.target.value"
                        :can-edite="true" />

                </div>
            </td>
        </tr>

        <tr>
            <td>
                <div class="name-prop">Марка</div>
            </td>
            <td>
                <div class="prop-value-input"><Select :selected-value="diffBreaker" :options="DiffBreakers" :display-path="'mark'"
                    @change="setDiffBreakerMark" /></div>
            </td>
        </tr>
        <tr>
            <td>
                <div class="name-prop">Кол. фаз</div>
            </td>
            <td>
                <div class="prop-value">{{ diffBreaker.colPhase }}</div>
            </td>
        </tr>
        <tr>
            <td>
                <div class="name-prop">Iрасч.</div>
            </td>
            <td>
                <div class="prop-value">{{ diffBreaker.innerSection.modeMax.current.toFixed(3) }}</div>
            </td>
        </tr>


        <tr>
            <td>
                <div class="name-prop">Номинальный ток</div>
            </td>
            <td>
                <div class="prop-value">{{ diffBreaker.nominalCurrent }}</div>
            </td>
        </tr>
    </table>
</template>

<script setup lang="ts">

import TextInput from './UI/TextInput.vue';
import Select from './UI/Select.vue'



import { Breaker } from '@/models/breaker';

import { ref } from 'vue';
import { replaceCommApparate } from '@/models/schemeActions/schemeactions';
import { useStore } from 'vuex';
import { DiffBreaker } from '@/models/diffBreaker';
import { Breakers } from '@/models/bd/breakers';
import { Fuse } from '@/models/fuse';
import { Fuses } from '@/models/bd/fuses';
import { DiffBreakers } from '@/models/bd/diffbreakers';
import { BreakerPower } from '@/models/breakerPower';
import { BreakersPower } from '@/models/bd/breakersPower';

const props = defineProps({
    diffBreaker: {
        type: DiffBreaker,
        required: true
    }
})

const store = useStore().state

const appType = ref({type:'Дифф. автомат' })
const appTypes: Array<object> = [{type:'Автоматический выключатель' }, {type: 'Предохранитель'}, {type: 'Выключатель нагрузки'}]

function changeAppType(option: any){
   
    if(option.type == appType.value.type) return
    console.log(option);
    
    if(option.type == 'Автоматический выключатель'){
        const breaker = new Breaker(Breakers[0].mark)
        const indx = props.diffBreaker.nameOfPlane.match(/\d+/)?.[0] || ""
        breaker.nameOfPlane = 'QF' + indx
        replaceCommApparate(props.diffBreaker, breaker)
        store.selectedObject = breaker

    }else if(option.type == 'Предохранитель'){
        const fuse = new Fuse(Fuses[0].mark)
        const indx = props.diffBreaker.nameOfPlane.match(/\d+/)?.[0] || ""
        fuse.nameOfPlane = 'FU' + indx
        replaceCommApparate(props.diffBreaker, fuse)
        store.selectedObject = fuse
    }else if(option.type == 'Выключатель нагрузки'){
        const breakerPower = new BreakerPower(BreakersPower[0].mark)
        const indx = props.diffBreaker.nameOfPlane.match(/\d+/)?.[0] || ""
        breakerPower.nameOfPlane = 'QW' + indx
        
        console.log(breakerPower);
        
        replaceCommApparate(props.diffBreaker, breakerPower)
        store.selectedObject = breakerPower
    }
}


function setDiffBreakerMark(option: any) {
    props.diffBreaker.mark = option.mark
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