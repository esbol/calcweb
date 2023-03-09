<template>
    <div class="shina">

    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    heigth: {
        type: String,
        required: true
    }
})
</script>

<style scoped>
.shina{
    width: 10px;
    height: v-bind(heigth);
    border: 3px solid var(--scheme-line-color);
}
</style>