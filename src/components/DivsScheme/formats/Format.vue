<template>
    <div class="format-container">
        <div class="innerFrame">

        </div>

        <div class="stamp">
            <Stamp />
        </div>
        <div class="sideStamp">
            <SideStamp />
        </div>
        <div class="formatSize">
        Формат: 
        <span v-if="isStandart">{{ store.selectedPanel.format.name }}</span>
        <span v-else>{{ store.selectedPanel.format.width }}x{{ store.selectedPanel.format.height }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">

import { computed, ref } from 'vue';
import Stamp from './Stamp.vue';
import SideStamp from './SideStamp.vue';
import { Format, FormatNames } from '@/models/settings/format';
import { useStore} from 'vuex'

const hover = ref(false)
const isStandart = computed(() => {
    const name = store.selectedPanel.format.name
    if (FormatNames.includes(name)) {
        return true
    } else {
        return false
    }
})

const store = useStore().state

const width = computed(()=>{
    const scale = store.selectedPanel.format.pixelScale
    return store.selectedPanel.format.width * scale + 'px'
})

const height = computed(() => {
    const scale = store.selectedPanel.format.pixelScale
    return store.selectedPanel.format.height * scale + 'px'
})

</script>

<style scoped>
.formatSize{
    position: absolute;
    right: 20px;
    bottom: 4px;
    color: var(--scheme-line-color)
}
.sideStamp{
    position: absolute;
    left: 80px;
    bottom: 20px;
    transform: rotate(-90deg); 
    transform-origin: bottom left;
}
.stamp {
    position: absolute;
    right: 20px;
    bottom: 20px;
}

.innerFrame {
    position: absolute;
    
    width: calc(100% - 100px);
    height: calc(100% - 40px);
    border: 2px solid var(--scheme-line-color);
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
    border-color: var(--scheme-line-hover-color) !important;
}

.format-container {
  
    padding-left: 80px;
    padding-top: 20px;
    width: v-bind(width);
    height: v-bind(height);
    border: 0px solid var(--scheme-line-color);
  
    position: absolute;
    top: 0;
    left: 0;
}
</style>