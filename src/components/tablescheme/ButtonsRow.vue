
<template>
     <div class="buttons-row">

                <MyButton class="btn1"
                
                 :img="'add'"
                  @click="addFeeder">Добавить электроприемник</MyButton>
                <MyButton 
                class="btn2"
                
                :img="'calculate'" @click="panel.calc()">Расчет</MyButton>

            </div>
</template>

<script setup lang="ts">

import { Panel } from "@/models/panel"
import MyButton from "./UI/MyButton.vue";

//#region setupdata
const props = defineProps({
    panel: {
        type: Panel,
        required: true
    }
})



function addFeeder(): void {

    props.panel.addFeeder()
}



</script>



<style scoped>
.buttons-row{
    display: flex;
    height: 50px;
    margin-top: 15px;
}
.btn2{
    margin-left: 20px;
    width: 200px;
}
.btn1{
    width: 250px;
}
</style>