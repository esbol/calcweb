<template>
    <div class="container-props ">
        <div class="header no-select">
            <img src="@/assets/vue.svg" alt="" class="vueimg"/><div class="text">VoltCad</div>
        </div>

    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';



const show = ref(true)

</script>

<style scoped>
.text{
    margin-left: 9px;
    font-size: 20px;
    font-weight: normal;
    color: rgb(56, 56, 56);
}
.vueimg{
    height: 22px;
    display: block;
    margin-left: 20px;
}


.header {
    display: flex;
    height: 50px;
    align-items: center;
    align-content: center;
    justify-content: start;
    border-bottom: 1px solid var(--main-border-color);
    background-color: var(--sidebar-title-bg-color);
   
}




.container-props {
    width: 100%;
    height: auto;
    border-bottom: 1px solid var(--main-border-color);
    background: white;
}


</style>