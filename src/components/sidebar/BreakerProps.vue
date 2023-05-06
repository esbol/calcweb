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
                        @change="changeType" /></div>
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
                <div class="name-prop">Производитель</div>
            </td>
            <td>
                <div class="prop-value-input"><SelectSimple :options="optionsFactories" :selected-value="breaker.specData.factory"
                    @change="setBreakerFactory" /></div>
            </td>
        </tr>
        
        <tr>
            <td>
                <div class="name-prop">Марка</div>
            </td>
            <td>
                <div class="prop-value-input"><SelectSimple :options="optionsMarks" :selected-value="breaker.mark"
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
    <NewBreakerWindow v-if="newBreakerWindowShow" @clcClose="newBreakerWindowShow = !newBreakerWindowShow" :factory="factory"/>
</template>

<script setup lang="ts">

import NewBreakerWindow from '../Windows/NewBreakerWindow.vue';
import SelectSimple from './UI/SelectSimple.vue';
import TextInput from './UI/TextInput.vue';
import Select from './UI/Select.vue'

import { Breakers } from '@/models/bd/breakers';
import { Fuses } from '@/models/bd/fuses';
import { Breaker } from '@/models/breaker';
import { Fuse } from '@/models/fuse';
import { onMounted, ref } from 'vue';
import { changeAppType, replaceCommApparate } from '@/models/schemeActions/schemeactions';
import { useStore } from 'vuex';
import { DiffBreakers } from '@/models/bd/diffbreakers';
import { DiffBreaker } from '@/models/diffBreaker';
import { BreakerPower } from '@/models/breakerPower';
import { BreakersPower } from '@/models/bd/breakersPower';
import { IState } from '@/store';

const props = defineProps({
    breaker: {
        type: Breaker,
        required: true
    }
})
const store: IState = useStore().state
const st = useStore()

//#region Marks Factories
const optionsMarks = new Array<string>()
const newBreakerWindowShow = ref(false)
const optionsFactories = new Array<string>()
const factory = ref('')

onMounted(() => {
    //добавляем в список производителей
    Breakers.forEach(b=>{
       if(!optionsFactories.includes(b.factory)) optionsFactories.push(b.factory)
    })
    optionsFactories.push('+ Добавить...')

    //добавляем марки согласно производителя и фазности
    Breakers.filter(b=> b.factory == props.breaker.specData.factory && b.colPhase
    == props.breaker.colPhase).forEach(b=> optionsMarks.push(b.mark))
    optionsMarks.push('+ Добавить...')
});


function setBreakerMark(option: any) {
    if(option == '+ Добавить...'){
        factory.value = props.breaker.specData.factory
        newBreakerWindowShow.value = true
    }else{
        props.breaker.mark = option
        store.panels.forEach(p=>p.calc())
    }
    
}
function setBreakerFactory(option: string) {
    if(option == '+ Добавить...'){
        //если выбран пункт "добавить"
        factory.value = ''
        newBreakerWindowShow.value = true
    }else{
        //сортируем автоматы по производителю и фазности
        const filBreakers = Breakers.filter(b=> b.factory == option && b.colPhase == props.breaker.colPhase)
        
        //очищаем опции выбора марок и заполняем новыми марками выбранного производителя
        optionsMarks.splice(0, optionsMarks.length)
        filBreakers.forEach(b=> optionsMarks.push(b.mark))
        optionsMarks.push('+ Добавить...')

        //назначаем текущему автомату поле "производитель"
        props.breaker.specData.factory = option

        //назначаем текущему автомату марку
        props.breaker.mark = filBreakers[0].mark

        //запускаем расчет
        store.panels.forEach(p=>p.calc())
    }
}
//#endregion

//#region Type Apparate
const appType = ref({ type: 'Автоматический выключатель' })
const appTypes: Array<object> = [{ type: 'Дифф. автомат' }, { type: 'Предохранитель' }, { type: 'Выключатель нагрузки' }]

function changeType(option: any) {
    if (option.type == appType.value.type) return
    store.selectedObject = changeAppType(props.breaker, option)
   
    st.commit('calcPanels');
}
//#endregion





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