<template>
    <div class="menu_container no-select">
    
            <div class="li">Файл</div>
            <div class="li">Правка</div>
            <div class="li">Справка</div>
     

    </div>
</template>

<script setup lang="ts">



</script>

<style scoped>

.li{
    display: flex;
    margin-left: 10px;
    cursor: pointer;
    height: 100%;
    justify-content: center;
    align-items: center;
    padding-left: 5px;
    padding-right: 5px;
    border: 1px solid transparent;
}
.li:hover{
    background: rgb(188, 217, 255);
    border: 1px solid blue;
}
.menu_container {
    display: flex;
    height: 30px;
    width: 100%;
    align-items: center;
    justify-content: start;
    border-bottom: 1px solid #dadce0;
}
</style>