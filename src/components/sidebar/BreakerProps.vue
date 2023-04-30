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
    breaker: {
        type: Breaker,
        required: true
    }
})

const store = useStore().state

const appType = ref({type:'Автоматический выключатель' })
const appTypes: Array<object> = [{type:'Дифф. автомат' }, {type: 'Предохранитель'}, {type: 'Выключатель нагрузки'}]

function changeAppType(option: any){
   
    
    if(option.type == appType.value.type) return
    console.log(option);
    if(option.type == 'Предохранитель'){
        const fuse = new Fuse(Fuses[0].mark)
        const indx = props.breaker.nameOfPlane.match(/\d+/)?.[0] || ""
        fuse.nameOfPlane = 'FU' + indx
        replaceCommApparate(props.breaker, fuse)
        store.selectedObject = fuse
        console.log(fuse);
        
    }else if(option.type == 'Дифф. автомат'){
        const diffBreaker = new DiffBreaker(DiffBreakers[0].mark)
        const indx = props.breaker.nameOfPlane.match(/\d+/)?.[0] || ""
        diffBreaker.nameOfPlane = 'QFD' + indx
        replaceCommApparate(props.breaker, diffBreaker)
        store.selectedObject = diffBreaker
    }else if(option.type == 'Выключатель нагрузки'){
        const breakerPower = new BreakerPower(BreakersPower[0].mark)
        const indx = props.breaker.nameOfPlane.match(/\d+/)?.[0] || ""
        breakerPower.nameOfPlane = 'QW' + indx
        
        console.log(breakerPower);
        
        replaceCommApparate(props.breaker, breakerPower)
        store.selectedObject = breakerPower
    }
}


function setBreakerMark(option: any) {
    props.breaker.mark = option.mark
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