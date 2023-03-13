<template>
    <input type="number" step="any" :value="inputValue" :readonly="!canEdite" @focusout="$emit('focusout', $event)"
        @focus="selectAll($event.target as HTMLInputElement)" />
</template>

<script setup lang="ts">

defineProps({
    inputValue: Number,
    canEdite: Boolean
})

defineEmits(['focusout'])

function selectAll(target: HTMLInputElement) {
    target.select()
}

</script>


<style scoped>
input {
   height: 100%;
    width: 100%;
    
    box-sizing: border-box;
    display: block;
    background: transparent;
    box-shadow: -1px -1px 1px gray;
    border: none;
    padding: 5px;
    color: var(--row-text-color);
}

input:focus {
    outline: none;
}

input[type="number"]::-webkit-inner-spin-button {
    display: none;
}
</style>