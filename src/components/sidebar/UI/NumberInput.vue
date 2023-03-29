<template>
    <input type="number" step="any" :value="inputValue" :readonly="!canEdite" @focusout="$emit('focusout', $event)"
    :style="{ color: state.textColor }"
        @focus="selectAll($event.target as HTMLInputElement)" />
</template>

<script setup lang="ts">import { computed, reactive, ref, watchEffect } from 'vue';


const props = defineProps({
    inputValue: Number,
    canEdite: Boolean
})

defineEmits(['focusout'])

function selectAll(target: HTMLInputElement) {
    target.select()
}
const state = reactive({
    textColor: 'red', // можно заменить на любой другой цвет
    paragraphColor: 'blue' // можно заменить на любой другой цвет
});
const color = ref('#000000');
watchEffect(() => {
    if(props.canEdite){
        state.textColor = 'var(--main-text-color)'
    }else{
        state.textColor = 'var(--main-text-disabled-color)'
    }
    
})

</script>


<style scoped>
input {
   height: 100%;
    width: 100%!important;
    
    box-sizing: border-box;
    display: block;
    background: transparent;
    box-shadow: -1px -1px 1px gray;
    border: none;
    padding: 5px;
}

input:focus {
    outline: none;
}

input[type="number"]::-webkit-inner-spin-button {
    display: none;
}
</style>