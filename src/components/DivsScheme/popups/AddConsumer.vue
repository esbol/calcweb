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
import { Contactor } from '@/models/contactor';
import { Feeder } from '@/models/feeder';
import { SectionLine } from '@/models/sectionline';
import { store } from '@/store/store';


const props = defineProps({
    arg: {}
})

const emits = defineEmits(['close'])

function addConsumer() {


    emits('close')
    const cont = props.arg as Contactor

    const feeder = store.selectedPanel?.feeders.find(f =>
        f.contactor === cont)

    if (feeder){
        const pan = feeder.panel
        const f = new Feeder(pan, cont.outContact)
        const index = pan.feeders.indexOf(feeder)
        pan.feeders.splice(cont.outContact.getSlaveSections().length - 1, 0, f)
        
        f.breaker = null
        f.contactor = null
        f.sBreaker = null
        f.sContactor = null
        f.sConsumer.nameOfPlane = 'M' + (index + 1) + '-' + (cont.outContact.getSlaveSections().length +1)
        console.log(cont.outContact.getSlaveSections().length);
        
        f.calc()
    }
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