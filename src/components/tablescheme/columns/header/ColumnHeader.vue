

<template>
    <div class="header">
        {{ text }}
    </div>
</template>

<script setup lang="ts">

const props = defineProps<{
    text: string
}>()


</script>



<style scoped>
.header {
    border-bottom: 1px solid rgb(229, 229, 229);
    display: flex;
    height: 50px;
    justify-content: center;
    align-items: center;
    font-size: medium;
    color: #6b717c;
}
</style>