<template>
    <div class="format_container">



        <div class="select-format"><Select :selected-value="format.name" :display-path="'0'" :options="options"
                @change="setFormat" /></div>


        <div class="size"><span class="material-symbols-outlined">
                height
            </span></div>





        <div class="height_width">
            <NumberInput :input-value="format.width" @focusout="format.width = parseFloat($event.target.value)"
                :can-edite="!isStandart" />
        </div>


        <div ><span class="material-symbols-outlined">
                width
            </span></div>


        <div class="height_width">
            <NumberInput :input-value="format.height" @focusout="format.height = parseFloat($event.target.value)"
                :can-edite="!isStandart" />
        </div>
    </div>
</template>

<script setup lang="ts">
import TextInput from '../sidebar/UI/TextInput.vue';
import Select from '../sidebar/UI/Select.vue'
import { Stamp } from '@/models/settings/stamp';
import { Format, FormatNames } from '@/models/settings/format';
import { useStore } from 'vuex';
import NumberInput from '../sidebar/UI/NumberInput.vue';
import { ref, computed } from 'vue';

const format: Format = useStore().state.selectedPanel.format as Format

const options: Array<string> = []
FormatNames.forEach(n => options.push(n))
options.push('Пользовательский')

const store = useStore().state

const isStandart = computed(() => {
    const name = store.selectedPanel.format.name
    if (FormatNames.includes(name)) {
        return true
    } else {
        return false
    }
})



function setFormat(n: string) {
    store.selectedPanel.format.name = n
}

</script>

<style scoped>
.material-symbols-outlined {
    font-variation-settings:
        'FILL' 0,
        'wght' 400,
        'GRAD' 0,
        'opsz' 48
}




.format_container {
    display: flex;
    margin-left: 10px;
}

.size {
    height: 100%;
    margin-left: 5px;
    display: flex;
    align-items: center;

}

.height_width {
    display: flex;
    align-items: center;
    height: 100%;
    width: 80px;
    
    border: 1px solid rgb(223, 223, 223);
}

.select-format {
    display: flex;
    align-items: center;
    height: 100%;
    width: 150px;
    border: 1px solid var(--main-border-color);

}
</style>