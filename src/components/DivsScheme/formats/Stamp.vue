<template>
    <div class="stamp-container" @click="store.selectedObject = stamp"
        >
        
        <table >
            <col width="40px" />
            <col width="40px" />
            <col width="40px" />
            <col width="40px" />
            <col width="60px" />
            <col width="40px" />
            <col width="280px" />
            <col width="60px" />
            <col width="60px" />
            <col width="80px" />
            <tr class="1">
                <td class="right2 bottom1 left2 top2"></td>
                <td class="right2 bottom1 top2"></td>
                <td class="right2 bottom1 top2"></td>
                <td class="right2 bottom1 top2"></td>
                <td class="right2 bottom1 top2"></td>
                <td class="right2 bottom1 top2"></td>
                <td colspan="4" rowspan="2" class="right2 bottom2 top2 right_text">{{ stamp.shifr }}</td>
            </tr>
            <tr class="2">
                <td class="left2 right2 bottom1"></td>
                <td class="right2 bottom1"></td>
                <td class="right2 bottom1"></td>
                <td class="right2 bottom1"></td>
                <td class="right2 bottom1"></td>
                <td class="right2 bottom1"></td>
            </tr>
            <tr class="3">
                <td class="left2 right2 bottom1"></td>
                <td class="right2 bottom1"></td>
                <td class="right2 bottom1"></td>
                <td class="right2 bottom1"></td>
                <td class="right2 bottom1"></td>
                <td class="right2 bottom1"></td>
                <td colspan="4" rowspan="3" class="right2 bottom2 center_text">{{ stamp.projectName }}</td>
            </tr>
            <tr class="4">
                <td class="left2 right2 bottom2"></td>
                <td class="right2 bottom2"></td>
                <td class="right2 bottom2"></td>
                <td class="right2 bottom2"></td>
                <td class="right2 bottom2"></td>
                <td class="right2 bottom2"></td>
            </tr>
            <tr class="5">
                <td class="left2 right2 bottom2">Изм</td>
                <td class="right2 bottom2 center_text">Кол.уч.</td>
                <td class="right2 bottom2 center_text">Лист</td>
                <td class="right2 bottom2 center_text">№док</td>
                <td class="right2 bottom2 center_text">Подп.</td>
                <td class="right2 bottom2 center_text">Дата</td>
            </tr>
            <tr class="6">
                <td class="left2 right2 bottom1" colspan="2"><span v-if="stamp.authors.length > 0">{{
                    stamp.authors[0].position }}</span></td>
                <td class="right2 bottom1" colspan="2"><span v-if="stamp.authors.length > 0">{{ stamp.authors[0].fullName
                }}</span></td>
                <td class="right2 bottom1"></td>
                <td class="right2 bottom1"></td>
                <td class="right2 bottom2 center_text" rowspan="3">{{ stamp.buildingName }}</td>
                <td class="right2 bottom2 center_text">Стадия</td>
                <td class="right2 bottom2 center_text">Лист</td>
                <td class="right2 bottom2 center_text">Листов</td>
            </tr>
            <tr class="7">
                <td class="left2 right2 bottom1" colspan="2"><span v-if="stamp.authors.length > 1">{{
                    stamp.authors[1].position }}</span></td>
                <td class="right2 bottom1" colspan="2"><span v-if="stamp.authors.length > 1">{{ stamp.authors[1].fullName
                }}</span></td>
                <td class="right2 bottom1"></td>
                <td class="right2 bottom1"></td>

                <td rowspan="2" class="right2 bottom2 center_text">{{ stamp.stadiya }}</td>
                <td rowspan="2" class="right2 bottom2 center_text">{{ stamp.sheetNumber }}</td>
                <td rowspan="2" class="right2 bottom2 center_text">{{ stamp.totalSheets }}</td>

            </tr>
            <tr class="8">
                <td class="left2 right2 bottom1" colspan="2"><span v-if="stamp.authors.length > 2">{{
                    stamp.authors[2].position }}</span></td>
                <td class="right2 bottom1" colspan="2"><span v-if="stamp.authors.length > 2">{{ stamp.authors[2].fullName
                }}</span></td>
                <td class="right2 bottom1"></td>
                <td class="right2 bottom1"></td>
            </tr>
            <tr class="9">
                <td class="left2 right2 bottom1" colspan="2"><span v-if="stamp.authors.length > 3">{{
                    stamp.authors[3].position }}</span></td>
                <td class="right2 bottom1" colspan="2"><span v-if="stamp.authors.length > 3">{{ stamp.authors[3].fullName
                }}</span></td>
                <td class="right2 bottom1"></td>
                <td class="right2 bottom1"></td>

                <td rowspan="3" class="right2 bottom2 center_text">{{ stamp.sheetName }}</td>
                <td rowspan="3" colspan="3" class="right2 bottom2 center_text">{{ stamp.companyName }}</td>
            </tr>
            <tr class="10">
                <td class="left2 right2 bottom1" colspan="2"><span v-if="stamp.authors.length > 4">{{
                    stamp.authors[4].position }}</span></td>
                <td class="right2 bottom1" colspan="2"><span v-if="stamp.authors.length > 4">{{ stamp.authors[4].fullName
                }}</span></td>
                <td class="right2 bottom1"></td>
                <td class="right2 bottom1"></td>
            </tr>
            <tr class="11">
                <td class="left2 right2 bottom2" colspan="2"><span v-if="stamp.authors.length > 5">{{
                    stamp.authors[5].position }}</span></td>
                <td class="right2 bottom2" colspan="2">
                    <div v-if="stamp.authors.length > 5">{{ stamp.authors[5].fullName }}</div>
                </td>
                <td class="right2 bottom2"></td>
                <td class="right2 bottom2"></td>
            </tr>
        </table>
    </div>
