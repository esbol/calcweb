<template>
    <div class="section-container">
        <h3>Участок сети 1</h3>
        <table>
            <tr>
                <td>Обозначение</td>
                <td>
                    <TextInput :input-value="section.description" @focusout="section.description = $event.target.value"
                        :can-edite="true" />
                </td>
            </tr>
            <tr>

                <td>Pуст</td>
                <td>
                    <NumberInput :input-value="section.calculationModes[0].installPower" :can-edite="false" />
                </td>
            </tr>
            <tr>

                <td>Рр</td>
                <td>
                    <NumberInput :input-value="section.calculationModes[0].ratedPower" :can-edite="false" />
                </td>
            </tr>

            <tr>

                <td><strong>Кабель</strong></td>
                <td>
                </td>
            </tr>
             <tr>
                    <td>Марка</td>
                    <td>
                        <TextInput :input-value="section.cable.mark" :can-edite="true" />
                    </td>
                </tr>
                  <tr>
                        <td>Макс.ток</td>
                        <td>
                            <NumberInput :input-value="section.cable.maxCurrent" :can-edite="false" />
                        </td>
                    </tr>
                      <tr>
                            <td>Сечение</td>
                            <td>
                                <NumberInput :input-value="section.cable.square" :can-edite="false" />
                            </td>
                        </tr>
        </table>
    </div>
</template>

<script setup lang="ts">
import TextInput from '../tablescheme/UI/TextInput.vue';
import NumberInput from '../tablescheme/UI/NumberInput.vue';
import { SectionLine } from '@/models/sectionline';

const props = defineProps({
    section: {
        type: SectionLine,
        required: true
    }
})
</script>

<style scoped>
table {
    width: 100%;
}

.section-container {
    
    background-color: rgb(232, 232, 232);
}
</style>