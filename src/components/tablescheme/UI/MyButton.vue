<template>
    <button class="btn">
        <span class="material-symbols-outlined image">

            {{ img }}

        </span>
        <div class="text">
           <slot></slot>
        </div>
     
    </button>
</template>

<script setup lang="ts">
const props = defineProps({
    img: {
        type: String,
        required: false
    },
    width: {
        type: String,
        required: false
    },
    height: {
        type: String,
        required: false
    }

})

</script>

<style scoped>
.text {
    align-self: center;
}
span {
    align-self: center;
}

.btn {
    display: flex;
    background: var(--sidebar-selected-color);
    border: none;
    border-radius: 2px;
    color: white;
    width: v-bind(width);
    height: v-bind(height);
    justify-content: center;
}

.material-symbols-outlined {
    font-size: 24px;
    font-variation-settings:
        'FILL' 0,
        'wght' 300,
        'GRAD' 0,
        'opsz' 48
}
</style>