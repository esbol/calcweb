

<template>
    <ColumnContainer :width="150">
        <ColumnHeader text="Наименование" />
        <FeederRow 
        :isselected="selectedFeederId === feeder.id"
            :isHovered="hoverFeederId === feeder.id"
            @mouseover="hoverFeederId = feeder.id"
        @click="selectedFeederId = feeder.id"
            v-for="feeder in panel.feeders" :key="feeder.id">
         <TextInput :input-value="feeder.consumer.description" 
          @focusout="changeDecription(feeder, $event)"
         :can-edite="true" />
        </FeederRow>
    </ColumnContainer>
  

</template>

<script setup lang="ts">
import ColumnContainer from "./ColumnContainer.vue";
import ColumnHeader from "./header/ColumnHeader.vue";
import FeederRow from "../FeederRow.vue";


import { Panel } from "@/models/panel";
import { inject } from "vue";

import TextInput from "../UI/TextInput.vue";
import { Feeder } from "@/models/feeder";

const panel: Panel = inject('panel', new Panel())
const selectedFeederId = inject('selectedFeederId')
const hoverFeederId = inject('hoverFeederId')

function changeDecription(f:Feeder, event: Event | any): void {
    console.log(event);
    
    // f.consumer.description = event.target.value
}

</script>



<style scoped>


</style>