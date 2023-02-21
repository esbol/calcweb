<template>
    <input type="text" step="any" :value="inputValue" :readonly="!canEdite" @focusout="$emit('focusout', $event)" />
</template>

<script setup lang="ts">

defineProps({
    inputValue: String,
    canEdite: Boolean
})

defineEmits(['focusout'])

</script>


<style scoped>
input {
    width: 100%;
    box-sizing: border-box;
    display: block;
    background: transparent;
    cursor: pointer;
    border: none;
    padding: 5px;
    color: var(--row-text-color);
}

input:focus {
    outline: none;
}
</style>