

<template>
    <ColumnContainer :width="100">

        <ColumnHeader text="Кол. фаз" />
        <FeederRow :isselected="selectedFeederId === feeder.id" :isHovered="hoverFeederId === feeder.id"
            @mouseover="hoverFeederId = feeder.id" @click="selectedFeederId = feeder.id" v-for="feeder in panel.feeders"
            :key="feeder.id">
            <select class="my-select" v-model="feeder.consumer.colPhase">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            </select>
        </FeederRow>

</ColumnContainer>
</template>

<script setup lang="ts">
import ColumnContainer from "./ColumnContainer.vue";
import ColumnHeader from "./header/ColumnHeader.vue";
import FeederRow from "../FeederRow.vue";
import { Feeder } from "@/models/feeder";
import { Panel } from "@/models/panel";
import { inject } from "vue";
import NumberInput from "../UI/NumberInput.vue";

const panel: Panel = inject('panel', new Panel())
const selectedFeederId = inject('selectedFeederId')
const hoverFeederId = inject('hoverFeederId')



</script>



<style scoped>
.my-select{
    width: 100%;
    border: none;
    background: transparent;
    outline: none;
}
.my-select:active{
    outline: none;
}

</style>