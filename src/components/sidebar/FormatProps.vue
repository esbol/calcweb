<template>
    <table>
        <col width="50%" />
        <col width="50%" />
        <tr>
            <td>
                <div class="name-prop">Формат</div>
            </td>
            <td>
                <div class="prop-value-input"><Select :selected-value="format.name" :display-path="'0'"
                        :options="options" @change="setFormat" /></div>
            </td>
        </tr>
        <tr>
            <td>
                <div class="name-prop">Ширина</div>
            </td>
            <td v-if="isStandart">
                    <div class="prop-value">{{ format.width }}</div>
                </td>
            <td v-else>
                <div class="prop-value-input">
                    <NumberInput :input-value="format.width" @focusout="format.width = parseFloat($event.target.value)"
                        :can-edite="true" />
                </div>
            </td>
        </tr>
        <tr>
            <td>
                <div class="name-prop">Высота</div>
            </td>
            <td v-if="isStandart">
                <div class="prop-value">{{ format.height }}</div>
            </td>
            <td v-else>
                <div class="prop-value-input">
                    <NumberInput :input-value="format.height" @focusout="format.height = parseFloat($event.target.value)"
                        :can-edite="true" />
                </div>
            </td>

        </tr>
    </table>
</template>

<script setup lang="ts">
import TextInput from './UI/TextInput.vue';
import Select from './UI/Select.vue'
import { Stamp } from '@/models/settings/stamp';
import { Format, FormatNames } from '@/models/settings/format';
import { useStore } from 'vuex';
import NumberInput from './UI/NumberInput.vue';
import { ref, computed } from 'vue';

const format: Format = useStore().state.selectedPanel.format as Format

const options: Array<string> = []
FormatNames.forEach(n=> options.push(n))
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
* {
    font-family: Arial, Helvetica, sans-serif
}

table {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0px;
}

tr {
    height: 25px;
    border-bottom: 1px solid var(--main-border-color);
    border-left: 1px solid var(--main-border-color);
    box-sizing: border-box;
    padding: 0;

}

td {
    border-left: 1px solid var(--main-border-color);
    padding: 0;

}

.name-prop {
    height: 100%;
    margin-left: 5px;
    display: flex;
    align-items: center;
}

.prop-value {
    display: flex;
    align-items: center;
    height: 100%;
    padding-left: 5px;
    color: var(--main-text-disabled-color);
}

.prop-value-input {
    display: flex;
    align-items: center;
    height: 100%;
    width: 100%;
    border-left: 1px solid var(--main-border-color);

}
</style>