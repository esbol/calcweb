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
                    <TextInput :input-value="store.selectedPanel.nameOfPlane"
                        @focusout="store.selectedPanel.nameOfPlane = $event.target.value" :can-edite="true" />

                </div>
            </td>
        </tr>

        <tr>
            <td>
                <div class="name-prop">Руст.</div>
            </td>
            <td>
                <div class="prop-value">
                    {{ store.selectedPanel.uniteSection.modeMax.installPower.toFixed(2) }}
                </div>
            </td>
        </tr>
        <tr>
            <td>
                <div class="name-prop">Ррасч.</div>
            </td>
            <td>
                <div class="prop-value">
                    {{ store.selectedPanel.uniteSection.modeMax.ratedPower.toFixed(2) }}
                </div>
            </td>
        </tr>
        <tr>
            <td>
                <div class="name-prop">Iрасч.</div>
            </td>
            <td>
                <div class="prop-value">
                    {{ store.selectedPanel.uniteSection.modeMax.current.toFixed(2) }}
                </div>
            </td>
        </tr>
        <tr>
            <td>
                <div class="name-prop">cosf</div>
            </td>
            <td>
                <div class="prop-value">
                    {{ store.selectedPanel.uniteSection.modeMax.cosf.toFixed(2) }}
                </div>
            </td>
        </tr>
        <tr>
            <td>
                <div class="name-prop">Кол. фаз</div>
            </td>
            <td>
                <div class="prop-value-input"><Select :selected-value="store.selectedPanel.colPhase"
                        :display-path="'0'" :options="ColPhases" @change="setColPhase" /></div>
            </td>
        </tr>
        <tr class="subTitle">
            <td colspan="2">
                <div class="name-prop"><strong>Электроприемники</strong></div>
            </td>

        </tr>

    </table>
    <table>
        <col width="50%" />
        <col width="25%" />
        <col width="25%" />
        <tr>
            <td>
                <div class="prop-value">Назначение</div>
            </td>
            <td>
                <div class="prop-value">кол-во</div>
            </td>
            <td>
                <div class="prop-value">Кс</div>
            </td>
        </tr>
         <tr v-for="group in groups">
                <td>
                    <div class="name-prop">{{ group.name }}</div>
                </td>
                <td>
                    <div class="prop-value">{{ group.count }}</div>
                </td>
                <td>
                    <div class="prop-value-input"> <NumberInput :input-value="group.k" @focusout="setK(group.name, $event.target.value)" :can-edite="true" /></div>
                </td>
            </tr>
    </table>
</template>

<script setup lang="ts">
import { ColPhases, TypesBySP } from '@/models/normativs';
import { Cables } from '@/models/bd/cables';

import Select from './UI/Select.vue'
import { Consumer } from "@/models/consumer";
import TextInput from "./UI/TextInput.vue";
import NumberInput from "./UI/NumberInput.vue";
import { useStore } from 'vuex';
import { ref, computed } from 'vue';
import { Panel } from '@/models/panel';

const store = useStore().state

function setColPhase(n: number) {
    const panel = store.selectedPanel as Panel
    panel.colPhase = n
    if(panel.inApparate != null)
    panel.inApparate.colPhase = n
    panel.calc()
    panel.uniteSection.getSupplyPanels().forEach(p => p.calc())
    
}

function setK(name:string, val: string){
    const n = parseFloat(val)
    if(n <= 1){
        const panel = store.selectedPanel as Panel
        const calcMode = panel.uniteSection.calculationModes[0]

        const length = calcMode.groupsBySPList.length
        if (length > 0) {
            calcMode.groupsBySPList.forEach(gl => {
                if(gl.groupName == name){
                    gl.kSprosa = n
                    panel.calc()
                }
            })

        }
    }    
    
}

interface IGroup{
    name: string,
    count: number,
    k: number
}

const groups = computed(()=>{
    const g: Array<IGroup> = []
    if(store.selectedPanel instanceof Panel){
        const panel = store.selectedPanel as Panel
        const calcMode = panel.uniteSection.calculationModes[0]
        
        const length = calcMode.groupsBySPList.length
        if(length > 0){
            calcMode.groupsBySPList.forEach(gl=>{
                const name = gl.groupName
                const count = gl.consumersCount
                const k = gl.kSprosa
                g.push({name: name, count: count, k: k})
            })
            
        }
        
    }
    return g
})


</script>

<style scoped>
* {
    font-family: Arial, Helvetica, sans-serif
}
.subTitle {
    background: var(--sidebar-title-bg-color);
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