</template>

<script setup lang="ts">

import { Panel } from '@/models/panel';
import { Stamp } from '@/models/settings/stamp';
import { useStore } from 'vuex';
import { ref, computed, watchEffect } from 'vue';


const stamp = ref(new Stamp())
const color = ref('var(--scheme-line-hover-color)')
const store = useStore().state

stamp.value.authors.push({ position: 'ГИП', fullName: 'Иванов', date: '03/02' })
stamp.value.shifr = '24-03.22-ЭОМ'
stamp.value.buildingName = "Дом культуры"
stamp.value.projectName = 'Капитальный ремонт дома культуры поселка "Жолымбет" Акмолинской области'
stamp.value.companyName = 'ТОО "Сан-Саулет"'

watchEffect(() => {
    stamp.value.sheetName = 'Схема принципиальная щита ' + store.selectedPanel?.nameOfPlane

    
    if (store.selectedObject == stamp.value) {
     
        color.value = 'var(--scheme-line-hover-color)'
        
    } else {

        color.value = 'var(--scheme-line-color)'
    }
})



</script>

<style scoped>
td{
    color: v-bind(color);
}

.right_text {
    text-align: right;
    padding-right: 5px;
}

.center_text {
    text-align: center;
}

.bottom1 {
    border-bottom: 1px solid v-bind(color);
}

.bottom2 {
    border-bottom: 2px solid v-bind(color);
}

.right1 {
    border-right: 1px solid v-bind(color);
}

.right2 {
    border-right: 2px solid v-bind(color);
}

.top1 {
    border-top: 1px solid v-bind(color);
}

.top2 {
    border-top: 2px solid v-bind(color);
}

.left1 {
    border-left: 1px solid v-bind(color);
}

.left2 {
    border-left: 2px solid v-bind(color);
}

tr {
    height: 20px;
}



table {

    border-spacing: 0px;
    margin: 0px;
}

.stamp-container {
    cursor: pointer;

    width: 740px;
    height: 220px;
    border: 0px solid var(--scheme-line-color);
}</style>