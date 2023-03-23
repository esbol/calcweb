<template>
    <table>
        <col width="50%" />
        <col width="50%" />
        <tr>
            <td>
                <div class="name-prop">Шифр</div>
            </td>
            <td>
                <div class="prop-value-input">
                    <TextInput :input-value="stamp.shifr" @focusout="stamp.shifr = $event.target.value" :can-edite="true" />
                </div>
            </td>
        </tr>
        <tr>
            <td>
                <div class="name-prop">Наим. проекта</div>
            </td>
            <td>
                <div class="prop-value-input">
                    <TextInput :input-value="stamp.projectName" @focusout="stamp.projectName = $event.target.value"
                        :can-edite="true" />
                </div>
            </td>
        </tr>
        <tr>
            <td>
                <div class="name-prop">Наим. здания</div>
            </td>
            <td>
                <div class="prop-value-input">
                    <TextInput :input-value="stamp.buildingName" @focusout="stamp.buildingName = $event.target.value"
                        :can-edite="true" />
                </div>
            </td>
        </tr>
        <tr>
            <td>
                <div class="name-prop">Наим. листа</div>
            </td>
            <td>
                <div class="prop-value-input">
                    <TextInput :input-value="stamp.sheetName" @focusout="stamp.sheetName = $event.target.value"
                        :can-edite="true" />
                </div>
            </td>
        </tr>
        <tr>
            <td>
                <div class="name-prop">Наим. компании</div>
            </td>
            <td>
                <div class="prop-value-input">
                    <TextInput :input-value="stamp.companyName" @focusout="stamp.companyName = $event.target.value"
                        :can-edite="true" />
                </div>
            </td>
        </tr>
        <tr>
            <td>
                <div class="name-prop">Стадия</div>
            </td>
            <td>
                <div class="prop-value-input">
                    <TextInput :input-value="stamp.stadiya" @focusout="stamp.stadiya = $event.target.value"
                        :can-edite="true" />
                </div>
            </td>
        </tr>
        <tr>
            <td>
                <div class="name-prop">№ Листа</div>
            </td>
            <td>
                <div class="prop-value-input">
                    <TextInput :input-value="stamp.sheetNumber" @focusout="stamp.sheetNumber = $event.target.value"
                        :can-edite="true" />
                </div>
            </td>
        </tr>
        <tr>
            <td>
                <div class="name-prop">Листов</div>
            </td>
            <td>
                <div class="prop-value-input">
                    <TextInput :input-value="stamp.totalSheets" @focusout="stamp.totalSheets = $event.target.value"
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




const props = defineProps({
    stamp: {
        type: Stamp,
        required: true
    }
})



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