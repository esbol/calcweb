<template>
    <div class="stamp-container" @click="store.selectedObject = stamp">

        <table class="t1">
            <col width="100px" />
            <col width="140px" />
            <col width="100px" />
            <!-- <col width="80px" />
            <col width="80px" />
            <col width="60px" />
            <col width="40px" /> -->

            <tr class="1" style="height: 20px;">
                <td class="right2  left2 top2 center_text">Инв.№ подл.</td>
                <td class="right2  top2 center_text">Подп. и дата</td>
                <td class=" top2 center_text">Взам.инв.№</td>
            </tr>
            <tr class="2" style="height: 28px;">
                <td class="left2 top2 right2 "></td>
                <td class="right2 top2 "></td>
                <td class=" top2 "></td>

            </tr>

        </table>
        <table class="t2">

            <col width="80px" />
            <col width="80px" />
            <col width="60px" />
            <col width="40px" />

            <tr class="1" style="height: 20px;">
                <td colspan="4" class="right2  left2 bottom1">Согласовано:</td>

            </tr>
            <tr class="2" style="height: 20px;">
                <td class="left2 top1 right1 "></td>
                <td class="right1 top1 "></td>
                <td class="right1 top1 "></td>
                <td class="right2 top1 "></td>

            </tr>
            <tr class="2" style="height: 20px;">
                <td class="left2 top1 right1  "></td>
                <td class="right1 top1  "></td>
                <td class="right1 top1  "></td>
                <td class="right2 top1  "></td>

            </tr>
            <tr class="2" style="height: 20px;">
                <td class="left2 right1 top1 "></td>
                <td class="right1 top1 "></td>
                <td class="right1 top1 "></td>
                <td class="right2 top1 "></td>

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

stamp.value.authors.push({ position: 'ГИП', fullName: 'Иванов', date: '02/03' })
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
.t1{
    height: 48px;
}
td {
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




table {

    border-spacing: 0px;
    margin: 0px;
}

.stamp-container {
    cursor: pointer;
    display: flex;
    border: 0px solid var(--scheme-line-color);
    align-items: flex-end;
}
</style>