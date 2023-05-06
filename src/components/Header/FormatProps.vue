<template>
    <div class="format_container">



        <div class="select-format"></div>


        <div class="size"><span class="material-symbols-outlined">
                 width
            </span></div>

        <div class="height_width">
            <NumberInput :input-value="format.width" @focusout="format.width = parseFloat($event.target.value)"
                :can-edite="true" />
        </div>


        <div ><span class="material-symbols-outlined">
                height
            </span></div>


        <div class="height_width">
            <NumberInput :input-value="format.height" @focusout="format.height = parseFloat($event.target.value)"
                :can-edite="false" />
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

const store = useStore().state



</script>

<style scoped>
.material-symbols-outlined {
    color: var(--main-text-color);
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
    height: 25px;
    width: 100px;
    border: 1px solid var(--main-text-disabled-color);

}
</style>