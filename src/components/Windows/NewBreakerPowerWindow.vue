<template>
    <div class="popup-container">
        <div class="popup">
            <div class="title">Новый выключатель нагрузки</div>
            <table>
                <col width="180px" />
                <col width="350px" />
                <tr>
                    <td>
                        <div class="name-prop">Производитель</div>
                    </td>
                    <td>
                        <div class="prop-value-input">
                            <TextInput :input-value="breakerPower.factory" @focusout="breakerPower.factory = $event.target.value"
                                :can-edite="true" />
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div class="name-prop">Марка</div>
                    </td>
                    <td>
                        <div class="prop-value-input">
                            <TextInput :input-value="breakerPower.mark" @focusout="breakerPower.mark = $event.target.value"
                                :can-edite="true" />

                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div class="name-prop">Номиналы</div>
                    </td>
                    <td>
                        <div class="prop-value">
                            <div class="chek-rows no-select">
                                <div class="check-row1">
                                    <input class="check" type="checkbox" v-on:change="setBreakerNominal(6)" id="6">
                                    <label for="6">6</label>
                                    <input class="check" type="checkbox" v-on:change="setBreakerNominal(10)" id="10">
                                    <label for="10">10</label>
                                    <input class="check" type="checkbox" v-on:change="setBreakerNominal(16)" id="16">
                                    <label for="16">16</label>
                                    <input class="check" type="checkbox" v-on:change="setBreakerNominal(20)" id="20">
                                    <label for="20">20</label>
                                    <input class="check" type="checkbox" v-on:change="setBreakerNominal(25)" id="25">
                                    <label for="25">25</label>
                                    <input class="check" type="checkbox" v-on:change="setBreakerNominal(32)" id="32">
                                    <label for="32">32</label>
                                    <input class="check" type="checkbox" v-on:change="setBreakerNominal(40)" id="40">
                                    <label for="40">40</label>
                                    <input class="check" type="checkbox" v-on:change="setBreakerNominal(50)" id="50">
                                    <label for="50">50</label>
                                    <input class="check" type="checkbox" v-on:change="setBreakerNominal(63)" id="63">
                                    <label for="63">63</label>
                                </div>
                                <div class="check-row2">

                                    <input class="check" type="checkbox" v-on:change="setBreakerNominal(80)" id="80">
                                    <label for="80">80</label>
                                    <input class="check" type="checkbox" v-on:change="setBreakerNominal(100)" id="100">
                                    <label for="100">100</label>
                                    <input class="check" type="checkbox" v-on:change="setBreakerNominal(160)" id="160">
                                    <label for="160">160</label>
                                    <input class="check" type="checkbox" v-on:change="setBreakerNominal(250)" id="250">
                                    <label for="250">250</label>
                                    <input class="check" type="checkbox" v-on:change="setBreakerNominal(400)" id="400">
                                    <label for="400">400</label>
                                    <input class="check" type="checkbox" v-on:change="setBreakerNominal(630)" id="630">
                                    <label for="630">630</label>
                                    <input class="check" type="checkbox" v-on:change="setBreakerNominal(1000)" id="1000">
                                    <label for="1000">1000</label>
                                </div>
                            </div>



                        </div>
                    </td>
                </tr>
                



            </table>
            <button @click="setNewBreakerPower">Применить</button>
            <button @click="$emit('clcClose')">Отменить</button>
        </div>
        <div class="back" @click="$emit('clcClose')"></div>
    </div>
</template>

<script setup lang="ts">
import SelectSimple from '../sidebar/UI/SelectSimple.vue';
import TextInput from '../sidebar/UI/TextInput.vue';
import { useStore } from 'vuex';
import { ref, defineEmits, computed, onMounted } from 'vue';
import { CurrentCharacter, IBreaker } from '@/models/bd/breakers';
import { Breakers } from '@/models/bd/breakers';
import { BreakersPower, IBreakerPower } from '@/models/bd/breakersPower';


const props = defineProps({
    factory: {
        type: String,
        required: true
    }
})

const br: IBreakerPower = {
    factory: props.factory,
    colPhase: 1,
    mark: '',
    possibleCurrents: []
}
const breakerPower = ref(br)

const store = useStore().state
const emits = defineEmits(['clcClose'])


function setBreakerNominal(nominal: number) {
    const index = breakerPower.value.possibleCurrents.indexOf(nominal, 0);
    if (index > -1)breakerPower.value.possibleCurrents.splice(index, 1)
    else breakerPower.value.possibleCurrents.push(nominal)
   
}

function setNewBreakerPower() {
    BreakersPower.push(breakerPower.value)
    store.selectedObject = null
    emits('clcClose')
}

</script>

<style scoped>
button {
    margin-right: 10px;
}

label {
    margin-right: 4px;
    color: var(--main-text-color);
}

.check[type="text"] {
    border: 1px solid black;
    padding: 5px;
    font-size: 16px;
}

button {
    margin-top: 20px;
}

.title {
    font-size: 15px;
    font-weight: bold;
    margin-bottom: 20px;
}

.popup {
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    z-index: 3;
}

.back {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-color: #1b202b;
    opacity: .5;
    z-index: 1;
}

.popup-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    box-shadow: 2px 2px 2px gray;
    border: 1px solid rgb(201, 201, 201);

    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
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