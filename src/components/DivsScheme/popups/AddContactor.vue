<template>
    <div class="wrapp">
        <div class="row" @click="addCont">
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
import { useStore } from 'vuex';

import { addContactor } from '@/models/schemeActions/schemeactions';



const emits = defineEmits(['close'])

const store = useStore().state

function addCont() {


    emits('close')
    const sl = store.showPopup.args as SectionLine
  
    addContactor(sl)
    

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