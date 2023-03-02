

<template>
    <div contenteditable="true">{{ consumer.description }}</div>
</template>

<script setup lang="ts">


import TextInput from "../UI/TextInput.vue";

import { Consumer } from "@/models/consumer";

//#region setupdata
const props = defineProps({
    consumer: {
        type: Consumer,
        required: true
    }
})




</script>



<style scoped>
.content {
    width: 100%;
    height: 100%;
    display: inline-block;
    vertical-align: bottom;
    outline: none;
}
[contenteditable]:focus {
    outline: 0px solid transparent;
}
</style>