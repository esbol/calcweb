

<template>
    <td>
        <select class="my-select" v-model="section.cable.mark">
            <option v-for="cable in Cables">{{ cable.mark }}</option>
        </select>
    </td>
    <td>{{ section.cable.colCores + 'x' + section.cable.square }}</td>
    <td>
        <NumberInput :can-edite="true" :input-value="section.calc.length"
            @focusout="section.cable.length = $event.target.value" />
    </td>
</template>

<script setup lang="ts">


import { Cables } from "@/models/bd/cables";
import { SectionLine } from "@/models/sectionline";
import NumberInput from "../UI/NumberInput.vue";

//#region setupdata
const props = defineProps({
    section: {
        type: SectionLine,
        required: true
    }
})




</script>



<style scoped>
td {
    vertical-align: bottom;
    border: 1px solid rgb(219, 219, 219);
    color:  var(--row-text-color);
    text-align: center;
}

.my-select {

    width: 100%;

    border: none;
    background: transparent;
    outline: none;
    color: var(--row-text-color);

}
</style>