

<template>
    <ColumnContainer :width="100">

        <ColumnHeader text="Cos f" />
        <FeederRow :isselected="selectedFeederId === feeder.id" :isHovered="hoverFeederId === feeder.id"
            @mouseover="hoverFeederId = feeder.id" @click="selectedFeederId = feeder.id" v-for="feeder in panel.feeders"
            :key="feeder.id">
            <NumberInput :input-value="feeder.consumer.cosf" :can-edite="true"
                @focusout="convertDouble(feeder, $event)" />
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

function convertDouble(f: Feeder, event: Event | any): void {
    const n: number = parseFloat(event.target.value)
    if (!isNaN(n)) f.consumer.cosf = n
}

</script>



<style scoped></style>