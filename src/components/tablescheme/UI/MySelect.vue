<template>
    <div class="wrapper-select" @click="open=!open">
        <div class="text-select">asdf</div>
        <div class="arrow-select"><img src="@/assets/arrow_drop_down.svg"></div>
        <div class="list-wrapper" v-if="open">
            <div class="select-row">123</div>
            <div class="select-row">123</div>
            <div class="select-row">123</div>
        </div>
    </div>
</template>

<script setup lang="ts">

import { ref, computed } from 'vue';

const open = ref(false)




</script>


<style scoped>
.wrapper-select {
    display: block;
    background-color: red;
    height: 100%;
    width: 100%;
    position: relative;
}

.text-select {
    background: blue;
}

.arrow-select {
    width: 20px;
    height: 20px;
    background: green;

}

img {
    height: 100%;
    width: 100%;
}

.list-wrapper {
    box-sizing: border-box;
    position: absolute;
    background: white;
    width: 100%;
    height: 50px;
    top: 100%;
    left: 0;
    box-shadow: 0 0 2px gray;
}
</style>