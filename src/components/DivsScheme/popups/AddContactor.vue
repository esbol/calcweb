<template>
    <div class="wrapp">
        <div class="row" @click="addContactor">
            Добавить контактор
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
import { SectionLine } from '@/models/sectionline';
import { store } from '@/store/store';


const props = defineProps({
    arg: {}
})

const emits = defineEmits(['close'])

function addContactor() {


    emits('close')
    const sl = props.arg as SectionLine

    const feeder = store.selectedPanel?.feeders.find(f =>
        f.sConsumer === sl || f.sContactor === sl)

    if (feeder) feeder.setNewContactor()
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