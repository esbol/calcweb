<template>
    <div class="container-props">
        <div class="header">
            <div class="header-title">{{ title }}</div>
        </div>

        <div class="data-container">
           <slot/>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    title: {
        type: String,
        required: true
    }
})

</script>

<style scoped>
* {
    font-family: Arial, Helvetica, sans-serif
}



.header-title {
    margin-left: 15px;
    font-weight: bold;
}

.header {
    display: flex;
    height: 35px;
    align-items: center;
    border-bottom: 1px solid var(--main-border-color);
    background-color: var(--sidebar-title-bg-color);
    cursor: pointer;
}



.data-container {
    display: flex;
    flex-direction: column;
    min-height: 300px;
    width: 100%;
    justify-content: flex-start;
    align-items: flex-start;
    padding-left: 10px;
}

.selected {
    font-weight: bold;
    color: var(--main-accent-color);
}

.container-props {
    width: 100%;
    height: auto;
    border: 1px solid var(--main-border-color);
    border-top: none;
    background: white;
}
</style>