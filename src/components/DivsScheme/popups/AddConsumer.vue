<template>
    <div class="wrapp">
        <div class="row" @click="addConsumer">
            Добавить нагрузку
        </div>
        <div class="row" @click="$emit('close')">
            Добавить пускатель
        </div>
        <div class="row" @click="$emit('close')">
            Комплектное пусковое устройство
        </div>
    </div>
</template>

<script setup lang="ts">
import { Consumer } from '@/models/consumer';
import { Contactor } from '@/models/contactor';
import { Feeder } from '@/models/feeder';
import { SectionLine } from '@/models/sectionline';
import { useStore } from 'vuex';



const emits = defineEmits(['close'])
const store = useStore().state
function addConsumer() {


    emits('close')
    const cont = store.showPopup.args as Contactor

    const consumer = new Consumer()
    const sConsumer = new SectionLine()
    sConsumer.setEndContact(consumer.inContact)
    sConsumer.setStartContact(cont.outContact)
    sConsumer.calc()
    store.selectedPanel?.calc()
}

</script>

<style scoped>
.wrapp {
    margin: 5px;
}

.row {
    width: 250px;
    height: 25px;
    display: flex;
    align-items: center;
    padding-left: 5px;
    cursor: pointer;
    border-bottom: 1px solid gainsboro;
}

.row:hover {
    background-color: var(--main-accent-color);
    color: white;
}
</style>