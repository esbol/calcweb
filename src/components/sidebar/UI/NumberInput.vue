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
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    display: block;
    background: transparent;

    border: none;
    box-shadow: -1px -1px 1px gray;
    padding-left: 5px;

    color: var(--row-text-color);
    text-align: left;
}

input:focus {
    outline: none;
}

input[type="number"]::-webkit-inner-spin-button {
    display: none;
}
</style>