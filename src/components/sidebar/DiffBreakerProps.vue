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
                    <TextInput :input-value="diffBreaker.nameOfPlane"
                        @focusout="diffBreaker.nameOfPlane = $event.target.value" :can-edite="true" />

                </div>
            </td>
        </tr>

        <tr>
            <td>
                <div class="name-prop">Производитель</div>
            </td>
            <td>
                <div class="prop-value-input">
                    <SelectSimple :options="optionsFactories" :selected-value="diffBreaker.specData.factory"
                        @change="setBreakerFactory" />
                </div>
            </td>
        </tr>

        <tr>
            <td>
                <div class="name-prop">Марка</div>
            </td>
            <td>
                <div class="prop-value-input">
                    <SelectSimple :options="optionsMarks" :selected-value="diffBreaker.mark" @change="setBreakerMark" />
                </div>
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
    <NewDiffBreakerWindow v-if="newBreakerWindowShow" @clcClose="newBreakerWindowShow = !newBreakerWindowShow"
        :factory="factory" />
</template>

<script setup lang="ts">

import TextInput from './UI/TextInput.vue';
import Select from './UI/Select.vue'
import SelectSimple from './UI/SelectSimple.vue';
import NewDiffBreakerWindow from '../Windows/NewDiffBreakerWindow.vue';



import { onMounted, ref, watchEffect } from 'vue';
import { changeAppType, replaceCommApparate } from '@/models/schemeActions/schemeactions';
import { useStore } from 'vuex';
import { DiffBreaker } from '@/models/diffBreaker';


import { DiffBreakers } from '@/models/bd/diffbreakers';

import { IState } from '@/store';

const props = defineProps({
    diffBreaker: {
        type: DiffBreaker,
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
    reloadOptions()
});
watchEffect(() => {
    props.diffBreaker
    reloadOptions()
})
function reloadOptions() {
    optionsFactories.splice(0, optionsFactories.length)
    //добавляем в список производителей
    DiffBreakers.forEach(b => {
        if (!optionsFactories.includes(b.factory)) optionsFactories.push(b.factory)
    })
    optionsFactories.push('+ Добавить...')

    optionsMarks.splice(0, optionsMarks.length)
    //добавляем марки согласно производителя и фазности
    DiffBreakers.filter(b => b.factory == props.diffBreaker.specData.factory && b.colPhase
        == props.diffBreaker.colPhase).forEach(b => optionsMarks.push(b.mark))
    optionsMarks.push('+ Добавить...')
}



function setBreakerMark(option: any) {
    if (option == '+ Добавить...') {
        factory.value = props.diffBreaker.specData.factory
        newBreakerWindowShow.value = true
    } else {
        props.diffBreaker.mark = option
        store.panels.forEach(p => p.calc())
    }

}
function setBreakerFactory(option: string) {
    if (option == '+ Добавить...') {
        //если выбран пункт "добавить"
        factory.value = ''
        newBreakerWindowShow.value = true
    } else {
        //сортируем автоматы по производителю и фазности
        const filBreakers = DiffBreakers.filter(b => b.factory == option && b.colPhase == props.diffBreaker.colPhase)

        //очищаем опции выбора марок и заполняем новыми марками выбранного производителя
        optionsMarks.splice(0, optionsMarks.length)
        filBreakers.forEach(b => optionsMarks.push(b.mark))
        optionsMarks.push('+ Добавить...')

        //назначаем текущему автомату поле "производитель"
        props.diffBreaker.specData.factory = option

        //назначаем текущему автомату марку
        props.diffBreaker.mark = filBreakers[0].mark

        //запускаем расчет
        store.panels.forEach(p => p.calc())
    }
}
//#endregion



const appType = ref({ type: 'Дифф. автомат' })
const appTypes: Array<object> = [{ type: 'Автоматический выключатель' }, { type: 'Предохранитель' }, { type: 'Выключатель нагрузки' }]

function changeType(option: any) {
    if (option.type == appType.value.type) return
    store.selectedObject = changeAppType(props.diffBreaker, option)
    st.commit('calcPanels');
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

}</style>