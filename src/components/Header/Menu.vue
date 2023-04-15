<!-- DropdownMenu.vue -->
<template>
    <div class="dropdown-menu">
        <button @click="toggleMenu" class="menu-button">
            Вид
        </button>
        <div v-show="menuVisible" class="menu-items">
            <MenuItemCheck :text="'Показать сетку'" :checked="store.showGrid" />
        </div>
        <div v-if="menuVisible = false" class="back" ></div>
    </div>
</template>
  
<script setup lang="ts">

import MenuItemCheck from "./MenuItemCheck.vue";
import { useStore } from 'vuex';
import { ref, watchEffect } from 'vue';


const store = useStore().state
const menuVisible = ref(false);


const toggleMenu = () => {
    menuVisible.value = !menuVisible.value;
};


</script>
  
<style scoped>
.back {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-color: red;
    z-index: 1000;
}
.dropdown-menu {
    position: relative;
    display: inline-block;
    z-index: 2000;
}

.menu-items {

    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    padding: 12px 16px;
    z-index: 1;
}

.menu-items .menu-item {
    display: block;
    cursor: pointer;
}

.menu-button {

    color: var(--main-text-color);
    padding: 5px;

    border: none;
    cursor: pointer;
}

.menu-button:hover {
    background-color: #fefefe;
}
</style>
  