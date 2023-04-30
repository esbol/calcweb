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
import { replaceCommApparate, addCommApparateToFeeder } from '@/models/schemeActions/schemeactions';
import { useStore } from 'vuex';
import { DiffBreakers } from '@/models/bd/diffbreakers';
import { DiffBreaker } from '@/models/diffBreaker';
import { SectionLine } from '@/models/sectionline';

const props = defineProps({
    section: {
        type: SectionLine,
        required: true
    }
})

const store = useStore().state

const appType = ref({type:'Нет' })
const appTypes: Array<object> = [{type:'Автоматический выключатель' },{type:'Дифф. автомат' }, {type: 'Предохранитель'}, {type: 'Нет'}]

function changeAppType(option: any){
    console.log(option);
    
    if(option.type == appType.value.type) return
    if(props.section.startContact == null) return
    if(option.type == 'Предохранитель'){
        const fuse = new Fuse(Fuses[0].mark)
        const indx = props.section.startContact.getSlaveSections().indexOf(props.section)
        fuse.nameOfPlane = 'FU' + indx
        addCommApparateToFeeder(props.section.startContact, fuse, props.section)
        store.selectedObject = fuse
        console.log(fuse);
        
    }else if(option.type == 'Дифф. автомат'){
        const diffBreaker = new DiffBreaker(DiffBreakers[0].mark)
        const indx = props.section.startContact.getSlaveSections().indexOf(props.section)
        diffBreaker.nameOfPlane = 'QFD' + indx
        addCommApparateToFeeder(props.section.startContact, diffBreaker, props.section)
        store.selectedObject = diffBreaker
    } if(option.type == 'Автоматический выключатель'){
        const breaker = new Breaker(Breakers[0].mark)
        const indx = props.section.startContact?.getSlaveSections().indexOf(props.section)
        breaker.nameOfPlane = 'QF' + indx
        addCommApparateToFeeder(props.section.startContact, breaker, props.section)
        store.selectedObject = breaker
        
    }
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