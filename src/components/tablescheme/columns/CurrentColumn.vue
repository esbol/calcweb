

<template>
    <ColumnContainer :width="150">

        <ColumnHeader text="Iр, А" />
        <FeederRow 
        :isselected="selectedFeederId === feeder.id"
                :isHovered="hoverFeederId === feeder.id"
                @mouseover="hoverFeederId = feeder.id"
         @click="selectedFeederId = feeder.id"
            v-for="feeder in panel.feeders" :key="feeder.id">
            <NumberInput  :input-value="feeder.consumer.current" :can-edite="false"
              />
        </FeederRow>

    </ColumnContainer>
</template>

<script setup lang="ts">
import ColumnContainer from "./ColumnContainer.vue";
import ColumnHeader from "./header/ColumnHeader.vue";
import FeederRow from "../FeederRow.vue";


import { Panel } from "@/models/panel";
import { inject } from "vue";
import NumberInput from "../UI/NumberInput.vue";
import { Feeder } from "@/models/feeder";


const panel: Panel = inject('panel', new Panel())
const selectedFeederId = inject('selectedFeederId')
const hoverFeederId = inject('hoverFeederId')

function convertDouble(f: Feeder, event: Event | any): void {
    const n: number = parseFloat(event.target.value)
    f.consumer.installPower = n
}


</script>



<style scoped>

</style>