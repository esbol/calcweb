<template>
    <div class="container-props">
        <div class="header no-select" @click="show = !show">
            <div class="header-title">
                <div v-if="show" class="material-symbols-outlined">
                    arrow_drop_down
                </div>
                <div v-else class="material-symbols-outlined">
                    arrow_right
                </div>
                <div class='text'>{{ title }}</div>
            </div>
        </div>

            <div class="data-container" :class="{hide : !show}">
                <slot />
            </div>
     



    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
    title: {
        type: String,
        required: true
    }
})

const show = ref(true)

</script>

<style scoped>
.hide{
    max-height: 0px !important;

    overflow: hidden !important;
    min-height: 0 !important;
    transition: all 0.2s;
}
.header-title {
    margin-left: 15px;
    font-weight: bold;
    display: flex;
    align-items: center;
    color: var(--sidebar-text-color)
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
    min-height: 100px;
    max-height: 1000px;
    width: 100%;
    justify-content: flex-start;
    align-items: flex-start;
    padding-left: 10px;
    overflow: visible;
    transition: all 0.2s;
 
}

.selected {
    font-weight: bold;
    color: var(--main-accent-color);
}

.container-props {
    width: 100%;
    height: auto;
    border-bottom: 1px solid var(--main-border-color);
    background: white;
}

.material-symbols-outlined {
    font-variation-settings:
        'FILL' 0,
        'wght' 400,
        'GRAD' 0,
        'opsz' 48
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease-out;
}

.slide-enter,
.slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
 
}
</style>