<template>
    <div class="row">
        <div class="name-prop">Обозначение</div>
        <div class="prop-value-input">
            <TextInput :input-value="consumer.nameOfPlane"
             @focusout="consumer.nameOfPlane=$event.target.value" :can-edite="true"/>
        </div>
    </div>
    <div class="row">
        <div class="name-prop">Руст.</div>
        <div class="prop-value-input">
            <NumberInput :input-value="consumer.installPower"
            @focusout="consumer.installPower= parseFloat($event.target.value)"
            :can-edite="true"/>
        </div>
    </div>
    <div class="row">
        <div class="name-prop">Кол. фаз</div>
        <div class="prop-value">{{ consumer.colPhase }}</div>
    </div>
    <div class="row">
        <div class="name-prop">cos f</div>
        <div class="prop-value">{{ consumer.cosf }}</div>
    </div>
    <div class="row">
        <div class="name-prop">Iрасч.</div>
        <div class="prop-value">{{ consumer.current.toFixed(3) }}</div>
    </div>
    <div class="row">
        <div class="name-prop">Потеря напряж.</div>
        <div class="prop-value">{{ consumer.current }}</div>
    </div>
    <div class="row">
        <div class="name-prop">Количество</div>
        <div class="prop-value">{{ consumer.count }}</div>
    </div>
    <div class="row">
        <div class="name-prop">Резервный</div>
        <div class="prop-value">{{ consumer.count }}</div>
    </div>
    <div class="row">
            <div class="name-prop">Подключен к</div>
            <div class="prop-value">{{ consumer.supplyPanels[0].nameOfPlane}}</div>
        </div>
</template>

<script setup lang="ts">

import { Consumer } from "@/models/consumer";
import TextInput from "./UI/TextInput.vue";
import NumberInput from "./UI/NumberInput.vue";

const props = defineProps({
    consumer: {
        type: Consumer,
        required: true
    }
})

</script>

<style scoped>
* {
    font-family: Arial, Helvetica, sans-serif
}

.row {
    width: 100%;
    height: 25px;
    display: flex;
    align-items: center;

    border-bottom: 1px solid var(--main-border-color);
    border-left: 1px solid var(--main-border-color);
}

.name-prop {
    height: 100%;
    width: 50%;
    margin-left: 5px;
    display: flex;
    align-items: center;
}

.prop-value {
    display: flex;
    align-items: center;
    height: 100%;
    width: 50%;
    border-left: 1px solid var(--main-border-color);
    padding-left: 5px;
}
.prop-value-input {
    display: flex;
    align-items: center;
    height: 100%;
    width: 50%;
    border-left: 1px solid var(--main-border-color);
   
}
</style>