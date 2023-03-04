<template>
    <div class="pp-container">
        <div class="header">
            <p>Распред. устройство</p>
        </div>
        <div class="shina">
            <table>
                <tr>
                    <td>Pуст.</td>
                    <td>{{ panel.uniteSection.calculationModes[0].installPower }}</td>
                </tr>
                <tr>
                        <td>Pр.</td>
                        <td>{{ panel.uniteSection.calculationModes[0].ratedPower }}</td>
                    </tr>
            </table>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Panel } from '@/models/panel';

const props = defineProps({
    panel: {
        type: Panel,
        required: true
    }
})
</script>

<style scoped>
table {
    width: 100%;
}
.pp-container {
    display: grid;
    grid-template-rows: 132px 1fr;
    height: 100%;
    width: 100px;
        background: #fafafa;
    color: rgb(76, 76, 76);
}

.header {
    height: 100%;
    border: 1px solid rgb(219, 219, 219);
    border-right: none;
    border-bottom: 2px solid rgb(219, 219, 219);

    display: flex;

    justify-content: center;
    align-items: center;

}

p {
    display: block;
    text-align: center;
   
}

.shina {
    border-left: 1px solid rgb(219, 219, 219);
    border-bottom: 1px solid rgb(219, 219, 219);
    border-right: 4px solid gray;
}
</style>