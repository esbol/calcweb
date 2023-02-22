<template>
    <div class="gprops-container">
        <h3>{{ panel.nameOfPlane }}</h3>
        <table>
        <col width="50%">
        <col width="50%">
        <tr>
            <td>Наименование</td>
            <td><HardInput :can-edite="true"
            :value="panel.nameOfPlane" 
            @focusout="panel.nameOfPlane=$event.target.value"
            /></td>
        </tr>
        </table>
        
    </div>
</template>

<script setup lang="ts">
import HardInput from '@/components/UI/HardInput.vue';
import { Panel } from '@/models/panel';
import { inject } from 'vue';


const panel = inject('selectedPanel', new Panel())

</script>

<style scoped>
.gprops-container {

    height: 100%;
    width: 300px;
    background-color: #fafafa;
    box-shadow: 0 0 5px gray;
    padding: 5px;
    margin-left: 5px;

}
</style>