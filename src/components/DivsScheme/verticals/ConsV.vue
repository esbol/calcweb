<template>
    <div @click="store.selectedObject = consumer" class="cons-container" :class="{ hover_border: hover, warn_border: deltaUHi }">
        <div class="frame-name" :class="{ hover_text: hover, hover_border: hover, warn_border: deltaUHi }">
            {{ consumer.nameOfPlane }}
        </div>
        <div class="frame-power" :class="{ hover_text: hover, hover_border: hover, warn_border: deltaUHi  }">
            {{ Number(consumer.installPower.toFixed(2)).toString().replace('.', ',') }}
        </div>
        <div class="frame-current" :class="{ hover_text: hover, hover_border: hover, warn_border: deltaUHi  }">
            {{ Number(consumer.current.toFixed(2)).toString().replace('.', ',') }}
        </div>
        <div class="frame-description" :class="{ hover_border: hover, warn_border: deltaUHi }" >
            <div class="descr_text" :class="{ hover_text: hover }">{{ consumer.description }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">

import { Consumer } from '@/models/consumer';
import { useStore } from 'vuex';
import { ref, watchEffect } from 'vue';

const store = useStore().state
const props = defineProps({
    consumer: {
        type: Consumer,
        required: true
    }
})
const hover = ref(false)
const deltaUHi = ref(false)
watchEffect(() => {

    if (store.selectedObject === props.consumer) {
        hover.value = true
        
    } else {
        hover.value = false
    }
    if(props.consumer.deltaU > props.consumer.allowDeltaU) deltaUHi.value = true
    else deltaUHi.value = false
})




</script>

<style scoped>
.descr_text{
    text-align: center;
}

.frame-description {
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;

    padding-left: 5px;
}

.frame-current {
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid;
    border-color: var(--scheme-line-color);
}

.frame-power {
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid;
    border-color: var(--scheme-line-color);
}

.frame-name {
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid;
    border-color: var(--scheme-line-color);
}

.text {
    top: -22px;
    left: 15px;
    position: absolute;

}


.hover_text {
    color: var(--scheme-line-hover-color) !important;
}


.hover_border {
    border-color: var(--scheme-line-hover-color);
    z-index: 1000 !important;
}
.warn_border {
    border-color: red !important;
    z-index: 1000 !important;
}

.cons-container {
    cursor: pointer;
    position: relative;
    width: 112px;
    height: 160px;
    border: 2px solid var(--scheme-line-color);

    display: flex;
    justify-content: left;
    flex-direction: column;
    align-items: center;
    margin-top: 0px;
    margin-left: -1px;
    margin-right: -1px;
}
</style>