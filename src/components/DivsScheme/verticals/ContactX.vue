<template>
    <div class="cont-container" :class="{ hover_border: hover }">
        <div class="line1"></div>
        <div class="line2"></div>
    </div>
</template>

<script setup lang="ts">


defineProps({
    hover: {
        type: Boolean,
        required: true
    }
})




</script>

<style scoped>
.line1{
    position: absolute;
    width: 100%;
    height: 3px;
    transform: rotate(45deg);
    background: var(--scheme-line-color);
}
.line2{
    position: absolute;
    width: 100%;
    height: 3px;
    transform: rotate(-45deg);
    background: var(--scheme-line-color);
}
.cont-container {
    cursor: pointer;
    width: 10px;
    height: 10px;
}
</style>