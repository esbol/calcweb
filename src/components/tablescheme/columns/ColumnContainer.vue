<template>
    <div class="column-container" :style="{ width: width + 'px'}">
        <slot />
    </div>
</template>

<script setup lang="ts">
defineProps<{
    width: number
}>()
</script>



<style scoped>
.column-container {
    display: block;
    flex-direction: column;
    border-right: 1px solid rgb(219, 219, 219);
}
</style>