<template>
    <div class="shina">

    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    width: {
        type: String,
        required: true
    }
})
</script>

<style scoped>
.shina {
    width: v-bind(width);
    height: 10px;
    border: 3px solid var(--scheme-line-color);
}
</style>