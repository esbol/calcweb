<template>
    <select>
        <option value="0">select</option>

        <option value="1">asdf</option>
    </select>
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


<style scoped></style>