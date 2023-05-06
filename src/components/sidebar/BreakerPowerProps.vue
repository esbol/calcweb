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
                    <TextInput :input-value="breakerPower.nameOfPlane"
                        @focusout="breakerPower.nameOfPlane = $event.target.value" :can-edite="true" />

                </div>
            </td>
        </tr>

        <tr>
            <td>
                <div class="name-prop">Производитель</div>
            </td>
            <td>
                <div class="prop-value-input">
                    <SelectSimple :options="optionsFactories" :selected-value="breakerPower.specData.factory"
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
                    <SelectSimple :options="optionsMarks" :selected-value="breakerPower.mark" @change="setBreakerMark" />
                </div>
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
    <NewBreakerPowerWindow v-if="newBreakerWindowShow" @clcClose="newBreakerWindowShow = !newBreakerWindowShow"
        :factory="factory" />
</template>

<script setup lang="ts">

import NewBreakerPowerWindow from '../Windows/NewBreakerPowerWindow.vue';
import TextInput from './UI/TextInput.vue';
import Select from './UI/Select.vue'
import SelectSimple from './UI/SelectSimple.vue';

import { onMounted, ref, watchEffect } from 'vue';
import { changeAppType, replaceCommApparate } from '@/models/schemeActions/schemeactions';
import { useStore } from 'vuex';

import { BreakerPower } from '@/models/breakerPower';
import { BreakersPower } from '@/models/bd/breakersPower';

import { IState } from '@/store';

const props = defineProps({
    breakerPower: {
        type: BreakerPower,
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
    props.breakerPower
    reloadOptions()
})
function reloadOptions() {
    optionsFactories.splice(0, optionsFactories.length)
    //добавляем в список производителей
    BreakersPower.forEach(b => {
        if (!optionsFactories.includes(b.factory)) optionsFactories.push(b.factory)
    })
    optionsFactories.push('+ Добавить...')

    optionsMarks.splice(0, optionsMarks.length)
    //добавляем марки согласно производителя и фазности
    BreakersPower.filter(b => b.factory == props.breakerPower.specData.factory && b.colPhase
        == props.breakerPower.colPhase).forEach(b => optionsMarks.push(b.mark))
    optionsMarks.push('+ Добавить...')
}
function setBreakerMark(option: any) {
    if (option == '+ Добавить...') {
        factory.value = props.breakerPower.specData.factory
        newBreakerWindowShow.value = true
    } else {
        props.breakerPower.mark = option
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
        const filBreakers = BreakersPower.filter(b => b.factory == option && b.colPhase == props.breakerPower.colPhase)

        //очищаем опции выбора марок и заполняем новыми марками выбранного производителя
        optionsMarks.splice(0, optionsMarks.length)
        filBreakers.forEach(b => optionsMarks.push(b.mark))
        optionsMarks.push('+ Добавить...')

        //назначаем текущему автомату поле "производитель"
        props.breakerPower.specData.factory = option

        //назначаем текущему автомату марку
        props.breakerPower.mark = filBreakers[0].mark

        //запускаем расчет
        store.panels.forEach(p => p.calc())
    }
}
//#endregion



//#region Type
const appType = ref({ type: 'Выключатель нагрузки' })
const appTypes: Array<object> = [{ type: 'Дифф. автомат' }, { type: 'Предохранитель' }, { type: 'Автоматический выключатель' }]

function changeType(option: any) {
    if (option.type == appType.value.type) return
    store.selectedObject = changeAppType(props.breakerPower, option)
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

}</style>